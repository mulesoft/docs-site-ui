;(() => {
  'use strict'

  const addBlankAltTextsToTipIcons = () => {
    const tipSVGs = document.querySelectorAll('.tip-svg')
    tipSVGs.forEach((svg) => {
      svg.setAttribute('alt', '')
    })
  }

  addBlankAltTextsToTipIcons()
})()
