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
      this.mobileNavFocusTrapper = document.querySelector('.mobile-nav-focus-trapper')
      this.tabindexStoreMap = {}
    }

    addNavToggleListeners () {
      if (this.backdrop) {
        this.backdrop.addEventListener('click', (e) => this.hideNav(e))
      }
      if (this.toolbarMenuButton) {
        this.toolbarMenuButton.addEventListener('click', (e) => this.toggleNav(e))
      }
      if (this.navCloseButton) {
        this.navCloseButton.addEventListener('click', (e) => this.toggleNav(e))
      }
      if (this.toolbarSearchButton) {
        this.toolbarSearchButton.addEventListener('click', (e) => {
          this.toggleNav(e)
          this.focusOnMobileNavSearchBox()
        })
      }
      if (this.leftNavSkipLink) {
        // this takes precedence than the normal skip link listener in 15-skiplink-listeners.js
        this.leftNavSkipLink.addEventListener('click', (e) => {
          if (!isBigScreenSize()) this.toggleNav(e)
        })
      }
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          if (this.mobileNavIsActive()) {
            this.hideNav(e)
          } else {
            this.toggleTabIndexOutsideNav()
          }
          this.toggleFocus()
        }
      })
    }

    hideNav (e) {
      this.toggleNav(e, false)
    }

    toggleFocus () {
      if (this.mobileNavFocusTrapper) {
        if (this.mobileNavIsActive()) {
          this.mobileNavFocusTrapper.tabIndex = 0
          this.mobileNavFocusTrapper.focus()
        } else {
          this.mobileNavFocusTrapper.tabIndex = -1
          this.toolbarMenuButton.focus()
        }
      }
    }

    focusOnMobileNavSearchBox () {
      if (this.mobileNavIsActive()) {
        const searchBox = this.getFocusableSearchBox()
        if (searchBox) {
          searchBox.focus()
        } else {
          this.toggleFocus()
        }
      }
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

    mobileNavIsActive () {
      return this.nav.classList.contains('is-active')
    }

    setTabindex (link) {
      if (!this.inLeftnav(link)) {
        const tabIndex = link.tabIndex
        const linkPath = getXPath(link)
        link.removeAttribute('tabindex')
        if (this.mobileNavIsActive()) {
          console.log('hiding tabindex')
          if (!(linkPath in this.tabindexStoreMap)) {
            this.tabindexStoreMap[linkPath] = tabIndex
          }
          link.tabIndex = -1
        } else {
          console.log('resetting tabindex')
          if (linkPath in this.tabindexStoreMap && this.tabindexStoreMap[linkPath] != null) {
            link.tabIndex = this.tabindexStoreMap[linkPath]
            this.tabindexStoreMap[linkPath] = null
          }
        }
      }
    }

    toggleNav (e, override) {
      if (override == null) {
        this.nav.classList.toggle('is-active')
      } else {
        switch (override) {
          case true:
            this.nav.classList.add('is-active')
            break
          case false:
            this.nav.classList.remove('is-active')
            break
          default:
            break
        }
      }

      if (this.mobileNavIsActive()) {
        console.log('unhiding nav')
        this.body.classList.add('mobile')
        this.body.classList.add('no-scroll')
        this.backdrop.classList.add('mobile')
        this.backdrop.classList.add('show')
        this.navCloseButton.classList.remove('hide')
      } else {
        console.log('hiding nav')
        this.body.classList.remove('mobile')
        this.body.classList.remove('no-scroll')
        this.backdrop.classList.remove('mobile')
        this.backdrop.classList.remove('show')
        this.navCloseButton.classList.add('hide')
      }

      this.toggleTabIndexOutsideNav()
      this.toggleFocus()
      e.stopPropagation()
    }

    toggleTabIndexOutsideNav () {
      const links = document.querySelectorAll('a, button, select, .tooltip, .menu-ham')
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

  // source:
  // https://stackoverflow.com/questions/2631820/
  // how-do-i-ensure-saved-click-coordinates-can-be-reload-to-the-same-place-even-if/2631931
  const getXPath = (element) => {
    if (element.id !== '') {
      return 'id("' + element.id + '")'
    }

    if (element === document.body) {
      return element.tagName
    }

    let ix = 0
    const siblings = element.parentNode.childNodes
    for (const sibling of siblings) {
      if (sibling === element) {
        return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']'
      }
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++
      }
    }
  }

  const isBigScreenSize = () => {
    return window.innerWidth >= 768
  }

  const mobileNav = new MobileNav()
  mobileNav.addNavToggleListeners()
})()
