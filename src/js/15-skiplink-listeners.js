;(() => {
  'use strict'

  const addEventListenersToSkipLinks = () => {
    let skipLinks = getSkipLinks()
    const [leftNavSkipLink, mainContentSkipLink, pageNavSkipLink] = skipLinks

    if (hasNav()) {
      leftNavSkipLink.addEventListener('keydown', (e) => {
        focusOn(e, '#search-button')
      })
    } else {
      removeElement(leftNavSkipLink)
    }

    if (hasMain()) {
      mainContentSkipLink.addEventListener('keydown', (e) => {
        const selectors = toolbarIsVisible() ? '.toolbar a:not(.home-link)' : '.doc a'
        focusOn(e, selectors)
      })
    } else {
      removeElement(mainContentSkipLink)
    }

    if (hasAside()) {
      pageNavSkipLink.addEventListener('keydown', (e) => {
        focusOn(e, '.js-toc a')
      })
    } else {
      removeElement(pageNavSkipLink)
    }

    skipLinks = getSkipLinks()
    if (skipLinks.length > 0) {
      clickToRemoveFocus(skipLinks)
    } else {
      removeElement(skipLinks)
    }
  }

  const clickToRemoveFocus = (elements) => {
    for (const element of elements) {
      element.addEventListener('click', (e) => {
        element.blur()
        e.preventDefault()
      })
    }
  }

  const focusOn = (e, selectors) => {
    if (isSpaceOrEnterKey(e.keyCode)) {
      if (typeof selectors === 'string') {
        document.querySelector(selectors).focus()
      } else {
        selectors.focus()
      }
      e.preventDefault()
    }
  }

  const getSkipLinks = () => {
    return document.querySelectorAll('.ms-skip-link')
  }

  const hasAside = () => {
    return document.querySelector('.js-toc')
  }

  const hasMain = () => {
    return document.querySelector('main')
  }

  const hasNav = () => {
    return document.querySelector('nav.nav')
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
