;(function () {
  'use strict'

  // Add alt text/title to external links.
  // See https://stackoverflow.com/questions/4216035/css-background-image-alt-attribute
  // on why this is done using JS instead of CSS.
  var externalLinks = document.querySelectorAll('[target="_blank"]')

  externalLinks.forEach(function (link) {
    link.title = 'leaving the site'
  })
})()
