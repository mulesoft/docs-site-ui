module.exports = (numOfItems, { data }) => {
  const { contentCatalog, site } = data.root
  const pages = contentCatalog.getPages(
    ({ asciidoc, out }) => {
      if (!out || !asciidoc) return
      return isReleaseNotes(asciidoc)
    }
  )
  const { buildPageUiModel } = module.parent.require(
    '@antora/page-composer/build-ui-model'
  )
  const pagesUIModel = pages.map((page) =>
    buildPageUiModel(site, page, contentCatalog)
  )
  console.log(pagesUIModel)
  pagesUIModel.sort(
    (a, b) =>
      new Date(b.attributes.revdate) -
      new Date(a.attributes.revdate)
  )
  console.log(pagesUIModel)
  return getMostRecentlyUpdatedPages(
    pagesUIModel,
    numOfItems
  )
}

function isReleaseNotes(asciidoc) {
  return (
    asciidoc.attributes &&
    asciidoc.attributes['page-component-name'] ===
      'release-notes'
  )
}

function getMostRecentlyUpdatedPages(
  pagesUIModel,
  numOfItems
) {
  let resultList = []
  let maxNumberOfPages =
    pagesUIModel.length > numOfItems
      ? numOfItems
      : pagesUIModel.length
  for (let i = 0; i < maxNumberOfPages; i++) {
    if (pagesUIModel[i].attributes?.revdate) {
      resultList.push({
        title: pagesUIModel[i].title,
        revdate: pagesUIModel[i].attributes?.revdate,
      })
    }
  }
  console.log(resultList)
  return resultList
}
