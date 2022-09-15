;(function () {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath

  const externalLinks = document.querySelectorAll('[target="_blank"]')
  externalLinks.forEach(function (externalLink) {
    if (!externalLink.classList.contains('dw-playground-link')) {
      const externalLinkImg = createLinkImage('external-link')
      externalLinkImg.alt = 'leaving the site'
      externalLink.appendChild(externalLinkImg)
    }
  })

  const anchors = document.querySelectorAll('.anchor')
  anchors.forEach(function (anchor) {
    const anchorImg = createLinkImage('anchor')
    const headerText = anchor.parentElement.textContent
    if (headerText) anchorImg.alt = `Jump to ${headerText}`
    anchor.appendChild(anchorImg)
  })

  function createLinkImage (element) {
    const img = document.createElement('img')
    img.setAttribute('role', 'link')
    img.classList.add(`${element}-image`)
    img.src = `${uiRootPath}/img/icons/${element}.svg`
    return img
  }
})()
