'use strict'

const File = require('vinyl')
const fs = require('fs-extra')
const { obj: map } = require('through2')
const { Octokit } = require('@octokit/rest')
const pad = require('pad')
const path = require('path')
const vfs = require('vinyl-fs')
const zip = require('gulp-vinyl-zip')
const { createMessage, decryptKey, readPrivateKey, sign } = require('openpgp')

const defaultBranch = 'main'

const base64decode = async (str) => {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(Buffer.from(str, 'base64'))
}

const branchAlreadyExists = async ({ octokit, owner, repo }, ref) => {
  try {
    await octokit.rest.git.getRef({ owner, repo, ref })
    return true
  } catch (e) {
    return false
  }
}

const commitToString = async ({ message, tree, parents, author, committer = author }) => {
  // the blank line between committer and message is intentional, if removed, the signature will be invalid
  return `
tree ${tree}
${parents.map((parent) => `parent ${parent}`).join('\n')}
author ${await userToString(author)}
committer ${await userToString(committer)}

${message}`.trim()
}

const createNewBranch = async ({ octokit, owner, repo, ref, newBranchName }) => {
  if (!(await branchAlreadyExists({ octokit, owner, repo }, headsify(newBranchName)))) {
    console.log(`Creating new branch ${newBranchName}...`)
    const { data: baseRefData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: headsify(ref),
    })

    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/${headsify(newBranchName)}`,
      sha: baseRefData.object.sha,
    })
    console.log(`Successfully created branch ${newBranchName}.`)
  } else {
    console.log(`Branch ${newBranchName} already exists. Skipping its creation.`)
  }
}

const createPR = async ({ octokit, owner, repo, tagName, ref, sites, secretKey, passphrase }) => {
  console.log(`submitting PR to the ${repo} repo...`)
  const newBranchName = tagName
  await createNewBranch({ octokit, owner, repo, ref, newBranchName })
  await updateContent({
    octokit,
    owner,
    repo,
    ref,
    newBranchName,
    tagName,
    sites,
    secretKey,
    passphrase,
  })

  await octokit.pulls.create({
    owner,
    repo,
    title: `[W-18588974] ${tagName}`,
    head: newBranchName,
    base: ref,
    body: `ref: https://github.com/mulesoft/docs-site-ui/releases/tag/${tagName}

Before you merge this PR, please verify your changes in the following site:
https://beta.docs.mulesoft.com/beta-ui-staging/general/ (deployed every 2 hours).
    `,
  })
  console.log(`Successfully submitted PR to the ${ref} branch.`)
}

const createRelease = async ({ octokit, owner, repo }, tagName, bundleFile, bundlePath, branchName, updateBranch) => {
  console.log(`Creating release ${tagName}...`)

  const ref = isPR(branchName) ? await getRef({ octokit, owner, repo }, tagName) : headsify(branchName)

  let commit = await octokit.git.getRef({ owner, repo, ref }).then((result) => result.data.object.sha)

  const readmeContent = await fs
    .readFile('README.adoc', 'utf-8')
    .then((contents) => contents.replace(/^(?:\/\/)?(:current-release: ).+$/m, `$1${tagName}`))

  const readmeBlob = await octokit.git
    .createBlob({ owner, repo, content: readmeContent, encoding: 'utf-8' })
    .then((result) => result.data.sha)

  let tree = await octokit.git.getCommit({ owner, repo, commit_sha: commit }).then((result) => result.data.tree.sha)

  tree = await octokit.git
    .createTree({
      owner,
      repo,
      tree: [
        {
          path: 'README.adoc',
          mode: '100644',
          type: 'blob',
          sha: readmeBlob,
        },
      ],
      base_tree: tree,
    })
    .then((result) => result.data.sha)

  commit = await octokit.git
    .createCommit({
      owner,
      repo,
      message: `Release ${tagName}`,
      tree,
      parents: [commit],
    })
    .then((result) => result.data.sha)

  if (updateBranch) await octokit.git.updateRef({ owner, repo, ref, sha: commit })

  const release = await octokit.repos
    .createRelease({
      owner,
      repo,
      tag_name: tagName,
      target_commitish: commit,
      name: tagName,
      prerelease: branchName !== defaultBranch,
      body:
        branchName !== defaultBranch
          ? `#${getPullNumber(tagName)}`
          : `${await getLastClosedPRLink({ octokit, owner, repo })}`,
    })
    .then((result) => result.data)

  await uploadFile(octokit, release.upload_url, bundleFile, bundlePath)

  console.log(`Successfully created release ${tagName}.`)
}

