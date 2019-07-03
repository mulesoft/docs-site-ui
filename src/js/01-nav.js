;(function () {
  'use strict'

  function buildNav (nav, data, page, path) {
    var navList = document.createElement('ol')
    navList.className = 'nav-list'
    var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    chevron.setAttribute('class', 'svg') // className property is read-only on an SVG
    chevron.setAttribute('viewBox', '0 0 30 30')
    chevron.setAttribute('width', '30')
    chevron.setAttribute('height', '30')
    var svgPath = document.createElementNS(chevron.namespaceURI, 'path')
    svgPath.setAttribute('d', 'M15.003 21.284L6.563 9.232l1.928-.516 6.512 9.299 6.506-9.299 1.928.516-8.434 12.052z')
    chevron.appendChild(svgPath)
    var pageNavItem
    data.splice(0, data.length).forEach(function (product) {
      var productName = product.name
      var productForPage = productName === page.product
      var navItem = document.createElement('li')
      var active
      if (productForPage) {
        pageNavItem = navItem
        !path.active.length && product.url === page.url && (active = true) && path.active.push(navItem)
      }
      navItem.className = active ? 'nav-li active' : 'nav-li'
      navItem.dataset.depth = 0
      navItem.dataset.product = productName
      var productHeading = document.createElement('div')
      productHeading.className = 'flex align-center justify-justified'
      var productLink = document.createElement('a')
      productLink.className = 'flex grow strong link nav-link nav-heading'
      var productIcon = document.createElement('img')
      productIcon.className = 'icon no-pointer'
      productIcon.src = page.uiRootPath + '/img/icons/' + productName + '.svg'
      productLink.appendChild(productIcon)
      productLink.appendChild(document.createTextNode(' ' + product.title))
      productHeading.appendChild(productLink)
      if (product.versions.length > 1) {
        var currentVersion = product.versions[0].version
        var versionButton = document.createElement('button')
        versionButton.className = 'flex align-center shrink button versions'
        versionButton.dataset.product = productName
        var versionLabel = document.createElement('span')
        versionLabel.className = 'version-label'
        versionLabel.appendChild(document.createTextNode(currentVersion))
        versionButton.appendChild(versionLabel)
        versionButton.appendChild(document.createTextNode(' '))
        versionButton.appendChild(chevron.cloneNode(true))
        var versionMenu = document.createElement('div')
        versionMenu.className = 'popover version-popover'
        var currentVersionList = document.createElement('ol')
        currentVersionList.className = 'ol'
        var currentVersionHeading = document.createElement('li')
        currentVersionHeading.className = 'li-heading'
        currentVersionHeading.appendChild(document.createTextNode('Current version'))
        currentVersionList.appendChild(currentVersionHeading)
        var currentVersionItem = document.createElement('li')
        currentVersionItem.className = 'flex align-center justify-justified li version'
        currentVersionItem.dataset.product = productName
        currentVersionItem.dataset.version = currentVersion
        currentVersionItem.appendChild(document.createTextNode(currentVersion))
        currentVersionList.appendChild(currentVersionItem)
        versionMenu.appendChild(currentVersionList)
        var previousVersionsList = document.createElement('ol')
        var previousVersionsHeading = document.createElement('li')
        previousVersionsHeading.className = 'li-heading'
        previousVersionsHeading.appendChild(document.createTextNode('Previous versions'))
        previousVersionsList.appendChild(previousVersionsHeading)
        product.versions.slice(1).forEach(function (version) {
          var previousVersionItem = document.createElement('li')
          previousVersionItem.className = 'flex align-center justify-justified li version'
          previousVersionItem.dataset.product = productName
          previousVersionItem.dataset.version = version.version
          previousVersionItem.appendChild(document.createTextNode(version.version))
          previousVersionsList.appendChild(previousVersionItem)
        })
        versionMenu.appendChild(previousVersionsList)
        versionButton.appendChild(versionMenu)
        productHeading.appendChild(versionButton)
        setPinnedVersion(versionButton, { product: productName }, navItem)
        if (productForPage) {
          initVersionSelector(versionButton, versionMenu)
        } else {
          var buildNavForProductAndInitVersionSelector = function () {
            versionButton.removeEventListener('click', buildNavForProductAndInitVersionSelector)
            versionButton.removeEventListener('touchend', buildNavForProductAndInitVersionSelector)
            buildNavForProduct(nav, navItem, product, page)
            initVersionSelector(versionButton, versionMenu, true)
          }
          versionButton.addEventListener('click', buildNavForProductAndInitVersionSelector)
          versionButton.addEventListener('touchend', buildNavForProductAndInitVersionSelector)
        }
      }
      navItem.appendChild(productHeading)
      if (productForPage) {
        productLink.addEventListener('click', toggleNav)
        productLink.addEventListener('touchend', toggleNav)
        buildNavForProduct(nav, navItem, product, page, { active: path.active, current: [navItem] })
      } else {
        var buildNavForProductAndToggle = function (e) {
          productLink.removeEventListener('click', buildNavForProductAndToggle)
          productLink.removeEventListener('touchend', buildNavForProductAndToggle)
          buildNavForProduct(nav, navItem, product, page)
          toggleNav(e)
          productLink.addEventListener('click', toggleNav)
          productLink.addEventListener('touchend', toggleNav)
        }
        productLink.addEventListener('click', buildNavForProductAndToggle)
        productLink.addEventListener('touchend', buildNavForProductAndToggle)
      }
      navList.appendChild(navItem)
    })
    nav.appendChild(navList)
    // NOTE we could mark active when navigation is built if we appended children to parent eagerly
    if (path.active.length) {
      path.active.forEach(function (it) {
        it.classList.add('active')
        if (it.parentNode.classList.contains('parent')) it.parentNode.style.display = ''
      })
    } else if (pageNavItem) {
      pageNavItem.classList.add('active')
    } else {
      var notice = document.createElement('div')
      notice.className = 'nav-list nav-heading'
      notice.appendChild(document.createTextNode('Site navigation data not found.'))
      nav.replaceChild(notice, navList)
    }
  }

  function buildNavForProduct (nav, navItem, product, page, path) {
    if (navItem.classList.contains('is-loaded')) return
    navItem.classList.add('is-loaded')
    product.versions.forEach(function (version) {
      var items = ((version.sets || [])[0] || {}).items || [] // only consider items in first menu
      if (items.length) buildNavTree(nav, navItem, product.name, version.version, items, 1, page, path)
    })
  }

  function buildNavTree (nav, parent, productName, version, items, level, page, path) {
    var navList = document.createElement('ol')
    navList.className = 'nav-list parent'
    if (level === 1) {
      if (!(productName === page.product && version === page.version)) navList.style.display = 'none'
      navList.dataset.product = productName
      navList.dataset.version = version
    } else if (!parent.classList.contains('active')) {
      navList.style.display = 'none'
    }
    items.forEach(function (item) {
      var navItem = document.createElement('li')
      var active
      if (path && !path.active.length) {
        if (item.url === page.url && productName === page.product && version === page.version && (active = true)) {
          path.current.concat(navItem).forEach(function (activeItem) {
            path.active.push(activeItem)
          })
        }
      }
      navItem.className = active ? 'nav-li active' : 'nav-li'
      navItem.dataset.depth = level
      if (item.items) {
        var navToggle = document.createElement('button')
        navToggle.className = 'subnav-toggle'
        navItem.appendChild(navToggle)
        navToggle.addEventListener('click', toggleSubnav)
        navToggle.addEventListener('touchend', toggleSubnav)
      }
      if (item.url) {
        var navLink = document.createElement('a')
        navLink.className =
          'flex shrink align-center link nav-link' + (active ? ' active' : '') + (item.items ? ' nav-nested' : '')
        if (item.urlType === 'external') {
          navLink.href = item.url
          navLink.target = '_blank'
        } else {
          navLink.href = relativize(page.url, item.url)
        }
        navLink.innerHTML = item.content
        navItem.appendChild(navLink)
      } else {
        var navHeading = document.createElement('span')
        navHeading.className = 'flex grow align-center nav-heading' + (item.items ? ' nav-nested' : '')
        var navHeadingSpan = document.createElement('span')
        navHeadingSpan.className = 'span'
        navHeadingSpan.innerHTML = item.content
        navHeading.appendChild(navHeadingSpan)
        navItem.appendChild(navHeading)
      }
      if (item.items) {
        var nestedPath = path && { active: path.active, current: path.current.concat(navItem) }
        buildNavTree(nav, navItem, productName, version, item.items, level + 1, page, nestedPath)
      }
      navList.appendChild(navItem)
    })
    return parent.appendChild(navList)
  }

  function toggleNav (e, selected, nav) {
    var navItem
    if (!e) {
      var navList, navListQuery
      // on page load (when navigating from the location bar)
      if (selected) {
        navListQuery = '.nav-list[data-product="' + selected.product + '"]'
        var productVersionSelector = nav.querySelector('button[data-product="' + selected.product + '"]')
        if (productVersionSelector) {
          setPinnedVersion(productVersionSelector, selected)
          navListQuery += '[data-version="' + selected.version + '"]'
        }
        if ((navList = nav.querySelector(navListQuery))) {
          scrollToActive(nav, navList)
          window.addEventListener('load', function scrollToActiveOnLoad () {
            window.removeEventListener('load', scrollToActiveOnLoad)
            scrollToActive(nav, navList) // scroll again in case images caused layout to shift
          })
        }
      }
      nav.addEventListener('touchstart', ignoreTouchScroll, { capture: true, passive: true })
      nav.addEventListener('touchmove', ignoreTouchScroll, { capture: true, passive: true })
      nav.addEventListener('touchend', ignoreTouchScroll, { capture: true, passive: true })
      nav.querySelector('.nav-list').classList.add('is-loaded')
    } else if (e.target.classList.contains('nav-link')) {
      // when toggling a product in the sidebar
      navListQuery = (navItem = e.target.parentNode.parentNode).dataset.pinnedVersion
        ? '.nav-list[data-version="' + navItem.dataset.pinnedVersion + '"]'
        : '.nav-list[data-version]'
      navItem.querySelector(navListQuery).style.display = navItem.classList.toggle('active') ? '' : 'none'
      tippy.hideAll()
      window.analytics && window.analytics.track('Toggled Nav', { url: e.target.innerText.trim() })
    } else if (selected) {
      // when changing the selected version
      navItem = nav.querySelector('.nav-li[data-product="' + selected.product + '"]')
      var navLists = navItem.querySelectorAll('.nav-list[data-product]')
      for (var i = 0, l = navLists.length; i < l; i++) navLists[i].style.display = 'none'
      navItem.querySelector('.nav-list[data-version="' + selected.version + '"]').style.display = ''
      navItem.classList.add('active')
      tippy.hideAll()
    }
  }

  function toggleSubnav (e) {
    var navListParent = e.target.parentNode
    var navList = navListParent.lastChild
    if (navListParent.classList.contains('active')) {
      navList.style.display = 'none'
      navListParent.classList.remove('active')
    } else {
      navList.style.display = ''
      navListParent.classList.add('active')
    }
  }

  function scrollToActive (nav, thisList) {
    var focusElement = thisList.querySelector('.nav-link.active') || thisList.previousSibling
    var navRect = nav.getBoundingClientRect()
    var midpoint = (navRect.height - navRect.top) / 2
    var adjustment = focusElement.offsetTop + focusElement.offsetHeight / 2 - midpoint
    if (adjustment > 0) nav.scrollTop = adjustment
  }

  function setPinnedVersion (thisButton, pinned, navItem) {
    var analytics, pinnedVersion
    if ((pinnedVersion = pinned.version)) {
      localStorage.setItem('ms-docs-' + pinned.product, pinnedVersion)
      analytics = window.analytics
    } else if (!(pinnedVersion = localStorage.getItem('ms-docs-' + pinned.product))) {
      return
    }
    ;(navItem || thisButton.parentNode.parentNode).dataset.pinnedVersion = pinnedVersion
    thisButton.querySelector('.version-label').textContent = pinnedVersion
    analytics && analytics.track('Version Pinned', { product: pinned.product, version: pinnedVersion })
  }

  function initVersionSelector (versionButton, versionMenu, show) {
    tippy(versionButton, {
      content: versionMenu,
      role: 'menu',
      duration: [0, 150],
      flip: false,
      interactive: true,
      showOnInit: show,
      offset: '-40, 5',
      onHide: function (instance) {
        instance.popper.classList.remove('shown')
      },
      onHidden: function (instance) {
        unbindVersionEvents(instance.popper)
        instance.popper.classList.add('hide')
      },
      onShow: function (instance) {
        instance.popper.classList.remove('hide')
      },
      onShown: function (instance) {
        bindVersionEvents(instance.popper)
        instance.popper.classList.add('shown')
      },
      placement: 'bottom',
      theme: 'popover-versions',
      touchHold: true, // maps touch as click (for some reason)
      trigger: 'click',
      zIndex: 14, // same as z-nav-mobile
    })
    versionButton.addEventListener(
      'touchstart',
      function (e) {
        if (versionButton._tippy.state.isVisible) {
          versionButton._tippy.hide()
          cancelEvent(e)
        }
      },
      { capture: true, passive: true }
    )
  }

  function switchVersion (e) {
    var thisTippy = document.querySelector('.tippy-popper')._tippy
    var selected = { product: e.target.dataset.product, version: e.target.dataset.version }
    setPinnedVersion(thisTippy.reference, selected)
    toggleNav(e, selected, getNav())
    thisTippy.hide()
    cancelEvent(e)
  }

  function bindVersionEvents (popover) {
    var versions = popover.querySelectorAll('.version')
    for (var i = 0, l = versions.length; i < l; i++) {
      versions[i].addEventListener('click', switchVersion)
      versions[i].addEventListener('touchend', cancelEvent)
    }
  }

  function unbindVersionEvents (popover) {
    var versions = popover.querySelectorAll('.version')
    for (var i = 0, l = versions.length; i < l; i++) {
      versions[i].removeEventListener('click', switchVersion)
      versions[i].removeEventListener('touchend', cancelEvent)
    }
  }

  function cancelEvent (e) {
    e.stopPropagation()
  }

  function ignoreTouchScroll (e) {
    if (e.type === 'touchstart') dragging = false
    else if (e.type === 'touchmove') dragging = true
    else if (e.type === 'touchend') {
      if (dragging) e.stopPropagation()
      dragging = false
    }
  }

  function getPage () {
    var pageProductMeta, head
    if ((pageProductMeta = (head = document.head).querySelector('meta[name=page-component]'))) {
      return {
        product: pageProductMeta.getAttribute('content'),
        version: head.querySelector('meta[name=page-version]').getAttribute('content'),
        url: head.querySelector('meta[name=page-url]').getAttribute('content'),
        uiRootPath: document.getElementById('site-script').dataset.uiRootPath,
      }
    }
  }

  function getNav () {
    return document.querySelector('nav.nav')
  }

  function relativize (from, to) {
    if (!from || to.charAt() === '#') return to
    var hash = ''
    var hashIdx = to.indexOf('#')
    if (~hashIdx) {
      hash = to.substr(hashIdx)
      to = to.substr(0, hashIdx)
    }
    if (from === to) {
      return hash || (to.charAt(to.length - 1) === '/' ? './' : to.substr(to.lastIndexOf('/') + 1))
    } else {
      return (
        (computeRelativePath(from.slice(0, from.lastIndexOf('/')), to) || '.') +
        (to.charAt(to.length - 1) === '/' ? '/' + hash : hash)
      )
    }
  }

  function computeRelativePath (from, to) {
    var fromParts = trimArray(from.split('/'))
    var toParts = trimArray(to.split('/'))
    for (var i = 0, l = Math.min(fromParts.length, toParts.length), sharedPathLength = l; i < l; i++) {
      if (fromParts[i] !== toParts[i]) {
        sharedPathLength = i
        break
      }
    }
    var outputParts = []
    for (var remain = fromParts.length - sharedPathLength; remain > 0; remain--) outputParts.push('..')
    return outputParts.concat(toParts.slice(sharedPathLength)).join('/')
  }

  function trimArray (arr) {
    var start = 0
    var length = arr.length
    for (; start < length; start++) {
      if (arr[start]) break
    }
    if (start === length) return []
    for (var end = length; end > 0; end--) {
      if (arr[end - 1]) break
    }
    return arr.slice(start, end)
  }

  var nav, dragging
  var page = getPage()
  if (page) {
    buildNav((nav = getNav()), window.siteNavigationData || [], page, { active: [], current: [] })
    toggleNav(undefined, page, nav)
  }
})()
