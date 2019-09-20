'use strict'

const File = require('vinyl')
const fs = require('fs-extra')
const { obj: map } = require('through2')
const Octokit = require('@octokit/rest')
const path = require('path')
const zip = require('gulp-vinyl-zip')

function getNextReleaseNumber ({ octokit, owner, repo, variant }) {
  const prefix = `${variant}-`
  const filter = (entry) => entry.name.startsWith(prefix)
  return collectReleases({ octokit, owner, repo, filter }).then((releases) => {
    if (releases.length) {
      releases.sort((a, b) => -1 * a.name.localeCompare(b.name, 'en', { numeric: true }))
      const latestName = releases[0].name
      return Number(latestName.slice(prefix.length)) + 1
    } else {
      return 1
    }
  })
}

function collectReleases ({ octokit, owner, repo, filter, page = 1, accum = [] }) {
  return octokit.repos.listReleases({ owner, repo, page, per_page: 100 }).then((result) => {
    const releases = result.data.filter(filter)
    const links = result.headers.link
    if (links && links.includes('; rel="next"')) {
      return collectReleases({ octokit, owner, repo, filter, page: page + 1, accum: accum.concat(releases) })
    } else {
      return accum.concat(releases)
    }
  })
}

function versionBundle (bundleFile, tagName) {
  return new Promise((resolve, reject) =>
    zip.src(bundleFile)
      .on('error', reject)
      .pipe((() => {
        const meta = new File({ path: 'ui.yml', contents: Buffer.from(`version: ${tagName}\n`) })
        const stream = map((file, _, next) => file.path === meta.path && file !== meta ? next() : next(null, file))
        stream.write(meta)
        return stream
      })())
      .pipe(zip.dest(bundleFile))
      .on('finish', () => resolve(bundleFile))
  )
}

module.exports = (dest, bundleName, owner, repo, token, updateBranch) => async () => {
  const octokit = new Octokit({ auth: `token ${token}` })
  const branchName = process.env.GIT_BRANCH || 'master'
  const variant = branchName === 'master' ? 'prod' : branchName
  const ref = `heads/${branchName}`
  const tagName = `${variant}-${await getNextReleaseNumber({ octokit, owner, repo, variant })}`
  const message = `Release ${tagName}`
  const bundleFileBasename = `${bundleName}-bundle.zip`
  const bundleFile = versionBundle(path.join(dest, bundleFileBasename), tagName)
  let commit = await octokit.gitdata.getRef({ owner, repo, ref }).then((result) => result.data.object.sha)
  const readmeContent = await fs
    .readFile('README.adoc', 'utf-8')
    .then((contents) => contents.replace(/^(?:\/\/)?(:current-release: ).+$/m, `$1${tagName}`))
  const readmeBlob = await octokit.gitdata
    .createBlob({ owner, repo, content: readmeContent, encoding: 'utf-8' })
    .then((result) => result.data.sha)
  let tree = await octokit.gitdata
    .getCommit({ owner, repo, commit_sha: commit })
    .then((result) => result.data.tree.sha)
  tree = await octokit.gitdata
    .createTree({
      owner,
      repo,
      tree: [{ path: 'README.adoc', mode: '100644', type: 'blob', sha: readmeBlob }],
      base_tree: tree,
    })
    .then((result) => result.data.sha)
  commit = await octokit.gitdata
    .createCommit({ owner, repo, message, tree, parents: [commit] })
    .then((result) => result.data.sha)
  if (updateBranch) await octokit.gitdata.updateRef({ owner, repo, ref, sha: commit })
  const uploadUrl = await octokit.repos
    .createRelease({
      owner,
      repo,
      tag_name: tagName,
      target_commitish: commit,
      name: tagName,
    })
    .then((result) => result.data.upload_url)
  await octokit.repos.uploadReleaseAsset({
    url: uploadUrl,
    file: fs.createReadStream(bundleFile),
    name: bundleFileBasename,
    headers: {
      'content-length': (await fs.stat(bundleFile)).size,
      'content-type': 'application/zip',
    },
  })
}
