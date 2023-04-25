;(() => {
  'use strict'

  const isBig = (image) => image.height > 40
  const isHomePage = (pathname) => /(?:.*\/general\/|^\/$)/.test(pathname)

  if (!isHomePage(window.location.pathname)) {
    const pageImages = document.querySelectorAll('.doc img')
    for (const image of pageImages) {
      if (isBig(image)) {
        image.classList.add('page-images')
      }
    }
  }
})()
