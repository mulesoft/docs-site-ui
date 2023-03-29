;(() => {
  'use strict'

  const toggleClassname = 'breadcrumbs-toggle'
  const expandedBreadcrumbsClassName = 'breadcrumbs-expanded'

  const isHomePage = () => {
    return document.querySelector('#latest-releases') // this is a hacky way to check the homepage
  }

  const hideToolBarAtLargeScreenSize = () => {
    const toolbar = document.querySelector('.toolbar')
    toolbar.classList.add('toolbar-home')
  }

  const isBigScreenSize = () => {
    return window.innerWidth >= 768
  }

  const isScrolledDownPastHeader = () => {
    const marketingHeader = document.querySelector('.ms-com-content')
    return marketingHeader.offsetHeight < window.pageYOffset
  }

  if (isHomePage()) {
    hideToolBarAtLargeScreenSize()
  }

  class Breadcrumbs {
    constructor () {
      this.originalExpandState = undefined
      this.drawer = document.querySelector('.secondary-breadcrumbs-drawer')
      this.toggleButton = document.querySelector(`button.${toggleClassname}`)
    }

    addListeners () {
      if (this.toggleButton) {
        this.toggleButton.addEventListener('click', (e) => {
          this.toggleDrawer()
          e.stopPropagation()
        })

        window.addEventListener('resize', () => {
          if (isBigScreenSize()) {
            this.saveOriginalExpandState()
            this.hideDrawer()
            this.hideToggleButton()
          } else {
            this.setDefaultDrawerState()
          }
        })

        window.addEventListener('scroll', () => {
          if (!isBigScreenSize()) this.setDefaultDrawerState()
        })
      }
    }

    applyOriginalExpandState () {
      this.toggleDrawer(this.originalExpandState)
      this.unsetOriginalExpandState()
    }

    breadcrumbsAreExpanded () {
      return this.toggleButton && this.toggleButton.classList.contains(expandedBreadcrumbsClassName)
    }

    hideDrawer () {
      this.toggleDrawer(false)
    }

    hideToggleButton () {
      this.toggleToggleButton(false)
    }

    originalExpandStateIsSet () {
      return !(this.originalExpandState === null || this.originalExpandState === undefined)
    }

    scrollRight () {
      setTimeout(() => {
        const breadcrumbs = document.querySelectorAll('ol.breadcrumbs')
        breadcrumbs.forEach((breadcrumb) => {
          breadcrumb.scrollTo(breadcrumb.scrollWidth, 0)
        })
      }, 100)
    }

    saveOriginalExpandState () {
      if (!this.originalExpandStateIsSet()) {
        this.originalExpandState = this.breadcrumbsAreExpanded()
      }
    }

    setDefaultDrawerState () {
      if (isScrolledDownPastHeader()) {
        this.saveOriginalExpandState()
        this.showDrawer()
        this.hideToggleButton()
      } else {
        this.showToggleButton()
        if (this.originalExpandStateIsSet()) {
          this.applyOriginalExpandState()
        }
      }
    }

    showDrawer () {
      this.toggleDrawer(true)
    }

    showToggleButton () {
      this.toggleToggleButton(true)
    }

    toggleDrawer (override) {
      this.toggleToggleButtonClass(override)
      this.toggleDrawerVisibility()
      this.updateMainBreadcrumbsContent()
      this.scrollRight()
    }

    toggleDrawerVisibility () {
      if (this.drawer) {
        this.breadcrumbsAreExpanded() ? this.drawer.classList.remove('hide') : this.drawer.classList.add('hide')
      }
    }

    toggleLastBreadcrumbItem () {
      const lastBreadcrumbItem = document.querySelector('.toolbar ol li:last-child')
      if (lastBreadcrumbItem) {
        this.breadcrumbsAreExpanded()
          ? lastBreadcrumbItem.classList.add('last-breadcrumb-item')
          : lastBreadcrumbItem.classList.remove('last-breadcrumb-item')
      }
    }

    updateMainBreadcrumbsContent () {
      const nodes = document.querySelectorAll('.toolbar ol li:not(:last-child)')
      nodes.forEach((node) => {
        this.breadcrumbsAreExpanded() ? node.classList.add('hide') : node.classList.remove('hide')
      })
      this.toggleLastBreadcrumbItem()
    }

    toggleToggleButton (override) {
      if (this.toggleButton) {
        this.toggleButton.style.display = override ? 'flex' : 'none'
      }
    }

    toggleToggleButtonClass (override) {
      if (this.toggleButton) {
        switch (override) {
          case true:
            this.toggleButton.classList.add(expandedBreadcrumbsClassName)
            this.toggleButton.ariaExpanded = false
            break
          case false:
            this.toggleButton.classList.remove(expandedBreadcrumbsClassName)
            this.toggleButton.ariaExpanded = true
            break
          default:
            this.toggleButton.classList.toggle(expandedBreadcrumbsClassName)
            this.toggleButton.ariaExpanded = this.toggleButton.ariaExpanded !== 'true'
            break
        }
      }
    }

    unsetOriginalExpandState () {
      this.originalExpandState = undefined
    }
  }

  const breadcrumbs = new Breadcrumbs()
  breadcrumbs.addListeners()
  breadcrumbs.scrollRight()
})()
