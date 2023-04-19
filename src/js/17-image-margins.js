;(() => {
  'use strict'

  const addMargins = (image) => {
    image.style.marginTop = '24px'
    image.style.marginBottom = '8px'
  }

  const isBig = (image) => {
    return image.height > 20
  }

  const pageImages = document.querySelectorAll('.doc span > img')
  pageImages.forEach((image) => {
    if (isBig(image)) addMargins(image)
  })
})()
