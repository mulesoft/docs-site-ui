;(() => {
  'use strict'

  const doc = document.querySelector('.doc')
  const sidebar = document.querySelector('.toc-sidebar')
  const main = document.querySelector('.main')
  const startOfContent = doc?.querySelector('h1.page + *')
  const noticeBanner = document.querySelector('.notice-banner')
  const topBanner = document.querySelector('.top-banner')

  let dropdownArrow
  let isSelectDropdownExpanded = false
  let lastActiveFragment
  let menu
  const links = {}

  const addDropdownArrowAttributes = (dropdownArrow) => {
    dropdownArrow.alt = ''
    dropdownArrow.ariaLabel = 'Expand page contents'
    dropdownArrow.classList.add('select-dropdown-arrow')
    dropdownArrow.src = `${document.getElementById('site-script').dataset.uiRootPath}/img/icons/dropdown-arrow.svg`
    dropdownArrow.role = 'button'
  }

  const addSelectWrap = (startOfContent) => {
    if (startOfContent) {
      const options = generateList(headings)
      handleOptions(options)
      const selectWrap = createSelectWrapper(options)
      doc.insertBefore(selectWrap, startOfContent)
    }
  }

  const adjustForBanners = (scrollValue) => {
    if (existsAndNotHidden(noticeBanner)) scrollValue -= noticeBanner.offsetHeight
    if (existsAndNotHidden(topBanner)) scrollValue -= topBanner.offsetHeight
    return scrollValue
  }

  const addChangeListener = (options) => {
    options.addEventListener('click', () => updateExpandState())
    options.addEventListener('blur', () => {
      if (isSelectDropdownExpanded) updateExpandState()
    })
    options.addEventListener('keypress', (e) => {
      if (isSpaceKey(e)) updateExpandState()
    })
    options.addEventListener('change', (e) => {
      const thisOptions = e.currentTarget.options
      scrollTo(thisOptions[thisOptions.selectedIndex].value)
    })
  }

  const createDropdownArrow = () => {
    dropdownArrow = document.createElement('img')
    addDropdownArrowAttributes(dropdownArrow)
    return dropdownArrow
  }

  const createJumpToLabel = () => {
    const jumpTo = document.createElement('option')
    jumpTo.innerHTML = 'Jump to…'
    jumpTo.setAttribute('disabled', true)
    return jumpTo
  }

  const createSelectWrapper = (options) => {
    const selectWrap = document.createElement('div')
    selectWrap.classList.add('select-wrapper')
    selectWrap.appendChild(options)
    selectWrap.appendChild(createDropdownArrow())
    return selectWrap
  }

  const handleOptions = (options) => {
    options.className = 'toc toc-embedded select'
    options.insertBefore(createJumpToLabel(), options.firstChild)
    addChangeListener(options)
  }

  const updateExpandState = () => {
    isSelectDropdownExpanded = !isSelectDropdownExpanded
    dropdownArrow.ariaLabel = isSelectDropdownExpanded ? 'Collapse page content' : 'Expand page content'
  }

  const createToc = (sidebar) => {
    createTocMenuDiv(sidebar)
    if (sidebar) window.addEventListener('scroll', () => highlightOnScroll(doc, menu, headings))
    addSelectWrap(startOfContent)
  }

  const createTocMenuDiv = (sidebar) => {
    menu = sidebar?.querySelector('.toc-menu') || document.createElement('div')
    menu.className = 'toc-menu'
    menu.appendChild(parseHeadingsIntoList(links))
  }

  const existsAndNotHidden = (element) => element && !element.classList.contains('hide')
  const find = (selector, from) => toArray((from || document).querySelectorAll(selector))

  const fixInitialScrollPosition = () => {
    window.addEventListener('load', () => {
      if (urlHasAnchor()) {
        let scrollValue = isBigScreenSize ? -30 : -80
        scrollValue = adjustForBanners(scrollValue)
        window.scrollBy(0, scrollValue)
      }
    })
  }

  const generateList = (headings) => {
    return headings.reduce((accum, heading) => {
      const option = toArray(heading.childNodes).reduce((target, child) => {
        if (child.nodeName !== 'A') {
          target.appendChild(child.cloneNode(true))
        }
        return target
      }, document.createElement('option'))
      option.value = `#${heading.id}`
      accum.appendChild(option)
      return accum
    }, document.createElement('select'))
  }

  const highlightOnScroll = (doc, menu, headings) => {
    // NOTE equivalent to: doc.parentNode.getBoundingClientRect().top + window.pageYOffset
    const targetPosition = doc.parentNode.offsetTop
    let activeFragment
    headings.some((heading) => {
      if (heading.getBoundingClientRect().top < targetPosition) activeFragment = `#${heading.id}`
    })
    if (activeFragment) {
      if (lastActiveFragment) {
        links[lastActiveFragment].classList.remove('is-active')
        links[lastActiveFragment].removeAttribute('aria-current')
      }
      const activeLink = links[activeFragment]
      activeLink.classList.add('is-active')
      activeLink.ariaCurrent = true
      if (menu.scrollHeight > menu.offsetHeight) {
        menu.scrollTop = Math.max(0, activeLink.offsetTop + activeLink.offsetHeight - menu.offsetHeight)
      }
      lastActiveFragment = activeFragment
    } else if (lastActiveFragment) {
      links[lastActiveFragment].classList.remove('is-active')
      links[lastActiveFragment].removeAttribute('aria-current')
      lastActiveFragment = undefined
    }
  }

  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches
  const isSpaceKey = (e) => e.charCode === 32
  const markAsNoSidebar = (element) => {
    if (element) element.classList.add('no-sidebar')
  }
  const notEmpty = (headings) => headings.length > 0

  const parseHeadingsIntoList = (links) => {
    return headings.reduce((accum, heading) => {
      const link = toArray(heading.childNodes).reduce((target, child) => {
        if (child.nodeName !== 'A') {
          target.appendChild(child.cloneNode(true))
        }
        return target
      }, document.createElement('a'))
      links[(link.href = `#${heading.id}`)] = link
      const listItem = document.createElement('li')
      listItem.appendChild(link)
      accum.appendChild(listItem)
      return accum
    }, document.createElement('ol'))
  }

  const removeTOCBlock = (sidebar) => {
    if (sidebar) {
      sidebar.removeChild(sidebar.querySelector('.aside-toc'))
      sidebar.removeChild(sidebar.querySelector('.toc-title'))
    }
  }

  const scrollTo = (urlHashValue) => {
    window.location.hash = urlHashValue
    window.scrollBy(0, adjustForBanners(-100))
  }

  const toArray = (collection) => [].slice.call(collection)
  const urlHasAnchor = () => window.location.hash.length

  const headings = find('.sect1 > h2[id]', doc)

  if (!doc || !sidebar) {
    markAsNoSidebar(main)
  } else {
    if (!notEmpty(headings)) {
      removeTOCBlock(sidebar)
    } else {
      createToc(sidebar)
    }
  }

  fixInitialScrollPosition()
})()
