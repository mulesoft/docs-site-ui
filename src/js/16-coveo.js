;(() => {
  'use strict'

  const updateAtomicElements = () => {
    let tries = 10
    const setPlaceholderText = setInterval(() => {
      const atomicSearchbox = document.querySelector('atomic-search-box')
      const searchboxShadowRoot = atomicSearchbox && atomicSearchbox.shadowRoot
      if (searchboxShadowRoot) {
        const comboBox = searchboxShadowRoot.querySelector('[role="combobox"]')
        if (comboBox) {
          comboBox.placeholder = 'Search Docs'
          const searchboxDiv = searchboxShadowRoot.querySelector('div')
          if (searchboxDiv) {
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
