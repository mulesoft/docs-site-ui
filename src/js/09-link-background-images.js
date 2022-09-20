;(function () {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath

  const externalLinks = document.querySelectorAll('.doc [target="_blank"]')
  externalLinks.forEach(function (externalLink) {
    if (!isDataWeavePlaygroundLink(externalLink)) {
      const externalLinkImg = createLinkImage('external-link')
      externalLinkImg.alt = 'Leaving the Site'
      externalLinkImg.setAttribute('title', 'Leaving the Site')
      externalLink.appendChild(externalLinkImg)
    }
  })

  const anchors = document.querySelectorAll('.anchor')
  anchors.forEach(function (anchor) {
    const anchorImg = createLinkImage('anchor')
    const headerText = anchor.parentElement.textContent
    if (headerText) anchorImg.alt = `Jump to ${headerText}`
    anchorImg.setAttribute('title', `Jump to ${headerText}`)
    anchor.appendChild(anchorImg)
  })

  function createLinkImage (element) {
    const img = document.createElement('img')
    img.setAttribute('role', 'link')
    img.classList.add(`${element}-image`)
    img.src = `${uiRootPath}/img/icons/${element}.svg`
    return img
  }

  function isDataWeavePlaygroundLink (e) {
    return e.classList.contains('dw-playground-link')
  }
})()