const createSignature = async (commit, secretKey, passphrase) => {
  const decodedKey = await readPrivateKey({
    armoredKey: await base64decode(secretKey),
  })

  const decryptedKey = passphrase
    ? await decryptKey({
      privateKey: decodedKey,
      passphrase,
    })
    : decodedKey

  if (!decryptedKey.isDecrypted()) {
    throw new Error('Failed to decrypt private key using given passphrase')
  }

  const commitString = typeof commit === 'string' ? commit : await commitToString(commit)

  const signature = await sign({
    message: await createMessage({
      text: commitString,
    }),
    signingKeys: decryptedKey,
    detached: true,
  })

  return await normalizeString(signature)
}

const deleteFileIfExist = async ({ octokit, owner, repo }, release, fileName) => {
  const uiBundleAsset = await getAsset({ octokit, owner, repo }, release, fileName)
  if (uiBundleAsset) await octokit.rest.repos.deleteReleaseAsset({ owner, repo, asset_id: uiBundleAsset.id })
}

const getAsset = async ({ octokit, owner, repo }, release, fileName) => {
  const { data: assets } = await octokit.rest.repos.listReleaseAssets({ owner, repo, release_id: release.id })
  return assets.find((asset) => asset.name === fileName)
}

const getCurrentReleaseNumber = async ({ octokit, owner, repo }, variant) => {
  const release = await getLastReleaseThatStartsWith({ octokit, owner, repo }, `${variant}-`)
  if (release) return Number(release.name.slice(variant.length + 1))
  return 1
}

const getHeadRef = async ({ octokit, owner, repo }, pullNumber) => {
  const {
    data: {
      head: { ref: headBranch },
    },
  } = await octokit.rest.pulls.get({ owner, repo, pull_number: pullNumber })
  return headsify(headBranch)
}

const getLastReleaseThatStartsWith = async ({ octokit, owner, repo }, prefix) => {
  let release
  let page = 1
  do {
    const { data: releases } = await octokit.rest.repos.listReleases({
      owner,
      repo,
      per_page: 100,
      page,
    })
    release = releases.find((release) => release.name.startsWith(prefix))
    page++
  } while (!release && page <= 2) // Limit to 200 releases
  return release
}

const getLastClosedPRLink = async ({ octokit, owner, repo }) => {
  const { data: pulls } = await octokit.rest.pulls.list({ owner, repo, state: 'closed', per_page: 1 })
  if (pulls) return pulls[0].html_url
}

const getPullNumber = (prTagName) => prTagName.replace(/pr-/, '').trim()

const getRef = async (githubConfig, tagName) => {
  if (isPR(tagName)) {
    const pullNumber = getPullNumber(tagName)
    return await getHeadRef(githubConfig, pullNumber)
  } else {
    return headsify(tagName)
  }
}

const headsify = (branchName) => `heads/${branchName}`
const isPR = (branchName) => branchName.toLowerCase().startsWith('pr-')

const normalizeOffset = async (offset, offsetIsZero = true) => {
  if (offsetIsZero) return '+0000'

  return (
    (offset <= 0 ? '+' : '-') +
    pad(2, `${parseInt(String(Math.abs(offset / 60)), 10)}`, '0') +
    pad(2, `${Math.abs(offset % 60)}`, '0')
  )
}

const normalizeString = async (str) => str.replace(/\r\n/g, '\n').trim()

const releaseExists = async (githubConfig, tag) => (await getLastReleaseThatStartsWith(githubConfig, tag)) !== undefined

const setBranchName = async (gitBranch) => {
  let branchName = gitBranch || 'main'
  branchName = branchName.startsWith('origin/') ? branchName.substring(7) : branchName
  return branchName.toLowerCase()
}

