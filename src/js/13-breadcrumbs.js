;(() => {
  'use strict'

  const breadcrumbs = document.querySelectorAll('ol.breadcrumbs')
  if (!breadcrumbs.length) return

  const breadcrumbsToggleButton = document.querySelector('button.breadcrumbs-toggle')
  const secondaryBreadcrumbsDrawer = document.querySelector('.secondary-breadcrumbs-drawer')

  let originalExpandState

  const addListeners = () => {
    const handleClick = (e) => {
      toggleDrawer()
      e.stopPropagation()
    }

    const handleResize = () => {
      if (isBigScreenSize()) {
        saveOriginalExpandState()
        hideDrawer()
        hideToggleButton()
      } else {
        setDefaultDrawerState()
      }
    }

    const handleScroll = () => {
      if (!isBigScreenSize()) setDefaultDrawerState()
    }

    breadcrumbsToggleButton.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
  }

  const applyOriginalExpandState = () => toggleDrawer(originalExpandState)

  const hide = (object, yes) => {
    const elements = isList(object) ? object : [object]
    elements.forEach((element) => element.classList.toggle('hide', !yes))
  }

  const hideDrawer = () => toggleDrawer(false)
  const hideToggleButton = () => toggleDisplay(breadcrumbsToggleButton, false)
  const hideToolbar = (toolbar) => toolbar?.classList.add('toolbar-home')
  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches
  const isExpanded = (element) => element?.classList.contains('expanded')
  const isHomePage = (pathname) => /(?:.*\/general\/|^\/$)/.test(pathname)
  const isList = (object) => object.length !== undefined
  const isScrolledDownPast = (header) => header?.offsetHeight < window.pageYOffset
  const originalExpandStateIsSet = () => originalExpandState != null

  const saveOriginalExpandState = () => {
    if (!originalExpandStateIsSet()) originalExpandState = isExpanded(breadcrumbsToggleButton)
  }

  const scrollRight = (elements) => {
    setTimeout(() => {
      elements.forEach((element) => element.scrollTo(element.scrollWidth, 0))
    }, 100)
  }

  const setDefaultDrawerState = () => {
    const marketingHeader = document.querySelector('.ms-com-content')
    if (isScrolledDownPast(marketingHeader)) {
      saveOriginalExpandState()
      showDrawer()
      hideToggleButton()
    } else {
      showToggleButton()
      if (originalExpandStateIsSet()) {
        applyOriginalExpandState()
        unsetOriginalExpandState()
      }
    }
  }

  const showDrawer = () => toggleDrawer(true)
  const showToggleButton = () => toggleDisplay(breadcrumbsToggleButton, true)

  const toggleBreadcrumbsItems = (yes) => {
    const lastBreadcrumbItem = document.querySelector('.toolbar ol li:last-child')
    const otherBreadcrumbItems = document.querySelectorAll('.toolbar ol li:not(:last-child)')
    lastBreadcrumbItem.classList.toggle('last-breadcrumb-item', yes)
    hide(otherBreadcrumbItems, !yes)
  }

  const toggleDisplay = (breadcrumbsToggleButton, override) => {
    breadcrumbsToggleButton.style.display = override ? 'flex' : 'none'
  }

  const toggleDrawer = (yes) => {
    breadcrumbsToggleButton.classList.toggle('expanded', yes)
    const expanded = isExpanded(breadcrumbsToggleButton)
    breadcrumbsToggleButton.ariaExpanded = expanded
    hide(secondaryBreadcrumbsDrawer, expanded)
    toggleBreadcrumbsItems(expanded)
    scrollRight(breadcrumbs)
  }

  const unsetOriginalExpandState = () => {
    originalExpandState = undefined
  }

  const onlyShowFirstBreadcrumbVersion = () => {
    const breadcrumbItems = document.querySelectorAll('.breadcrumbs-item-version')

    for (let i = 1; i < breadcrumbItems.length; i++) {
      breadcrumbItems[i].style.display = 'none'
    }
  }

  if (isHomePage(window.location.pathname)) {
    hideToolbar(document.querySelector('.toolbar'))
  } else {
    scrollRight(breadcrumbs)
    addListeners()
  }
  onlyShowFirstBreadcrumbVersion()
})()
