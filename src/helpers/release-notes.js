module.exports = (numOfItems, { data }) => {
  const { contentCatalog, site } = data.root
  if (contentCatalog) {
    const pages = contentCatalog.getPages(
      ({ asciidoc, out }) => {
        if (!out || !asciidoc) return
        return isReleaseNotesWithRevdate(asciidoc)
      }
    )
    const { buildPageUiModel } = module.parent.require(
      '@antora/page-composer/build-ui-model'
    )
    const pagesUIModel = pages
      .map((page) =>
        buildPageUiModel(site, page, contentCatalog)
      )
      .filter((page) =>
        isValidDate(page.attributes?.revdate)
      )
      .sort(byDate)
    return getMostRecentlyUpdatedPages(
      pagesUIModel,
      numOfItems
    )
  }
}

function isReleaseNotesWithRevdate (asciidoc) {
  return (
    asciidoc.attributes &&
    asciidoc.attributes['page-component-name'] ===
      'release-notes' &&
    asciidoc.attributes['page-revdate']
  )
}

function byDate (a, b) {
  return (
    new Date(b.attributes.revdate) -
    new Date(a.attributes.revdate)
  )
}

function getMostRecentlyUpdatedPages (
  pagesUIModel,
  numOfItems
) {
  const resultList = []
  const maxNumberOfPages =
    pagesUIModel.length > numOfItems
      ? numOfItems
      : pagesUIModel.length
  for (let i = 0; i < maxNumberOfPages; i++) {
    const page = pagesUIModel[i]
    if (page.attributes?.revdate) {
      resultList.push({
        revdateWithoutYear: removeYear(
          page.attributes?.revdate
        ),
        title: page.title,
        url: page.url,
      })
    }
  }
  return resultList
}

function isValidDate (dateStr) {
  const dateObj = Date.parse(dateStr)
  return !isNaN(dateObj)
}

function removeYear (dateStr) {
  const dateObj = new Date(dateStr)
  return `${dateObj.toLocaleString('default', {
    month: 'short',
  })} ${dateObj.getDate()}`
}