const updateContent = async ({ octokit, owner, repo, ref, newBranchName, tagName, sites, secretKey, passphrase }) => {
  const {
    data: {
      object: { sha: latestCommitSha },
    },
  } = await octokit.git.getRef({
    owner,
    repo,
    ref: headsify(ref),
  })

  const {
    data: { sha: latestTreeSha },
  } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha,
  })

  const tree = []

  for (const site of sites) {
    const path = `${site}-playbook.yml`
    const {
      data: { content },
    } = await octokit.repos.getContent({ owner, repo, ref, path })
    const newContent = await updateUIBundleVer(content, tagName)
    const {
      data: { sha: newBlobSha },
    } = await octokit.git.createBlob({
      owner,
      repo,
      content: newContent,
    })

    tree.push({
      path,
      mode: '100644',
      type: 'blob',
      sha: newBlobSha,
    })
  }

  const {
    data: { sha: newTreeSha },
  } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: latestTreeSha,
    tree,
  })

  const commitPayload = {
    message: tagName,
    tree: newTreeSha,
    parents: [latestCommitSha],
    author: {
      name: 'SVC_mes-bot',
      email: 'SVC_mes-bot@salesforce.com',
      date: new Date().toISOString(),
    },
  }

  const signature = await createSignature(commitPayload, secretKey, passphrase)
  const commit = await octokit.git.createCommit(Object.assign({}, { owner, repo, signature }, commitPayload))

  await octokit.git.updateRef({
    owner,
    repo,
    ref: headsify(newBranchName),
    sha: commit.data.sha,
  })
}

const updateRelease = async ({ octokit, owner, repo }, tag, bundleFile, bundlePath) => {
  console.log(`Replacing ${bundleFile} in release ${tag}...`)

  const { data: release } = await octokit.rest.repos.getReleaseByTag({ owner, repo, tag })
  await deleteFileIfExist({ octokit, owner, repo }, release, bundleFile)
  await uploadFile(octokit, release.upload_url, bundleFile, bundlePath)
  console.log(`Successfully replaced ${bundleFile} in release ${tag}.`)
}

const updateUIBundleVer = async (content, tagName) => {
  const contentStr = Buffer.from(content, 'base64').toString('utf8')
  return contentStr.replace(/\/prod-.+?\//, `/${tagName}/`)
}

const uploadFile = async (octokit, url, fileName, filePath) => {
  await octokit.repos.uploadReleaseAsset({
    url,
    data: fs.createReadStream(filePath),
    name: fileName,
    headers: {
      'content-length': (await fs.stat(filePath)).size,
      'content-type': 'application/zip',
    },
  })
}

const userToString = async (user) => {
  const date = new Date(user.date)
  const timestamp = Math.floor(date.getTime() / 1000)
  const timezone = await normalizeOffset(date.getTimezoneOffset())

  return `${user.name} <${user.email}> ${timestamp} ${timezone}`
}

const versionBundle = async (bundleFile, tagName) => {
  vfs
    .src(bundleFile)
    .pipe(zip.src())
    .pipe(
      map(
        (file, _enc, next) => next(null, file),
        function (done) {
          this.push(
            new File({
              path: 'ui.yml',
              contents: Buffer.from(`version: ${tagName}\n`),
            })
          )
          done()
        }
      )
    )
    .pipe(zip.dest(bundleFile))
}

module.exports = (dest, bundleName, owner, repo, token, tokenEmu, secretKey, passphrase, updateBranch) => async () => {
  console.log('secret key', secretKey);
  const octokit = new Octokit({ auth: `token ${token}` })
  const githubConfig = { octokit, owner, repo }

  bundleName = `${bundleName}-bundle.zip`
  const bundlePath = path.join(dest, bundleName)
  await versionBundle(bundlePath)

  const branchName = await setBranchName(process.env.GIT_BRANCH)
  const variant = branchName === defaultBranch ? 'prod' : branchName
  const isProd = variant === 'prod'
  const tagName = isProd ? `${variant}-${(await getCurrentReleaseNumber(githubConfig, variant)) + 1}` : branchName

  if (isProd) {
    await createRelease(githubConfig, tagName, bundleName, bundlePath, branchName, updateBranch)
    await updateRelease(githubConfig, 'latest', bundleName, bundlePath)
    if (secretKey) {
      await createPR({
        octokit: new Octokit({ auth: `token ${tokenEmu}` }),
        owner: 'mulesoft-emu',
        repo: 'docs-site-playbook',
        tagName,
        ref: defaultBranch,
        sites: ['archive', 'en', 'jp'],
        secretKey,
        passphrase,
      })
    } else {
      console.log('Secret key is not found, skipping PRs creation in the playbook repo.')
    }
  } else if (isPR(branchName)) {
    ;(await releaseExists(githubConfig, tagName))
      ? await updateRelease(githubConfig, tagName, bundleName, bundlePath)
      : await createRelease(githubConfig, tagName, bundleName, bundlePath, branchName, updateBranch)
  } else {
    console.log('Git branch is not prod and not PR, skipping.')
  }
}
