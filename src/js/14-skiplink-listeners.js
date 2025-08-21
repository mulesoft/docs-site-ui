;(() => {
  'use strict'

  const bodySkipLinks = document.querySelectorAll('body > .skip-link-container > .skip-link')
  const asideSkipLinks = document.querySelectorAll('aside > .skip-link-container > .skip-link')
  if (!bodySkipLinks.length && !asideSkipLinks.length) return

  const nav = document.querySelector('nav.nav')
  const main = document.querySelector('main')
  const aside = document.querySelector('aside')
  const asideToc = aside?.querySelector('.aside-toc')
  const toolbar = document.querySelector('.toolbar')

  const addAsideListeners = (skipLinks) => {
    if (skipLinks.length) {
      const [mainContentSkipLink] = skipLinks

      if (main) {
        addResizeListener(main, mainContentSkipLink)
        mainContentSkipLink.addEventListener('click', (e) => focusOn(getMainSelector(), e))
        mainContentSkipLink.addEventListener('focus', (e) => {
          mainContentSkipLink.parentNode.classList.add('aside-skip-link-container-selected')
          e.preventDefault()
        })
        mainContentSkipLink.addEventListener('blur', (e) => {
          mainContentSkipLink.parentNode.classList.remove('aside-skip-link-container-selected')
          e.preventDefault()
        })
      } else {
        mainContentSkipLink.remove()
      }
    }
  }

  const addBodyListeners = (skipLinks) => {
    if (skipLinks.length >= 3) {
      const [leftNavSkipLink, mainContentSkipLink, pageNavSkipLink] = skipLinks

      if (nav) {
        // No addResizeListener for this one.
        // Instead, see 03-mobile-navbar for different behavior in small screen sizes
        leftNavSkipLink.addEventListener('click', (e) => {
          if (isVisible(nav)) focusOn(getNavFirstFocusableItem(nav), e)
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
          if (isVisible(aside)) focusOn(getAsideFirstFocusableItem(aside), e)
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

  const getAsideFirstFocusableItem = (aside) => {
    return getAsideGithubButton(aside) || getAsideFirstTocLink(aside)
  }

  const getAsideFirstTocLink = (aside) => aside.querySelector('.aside-toc a')
  const getAsideGithubButton = (aside) => aside.querySelector('a.github')

  const getMainSelector = () => {
    return isVisible(toolbar) ? '.toolbar a' : '.doc a'
  }

  const getNavFirstFocusableItem = (element) => element.querySelector('a')

  const isVisible = (element) => {
    return element?.querySelector('a')
      ? window.getComputedStyle(element).display !== 'none' && window.getComputedStyle(element).visibility !== 'hidden'
      : false
  }

  const removeIfEmpty = (remainingSkipLinks) => {
    if (!remainingSkipLinks.length) remainingSkipLinks.remove()
  }

  addBodyListeners(bodySkipLinks)
  addAsideListeners(asideSkipLinks)
})()
