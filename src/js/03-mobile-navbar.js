;(() => {
  'use strict'

  class MobileNav {
    constructor () {
      this.backdrop = document.querySelector('.modal-backdrop')
      this.body = document.body
      this.nav = document.querySelector('.nav.fit')
      this.toolbarMenuButton = document.querySelector('.nav-toggle')
      this.navCloseButton = document.querySelector('.nav-close-button')
      this.toolbarSearchButton = document.querySelector('.toolbar-search-button')
      this.leftNavSkipLink = this.getLeftNavSkipLink()
      this.tabindexStoreMap = {}
    }

    addNavToggleListeners () {
      if (this.backdrop) {
        this.backdrop.addEventListener('click', (e) => this.toggleNav(e))
      }
      if (this.toolbarMenuButton) {
        this.toolbarMenuButton.addEventListener('click', (e) => this.toggleNav(e))
      }
      if (this.navCloseButton) {
        this.navCloseButton.addEventListener('click', (e) => {
          this.toggleNav(e)
          this.toolbarMenuButton.focus()
        })
      }
      if (this.toolbarSearchButton) {
        this.toolbarSearchButton.addEventListener('click', (e) => {
          this.toggleNav(e)
          this.focusOnLeftNavFirstItem()
        })
      }
      if (this.leftNavSkipLink) {
        // this takes precedence than the normal skip link listener in 15-skiplink-listeners.js
        this.leftNavSkipLink.addEventListener('click', (e) => {
          if (!isBigScreenSize()) {
            this.toggleNav(e)
          }
        })
      }
    }

    focusOnLeftNavFirstItem () {
      if (this.navIsActive()) {
        const firstItemInLeftNav = this.getFirstItemInLeftNav()
        firstItemInLeftNav.focus()
      }
    }

    getFirstItemInLeftNav () {
      const searchBox = getFocusableSearchBox()
      return searchBox || this.nav.querySelector('a')
    }

    getLeftNavSkipLink () {
      let output
      const skipLinks = document.querySelectorAll('.skip-link')
      skipLinks.forEach((skipLinks) => {
        if (skipLinks.innerHTML.includes('left navigation')) output = skipLinks
      })
      return output
    }

    inLeftnav (element) {
      return this.nav.contains(element)
    }

    navIsActive () {
      return this.nav.classList.contains('is-active')
    }

    setTabindex (link) {
      if (!this.inLeftnav(link)) {
        const tabIndex = link.tabIndex
        link.removeAttribute('tabindex')
        const linkPath = link.outerHTML
        if (linkPath in this.tabindexStoreMap && this.tabindexStoreMap[linkPath] != null) {
          link.tabIndex = this.tabindexStoreMap[linkPath]
          this.tabindexStoreMap[linkPath] = null
        } else {
          this.tabindexStoreMap[linkPath] = tabIndex
          link.tabIndex = -1
        }
      }
    }

    toggleNav (e) {
      if (e.target === this.backdrop && !this.navIsActive()) {
        return
      }
      this.body.classList.toggle('mobile')
      this.body.classList.toggle('no-scroll')
      this.backdrop.classList.toggle('mobile')
      this.backdrop.classList.toggle('show')
      this.nav.classList.toggle('is-active')
      this.navCloseButton.classList.toggle('hide')
      this.toggleTabIndexOutsideNav()
      e.stopPropagation()
    }

    toggleTabIndexOutsideNav () {
      const links = document.querySelectorAll('a, button, .tooltip')
      links.forEach((link) => {
        this.setTabindex(link)
      })
    }
  }

  const getFocusableSearchBox = () => {
    const atomicSearchbox = document.querySelector('atomic-search-box')
    const searchboxShadowRoot = atomicSearchbox && atomicSearchbox.shadowRoot
    if (searchboxShadowRoot) {
      return searchboxShadowRoot.querySelector('input')
    }
  }

  const isBigScreenSize = () => {
    return window.innerWidth >= 768
  }

  const mobileNav = new MobileNav()
  mobileNav.addNavToggleListeners()
})()
