;(() => {
  'use strict'

  const addBlankAltTextsToTipIcons = () => {
    const tipSVGs = document.querySelectorAll('.tip-svg')
    tipSVGs.forEach((svg) => {
      svg.setAttribute('alt', '')
    })
  }

  const onDetailsExpand = (e) => {
    const elem = e.target
    setDetailsAriaExpanded(elem)
  }

  const setDetailsAriaExpanded = (elem) => {
    if (elem.hasAttribute('open')) {
      elem.setAttribute('aria-expanded', true)
      return
    }
    elem.setAttribute('aria-expanded', false)
  }

  const listenForDetailsToggle = () => {
    const detailsElems = document.querySelectorAll('details')
    detailsElems.forEach((detail) => {
      setDetailsAriaExpanded(detail)
      detail.addEventListener('toggle', onDetailsExpand)
    })
  }

  addBlankAltTextsToTipIcons()
  listenForDetailsToggle()
})()
