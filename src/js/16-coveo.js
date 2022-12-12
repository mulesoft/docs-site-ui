;(() => {
  'use strict'

  let tries = 10

  const updateAtomicElements = () => {
    const setPlaceholderText = setInterval(() => {
      const atomicSearchBox = document.querySelector('atomic-search-box')
      const root = atomicSearchBox && atomicSearchBox.shadowRoot
      if (root) {
        const comboBox = root.querySelector('[role="combobox"]')
        if (comboBox) {
          comboBox.placeholder = 'Search Docs'
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
