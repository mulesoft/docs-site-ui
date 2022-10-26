module.exports = (numOfItems, { data }) => {
  const { contentCatalog, site } = data.root
  if (contentCatalog) {
    const rawPages =
      getDatedReleaseNotesRawPages(contentCatalog)
    const pageUiModels = turnRawPagesIntoPageUiModels(
      site,
      rawPages,
      contentCatalog
    )
    return getMostRecentlyUpdatedPages(
      pageUiModels,
      numOfItems
    )
  }
}

function getDatedReleaseNotesRawPages (contentCatalog) {
  return contentCatalog.getPages(({ asciidoc, out }) => {
    if (!asciidoc || !out) return
    return getReleaseNotesWithRevdate(asciidoc)
  })
}

function getReleaseNotesWithRevdate (asciidoc) {
  const attributes = asciidoc.attributes
  return (
    asciidoc.attributes &&
    isReleaseNotes(attributes) &&
    hasRevDate(attributes)
  )
}

function isReleaseNotes (attributes) {
  return (
    attributes['page-component-name'] === 'release-notes'
  )
}

function hasRevDate (attributes) {
  return attributes['page-revdate']
}

function turnRawPagesIntoPageUiModels (
  site,
  pages,
  contentCatalog
) {
  const { buildPageUiModel } = module.parent.require(
    '@antora/page-composer/build-ui-model'
  )
  return pages
    .map((page) =>
      buildPageUiModel(site, page, contentCatalog)
    )
    .filter((page) => isValidDate(page.attributes?.revdate))
    .sort(sortByRevDate)
}

function isValidDate (dateStr) {
  const dateObj = Date.parse(dateStr)
  return !isNaN(dateObj)
}

function sortByRevDate (a, b) {
  return (
    new Date(b.attributes.revdate) -
    new Date(a.attributes.revdate)
  )
}

function getMostRecentlyUpdatedPages (
  pageUIModels,
  numOfItems
) {
  const maxNumberOfPages =
    pageUIModels.length > numOfItems
      ? numOfItems
      : pageUIModels.length
  const resultList = getResultList(
    pageUIModels,
    maxNumberOfPages
  )
  return resultList
}

function getResultList (pageUIModels, maxNumberOfPages) {
  const resultList = []
  for (let i = 0; i < maxNumberOfPages; i++) {
    const page = pageUIModels[i]
    if (page.attributes?.revdate) {
      resultList.push(getSelectedAttributes(page))
    }
  }
  return resultList
}

function getSelectedAttributes (page) {
  const latestVersion = getLatestVersion(
    page.contents.toString()
  )
  return {
    latestVersionAnchor: latestVersion?.anchor,
    latestVersionName: latestVersion?.innerText,
    revdateWithoutYear: removeYear(
      page.attributes?.revdate
    ),
    title: cleanTitle(page.title),
    url: page.url,
  }
}

function getLatestVersion (contentsStr) {
  const nodes = parseHTML(contentsStr)
  const firstVersion = nodes.querySelector('h2')
  if (firstVersion) {
    return {
      anchor: firstVersion.id,
      innerText: firstVersion.innerText,
    }
  }
}

function parseHTML (html) {
  const { parse } = require('node-html-parser')
  return parse(html)
}

function removeYear (dateStr) {
  const dateObj = new Date(dateStr)
  return `${dateObj.toLocaleString('default', {
    month: 'short',
  })} ${dateObj.getDate()}`
}

function cleanTitle (title) {
  const splitList = title.split('Release Notes')
  return splitList[0].trim()
}
