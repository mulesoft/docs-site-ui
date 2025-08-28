'use strict'

const File = require('vinyl')
const { obj: map } = require('through2')
const { Octokit } = require('@octokit/rest')
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


const headsify = (branchName) => `heads/${branchName}`

const normalizeOffset = async () => '+0000'

const normalizeString = async (str) => str.replace(/\r\n/g, '\n').trim()


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


const updateUIBundleVer = async (content, tagName) => {
  const contentStr = Buffer.from(content, 'base64').toString('utf8')
  return contentStr.replace(/\/prod-.+?\//, `/${tagName}/`)
}


const userToString = async (user) => {
  const date = new Date(user.date)
  const timestamp = Math.floor(date.getTime() / 1000)
  const timezone = await normalizeOffset()

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

module.exports = (dest, bundleName, tagName, tokenEmu, secretKey, passphrase) => async () => {
  bundleName = `${bundleName}-bundle.zip`
  const bundlePath = path.join(dest, bundleName)
  await versionBundle(bundlePath)

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
}
