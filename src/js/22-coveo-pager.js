;(() => {
  'use strict'

  if (!document.querySelector('atomic-pager')) return

  let tries = 500

  const updateAriaLabel = (paginationNav, partName) => {
    const button = paginationNav.querySelector(`button[part="${partName}"]`)
    if (button) button.setAttribute('aria-label', `${button.getAttribute('aria-label')} page`)
  }

  const updatePager = setInterval(() => {
    if (--tries <= 0) {
      clearInterval(updatePager)
    }

    const atomicPager = document.querySelector('atomic-pager')
    const pagerShadowRoot = atomicPager?.shadowRoot
    const paginationNav = pagerShadowRoot?.querySelector('nav')
    if (paginationNav) {
      try {
        updateAriaLabel(paginationNav, 'previous-button')
        updateAriaLabel(paginationNav, 'next-button')
        clearInterval(updatePager)
      } catch (error) {
        console.error(error)
      }
    }
  }, 100)
})()
