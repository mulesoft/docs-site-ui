;(() => {
  'use strict'

  const analytics = window.analytics

  const shortcutKeyMap = {
    keyLabel: 'K',
    keyCode: 75,
  }

  const osMap = {
    macintosh: {
      secondaryKey: 'metaKey',
      secondaryKeyLabel: '⌘',
      secondaryKeyLabelLong: 'Command',
    },
    windows: {
      secondaryKey: 'ctrlKey',
      secondaryKeyLabel: 'ctrl',
      secondaryKeyLabelLong: 'Control',
    },
    others: {
      secondaryKey: 'ctrlKey',
      secondaryKeyLabel: 'ctrl',
      secondaryKeyLabelLong: 'Control',
    },
  }

  const addLinkToBackButton = () => {
    const searchPageBackButton = document.querySelector('.search-page-back-button')
    if (searchPageBackButton) {
      const href = getHref()
      const helperText = `Navigate to ${href}`
      searchPageBackButton.ariaLabel = helperText
      searchPageBackButton.title = helperText
      searchPageBackButton.addEventListener('click', (e) => {
        window.location.href = href
        e.preventDefault()
      })
    }
  }

  const getHref = () => {
    return document.referrer.length > 0 ? document.referrer : document.location.origin
  }

  const getOS = () => {
    let clientOS = 'others'
    const userAgent = navigator.userAgent.toLowerCase()
    Object.keys(osMap).forEach((os) => {
      if (userAgent.indexOf(os) !== -1) clientOS = os
    })
    return clientOS
  }

  const isBigScreenSize = () => {
    return window.innerWidth >= 768
  }

  const isMobileBrowser = () => {
    return /Android|iPhone|iPad/i.test(navigator.userAgent)
  }

  class Facet {
    constructor (atomicFacet, facetShadowRoot, facetDiv) {
      this.atomicFacet = atomicFacet
      this.facetShadowRoot = facetShadowRoot
      this.facetDiv = facetDiv
    }

    updateFacetTexts () {
      if (this.facetDiv) {
        const facetTitle = this.facetDiv.querySelector('h1')
        facetTitle.innerHTML = `Filter by ${facetTitle.innerHTML}`
        const facetInput = this.facetDiv.querySelector('input')
        if (facetInput) facetInput.placeholder = 'Search Products'
      }
    }
  }

  class Pager {
    constructor (atomicPager, pagerShadowRoot, paginationNav) {
      this.atomicPager = atomicPager
      this.pagerShadowRoot = pagerShadowRoot
      this.paginationNav = paginationNav
    }

    makeMoreAssistive () {
      if (this.paginationNav) {
        const previousButton = this.paginationNav.querySelector('button[part="previous-button"]')
        previousButton.setAttribute('aria-label', 'Previous page')

        const nextButton = this.paginationNav.querySelector('button[part="next-button"]')
        nextButton.setAttribute('aria-label', 'Next page')
      }
    }
  }

  class Searchbox {
    constructor (atomicSearchbox, searchboxShadowRoot, searchboxInput) {
      this.atomicSearchbox = atomicSearchbox
      this.searchboxShadowRoot = searchboxShadowRoot
      this.searchboxInput = searchboxInput
      this.searchboxDiv = searchboxShadowRoot.querySelector('div')
      this.searchboxSubmitButton = searchboxShadowRoot.querySelector('button[part="submit-button"]')

      this.clientOS = getOS()
    }

    updateAriaLabelForInput () {
      // .getAttribute('aria-label') is used here instead of .ariaLabel
      // because for some reason, it returned an error in firefox
      this.searchboxInput.ariaLabel = `${this.searchboxInput.getAttribute('aria-label')} For shortcut to search, \
use ${osMap[this.clientOS].secondaryKeyLabelLong} + ${shortcutKeyMap.keyLabel}`
    }

    addAnalyticsListener () {
      this.atomicSearchbox.addEventListener('focus', (_e) => {
        analytics && analytics.track('Clicked Search')
      })
    }

    addKbdElementToSearchbox () {
      const searchboxInnerDiv = this.searchboxDiv.querySelector('div')
      if (!searchboxInnerDiv.querySelector('kbd')) {
        const kbdElement = document.createElement('kbd')
        kbdElement.innerHTML = `${osMap[this.clientOS].secondaryKeyLabel} + ${shortcutKeyMap.keyLabel}`
        // these styles are set here because the element is inside a shadow root and doesn't recognize classes or IDs
        kbdElement.style.background = '#fafafa'
        kbdElement.style.border = '1px solid #c1c1c1'
        kbdElement.style.borderRadius = '0.25em'
        kbdElement.style.boxShadow = '0 1px 0 #c1c1c1, inset 0 0 0 0.1em #fff'
        kbdElement.style.display = isBigScreenSize() ? 'inline-block' : 'none'
        // TODO: use media query to control display instead
        kbdElement.style.fontSize = '.66667rem'
        kbdElement.style.marginRight = '4px'
        kbdElement.style.padding = '0.25em 0.5em'
        kbdElement.style.verticalAlign = 'text-bottom'
        kbdElement.style.whiteSpace = 'nowrap'
        searchboxInnerDiv.appendChild(kbdElement)
      }
    }

    appendKeyboardShortcut () {
      if (this.searchboxInput) {
        this.searchboxInput.placeholder = `${this.searchboxInput.placeholder} (${
          osMap[this.clientOS].secondaryKeyLabel
        } + ${shortcutKeyMap.keyLabel})`
      }
    }

    addKeyboardShortcutToSearchbox () {
      // this.addKbdElementToSearchbox()
      this.appendKeyboardShortcut()
      document.onkeyup = document.onkeydown = (e) => {
        const key = e.which || e.keyCode
        if (e[osMap[this.clientOS].secondaryKey] && key === shortcutKeyMap.keyCode) {
          if (this.searchboxInput) this.searchboxInput.focus()
          e.preventDefault()
        }
      }
    }

    // addSearchboxInputEventListeners () {
    // const focusableElements = this.searchboxDiv.querySelectorAll('a, button, input')
    // focusableElements.forEach((focusableElement) => {
    //   focusableElement.addEventListener('blur', (e) => {
    //     if (!this.searchboxDiv.contains(e.relatedTarget) && isBigScreenSize()) {
    //       const kbd = this.searchboxDiv.querySelector('kbd')
    //       if (kbd) kbd.style.display = 'inline-block'
    //     }
    //     e.preventDefault()
    //   })
    // })
    // }

    makeMoreAssistive () {
      this.updateInput()
      this.updateSubmitButton()
    }

    toggleSubmitButtonDisabled (e, force) {
      if (this.searchboxInput) {
        if (force) {
          this.atomicSearchbox.setAttribute('disable-search', force)
        } else {
          this.atomicSearchbox.setAttribute('disable-search', this.searchboxInput.value.length === 0)
        }
      }
      if (e) e.preventDefault()
    }

    updateInput () {
      if (this.searchboxInput) {
        this.searchboxInput.placeholder = 'Search Docs'
        // .getAttribute('aria-label') is used here instead of .ariaLabel
        // because for some reason, it returned an error in firefox
        this.searchboxInput.ariaLabel = this.searchboxInput
          .getAttribute('aria-label')
          .replace('Search field', 'Search Doc field')
        if (this.searchboxDiv) {
          if (!isMobileBrowser()) {
            this.addKeyboardShortcutToSearchbox()
            this.updateAriaLabelForInput()
          }
        }
        // this.addSearchboxInputEventListeners()
      }
    }

    updateSubmitButton () {
      if (this.searchboxSubmitButton) {
        this.searchboxSubmitButton.setAttribute('aria-label', 'Search Docs')
      }
    }
  }

  const updateFirstAtomicFacet = () => {
    // this function is set up with retries (via setInterval)
    // because Atomic's shadow root elements often doesn't show up when the page initially loads
    // until they are eventually rendered,
    // so using retries makes sure that the elements are loaded
    let tries = 500
    const updateFacet = setInterval(() => {
      if (--tries <= 0) {
        clearInterval(updateFacet)
      }

      const atomicFacet = document.querySelector('atomic-facet')
      const facetShadowRoot = atomicFacet && atomicFacet.shadowRoot
      if (facetShadowRoot) {
        const facetDiv = facetShadowRoot.querySelector('div[part="facet"]')
        if (facetDiv) {
          const facet = new Facet(atomicFacet, facetShadowRoot, facetDiv)
          try {
            facet.updateFacetTexts()
            clearInterval(updateFacet)
          } catch (error) {
            console.error(error)
          }
        }
      }
    }, 100)
  }

  const updateAtomicPager = () => {
    // this function is set up with retries (via setInterval)
    // because Atomic's shadow root elements often doesn't show up when the page initially loads
    // until they are eventually rendered,
    // so using retries makes sure that the elements are loaded
    let tries = 500
    const updatePager = setInterval(() => {
      if (--tries <= 0) {
        clearInterval(updatePager)
      }

      const atomicPager = document.querySelector('atomic-pager')
      const pagerShadowRoot = atomicPager && atomicPager.shadowRoot
      if (pagerShadowRoot) {
        const paginationNav = pagerShadowRoot.querySelector('nav')
        if (paginationNav) {
          const pager = new Pager(atomicPager, pagerShadowRoot, paginationNav)
          try {
            pager.makeMoreAssistive()
            clearInterval(updatePager)
          } catch (error) {
            console.error(error)
          }
        }
      }
    }, 100)
  }

  const updateAtomicSearchbox = () => {
    // this function is set up with retries (via setInterval)
    // because Atomic's shadow root elements often doesn't show up when the page initially loads
    // until they are eventually rendered,
    // so using retries makes sure that the elements are loaded
    let tries = 500
    const updateSearchbox = setInterval(() => {
      if (--tries <= 0) {
        clearInterval(updateSearchbox)
      }

      const atomicSearchbox = document.querySelector('atomic-search-box')
      const searchboxShadowRoot = atomicSearchbox && atomicSearchbox.shadowRoot
      if (searchboxShadowRoot) {
        const searchboxInput = searchboxShadowRoot.querySelector('input')
        if (searchboxInput) {
          const searchbox = new Searchbox(atomicSearchbox, searchboxShadowRoot, searchboxInput)
          try {
            searchbox.makeMoreAssistive()
            searchbox.addAnalyticsListener()
            clearInterval(updateSearchbox)
          } catch (error) {
            console.error(error)
          }
        }
      }
    }, 100)
  }

  updateFirstAtomicFacet()
  updateAtomicPager()
  updateAtomicSearchbox()
  addLinkToBackButton()
})()
