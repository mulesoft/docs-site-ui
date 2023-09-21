const maxNumofItems = 10
const components = ['composer', 'release-notes', 'docs-code-builder']

const getDatedReleaseNotesRawPages = (contentCatalog) => {
  return contentCatalog.getPages(({ asciidoc, out }) => {
    if (asciidoc && out) return getPagesWithDeploymentOptions(asciidoc)
  })
}

const getPagesWithDeploymentOptions = (asciidoc) => {
  const attributes = asciidoc.attributes
  return asciidoc.attributes && isReleaseNotes(attributes) && hasRevDate(attributes)
}

const hasRevDate = (attributes) => attributes['page-revdate']
const isReleaseNotes = (attributes) => components.includes(attributes['page-component-name'])
const isValidDate = (dateStr) => !isNaN(Date.parse(dateStr))

const turnRawPagesIntoPageUiModels = (site, pages, contentCatalog) => {
  const { buildPageUiModel } = module.parent.require('@antora/page-composer/build-ui-model')
  return pages
    .map((page) => buildPageUiModel(site, page, contentCatalog))
    .filter((page) => isValidDate(page.attributes?.revdate))
    .sort(sortByRevDate)
}

const sortByRevDate = (a, b) => new Date(b.attributes.revdate) - new Date(a.attributes.revdate)

const getMostRecentlyUpdatedPages = (pageUIModels, numOfItems) => {
  const maxNumberOfPages = pageUIModels.length > numOfItems ? numOfItems : pageUIModels.length
  const resultList = getResultList(pageUIModels, maxNumberOfPages)
  return resultList
}

const getResultList = (pageUIModels, maxNumberOfPages) => {
  const resultList = []
  for (let i = 0; i < maxNumberOfPages; i++) {
    const page = pageUIModels[i]
    if (page.attributes?.revdate && page.title) resultList.push(getSelectedAttributes(page))
  }
  return resultList
}

const getSelectedAttributes = (page) => {
  const latestVersion = getLatestVersion(page.contents.toString())
  return {
    latestVersionAnchor: latestVersion?.anchor,
    latestVersionName: latestVersion?.innerText,
    revdateWithoutYear: removeYear(page.attributes?.revdate),
    title: cleanTitle(page.title, latestVersion?.innerText),
    url: page.url,
  }
}

const getLatestVersion = (contentsStr) => {
  const nodes = parseHTML(contentsStr)
  const firstVersion = nodes.querySelector('h2')
  if (firstVersion) {
    const output = { anchor: firstVersion.id }
    if (isVersion(firstVersion.innerText)) output.innerText = firstVersion.innerText
    return output
  }
}

const parseHTML = (html) => {
  const { parse } = require('node-html-parser')
  return parse(html)
}

const isVersion = (versionText) => {
  /* eslint-disable max-len */
  // https://confluence.internal.salesforce.com/pages/viewpage.action?spaceKey=MTDT&title=Use+the+Release+Notes+Templates
  // examples: 1.0, 1.0.0, 2.11, 11.0, 4.x, 2.11.x
  /* eslint-enable max-len */
  return versionText.search('^([0-9])+.([0-9a-z])+(.[0-9])*$') > -1
}

const removeYear = (dateStr) => {
  if (isValidDate(dateStr)) {
    const dateObj = new Date(dateStr)
    return `${dateObj.toLocaleString('default', {
      month: 'short',
    })} ${dateObj.getDate()}`
  }
}

const cleanTitle = (title, version) => {
  if (title) {
    title = title.replace(/(Release Notes.*$)/, '').trim()
    if (version) {
      title = title.replace(/(([0-9])+.([0-9a-z])+(.[0-9a-z])?$)/, '').trim()
    }
  }
  return title
}

module.exports = (numOfItems, { data }) => {
  const { contentCatalog, site } = data.root
  if (contentCatalog) {
    const rawPages = getDatedReleaseNotesRawPages(contentCatalog)
    const pageUiModels = turnRawPagesIntoPageUiModels(site, rawPages, contentCatalog)
    const actualNumOfItems = numOfItems && numOfItems <= maxNumofItems ? numOfItems : maxNumofItems
    return getMostRecentlyUpdatedPages(pageUiModels, actualNumOfItems)
  }
}
