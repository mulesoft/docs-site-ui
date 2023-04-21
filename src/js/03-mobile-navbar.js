;(() => {
  'use strict'

  const backdrop = document.querySelector('.modal-backdrop')
  const body = document.body
  const nav = document.querySelector('.nav.fit')
  const toolbarMenuButton = document.querySelector('.nav-toggle')
  const navCloseButton = document.querySelector('.nav-close-button')
  const toolbarSearchButton = document.querySelector('.toolbar-search-button')
  const skipLinks = document.querySelectorAll('.skip-link')
  const mobileNavFocusTrapper = document.querySelector('.mobile-nav-focus-trapper')
  const tabindexStoreMap = {}

  const addListeners = (backdrop, toolbarMenuButton, navCloseButton, toolbarSearchButton, skipLinks) => {
    const handleEscapeKeydown = (e) => {
      if (e.key === 'Escape') {
        mobileNavIsActive()
          ? hideNav(e)
          : toggleTabIndexOutsideNav()
        toggleFocus()
      }
    }

    const getLeftNav = (skipLinks) => {
      for (const skipLink of skipLinks) {
        if (skipLink.innerHTML.includes('left navigation')) return skipLink
      }
    }

    const handleMobileLeftNavSkipLinkClick = (e) => { if (!isBigScreenSize()) toggleNav(e) }

    const handleToolbarSearchButtonClick = (e) => {
      toggleNav(e)
      focusOnMobileNavSearchBox()
    }

    if (backdrop) backdrop.addEventListener('click', hideNav)
    if (toolbarMenuButton) toolbarMenuButton.addEventListener('click', toggleNav)
    if (navCloseButton) navCloseButton.addEventListener('click', toggleNav)
    if (toolbarSearchButton) toolbarSearchButton.addEventListener('click', handleToolbarSearchButtonClick)
    // this takes precedence than the normal skip link listener in 15-skiplink-listeners.js
    const leftNavSkipLink = getLeftNav(skipLinks)
    if (leftNavSkipLink) leftNavSkipLink.addEventListener('click', handleMobileLeftNavSkipLinkClick)
    document.addEventListener('keydown', handleEscapeKeydown)
  }

  const focusOnMobileNavSearchBox = () => {
    const getFocusableSearchBox = () => {
      const atomicSearchbox = document.querySelector('atomic-search-box')
      const searchboxShadowRoot = atomicSearchbox?.shadowRoot
      return searchboxShadowRoot?.querySelector('input')
    }

    if (mobileNavIsActive()) {
      const searchBox = getFocusableSearchBox()
      searchBox
        ? searchBox.focus()
        : toggleFocus()
    }
  }

  const hideNav = (e) => toggleNav(e, false)
  const inLeftnav = (element) => nav.contains(element)
  const isBigScreenSize = () => window.innerWidth >= 768

  // source:
  // https://stackoverflow.com/questions/2631820/
  // how-do-i-ensure-saved-click-coordinates-can-be-reload-to-the-same-place-even-if/2631931
  const getXPath = (element) => {
    if (element.id !== '') return `id("${element.id}")`
    if (element === document.body) return element.nodeName.toLowerCase()

    let ix = 0
    const siblings = element.parentNode.childNodes
    for (const sibling of siblings) {
      if (sibling === element) return `${getXPath(element.parentNode)}/${element.tagName}[${ix + 1}]`
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++
    }
  }

  const mobileNavIsActive = () => nav.classList.contains('is-active')

  const setTabindex = (link) => {
    if (!inLeftnav(link)) {
      const tabIndex = link.tabIndex
      const linkPath = getXPath(link)
      link.removeAttribute('tabindex')
      if (mobileNavIsActive()) {
        if (!(linkPath in tabindexStoreMap) || tabindexStoreMap[linkPath] == null) {
          tabindexStoreMap[linkPath] = tabIndex
        }
        link.tabIndex = -1
      } else if (linkPath in tabindexStoreMap && tabindexStoreMap[linkPath] != null) {
        link.tabIndex = tabindexStoreMap[linkPath]
        tabindexStoreMap[linkPath] = null
      }
    }
  }

  const toggleFocus = () => {
    const isActive = mobileNavIsActive()
    mobileNavFocusTrapper.tabIndex = isActive ? 0 : -1
    isActive ? mobileNavFocusTrapper?.focus() : toolbarMenuButton.focus()
  }

  const toggleNav = (e, override) => {
    let navOperation = 'toggle'
    if (override !== undefined) navOperation = override ? 'add' : 'remove'
    nav.classList[navOperation]('is-active')

    const miscOperation = mobileNavIsActive() ? 'add' : 'remove'
    body.classList[miscOperation]('mobile', 'no-scroll')
    backdrop.classList[miscOperation]('mobile', 'show')
    navCloseButton.classList[mobileNavIsActive() ? 'remove' : 'add']('hide')

    toggleTabIndexOutsideNav()
    toggleFocus()
    e.stopPropagation()
  }

  const toggleTabIndexOutsideNav = () => {
    const links = document.querySelectorAll('a, button, select, .tooltip, .menu-ham')
    links.forEach((link) => setTabindex(link))
  }

  addListeners(backdrop, toolbarMenuButton, navCloseButton, toolbarSearchButton, skipLinks)
})()
