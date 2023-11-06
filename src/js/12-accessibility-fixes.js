;(() => {
  'use strict'

  const addBlankAltTextsToTipIcons = () => {
    const tipSVGs = document.querySelectorAll('.tip-svg')
    tipSVGs.forEach((svg) => {
      svg.setAttribute('alt', '')
    })
  }

  const onExpand = (e) => {
    const elem = e.target
    setAriaExpanded(elem)
  }

  const setAriaExpanded = (elem) => {
    if (elem.hasAttribute('open')) {
      elem.setAttribute('aria-expanded', true)
      return
    }
    elem.setAttribute('aria-expanded', false)
  }

  const setDetailsExpandListeners = () => {
    const detailsElems = document.querySelectorAll('details')
    detailsElems.forEach((detail) => {
      setAriaExpanded(detail)
      detail.addEventListener('toggle', onExpand)
    })
  }

  addBlankAltTextsToTipIcons()
  setDetailsExpandListeners()
})()
