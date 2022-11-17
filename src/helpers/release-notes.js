const getDatedReleaseNotesRawPages = (contentCatalog) => {
  return contentCatalog.getPages(({ asciidoc, out }) => {
    if (!asciidoc || !out) return
    return getReleaseNotesWithRevdate(asciidoc)
  })
}

const getReleaseNotesWithRevdate = (asciidoc) => {
  const attributes = asciidoc.attributes
  return asciidoc.attributes && isReleaseNotes(attributes) && hasRevDate(attributes)
}

const isReleaseNotes = (attributes) => {
  return attributes['page-component-name'] === 'release-notes'
}

const hasRevDate = (attributes) => {
  return attributes['page-revdate']
}

const turnRawPagesIntoPageUiModels = (site, pages, contentCatalog) => {
  const { buildPageUiModel } = module.parent.require('@antora/page-composer/build-ui-model')
  return pages
    .map((page) => buildPageUiModel(site, page, contentCatalog))
    .filter((page) => isValidDate(page.attributes?.revdate))
    .sort(sortByRevDate)
}

const isValidDate = (dateStr) => {
  const dateObj = Date.parse(dateStr)
  return !isNaN(dateObj)
}

const sortByRevDate = (a, b) => {
  return new Date(b.attributes.revdate) - new Date(a.attributes.revdate)
}

const getMostRecentlyUpdatedPages = (pageUIModels, numOfItems) => {
  const maxNumberOfPages = pageUIModels.length > numOfItems ? numOfItems : pageUIModels.length
  const resultList = getResultList(pageUIModels, maxNumberOfPages)
  return resultList
}

const getResultList = (pageUIModels, maxNumberOfPages) => {
  const resultList = []
  for (let i = 0; i < maxNumberOfPages; i++) {
    const page = pageUIModels[i]
    if (page.attributes?.revdate) {
      resultList.push(getSelectedAttributes(page))
    }
  }
  return resultList
}

const getSelectedAttributes = (page) => {
  const latestVersion = getLatestVersion(page.contents.toString())
  return {
    latestVersionAnchor: latestVersion?.anchor,
    latestVersionName: latestVersion?.innerText,
    revdateWithoutYear: removeYear(page.attributes?.revdate),
    title: cleanTitle(page.title),
    url: page.url,
  }
}

const getLatestVersion = (contentsStr) => {
  const nodes = parseHTML(contentsStr)
  const firstVersion = nodes.querySelector('h2')
  if (firstVersion) {
    const output = {
      anchor: firstVersion.id,
    }
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

const cleanTitle = (title) => {
  const splitList = title.split('Release Notes')
  return splitList[0].trim()
}

module.exports = (numOfItems, { data }) => {
  const { contentCatalog, site } = data.root
  if (contentCatalog) {
    const rawPages = getDatedReleaseNotesRawPages(contentCatalog)
    const pageUiModels = turnRawPagesIntoPageUiModels(site, rawPages, contentCatalog)
    return getMostRecentlyUpdatedPages(pageUiModels, numOfItems)
  }
}
