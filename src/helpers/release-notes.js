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
      .sort(
        (a, b) =>
          new Date(b.attributes.revdate) -
          new Date(a.attributes.revdate)
      )
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
    if (
      page.attributes?.revdate &&
      isValidDate(page.attributes?.revdate)
    ) {
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

function isValidDate (dateString) {
  const dateObj = Date.parse(dateString)
  return !isNaN(dateObj)
}

function removeYear (dateString) {
  const dateObj = new Date(dateString)
  return `${dateObj.toLocaleString('default', {
    month: 'short',
  })} ${dateObj.getDate()}`
}
