;(function () {
  'use strict'

  // Add alt text/title to external links.
  // See https://stackoverflow.com/questions/4216035/css-background-image-alt-attribute
  // on why this is done using JS instead of CSS.
  var externalLinks = document.querySelectorAll('[target="_blank"]')

  externalLinks.forEach(function (link) {
    link.title = 'leaving the site'
  })

  var anchors = document.querySelectorAll('.anchor')
  var uiRootPath = document.getElementById('site-script').dataset.uiRootPath
  anchors.forEach(function (anchor) {
    let anchorImg = document.createElement('img')
    anchorImg.classList.add('anchor-image')
    anchorImg.src = uiRootPath + '/img/icons/anchor.svg'
    let headerText = anchor.parentElement.textContent
    if (headerText) anchorImg.alt = `Jump to ${headerText}` 
    anchor.appendChild(anchorImg)
  })
})()
