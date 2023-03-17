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

class GitHub {
  constructor ({ dest, bundleName, owner, repo, token, secretKey, passphrase, updateBranch }) {
    this.dest = dest
    this.bundleFileBasename = `${bundleName}-bundle.zip`
    this.owner = owner
    this.repo = repo
    this.octokit = new Octokit({ auth: `token ${token}` })
    this.secretKey = secretKey
    this.passphrase = passphrase
    this.updateBranch = updateBranch
  }

  async setUp () {
    this.branchName = await this.setBranchName()
    this.ref = `heads/${this.branchName}`

    this.variant = this.branchName === 'master' ? 'prod' : this.branchName
    this.tagName = `${this.variant}-${(await this.getCurrentReleaseNumber()) + 1}`

    this.latestRelease = await this.getLastReleaseThatStartsWith('latest')
  }

  async branchAlreadyExists ({ repo, branchName }) {
    try {
      await this.octokit.rest.git.getRef({
        owner: this.owner,
        repo,
        ref: `heads/${branchName}`,
      })
      return true
    } catch (e) {
      return false
    }
  }

  async createNewBranch ({ repo, ref, newBranchName }) {
    if (!(await this.branchAlreadyExists({ repo, branchName: newBranchName }))) {
      const { data: baseRefData } = await this.octokit.rest.git.getRef({
        owner: this.owner,
        repo,
        ref: `heads/${ref}`,
      })

      await this.octokit.rest.git.createRef({
        owner: this.owner,
        repo,
        ref: `refs/heads/${newBranchName}`,
        sha: baseRefData.object.sha,
      })
    }
  }

