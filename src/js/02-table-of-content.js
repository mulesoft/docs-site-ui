;(() => {
  'use strict'

  const adjustForBanners = (scrollValue) => {
    if (hasTopBanner()) scrollValue -= document.querySelector('.top-banner').offsetHeight
    if (hasNoticeBanner()) scrollValue -= document.querySelector('.notice-banner').offsetHeight
    return scrollValue
  }

  const find = (selector, from) => {
    return toArray((from || document).querySelectorAll(selector))
  }

  const fixInitialScrollPosition = () => {
    window.addEventListener('load', () => {
      if (urlHasAnchor()) {
        let scrollValue = isBigScreenSize ? -50 : -100
        scrollValue = adjustForBanners(scrollValue)
        window.scrollBy(0, scrollValue)
      }
    })
  }

  const hasNoticeBanner = () => {
    const noticeBanner = document.querySelector('.notice-banner')
    if (noticeBanner) {
      return !noticeBanner.classList.contains('hide')
    }
    return false
  }

  const hasTopBanner = () => {
    const topBanner = document.querySelector('.top-banner')
    if (topBanner) {
      return !topBanner.classList.contains('hide')
    }
    return false
  }

  const isBigScreenSize = () => {
    return window.innerWidth >= 768
  }

  const isSpaceKey = (e) => {
    return e.charCode === 32
  }

  const scrollTo = (urlHashValue) => {
    window.location.hash = urlHashValue
    window.scrollBy(0, adjustForBanners(-100))
  }

  const toArray = (collection) => {
    return [].slice.call(collection)
  }

  const urlHasAnchor = () => {
    return window.location.hash.length
  }

  class Viewport {
    constructor () {
      this.doc = document.querySelector('.doc')
      this.main = document.querySelector('.main')
      this.sidebar = document.querySelector('.toc-sidebar')
      this.headings = find('.sect1 > h2[id]', this.doc)
      this.startOfContent = this.doc?.querySelector('h1.page + *')

      this.isSelectDropdownExpanded = false
      this.lastActiveFragment = undefined
      this.menu = undefined
      this.links = {}
    }

    addChangeListener () {
      this.options.addEventListener('change', (e) => {
        const thisOptions = e.currentTarget.options
        scrollTo(thisOptions[thisOptions.selectedIndex].value)
      })

      this.options.addEventListener('click', (_e) => {
        this.updateExpandState()
      })

      this.options.addEventListener('blur', (_e) => {
        if (this.isSelectDropdownExpanded) this.updateExpandState()
      })

      this.options.addEventListener('keypress', (e) => {
        if (isSpaceKey(e)) this.updateExpandState()
      })
    }

    addSelectWrap () {
      if (this.startOfContent) {
        // generate list
        this.options = this.headings.reduce((accum, heading) => {
          const option = toArray(heading.childNodes).reduce((target, child) => {
            if (child.nodeName !== 'A') {
              target.appendChild(child.cloneNode(true))
            }
            return target
          }, document.createElement('option'))
          option.value = '#' + heading.id
          accum.appendChild(option)
          return accum
        }, document.createElement('select'))

        this.createSelectWrapper()
        this.createDropdownArrow()
        this.createJumpToLabel()
        this.addChangeListener()

        this.doc.insertBefore(this.selectWrap, this.startOfContent)
      }
    }

    createDropdownArrow () {
      const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
      this.dropdownArrow = document.createElement('img')
      this.dropdownArrow.classList.add('select-dropdown-arrow')
      this.dropdownArrow.src = `${uiRootPath}/img/icons/dropdown-arrow.svg`
      this.dropdownArrow.alt = ''
      this.dropdownArrow.ariaLabel = 'Expand page contents'
      this.dropdownArrow.role = 'button'
      this.selectWrap.appendChild(this.dropdownArrow)
    }

    createJumpToLabel () {
      const jumpTo = document.createElement('option')
      jumpTo.innerHTML = 'Jump to…'
      jumpTo.setAttribute('disabled', true)
      this.options.insertBefore(jumpTo, this.options.firstChild)
      this.options.className = 'toc toc-embedded select'
    }

    createSelectWrapper () {
      this.selectWrap = document.createElement('div')
      this.selectWrap.classList.add('select-wrapper')
      this.selectWrap.appendChild(this.options)
    }

    createToc () {
      this.createTocMenuDiv()
      if (this.sidebar) {
        window.addEventListener('scroll', (_e) => {
          this.highlightOnScroll()
        })
      }

      this.addSelectWrap()
    }

    createTocMenuDiv () {
      const listOfHeadings = this.parseHeadingsIntoList()
      if (!(this.menu = this.sidebar && this.sidebar.querySelector('.toc-menu'))) {
        this.menu = document.createElement('div')
        this.menu.className = 'toc-menu'
      }
      this.menu.appendChild(listOfHeadings)
    }

    hasHeadings () {
      return this.headings.length > 0
    }

    markMainAsNoSidebar () {
      if (this.main) {
        this.main.classList.add('no-sidebar')
      }
    }

    highlightOnScroll () {
      // NOTE equivalent to: doc.parentNode.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = this.doc.parentNode.offsetTop
      let activeFragment
      this.headings.some((heading) => {
        if (heading.getBoundingClientRect().top < targetPosition) {
          activeFragment = '#' + heading.id
        } else {
          return true
        }
      })
      if (activeFragment) {
        if (this.lastActiveFragment) {
          this.links[this.lastActiveFragment].classList.remove('is-active')
          this.links[this.lastActiveFragment].removeAttribute('aria-current')
        }
        const activeLink = this.links[activeFragment]
        activeLink.classList.add('is-active')
        activeLink.ariaCurrent = 'true'
        if (this.menu.scrollHeight > this.menu.offsetHeight) {
          this.menu.scrollTop = Math.max(0, activeLink.offsetTop + activeLink.offsetHeight - this.menu.offsetHeight)
        }
        this.lastActiveFragment = activeFragment
      } else if (this.lastActiveFragment) {
        this.links[this.lastActiveFragment].classList.remove('is-active')
        this.links[this.lastActiveFragment].removeAttribute('aria-current')
        this.lastActiveFragment = undefined
      }
    }

    parseHeadingsIntoList () {
      return this.headings.reduce((accum, heading) => {
        var link = toArray(heading.childNodes).reduce((target, child) => {
          if (child.nodeName !== 'A') {
            target.appendChild(child.cloneNode(true))
          }
          return target
        }, document.createElement('a'))
        this.links[(link.href = '#' + heading.id)] = link
        var listItem = document.createElement('li')
        listItem.appendChild(link)
        accum.appendChild(listItem)
        return accum
      }, document.createElement('ol'))
    }

    removeTOCBlock () {
      if (this.sidebar) this.sidebar.removeChild(this.sidebar.querySelector('.aside-toc'))
    }

    updateExpandState () {
      this.isSelectDropdownExpanded = !this.isSelectDropdownExpanded
      this.dropdownArrow.ariaLabel = this.isSelectDropdownExpanded ? 'Collapse page content' : 'Expand page content'
    }
  }

  const viewport = new Viewport()
  if (!viewport.doc || !viewport.sidebar) {
    viewport.markMainAsNoSidebar()
  } else {
    if (!viewport.hasHeadings()) {
      viewport.removeTOCBlock()
    } else {
      viewport.createToc()
    }
  }

  fixInitialScrollPosition()
})()
