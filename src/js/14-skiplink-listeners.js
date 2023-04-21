;(() => {
  'use strict'

  const skipLinks = document.querySelectorAll('.skip-link')
  if (!skipLinks.length) return

  const nav = document.querySelector('nav.nav')
  const main = document.querySelector('main')
  const aside = document.querySelector('aside')
  const asideToc = aside?.querySelector('.aside-toc')
  const toolbar = document.querySelector('.toolbar')

  const addListeners = (skipLinks) => {
    if (skipLinks.length >= 3) {
      const [leftNavSkipLink, mainContentSkipLink, pageNavSkipLink] = skipLinks

      if (nav) {
        // No addResizeListener for this one.
        // Instead, see 03-mobile-navbar for different behavior in small screen sizes
        leftNavSkipLink.addEventListener('click', (e) => {
          if (isVisible(nav)) focusOn(getFirstFocusableItem(nav), e)
          e.stopPropagation()
        })
      } else {
        leftNavSkipLink.remove()
      }

      if (main) {
        addResizeListener(main, mainContentSkipLink)
        mainContentSkipLink.addEventListener('click', (e) => focusOn(getMainSelector(), e))
      } else {
        mainContentSkipLink.remove()
      }

      if (aside && asideToc) {
        addResizeListener(aside, pageNavSkipLink)
        pageNavSkipLink.addEventListener('click', (e) => {
          if (isVisible(aside)) focusOn('.aside-toc a', e)
        })
      } else {
        pageNavSkipLink.remove()
      }

      const remainingSkipLinks = document.querySelectorAll('.skip-link')
      removeIfEmpty(remainingSkipLinks)
    }
  }

  const addResizeListener = (checkElement, skipLink) => {
    const toggleVisibility = () => {
      skipLink.classList.toggle('hide', !isVisible(checkElement))
      skipLink.tabIndex = isVisible(checkElement) ? 0 : -1
    }

    window.addEventListener('resize', (e) => {
      toggleVisibility()
      e.preventDefault()
    })
    toggleVisibility()
  }

  const focusOn = (selectors, e) => {
    const target = typeof selectors === 'string' ? document.querySelector(selectors) : selectors
    if (target) target.focus()
    if (e) e.preventDefault()
  }

  const getFirstFocusableItem = (element) => getFocusableSearchBox() || element.querySelector('a')

  const getFocusableSearchBox = () => {
    const atomicSearchbox = document.querySelector('atomic-search-box')
    const searchboxShadowRoot = atomicSearchbox?.shadowRoot
    return searchboxShadowRoot?.querySelector('input')
  }

  const getMainSelector = () =>
    isSearchPage()
      ? getFocusableSearchBox()
      : isVisible(toolbar)?.querySelector('a') || isVisible('.doc')?.querySelector('a')

  const isSearchPage = () => document.title.includes('Search Docs')

  const isVisible = (element) => {
    return element?.querySelector('a') || isSearchPage()
      ? window.getComputedStyle(element).display !== 'none' && window.getComputedStyle(element).visibility !== 'hidden'
      : false
  }

  const removeIfEmpty = (remainingSkipLinks) => {
    if (!remainingSkipLinks.length) remainingSkipLinks.remove()
  }

  addListeners(skipLinks)
})()
