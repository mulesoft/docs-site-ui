;(() => {
  'use strict'

  const breadcrumbs = document.querySelectorAll('ol.breadcrumbs')
  if (!breadcrumbs.length) return

  const breadcrumbsToggleButton = document.querySelector('button.breadcrumbs-toggle')
  const secondaryBreadcrumbsDrawer = document.querySelector('.secondary-breadcrumbs-drawer')

  const [expandTrue, expandFalse] = ['add', 'remove']
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

    const handleScroll = () => { if (!isBigScreenSize()) setDefaultDrawerState() }

    breadcrumbsToggleButton.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
  }

  const applyOriginalExpandState = () => toggleDrawer(originalExpandState)
  const hideDrawer = () => toggleDrawer(false)
  const hideToggleButton = () => toggleDisplay(breadcrumbsToggleButton, false)
  const hide = (toolbar) => toolbar?.classList.add('toolbar-home')
  const isBigScreenSize = () => window.innerWidth >= 768
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

  const toggleBreadcrumbsItems = () => {
    toggleLastBreadcrumbsItem(document.querySelector('.toolbar ol li:last-child'))
    toggleTheOtherBreadcrumbsItems(document.querySelectorAll('.toolbar ol li:not(:last-child)'))
  }

  const toggleDisplay = (breadcrumbsToggleButton, override) => {
    breadcrumbsToggleButton.style.display = override ? 'flex' : 'none'
  }

  const toggleDrawer = (override) => {
    toggleExpand(breadcrumbsToggleButton, override)
    breadcrumbsToggleButton.ariaExpanded = isExpanded(breadcrumbsToggleButton)
    toggleVisibility(secondaryBreadcrumbsDrawer)
    toggleBreadcrumbsItems()
    scrollRight(breadcrumbs)
  }

  const toggleExpand = (element, override) => {
    let operation = 'toggle'
    if (override !== undefined) operation = override ? expandTrue : expandFalse
    element.classList[operation]('expanded')
  }

  const toggleLastBreadcrumbsItem = (lastBreadcrumbItem) => {
    const operation = isExpanded(breadcrumbsToggleButton) ? expandTrue : expandFalse
    lastBreadcrumbItem.classList[operation]('last-breadcrumb-item')
  }

  const toggleTheOtherBreadcrumbsItems = (elements) => toggleVisibility(elements, false)

  const toggleVisibility = (object, override) => {
    let operation
    if (override !== undefined) {
      operation = override ? expandTrue : expandFalse
    } else {
      operation = isExpanded(breadcrumbsToggleButton) ? expandFalse : expandTrue
    }
    if (isList(object)) {
      object.forEach((element) => element.classList[operation]('hide'))
    } else {
      object.classList[operation]('hide')
    }
  }

  const unsetOriginalExpandState = () => { originalExpandState = undefined }

  if (isHomePage()) {
    hide(document.querySelector('.toolbar'))
  } else {
    addListeners()
    scrollRight(breadcrumbs)
  }
})()