  async createNextRelease () {
    await this.versionBundle()

    let commit = await this.octokit.git
      .getRef({
        owner: this.owner,
        repo: this.repo,
        ref: this.ref,
      })
      .then((result) => result.data.object.sha)

    const readmeContent = await fs
      .readFile('README.adoc', 'utf-8')
      .then((contents) => contents.replace(/^(?:\/\/)?(:current-release: ).+$/m, `$1${this.tagName}`))
    const readmeBlob = await this.octokit.git
      .createBlob({
        owner: this.owner,
        repo: this.repo,
        content: readmeContent,
        encoding: 'utf-8',
      })
      .then((result) => result.data.sha)

    let tree = await this.octokit.git
      .getCommit({
        owner: this.owner,
        repo: this.repo,
        commit_sha: commit,
      })
      .then((result) => result.data.tree.sha)

    tree = await this.octokit.git
      .createTree({
        owner: this.owner,
        repo: this.repo,
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

    commit = await this.octokit.git
      .createCommit({
        owner: this.owner,
        repo: this.repo,
        message: `Release ${this.tagName}`,
        tree,
        parents: [commit],
      })
      .then((result) => result.data.sha)

    if (this.updateBranch) {
      await this.octokit.git.updateRef({
        owner: this.owner,
        repo: this.repo,
        ref: this.ref,
        sha: commit,
      })
    }

    this.release = await this.octokit.repos
      .createRelease({
        owner: this.owner,
        repo: this.repo,
        tag_name: this.tagName,
        target_commitish: commit,
        name: this.tagName,
      })
      .then((result) => result.data)

    await this.octokit.repos.uploadReleaseAsset({
      url: this.release.upload_url,
      data: fs.createReadStream(this.bundleFile),
      name: this.bundleFileBasename,
      headers: {
        'content-length': (await fs.stat(this.bundleFile)).size,
        'content-type': 'application/zip',
      },
    })
  }

  async createPR ({ repo, ref, filePath }) {
    const newBranchName = `${this.tagName}-for-${ref}`
    await this.createNewBranch({ repo, ref, newBranchName })
    await this.updateContent({ repo, ref, newBranchName, filePath })
    await this.octokit.pulls.create({
      owner: this.owner,
      repo: repo,
      title: `${this.tagName} for ${ref}`,
      head: newBranchName,
      base: ref,
      body: `ref: ${await this.getLastPRLink()}`,
    })
  }

  async createSignature (commit, passphrase) {
    const decodedKey = await readPrivateKey({
      armoredKey: this.secretKey,
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

  async deleteUIBundleZipFileIfExist () {
    const uiBundleAsset = await this.getAsset(this.latestRelease, 'ui-bundle.zip')

    if (uiBundleAsset) {
      await this.octokit.rest.repos.deleteReleaseAsset({
        owner: this.owner,
        repo: this.repo,
        asset_id: uiBundleAsset.id,
      })
    }
  }

  async getAsset (release, fileName) {
    const { data: assets } = await this.octokit.rest.repos.listReleaseAssets({
      owner: this.owner,
      repo: this.repo,
      release_id: release.id,
    })

    return assets.find((asset) => asset.name === fileName)
  }

  async getCurrentReleaseNumber () {
    const release = await this.getLastProdRelease()
    return Number(release.name.slice(this.variant.length + 1))
  }

  async getLastReleaseThatStartsWith (prefix) {
    let release
    let page = 1
    do {
      const { data: releases } = await this.octokit.rest.repos.listReleases({
        owner: this.owner,
        repo: this.repo,
        per_page: 100,
        page,
      })
      release = releases.find((release) => release.name.startsWith(prefix))
      page++
    } while (!release && page <= 10) // Limit to 1000 releases
    return release
  }

  async getLastProdRelease () {
    return await this.getLastReleaseThatStartsWith('prod-')
  }

  async getLastPRLink () {
    const { data: pulls } = await this.octokit.rest.pulls.list({
      owner: this.owner,
      repo: this.repo,
      state: 'closed',
      per_page: 1,
    })

    if (pulls) {
      return pulls[0].html_url
    }
  }

  async setBranchName () {
    let branchName = process.env.GIT_BRANCH || 'master'
    if (branchName.startsWith('origin/')) {
      branchName = this.branchName.substring(7)
    }

    return branchName
  }

  async updateContent ({ repo, ref, newBranchName, filePath }) {
    // Get the current contents of the file
    const {
      data: { content },
    } = await this.octokit.repos.getContent({
      owner: this.owner,
      repo,
      ref,
      path: filePath,
    })

    const newContent = await this.updateUIBundleVer(content)

    const {
      data: {
        object: { sha: latestCommitSha },
      },
    } = await this.octokit.git.getRef({
      owner: this.owner,
      repo,
      ref: `heads/${ref}`,
    })

    const {
      data: { sha: latestTreeSha },
    } = await this.octokit.git.getCommit({
      owner: this.owner,
      repo,
      commit_sha: latestCommitSha,
    })

    const {
      data: { sha: newBlobSha },
    } = await this.octokit.git.createBlob({
      owner: this.owner,
      repo,
      content: newContent,
    })

    const {
      data: { sha: newTreeSha },
    } = await this.octokit.git.createTree({
      owner: this.owner,
      repo,
      base_tree: latestTreeSha,
      tree: [
        {
          path: filePath,
          mode: '100644',
          type: 'blob',
          sha: newBlobSha,
        },
      ],
    })

    const commitPayload = {
      message: this.tagName,
      tree: newTreeSha,
      parents: [latestCommitSha],
      author: {
        name: 'ms_cx_engineering (mule docs agent)',
        email: 'ms_cx_engineering@mulesoft.com',
        date: new Date().toISOString(),
      },
    }

    const signature = await this.createSignature(commitPayload)
    const commit = await this.octokit.git.createCommit(
      Object.assign({}, { owner: this.owner, repo, signature }, commitPayload)
    )

    await this.octokit.git.updateRef({
      owner: this.owner,
      repo,
      ref: `heads/${newBranchName}`,
      sha: commit.data.sha,
    })
  }

  async updateLatestRelease () {
    await this.deleteUIBundleZipFileIfExist()
    await this.octokit.repos.uploadReleaseAsset({
      url: this.latestRelease.upload_url,
      data: fs.createReadStream(this.bundleFile),
      name: this.bundleFileBasename,
      headers: {
        'content-length': (await fs.stat(this.bundleFile)).size,
        'content-type': 'application/zip',
      },
    })
  }

  async updateUIBundleVer (content) {
    const contentStr = Buffer.from(content, 'base64').toString('utf8')
    return contentStr.replace(/\/prod-.+?\//, `/${this.tagName}/`)
  }

  async versionBundle () {
    this.bundleFile = path.join(this.dest, this.bundleFileBasename)
    return new Promise((resolve, reject) =>
      vfs
        .src(this.bundleFile)
        .pipe(zip.src().on('error', reject))
        .pipe(
          map(
            (file, _enc, next) => next(null, file),
            function (done) {
              this.push(
                new File({
                  path: 'ui.yml',
                  contents: Buffer.from(`version: ${this.tagName}\n`),
                })
              )
              done()
            }
          )
        )
        .pipe(zip.dest(this.bundleFile))
        .on('finish', () => resolve(this.bundleFile))
    )
  }
}

async function commitToString ({ message, tree, parents, author, committer = author }) {
  // the blank line between committer and message is intentional, if removed, the signature will be invalid
  return `
tree ${tree}
${parents.map((parent) => `parent ${parent}`).join('\n')}
author ${await userToString(author)}
committer ${await userToString(committer)}

${message}`.trim()
}

async function normalizeOffset (offset, offsetIsZero = true) {
  if (offsetIsZero) return '+0000'

  return (
    (offset <= 0 ? '+' : '-') +
    pad(2, `${parseInt(String(Math.abs(offset / 60)), 10)}`, '0') +
    pad(2, `${Math.abs(offset % 60)}`, '0')
  )
}

async function normalizeString (str) {
  return str.replace(/\r\n/g, '\n').trim()
}

async function userToString (user) {
  const date = new Date(user.date)
  const timestamp = Math.floor(date.getTime() / 1000)
  const timezone = await normalizeOffset(date.getTimezoneOffset())

  return `${user.name} <${user.email}> ${timestamp} ${timezone}`
}

module.exports = (dest, bundleName, owner, repo, token, secretKey, passphrase, updateBranch) => async () => {
  const gitHub = new GitHub({ dest, bundleName, owner, repo, token, secretKey, passphrase, updateBranch })
  await gitHub.setUp()
  await gitHub.createNextRelease()
  if (gitHub.variant === 'prod') {
    await gitHub.updateLatestRelease()

    const baseBranches = ['archive', 'jp', 'master']
    for (const ref of baseBranches) {
      await gitHub.createPR({
        filePath: 'antora-playbook.yml',
        repo: 'docs-site-playbook',
        ref,
      })
    }
  }
}
