;(() => {
  'use strict'

  const backdrop = document.querySelector('.modal-backdrop')
  const body = document.body
  const nav = document.querySelector('.nav.fit')
  const toolbarMenuButton = document.querySelector('.nav-toggle')
  const navCloseButton = document.querySelector('.nav-close-button')
  const skipLinks = document.querySelectorAll('.skip-link')
  const mobileNavFocusTrapper = document.querySelector('.mobile-nav-focus-trapper')
  const tabindexStoreMap = {}

  const addListeners = (backdrop, toolbarMenuButton, navCloseButton, skipLinks) => {
    const getElementByInnerHTML = (skipLinks, skipLinkLabel) =>
      Array.from(skipLinks).find((skipLink) => skipLink.innerHTML.includes(skipLinkLabel)) || null

    const handleEscapeKeydown = (e) => {
      if (e.key === 'Escape') {
        isActive(nav) ? hideNav(e) : toggleTabIndexOutsideNav()
        toggleFocus()
      }
    }

    const handleMobileLeftNavSkipLinkClick = (e) => {
      if (!isBigScreenSize()) toggleNav(e)
    }

    if (backdrop) backdrop.addEventListener('click', hideNav)
    if (toolbarMenuButton) toolbarMenuButton.addEventListener('click', toggleNav)
    if (navCloseButton) navCloseButton.addEventListener('click', toggleNav)
    document.addEventListener('keydown', handleEscapeKeydown)

    // this takes precedence than the normal skip link listener in 15-skiplink-listeners.js
    const leftNavSkipLink = getElementByInnerHTML(skipLinks, 'left navigation')
    if (leftNavSkipLink) leftNavSkipLink.addEventListener('click', handleMobileLeftNavSkipLinkClick)
  }

  const hideNav = (e) => toggleNav(e, false)
  const inLeftnav = (element) => nav.contains(element)
  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches

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

  const isActive = (element) => element?.classList.contains('is-active')

  const setTabindex = (link) => {
    if (!inLeftnav(link)) {
      const tabIndex = link.tabIndex
      const linkPath = getXPath(link)
      link.removeAttribute('tabindex')
      if (isActive(nav)) {
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
    const active = isActive(nav)
    mobileNavFocusTrapper.tabIndex = active ? 0 : -1
    active ? mobileNavFocusTrapper.focus() : toolbarMenuButton.focus()
  }

  const toggleNav = (e, override) => {
    let navOperation = 'toggle'
    if (override !== undefined) navOperation = override ? 'add' : 'remove'
    nav.classList[navOperation]('is-active')

    const miscOperation = isActive(nav) ? 'add' : 'remove'
    body.classList[miscOperation]('mobile', 'no-scroll')
    backdrop.classList[miscOperation]('mobile', 'show')
    navCloseButton.classList[isActive(nav) ? 'remove' : 'add']('hide')

    toggleTabIndexOutsideNav()
    toggleFocus()
    e.stopPropagation()
  }

  const toggleTabIndexOutsideNav = () => {
    const links = document.querySelectorAll('a, button, select, .tooltip, .menu-ham')
    links.forEach((link) => setTabindex(link))
  }

  addListeners(backdrop, toolbarMenuButton, navCloseButton, skipLinks)
})()
