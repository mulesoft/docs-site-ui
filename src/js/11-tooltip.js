;(() => {
  'use strict'

  const archiveTooltip = MSCX.l10n.getMessage('landing-footer-archive-tooltip')
  const archiveLinks = document.querySelectorAll('a[href="https://archive.docs.mulesoft.com/"]')
  if (!archiveLinks.length) return

  const addToolTip = (archiveLink) => {
    const tooltipDiv = createTooltipDiv()
    archiveLink.parentElement.appendChild(tooltipDiv)

    const tooltipIcon = createTooltipIcon(archiveLink)
    tooltipDiv.appendChild(tooltipIcon)
  }

  const applyTippy = (icon, color) => {
    tippy(icon, {
      arrow: tippy.roundArrow,
      content: archiveTooltip,
      duration: [0, 150],
      maxWidth: 240,
      offset: [0, 15],
      theme: `${color}-archive-link-popover`,
      touchHold: true, // maps touch as click (for some reason)
      zIndex: 'var(--z-nav-mobile)',
    })
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

  const inLeftNav = (element) => element.classList.contains('nav-text')

  const setIconAttributes = (icon, color) => {
    icon.classList.add('tooltip')
    icon.setAttribute('alt', 'Archived Documentation information')
    icon.setAttribute('role', 'button')
    icon.setAttribute('tabindex', '0')
    setSrcSVGPath(icon, color)
    applyTippy(icon, color)
  }

  const setSrcSVGPath = (icon, color) => {
    const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    icon.src = `${uiRootPath}/img/icons/tooltip-${color}.svg`
  }

  archiveLinks.forEach((archiveLink) => addToolTip(archiveLink))
})()
