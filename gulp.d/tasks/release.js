'use strict'

const File = require('vinyl')
const fs = require('fs-extra')
const { obj: map } = require('through2')
const { Octokit } = require('@octokit/rest')
const path = require('path')
const vfs = require('vinyl-fs')
const zip = require('gulp-vinyl-zip')

class GitHub {
  constructor ({ dest, bundleName, owner, repo, token, updateBranch }) {
    this.dest = dest
    this.bundleFileBasename = `${bundleName}-bundle.zip`
    this.owner = owner
    this.repo = repo
    this.octokit = new Octokit({ auth: `token ${token}` })
    this.updateBranch = updateBranch
  }

  async setUp () {
    this.branchName = await this.setBranchName()
    this.ref = `heads/${this.branchName}`

    this.variant = this.branchName === 'master' ? 'prod' : this.branchName
    this.tagName = `${this.variant}-${await this.getCurrentReleaseNumber() + 1}`

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
      }).then((result) => result.data)

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
    await this.createNewBranch({ repo, ref, newBranchName: this.tagName })
    await this.updateContent({ repo, ref, filePath })
    await this.octokit.pulls.create({
      owner: this.owner,
      repo: repo,
      title: this.tagName,
      head: this.tagName,
      base: ref,
      body: `ref: ${await this.getLastPRLink()}`,
    })
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

  async updateContent ({ repo, ref, filePath }) {
    // Get the current contents of the file
    const {
      data: { content, sha },
    } = await this.octokit.repos.getContent({
      owner: this.owner,
      repo,
      ref,
      path: filePath,
    })

    const newContent = await this.updateUIBundleVer(content)

    // Update the file in the repository
    await this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo,
      path: filePath,
      message: this.tagName,
      content: newContent,
      sha,
      branch: this.tagName,
      // hardcoding these required fields for now
      'committer.name': 'mulesoft-es-automation',
      'committer.email': 'mulesoft-es-automation@mulesoft.com',
      'author.name': 'mulesoft-es-automation',
      'author.email': 'mulesoft-es-automation@mulesoft.com',
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
    let contentStr = Buffer.from(content, 'base64').toString('utf8')
    contentStr = contentStr.replace(/\/prod-.+?\//, `/${this.tagName}/`)
    return Buffer.from(contentStr).toString('base64')
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

module.exports = (dest, bundleName, owner, repo, token, updateBranch) => async () => {
  const gitHub = new GitHub({ dest, bundleName, owner, repo, token, updateBranch })
  await gitHub.setUp()
  await gitHub.createNextRelease()
  if (gitHub.variant === 'prod') {
    await gitHub.updateLatestRelease()
  }
  // if (gitHub.variant === 'prod') {
  //   await gitHub.createPR({
  //     repo: 'docs-site-playbook',
  //     ref: 'master',
  //     filePath: 'antora-playbook.yml',
  //   })
  //   // TODO: add more createPR for other branches, like archive, jp, maybe even (need refactoring) beta and internal
  // }
}
