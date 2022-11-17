;(() => {
  'use strict'

  const addToolTipsToAllArchiveLinks = () => {
    document
      .querySelectorAll("a[href='https://archive.docs.mulesoft.com/']")
      .forEach((archiveLink) => addToolTip(archiveLink))
  }

  const addToolTip = (archiveLink) => {
    if (!onOldLandingPage(archiveLink)) {
      const tooltipDiv = createTooltipDiv()
      archiveLink.parentElement.appendChild(tooltipDiv)

      const tooltipIcon = createTooltipIcon(archiveLink)
      tooltipDiv.appendChild(tooltipIcon)
    }
  }

  const onOldLandingPage = (archiveLink) => {
    return !document.querySelector('#cta') && !inLeftNav(archiveLink)
  }

  const inLeftNav = (element) => {
    return element.classList.contains('nav-text')
  }

  const createTooltipDiv = () => {
    const tooltipDiv = document.createElement('div')
    tooltipDiv.classList.add('tooltip-div')
    return tooltipDiv
  }

  const createTooltipIcon = (archiveLink) => {
    const tooltipIcon = document.createElement('img')
    const iconColor = inLeftNav(archiveLink) ? 'gray' : 'white'
    setIconAttributes(tooltipIcon, iconColor)
    return tooltipIcon
  }

  const setIconAttributes = (icon, color) => {
    icon.classList.add('tooltip')
    icon.setAttribute('alt', 'Archived Documentation information')
    icon.setAttribute('role', 'tool-tip')
    icon.setAttribute('tabindex', '0')
    setSrcSVGPath(icon, color)
    applyTippy(icon, color)
  }

  const setSrcSVGPath = (icon, color) => {
    const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    icon.src = `${uiRootPath}/img/icons/tooltip-${color}.svg`
  }

  const applyTippy = (icon, color) => {
    tippy(icon, {
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

  addToolTipsToAllArchiveLinks()
})()
