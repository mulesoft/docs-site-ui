;(() => {
  'use strict'

  const isHomePage = (pathname) => /(?:.*\/general\/|^\/$)/.test(pathname)

  if (!isHomePage()) {
    const addTopAndBottomMargins = (element) => element.classList.add('page-images')
    const isBig = (image) => image.height > 40

    const pageImages = document.querySelectorAll('.doc img')
    pageImages.forEach((image) => { if (isBig(image)) addTopAndBottomMargins(image) })
  }
})()
