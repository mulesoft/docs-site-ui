;(() => {
  'use strict'

  const isBig = (image) => image.height > 40
  const isHomePage = () => ['/', '/general/'].includes(window.location.pathname)

  if (!isHomePage()) {
    const pageImages = document.querySelectorAll('.doc img')
    for (const image of pageImages) {
      if (isBig(image)) {
        image.classList.add('page-images')
      }
    }
  }
})()
