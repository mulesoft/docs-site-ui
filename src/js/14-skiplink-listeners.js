;(() => {
  'use strict'

  class SkipLinks {
    constructor () {
      this.skipLinks = getSkipLinks()
      this.nav = document.querySelector('nav.nav')
      this.main = document.querySelector('main')
      this.aside = document.querySelector('aside')
      this.asideToc = this.aside?.querySelector('.aside-toc')
      this.toolbar = document.querySelector('.toolbar')
    }

    addEventListenersToSkipLinks () {
      if (this.skipLinks.length >= 3) {
        const [leftNavSkipLink, mainContentSkipLink, pageNavSkipLink] = this.skipLinks

        if (this.nav) {
          // No addResizeListener for this one.
          // Instead, see 03-mobile-navbar for different behavior in small screen sizes
          leftNavSkipLink.addEventListener('click', (e) => {
            if (isVisible(this.nav)) {
              const firstItemInLeftNav = this.getFirstItemInLeftNav()
              focusOn(e, firstItemInLeftNav)
            }
            e.stopPropagation()
          })
        } else {
          leftNavSkipLink.remove()
        }

        if (this.main) {
          addResizeListener(this.main, mainContentSkipLink)
          mainContentSkipLink.addEventListener('click', (e) => {
            const selector = this.getMainSelector()
            focusOn(e, selector)
          })
        } else {
          mainContentSkipLink.remove()
        }

        if (this.aside && this.asideToc) {
          addResizeListener(this.aside, pageNavSkipLink)
          pageNavSkipLink.addEventListener('click', (e) => {
            if (isVisible(this.aside)) {
              focusOn(e, '.aside-toc a')
            }
          })
        } else {
          pageNavSkipLink.remove()
        }

        this.removeUnusedSkipLinks()
      }
    }

    getFirstItemInLeftNav () {
      const searchBox = getFocusableSearchBox()
      return searchBox || this.nav.querySelector('a')
    }

    getMainSelector () {
      if (isSearchPage()) {
        return getFocusableSearchBox()
      }
      return isVisible(this.toolbar) ? '.toolbar a' : '.doc a'
    }

    removeUnusedSkipLinks () {
      const remainingSkipLinks = getSkipLinks()
      if (remainingSkipLinks.length === 0) remainingSkipLinks.remove()
    }
  }

  const addResizeListener = (checkElement, skipLink) => {
    toggleVisibility(checkElement, skipLink)
    window.addEventListener('resize', (e) => {
      toggleVisibility(checkElement, skipLink)
      e.preventDefault()
    })
  }

  const focusOn = (e, selectors) => {
    if (typeof selectors === 'string') {
      const element = document.querySelector(selectors)
      element && element.focus()
    } else {
      selectors.focus()
    }
    e.preventDefault()
  }

  const getFocusableSearchBox = () => {
    const atomicSearchbox = document.querySelector('atomic-search-box')
    const searchboxShadowRoot = atomicSearchbox && atomicSearchbox.shadowRoot
    if (searchboxShadowRoot) {
      return searchboxShadowRoot.querySelector('input')
    }
  }

  const getSkipLinks = () => {
    return document.querySelectorAll('.skip-link')
  }

  const isSearchPage = () => {
    return document.title.includes('Search Docs')
  }

  const isVisible = (element) => {
    return (
      element &&
      element.querySelector('a') &&
      window.getComputedStyle(element).display !== 'none' &&
      window.getComputedStyle(element).visibility !== 'hidden'
    )
  }

  const toggleVisibility = (checkElement, skipLink) => {
    if (isVisible(checkElement)) {
      skipLink.classList.remove('hide')
      skipLink.tabIndex = 0
    } else {
      skipLink.classList.add('hide')
      skipLink.tabIndex = -1
    }
  }

  const skipLinks = new SkipLinks()
  skipLinks.addEventListenersToSkipLinks()
})()
