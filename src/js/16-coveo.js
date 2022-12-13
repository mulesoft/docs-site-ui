;(() => {
  'use strict'

  const searchboxInLeftNav = () => {
    const leftNav = document.querySelector('nav.nav')
    if (leftNav) {
      return leftNav.contains(document.querySelector('atomic-search-interface'))
    }
  }

  const updateAtomicElements = () => {
    let tries = 10
    const setPlaceholderText = setInterval(() => {
      const atomicSearchbox = document.querySelector('atomic-search-box')
      const searchboxShadowRoot = atomicSearchbox && atomicSearchbox.shadowRoot
      if (searchboxShadowRoot) {
        const searchboxInput = searchboxShadowRoot.querySelector('input')
        if (searchboxInput) {
          searchboxInput.placeholder = 'Search Docs'
          const searchboxDiv = searchboxShadowRoot.querySelector('div')
          if (searchboxDiv && !searchboxInLeftNav()) {
            searchboxDiv.style.maxWidth = '80%'
          }
          clearInterval(setPlaceholderText)
        }
      }

      if (++tries === 10) {
        clearInterval(setPlaceholderText)
      }
    }, 100)
  }

  updateAtomicElements()
})()
