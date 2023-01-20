;(() => {
  'use strict'

  class MobileNav {
    constructor (backdrop, body, nav, navToggle, navCloseButton) {
      this.backdrop = backdrop
      this.body = body
      this.nav = nav
      this.navToggle = navToggle
      this.navCloseButton = navCloseButton

      this.tabindexStoreMap = {}
    }

    addNavToggleListeners () {
      if (this.backdrop) {
        this.backdrop.addEventListener('click', (e) => this.toggleNav(e))
      }
      if (this.navToggle) {
        this.navToggle.addEventListener('click', (e) => this.toggleNav(e))
      }
      if (this.navCloseButton) {
        this.navCloseButton.addEventListener('click', (e) => this.toggleNav(e))
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
      })
      if (this.navIsActive()) {
        document.querySelector('#search-button').focus()
      }
    }

    inLeftnav (element) {
      return this.nav.contains(element)
    }

    navIsActive () {
      return this.nav.classList.contains('is-active')
    }
  }

  const mobileNav = new MobileNav(
    document.querySelector('.modal-backdrop'),
    document.body,
    document.querySelector('.nav.fit'),
    document.querySelector('.nav-toggle'),
    document.querySelector('.nav-close-button')
  )

  mobileNav.addNavToggleListeners()
})()
