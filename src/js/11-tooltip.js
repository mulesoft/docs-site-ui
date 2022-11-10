;(function () {
  'use strict'

  const archiveLinks = document.querySelectorAll("a[href='https://archive.docs.mulesoft.com/']")
  archiveLinks.forEach(function (archiveLink) {
    const tooltipIcon = createTooltipIcon(archiveLink)
    const tooltipDiv = createTooltipDiv()
    tooltipDiv.appendChild(tooltipIcon)
    archiveLink.parentElement.appendChild(tooltipDiv)
  })

  function createTooltipIcon (archiveLink) {
    const color = inLeftNav(archiveLink) ? 'gray' : 'white'
    const tooltipIcon = document.createElement('img')
    tooltipIcon.classList.add('tooltip')
    tooltipIcon.setAttribute('role', 'tool-tip')
    tooltipIcon.setAttribute('tabindex', '0')
    tooltipIcon.setAttribute('alt', 'Archived Documentation information')
    const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    tooltipIcon.src = `${uiRootPath}/img/icons/tooltip-${color}.svg`
    addTooltip(tooltipIcon, color)
    return tooltipIcon
  }

  function inLeftNav (archiveLink) {
    return archiveLink.classList.contains('nav-text')
  }

  function addTooltip (tooltipIcon, color) {
    tippy(tooltipIcon, {
      arrow: tippy.roundArrow,
      content:
      'When a product version is no longer supported, ' +
      'including products with end-of-life status, ' +
      'its documentation moves to an archive site.',
      duration: [0, 150],
      maxWidth: 240,
      offset: [0, 15],
      theme: `${color}-archive-link-popover`,
      touchHold: true, // maps touch as click (for some reason)
      zIndex: 16, // same as z-nav-mobile
    })
  }

  function createTooltipDiv () {
    const tooltipDiv = document.createElement('div')
    tooltipDiv.classList.add('tooltip-div')
    return tooltipDiv
  }
})()
