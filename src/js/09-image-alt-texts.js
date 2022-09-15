;(function () {
  'use strict'

  let uiRootPath = document.getElementById('site-script').dataset.uiRootPath
  
  let externalLinks = document.querySelectorAll('[target="_blank"]')
  externalLinks.forEach(function (externalLink) {
    let externalLinkImg = createImage('external-link')
    externalLinkImg.alt = 'leaving the site'
    externalLink.appendChild(externalLinkImg)
  })

  let anchors = document.querySelectorAll('.anchor')
  anchors.forEach(function (anchor) {
    let anchorImg = createImage('anchor')
    let headerText = anchor.parentElement.textContent
    if (headerText) anchorImg.alt = `Jump to ${headerText}` 
    anchor.appendChild(anchorImg)
  })

  function createImage(element) {
    let img = document.createElement('img')
    img.classList.add(`${element}-image`)
    img.src = `${uiRootPath}/img/icons/${element}.svg`
    return img
  }
})()
