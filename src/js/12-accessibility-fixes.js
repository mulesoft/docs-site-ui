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
    elem.setAttribute('aria-expanded', elem.hasAttribute('open'))
  }

  const listenForDetailsToggle = () => {
    const detailsElems = document.querySelectorAll('details')
    detailsElems.forEach((detail) => {
      setDetailsAriaExpanded(detail)
      detail.addEventListener('toggle', onDetailsExpand)
    })
  }

  const addTitlesToEmbeddedVideos = () => {
    document.querySelectorAll('.videoblock iframe:not([title])').forEach((frame) => {
      const title = frame.closest('.videoblock')?.querySelector('.title')?.textContent.trim()
      frame.title = title || 'Embedded video'
    })
  }

  addBlankAltTextsToTipIcons()
  addTitlesToEmbeddedVideos()
  listenForDetailsToggle()
})()
