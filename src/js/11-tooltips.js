;(function () {
  'use strict'

  const archiveLinks = document.querySelectorAll("a[href='https://archive.docs.mulesoft.com/']")
  var uiRootPath = document.getElementById('site-script').dataset.uiRootPath
  archiveLinks.forEach(function (archiveLink) {
    const tooltipDiv = document.createElement('div')
    tooltipDiv.classList.add('tooltip-div')
    archiveLink.parentElement.appendChild(tooltipDiv)
    const colorScheme = inLeftNav(archiveLink) ? 'gray' : 'white'
    const toolTip = createToolTip(colorScheme)
    tooltipDiv.appendChild(toolTip)

    tippy(toolTip, {
      arrow: tippy.roundArrow,
      content:
        'When a product version is no longer supported, ' +
        'including products with end-of-life status, ' +
        'its documentation moves to an archive site.',
      duration: [0, 150],
      maxWidth: 240,
      offset: [0, 15],
      theme: `${colorScheme}-archive-link-popover`,
      touchHold: true, // maps touch as click (for some reason)
      zIndex: 16, // same as z-nav-mobile
    })
  })

  function inLeftNav (archiveLink) {
    return archiveLink.classList.contains('nav-text')
  }

  function createToolTip (color) {
    const img = document.createElement('img')
    img.setAttribute('role', 'tool-tip')
    img.setAttribute('tabindex', '0')
    img.classList.add('tooltip')
    img.src = `${uiRootPath}/img/icons/tooltip-${color}.svg`
    return img
  }
})()
