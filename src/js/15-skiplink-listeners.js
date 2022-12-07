;(() => {
  'use strict'

  const addEventListenersToSkipLinks = () => {
    const skipLinks = document.querySelectorAll('.skip-link')
    const [leftNavSkipLink, mainContentSkipLink, pageNavSkipLink] = skipLinks

    clickToRemoveFocus(leftNavSkipLink)
    clickToRemoveFocus(mainContentSkipLink)
    clickToRemoveFocus(pageNavSkipLink)

    leftNavSkipLink.addEventListener('keydown', (e) => {
      focusOn(e, '#search-button')
    })

    mainContentSkipLink.addEventListener('keydown', (e) => {
      const selectors = toolbarIsVisible() ? '.toolbar a:not(.home-link)' : '.doc a'
      focusOn(e, selectors)
    })

    if (hasAside()) {
      pageNavSkipLink.addEventListener('keydown', (e) => {
        focusOn(e, '.js-toc a')
      })
    } else {
      removeElement(pageNavSkipLink)
    }
  }

  const clickToRemoveFocus = (element) => {
    if (element) {
      element.addEventListener('click', (e) => {
        element.blur()
        e.preventDefault()
      })
    }
  }

  const focusOn = (e, selectors) => {
    if (isSpaceOrEnterKey(e.keyCode)) {
      document.querySelector(selectors).focus()
      e.preventDefault()
    }
  }

  const hasAside = () => {
    return document.querySelector('.js-toc')
  }

  const isSpaceOrEnterKey = (keyCode) => {
    return [13, 32].includes(keyCode)
  }

  const removeElement = (element) => {
    element.remove()
  }

  const toolbarIsVisible = () => {
    const toolbar = document.querySelector('.toolbar')
    if (toolbar) {
      return window.getComputedStyle(toolbar).display !== 'none'
    }
    return false
  }

  addEventListenersToSkipLinks()
})()
