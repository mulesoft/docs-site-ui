const request = require('request')
const { JSDOM } = require('jsdom')
const { createCanvas, loadImage } = require('canvas')
const contrast = require('get-contrast')

// Load the webpage
const url = 'https://docs.mulesoft.com/apikit/3.x/apikit-tutorial'
request(url, (error, _response, body) => {
  if (error) {
    console.error(error)
    return
  }

  // Extract the image URLs
  const dom = new JSDOM(body)
  const imgElements = dom.window.document.querySelectorAll('img')
  const imgUrls = Array.from(imgElements).map((img) => img.src)

  // Download the images and calculate the contrast
  for (const imgUrl of imgUrls) {
    loadImage(imgUrl).then((img) => {
      const canvas = createCanvas(img.width, img.height)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, img.width, img.height)
      const imgContrast = contrast(imgData.data, img.width, img.height)

      // Check the contrast
      if (imgContrast < 0.5) {
        console.log(`Image ${imgUrl} does not have sufficient contrast`)
      }
    }).catch((error) => console.error(error))
  }
})
