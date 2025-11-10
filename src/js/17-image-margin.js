;(() => {
  'use strict'

  const isHomePage = (pathname) => ['/general/', '/'].includes(pathname)

  if (!isHomePage(window.location.pathname) && !document.querySelector('article.learning-map')) {
    const addTopAndBottomMargins = (element) => element.classList.add('page-images')

    const firstElementInTableCell = (imageElement) => {
      const imageParentSpan = imageElement.parentElement
      const imageParentSpanParent = imageParentSpan.parentElement
      return (
        imageParentSpan === imageParentSpanParent.firstElementChild &&
        imageParentSpanParent.classList.contains('tableblock')
      )
    }

    const isBig = (image) => image.height > 40

    const pageImages = document.querySelectorAll(
      '.doc img:not(.anchor-image):not(.external-link-image):not(.select-dropdown-arrow):not(.code-snippet-icon)'
    )
    pageImages.forEach((image) => {
      if (isBig(image) && !firstElementInTableCell(image)) addTopAndBottomMargins(image)
    })
  }
})()
