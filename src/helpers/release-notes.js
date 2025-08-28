const maxNumofItems = 10
const components = ['composer', 'release-notes']

const duplicateMap = []

const versionRegex = /([0-9])+\.([0-9a-z]{1,3})+(\.[0-9a-z]{1,3})*$/

const getDatedReleaseNotesRawPages = (contentCatalog) => {
  return contentCatalog.getPages(({ asciidoc, out }) => {
    if (asciidoc && out) return getPagesWithDeploymentOptions(asciidoc)
  })
}

const getPagesWithDeploymentOptions = (asciidoc) => {
  const { attributes } = asciidoc
  return attributes && isReleaseNotes(attributes) && hasRevDate(attributes)
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
  return getResultList(pageUIModels, maxNumberOfPages)
}

const getResultList = (pageUIModels, maxNumberOfPages) => {
  const resultList = []
  for (let i = 0; i < maxNumberOfPages; i++) {
    const page = pageUIModels[i]
    if (page.attributes?.revdate && page.title) {
      const revDateTitle = page.attributes.revdate + page.title
      if (!(revDateTitle in duplicateMap)) {
        duplicateMap[revDateTitle] = true
        resultList.push(getSelectedAttributes(page))
      }
    }
  }
  return resultList
}

const getSelectedAttributes = (page) => {
  const latestVersion = getLatestVersion(page.contents.toString(), page.attributes?.revdate)
  return {
    latestVersionAnchor: latestVersion?.anchor,
    latestVersionName: latestVersion?.innerText,
    revdateWithoutYear: removeYear(latestVersion?.releaseDate || page.attributes?.revdate),
    title: cleanTitle(page.title, latestVersion?.innerText),
    url: page.url,
  }
}

const getLatestVersion = (contentsStr, pageRevDate) => {
  const nodes = parseHTML(contentsStr)
  const versionHeaders = nodes.querySelectorAll('h2')

  if (!versionHeaders || versionHeaders.length === 0) return null

  // First, try to find a version with a matching release date
  for (let i = 0; i < versionHeaders.length; i++) {
    const header = versionHeaders[i]
    if (isVersion(header.innerText)) {
      // Look for a release date in the next sibling elements
      const releaseDate = findReleaseDateForVersion(header)
      if (releaseDate && datesMatch(releaseDate, pageRevDate)) {
        return {
          anchor: header.id,
          innerText: header.innerText,
          releaseDate,
        }
      }
    }
  }

  // Fallback: return the first version if no date match found
  const firstVersion = versionHeaders[0]
  if (isVersion(firstVersion.innerText)) {
    return {
      anchor: firstVersion.id,
      innerText: firstVersion.innerText,
      releaseDate: null,
    }
  }

  return null
}

const findReleaseDateForVersion = (versionHeader) => {
  // Look for release date in the next few sibling elements
  let currentElement = versionHeader.nextElementSibling

  // Search through next few elements for a date
  for (let i = 0; i < 5 && currentElement; i++) {
    if (currentElement.tagName === 'P' || currentElement.tagName === 'DIV') {
      const text = currentElement.innerText || currentElement.text
      const dateMatch = text.match(/(\w+\s+\d{1,2},?\s+\d{4})|(\d{1,2}\/\d{1,2}\/\d{4})|(\d{4}-\d{2}-\d{2})/)
      if (dateMatch) {
        return dateMatch[0]
      }
    }
    currentElement = currentElement.nextElementSibling
  }

  return null
}

const datesMatch = (date1, date2) => {
  if (!date1 || !date2) return false

  try {
    const parsedDate1 = new Date(date1)
    const parsedDate2 = new Date(date2)

    // Compare dates ignoring time
    return (
      parsedDate1.getFullYear() === parsedDate2.getFullYear() &&
      parsedDate1.getMonth() === parsedDate2.getMonth() &&
      parsedDate1.getDate() === parsedDate2.getDate()
    )
  } catch (e) {
    return false
  }
}

const parseHTML = (html) => {
  const { parse } = require('node-html-parser')
  return parse(html)
}

const isVersion = (versionText) => {
  /* eslint-disable max-len */
  // https://confluence.internal.salesforce.com/pages/viewpage.action?spaceKey=MTDT&title=Use+the+Release+Notes+Templates
  // examples: 1.0, 1.0.0, 2.11, 11.0, 4.x, 2.11.x, 2.4.30
  /* eslint-enable max-len */
  return versionText.search(versionRegex) > -1
}

const removeYear = (dateStr) => {
  if (isValidDate(dateStr)) {
    const dateObj = new Date(dateStr)
    return `${dateObj.toLocaleString('en-US', { month: 'short' })} ${dateObj.getDate()}`
  }
}

const cleanTitle = (title, version) => {
  if (!title) return ''

  const cleanedTitle = title.replace(/(Release Notes.*$)/i, '').trim()

  return version ? cleanedTitle.replace(versionRegex, '').trim() : cleanedTitle
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
