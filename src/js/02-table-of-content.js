;(() => {
  'use strict'

  const find = (selector, from) => {
    return toArray((from || document).querySelectorAll(selector))
  }

  const toArray = (collection) => {
    return [].slice.call(collection)
  }

  class Viewport {
    constructor (doc, main, sidebar) {
      this.doc = doc
      this.main = main
      this.sidebar = sidebar
      this.headings = find('.sect1 > h2[id]', this.doc)
      this.startOfContent = doc.querySelector('h1.page + *')

      this.lastActiveFragment = undefined
      this.menu = undefined
      this.links = {}
    }

    addSelectWrap () {
      if (this.startOfContent) {
        // generate list
        var options = this.headings.reduce((accum, heading) => {
          var option = toArray(heading.childNodes).reduce((target, child) => {
            if (child.nodeName !== 'A') {
              target.appendChild(child.cloneNode(true))
            }
            return target
          }, document.createElement('option'))
          option.value = '#' + heading.id
          accum.appendChild(option)
          return accum
        }, document.createElement('select'))

        var selectWrap = document.createElement('div')
        selectWrap.classList.add('select-wrapper')
        selectWrap.appendChild(options)

        // create jump to label
        var jumpTo = document.createElement('option')
        jumpTo.innerHTML = 'Jump to…'
        jumpTo.setAttribute('disabled', true)
        options.insertBefore(jumpTo, options.firstChild)
        options.className = 'toc toc-embedded select'

        // jump on change
        options.addEventListener('change', (e) => {
          var thisOptions = e.currentTarget.options
          window.location.hash = thisOptions[thisOptions.selectedIndex].value
        })

        // add to page
        this.doc.insertBefore(selectWrap, this.startOfContent)
      }
    }

    createToc () {
      this.createTocMenuDiv()
      if (this.sidebar) {
        window.addEventListener('scroll', (_e) => {
          this.onScroll()
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
      this.main.classList.add('no-sidebar')
    }

    onScroll () {
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
        }
        var activeLink = this.links[activeFragment]
        activeLink.classList.add('is-active')
        if (this.menu.scrollHeight > this.menu.offsetHeight) {
          this.menu.scrollTop = Math.max(0, activeLink.offsetTop + activeLink.offsetHeight - this.menu.offsetHeight)
        }
        this.lastActiveFragment = activeFragment
      } else if (this.lastActiveFragment) {
        this.links[this.lastActiveFragment].classList.remove('is-active')
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
      if (this.sidebar) {
        this.sidebar.removeChild(this.sidebar.querySelector('.js-toc'))
      }
    }
  }

  const viewport = new Viewport(
    document.querySelector('.doc'),
    document.querySelector('.main'),
    document.querySelector('.toc-sidebar')
  )

  if (!viewport.doc || !viewport.sidebar) {
    viewport.markMainAsNoSidebar()
  } else {
    if (!viewport.hasHeadings()) {
      viewport.removeTOCBlock()
      return
    }

    viewport.createToc()
  }
})()
