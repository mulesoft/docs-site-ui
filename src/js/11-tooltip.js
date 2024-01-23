;(() => {
  'use strict'

  const archiveTooltip = MSCX.l10n.getMessage('landing-footer-archive-tooltip')
  const archiveLinks = document.querySelectorAll('a[href="https://archive.docs.mulesoft.com/"]')
  if (!archiveLinks.length) return

  const addToolTip = (archiveLink) => {
    const tooltipDiv = createTooltipDiv()
    archiveLink.parentElement.appendChild(tooltipDiv)

    const tooltipButton = createTooltipButton(archiveLink)
    tooltipDiv.appendChild(tooltipButton)
  }

  const applyTippy = (button, icon, color) => {
    tippy(icon, {
      arrow: tippy.roundArrow,
      content: archiveTooltip,
      duration: [0, 150],
      maxWidth: 240,
      offset: [0, 15],
      theme: `${color}-archive-link-popover`,
      touchHold: true, // maps touch as click (for some reason)
      trigger: 'click mouseenter',
      triggerTarget: button,
      zIndex: 'var(--z-nav-mobile)',
    })
  }

  const createTooltipDiv = () => {
    const tooltipDiv = document.createElement('div')
    tooltipDiv.classList.add('tooltip-div')
    return tooltipDiv
  }

  const createTooltipButton = (archiveLink) => {
    const tooltipButton = document.createElement('button')
    tooltipButton.classList.add('tooltip-button')
    const tooltipIcon = document.createElement('img')
    const iconColor = inLeftNav(archiveLink) ? 'gray' : 'white'
    setIconAttributes(tooltipButton, tooltipIcon, iconColor)
    tooltipButton.appendChild(tooltipIcon)
    return tooltipButton
  }

  const inLeftNav = (element) => element.classList.contains('nav-text')

  const setIconAttributes = (button, icon, color) => {
    icon.classList.add('tooltip')
    icon.setAttribute('alt', 'Archived Documentation information')
    setSrcSVGPath(icon, color)
    applyTippy(button, icon, color)
  }

  const setSrcSVGPath = (icon, color) => {
    const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    icon.src = `${uiRootPath}/img/icons/tooltip-${color}.svg`
  }

  archiveLinks.forEach((archiveLink) => addToolTip(archiveLink))
})()
