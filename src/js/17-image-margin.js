;(() => {
  'use strict'

  // add extra spaces to the top and bottom of big images on the page

  const addMargins = (image) => {
    image.style.marginTop = '24px'
    image.style.marginBottom = '8px'
  }

  const isBig = (image) => {
    return image.height > 20
  }

  const pageImages = document.querySelectorAll('.doc img')
  pageImages.forEach((image) => {
    if (isBig(image)) addMargins(image)
  })
})()
