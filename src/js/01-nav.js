/* eslint-disable no-var */
;(() => {
  'use strict'

  const nav = document.querySelector('.nav')
  if (!nav) return

  const homeTitle = MSCX.l10n.getMessage('left-nav-home-title')
  const currentVersion = MSCX.l10n.getMessage('left-nav-current-version')
  const currentAndOnlyVersion = MSCX.l10n.getMessage('left-nav-current-only-version')
  const latestVersion = MSCX.l10n.getMessage('left-nav-latest-version')
  const previousVersions = MSCX.l10n.getMessage('left-nav-previous-versions')

  const addCurrentVersionIndicator = (parentElement, className) => {
    if (!isArchiveSite()) {
      if (!isToolTipDot(parentElement.firstChild)) {
        const tabIndex = parentElement.classList.contains('nav-version-wrapper') ? 0 : -1
        const currentVersionIndicator = createCurrentVersionIndicator(tabIndex, className)
        const versionElement = parentElement.querySelector('.nav-version-label')
          ? parentElement.firstChild.nextSibling
          : parentElement.firstChild
        parentElement.insertBefore(currentVersionIndicator, versionElement)
      }
    }
    return parentElement
  }

  const autoCloseVersionDropdown = (navVersionMenu) => {
    setTimeout(() => {
      if (!navVersionMenu.contains(document.activeElement)) {
        closeActiveVersionMenu()
        setTabIndexForVersions()
      }
    }, 100)
  }

  const computeRelativePath = (from, to) => {
    var fromParts = trimArray(from.split('/'))
    var toParts = trimArray(to.split('/'))
    for (var i = 0, l = Math.min(fromParts.length, toParts.length), sharedPathLength = l; i < l; i++) {
      if (fromParts[i] !== toParts[i]) {
        sharedPathLength = i
        break
      }
    }
    var outputParts = []
    for (var remain = fromParts.length - sharedPathLength; remain > 0; remain--) {
      outputParts.push('..')
    }
    return outputParts.concat(toParts.slice(sharedPathLength)).join('/')
  }

  const createCurrentVersionIndicator = (tabIndex, className) => {
    const currentVersionIndicatorSpan = document.createElement('span')
    currentVersionIndicatorSpan.classList.add(className, 'tooltip-dot')
    currentVersionIndicatorSpan.setAttribute('tabindex', tabIndex)
    tippy(currentVersionIndicatorSpan, {
      arrow: tippy.roundArrow,
      content: latestVersion,
      distance: 100,
      duration: [0, 150],
      maxWidth: 150,
      placement: 'top',
      theme: 'current-version-popover',
      touchHold: true, // maps touch as click (for some reason)
      zIndex: 'var(--z-nav-mobile)',
    })
    return currentVersionIndicatorSpan
  }

  const createElement = (name, attrs, innerHTML) => {
    if (typeof attrs === 'string') {
      innerHTML = attrs
      attrs = undefined
    }
    if (~name.indexOf('.')) {
      var nameParts = name.split('.')
      name = nameParts.shift() || 'div'
      ;(attrs || (attrs = {})).className = nameParts.join(' ')
    }
    var element = document.createElement(name)
    if (attrs) {
      var dataset = attrs.dataset
      if (dataset) {
        delete attrs.dataset
        Object.assign(Object.assign(element, attrs).dataset, dataset)
      } else {
        Object.assign(element, attrs)
      }
    }
    if (innerHTML) element.innerHTML = innerHTML
    return element
  }

  function createSvgElement (attrs, useRef) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('xmlns', svg.namespaceURI)
    svg.setAttribute('width', '1em')
    svg.setAttribute('height', '1em')
    svg.setAttribute('alt', '')
    if (typeof attrs === 'string' && attrs.charAt() === '.') {
      attrs = {
        className: attrs.split('.').slice(1).join(' '),
      }
    }
    if (attrs) {
      var className = attrs.className
      if (className) {
        svg.setAttribute('class', className)
        delete attrs.className
      }
      Object.assign(svg, attrs)
    }
    if (useRef) {
      var use = document.createElementNS(svg.namespaceURI, 'use')
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', useRef)
      svg.appendChild(use)
    }
    return svg
  }

  const getCurrentVersionData = (versions) => {
    return versions.length > 1
      ? versions.find((version) => {
        return !version.prerelease
      }) || versions[0]
      : versions[0]
  }

  const getHeightOnScreen = (element) => {
    const rect = element.getBoundingClientRect()
    if (rect.y <= 0) return rect.height + rect.y
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
    return viewHeight - rect.y
  }

  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches

  const isJPReleaseNotes = (title) => title === 'リリースノート'

  const isVisible = (element) => {
    const rect = element.getBoundingClientRect()
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
  }

  const selectComponents = (patterns, pool, exclude) => {
    return coerceToArray(patterns).reduce((accum, pattern) => {
      if (~pattern.indexOf('*')) {
        var rx = new RegExp('^' + pattern.replace(/[*]/g, '.*?') + '$')
        Object.keys(pool)
          .filter((x) => coerceToArray(exclude).indexOf(x) === -1)
          .forEach((candidate) => {
            if (rx.test(candidate)) {
              accum[candidate] = pool[candidate]
              delete pool[candidate]
            }
          })
      } else if (pattern in pool) {
        accum[pattern] = pool[pattern]
        delete pool[pattern]
      } else if (pattern in accum) {
        const component = accum[pattern] // reinsert previously selected entry
        delete accum[pattern]
        accum[pattern] = component
      } else if (pattern.charAt() === '!' && (pattern = pattern.substr(1)) in accum) {
        delete accum[pattern]
      }
      return accum
    }, {})
  }

  const removeCurrentVersionIndicator = (parentElement) => {
    if (isToolTipDot(parentElement.firstChild)) {
      parentElement.removeChild(parentElement.firstChild)
    }
  }

  const isToolTipDot = (element) => {
    return (
      element?.classList?.contains('tooltip-dot-nav-version') ||
      element?.classList?.contains('tooltip-dot-nav-version-menu')
    )
  }

  const isSpaceOrEnterKey = (keyCode) => {
    return [13, 32].includes(keyCode)
  }

  const hasTopBanner = () => {
    const topBanner = document.querySelector('.top-banner')
    return topBanner && !topBanner.classList.contains('hide')
  }

  const setAriaActiveDescendant = (componentName, version, set) => {
    const combobox = document.querySelector(`#combo-${componentName}`)
    if (combobox) {
      set
        ? combobox.setAttribute('aria-activedescendant', `#${componentName}-${version}`)
        : combobox.removeAttribute('aria-activedescendant')
    }
  }

  const setTabIndexForVersions = () => {
    setTimeout(() => {
      const tabIndex = document.querySelector('.nav-version-menu.is-active') ? 0 : -1
      const navVersionOptions = document.querySelectorAll('.nav-version-option')
      navVersionOptions.forEach((no) => no.setAttribute('tabindex', tabIndex))
      const tooltipDots = document.querySelectorAll('.nav-version-menu .tooltip-dot-nav-version')
      tooltipDots.forEach((td) => td.setAttribute('tabindex', tabIndex))
    }, 200)
  }

  function toggleSubNav () {
    this.classList.toggle('is-active')
    const toggleButton = this.querySelector('.nav-item-toggle')
    if (toggleButton) toggleButton.ariaExpanded = this.classList.contains('is-active')
  }

  function closeActiveVersionMenu (e) {
    const visibleMenu = document.querySelector('.nav-version-menu.is-active')
    if (visibleMenu) {
      hideVersionMenu(visibleMenu, true)
    }
    if (e) trapEvent(e)
  }

  const getBannerHeight = () => {
    const topBanner = document.querySelector('.top-banner')
    return topBanner ? topBanner.offsetHeight : 0
  }

  function hideVersionMenu (menu, force) {
    if (force || menu.classList.contains('is-active')) {
      menu.parentElement.querySelector('.nav-version-wrapper').classList.remove('selector-active')
      menu.classList.add('is-clipped')
      menu.style.maxHeight = 0
      menu.classList.remove('is-active')
      menu.parentElement.querySelector('.nav-version').ariaExpanded = false
      return true
    }
  }

  const inhibitSelectionOnSecondClick = (e) => {
    if (e.detail > 1) e.preventDefault()
  }

  function isSubcomponent (name, componentData) {
    return (
      componentData.unversioned &&
      componentData.nav.items.some(function (candidate) {
        return candidate.name === name
      })
    )
  }

  const trapEvent = (e) => e.stopPropagation()

  const trimArray = (arr) => {
    let start = 0
    const length = arr.length
    let end = length
    for (; start < length; start++) {
      if (arr[start]) break
    }
    if (start === length) return []
    for (; end > 0; end--) {
      if (arr[end - 1]) break
    }
    return arr.slice(start, end)
  }

  const coerceToArray = (val) => (Array.isArray(val) ? val : [val])

  // Add ability to override site type with a query param for ease of testing
  // For JP, you also need to edit the siteProfile in ui-model.yml
  const urlParams = new URLSearchParams(window.location.search);
  const siteTypeOverride = urlParams.get('siteTypeOverride');

  const setTitle = (title) => (isArchiveSite() ? `Archive ${title}` : homeTitle)

  const isArchiveSite = () => siteTypeOverride === 'archive' || window.location.host.includes('archive')
  const isBetaSite = () => isExternalBetaSite() || isInternalBetaSite()
  const isExternalBetaSite = () => siteTypeOverride === 'beta' || window.location.host.includes('beta')
  const isInternalBetaSite = () => siteTypeOverride === 'internal' || window.location.host.includes('dev-docs-internal')
  const isJapaneseSite = () => siteTypeOverride === 'jp' || document.documentElement.lang === 'jp'
  const isLocalBuild = () => siteTypeOverride === 'file' || window.location.href.startsWith('file://')

  const getNavData = () => {
    const components = window.siteNavigationData
    /*
      Normally, we would delete window.siteNavigationData here to clean up.
      But this data is needed for the Coveo scripts later, so keep them and let the Coveo scripts delete.
    */

    const groups = components.groups || [{ root: true, components: ['home', '*'] }]
    const homeUrl = components.homeUrl || document.querySelector('a.home-link')?.getAttribute('href') || '/'
    const subcomponents = components.subcomponents || []

    return { components, groups, homeUrl, subcomponents }
  }

  const moveFocusOnFirstElement = (navItem) => {
    const firstLink = navItem.querySelector('a')
    if (firstLink) firstLink.focus()
  }

  const relativize = (to) => {
    if (!(page.url && to.charAt() === '/')) return to
    var hash = ''
    var hashIdx = to.indexOf('#')
    if (~hashIdx) {
      hash = to.substr(hashIdx)
      to = to.substr(0, hashIdx)
    }
    if (page.url === to) {
      return hash || (to.charAt(to.length - 1) === '/' ? './' : to.substr(to.lastIndexOf('/') + 1))
    } else {
      return (
        (computeRelativePath(page.url.slice(0, page.url.lastIndexOf('/')), to) || '.') +
        (to.charAt(to.length - 1) === '/' ? '/' + hash : hash)
      )
    }
  }

  class Nav {
    constructor (nav) {
      this.nav = nav
      this.navData = getNavData()
    }

    addNavList () {
      this.navGroup.appendChild(this.createNavList(this.groupData.components[0].nav))
    }

    addNavGroupList () {
      if (this.groupData && this.groupData.components) {
        const navList = createElement('ul.nav-list')
        this.groupData.components.forEach((componentData) => {
          navList.appendChild(this.createNavItemForComponent(componentData))
        })
        this.navGroup.appendChild(navList)
      }
    }

    addNavGroupTitle () {
      if (this.groupData && this.groupData.title) {
        this.navGroup.appendChild(createElement('h3.nav-title', this.groupData.title))
      }
    }

    adjustNavHeight (e) {
      if (this.nav) {
        const header = document.querySelector('.ms-com-content-header')
        const footer = document.querySelector('.ms-com-content-footer')
        if (header && footer) {
          let heightValue = 'calc(var(--vh, 1vh) * 100'
          if (isBigScreenSize()) {
            const bannerHeight = getBannerHeight()
            if (isVisible(header)) heightValue += ` - ${getHeightOnScreen(header)}px`
            if (isVisible(footer)) heightValue += ` - ${getHeightOnScreen(footer)}px`
            if (hasTopBanner()) heightValue += ` - ${bannerHeight}px`
          }
          heightValue += ')'
          this.nav.style.height = heightValue
        }
      }

      if (e) e.preventDefault()
    }

    appendArchiveComponent () {
      if (!(isArchiveSite() || isBetaSite() || isJapaneseSite() || isLocalBuild())) {
        if (!this.alreadyHasComponent('archive')) {
          this.navData.components.push({
            name: 'archive',
            title: 'Archived Documentation',
            versions: [
              {
                version: '',
                sets: [
                  {
                    content: 'Archive',
                    url: 'https://archive.docs.mulesoft.com/',
                  },
                ],
              },
            ],
          })
        }
      }
    }

    appendHomeComponent () {
      if (!this.alreadyHasComponent('home')) {
        this.navData.components.push({
          name: 'home',
          title: setTitle(homeTitle),
          versions: [
            {
              version: '',
              sets: [{ content: homeTitle, url: this.navData.homeUrl }],
            },
          ],
        })
      }
    }

    alreadyHasComponent (name) {
      return this.navData.components.some((candidate) => {
        return candidate.name === name
      })
    }

    buildNav () {
      this.reshapeNavData()
      this.createNavGroups()
      this.nav.addEventListener('click', (e) => closeActiveVersionMenu(e))
      window.addEventListener('scroll', (e) => this.adjustNavHeight(e))
      window.addEventListener('resize', (e) => this.adjustNavHeight(e))
      this.adjustNavHeight()
      this.scrollToCurrentPageItem()
    }

    cleanComponents () {
      const components = this.processComponents()
      this.componentPool = Object.assign({}, components)
      this.processSubcomponents(components)
    }

    cleanGroups () {
      const groupIconId = document.getElementById('icon-nav-group') && 'icon-nav-group'
      this.cleanedGroups = this.navData.groups.reduce((groupsAccum, group) => {
        let groupComponents
        groupsAccum.push({
          iconId: groupIconId,
          components: (groupComponents = Object.values(
            selectComponents(group.components, this.componentPool, group.exclude)
          )),
          title: group.title,
          spreadSingleItem: group.spreadSingleItem,
        })
        let component
        if (!groupComponents.length) {
          groupsAccum.pop()
        } else if (groupComponents.length === 1 && (component = groupComponents[0]).unversioned) {
          const items = component.nav.items
          if ((items[0] || {}).url?.includes('/general/')) {
            component.nav.items = items.slice(1)
          }
          component.nav.items.forEach(function (it) {
            const iconId = it.url
              ? 'icon-nav-page' + it.url.replace(/(?:\.html|\/)$/, '').replace(/[/#]/g, '-')
              : 'icon-nav-page-' + component.name + '-' + it.content?.toLowerCase().replace(/ +/g, '-')
            it.iconId = document.getElementById(iconId)
              ? iconId
              : group.spreadSingleItem
                ? 'icon-nav-component'
                : it.iconId
          })
        }
        return groupsAccum
      }, [])
    }

    createNavGroups () {
      this.navGroups = createElement('.nav-groups.scrollbar')
      this.nav.appendChild(this.navGroups)
      this.cleanedGroups.forEach((groupData) => {
        this.groupData = groupData
        this.navGroup = createElement('.nav-group')
        this.addNavGroupTitle()

        this.navGroupHasSingleComponent() ? this.addNavList() : this.addNavGroupList()

        this.navGroups.appendChild(this.navGroup)
      })

      this.navGroups.addEventListener('mousedown', inhibitSelectionOnSecondClick)
    }

    createNavItemForComponent (componentData) {
      const componentName = componentData.name
      const navItem = createElement('li.nav-item', {
        dataset: { component: componentName },
      })
      navItem.appendChild(this.createNavTitle(navItem, componentData))
      let versionData
      if (page.component === componentName) {
        versionData = componentData.versions[page.version]
      } else if (isSubcomponent(page.component, componentData)) {
        versionData = componentData.versions['']
      } else {
        return navItem
      }
      if (versionData.nav) {
        page.scope = navItem.appendChild(this.createNavList(versionData.nav, versionData.version))
      }
      navItem.classList.add('is-active')
      return navItem
    }

    createNavItemToggle (navItemData) {
      const navItemToggle = createElement('button.nav-item-toggle')
      navItemToggle.setAttribute('type', 'button')
      if (navItemData.content) {
        navItemToggle.ariaLabel = `Toggle ${navItemData.content}`
      }
      if (page.navItemToggleIconId) {
        navItemToggle.appendChild(createSvgElement('.icon.nav-item-toggle-icon', '#' + page.navItemToggleIconId))
      }
      return navItemToggle
    }

    createNavLink (navItemData) {
      const navLink = createElement('a.link.nav-text', { href: relativize(navItemData.url) }, navItemData.content)

      if (navItemData.iconId) {
        navLink.classList.add('has-icon')
        const iconElement = createSvgElement('.icon.nav-icon', '#' + navItemData.iconId)
        navLink.insertBefore(iconElement, navLink.firstChild)
      }

      return navLink
    }

    createNavList (navEntryData, version, lineage) {
      const navList = createElement('ul.nav-list')
      if (version) navList.dataset.version = version
      navEntryData.items.forEach((navItemData) => {
        if (navItemData.name) {
          navList.appendChild(this.createNavItemForComponent(navItemData))
          return
        }

        if (!isJPReleaseNotes(navItemData.content)) {
          const navItem = createElement('li.nav-item')
          if (navItemData.url) {
            const navLink = this.createNavLink(navItemData)
            if (navItemData.url === page.url) {
              ;(lineage || []).forEach((el) => {
                el.classList.add('is-active')
              })
              navItem.classList.add('is-active')
              navLink.setAttribute('aria-current', 'page')
            }
            navItem.appendChild(navLink)
          } else {
            navItem.appendChild(createElement('span.nav-text', navItemData.content))
            if (navItemData.items) {
              navItem.lastChild.addEventListener('click', toggleSubNav.bind(navItem))
            }
          }

          if (navItemData.items) {
            const navItemToggle = this.createNavItemToggle(navItemData)
            navItemToggle.ariaExpanded = navItem.classList.contains('is-active')
            navItemToggle.addEventListener('click', toggleSubNav.bind(navItem))
            navItem.insertBefore(navItemToggle, navItem.firstChild)
            navItem.appendChild(this.createNavList(navItemData, undefined, (lineage || []).concat(navItem)))
          }
          navList.appendChild(navItem)
        }
      })
      return navList
    }

    createNavTitle (navItem, componentData) {
      const navTitle = createElement('.nav-title')
      const navLink = ['home', 'archive'].includes(componentData.name)
        ? createElement('a.link.nav-text', componentData.title)
        : createElement('span.link.nav-text', componentData.title)
      navLink.setAttribute('tabindex', '0')
      if (componentData.name === 'home') {
        const homeUrl = componentData.nav.url
        if ((navLink.href = relativize(homeUrl)) === relativize(page.url)) {
          navItem.classList.add('is-active')
          navLink.ariaCurrent = 'page'
        }
      } else if (componentData.name === 'archive') {
        navLink.href = componentData.nav.url
        navLink.target = '_blank'
      } else {
        navLink.ariaLabel = `Toggle ${componentData.title}`
        navLink.setAttribute('role', 'button')
        navLink.setAttribute('type', 'button')
        setTimeout(() => {
          navLink.ariaExpanded = navItem.classList.contains('is-active')
        }, 100)
        navLink.addEventListener('mousedown', (e) => {
          this.toggleNav(navItem, componentData, false)
          navLink.ariaExpanded = navItem.classList.contains('is-active')
          e.preventDefault()
        })
        navLink.addEventListener('keydown', (e) => {
          if (isSpaceOrEnterKey(e.keyCode)) {
            this.toggleNav(navItem, componentData, false)
            navLink.ariaExpanded = navItem.classList.contains('is-active')
            e.preventDefault()
          }
        })
      }
      if (componentData.iconId) {
        navTitle.classList.add('has-icon')
        const iconElement = createSvgElement('.icon.nav-icon', '#' + componentData.iconId)
        iconElement.setAttribute('alt', '')
        navLink.insertBefore(iconElement, navLink.firstChild)
      }
      navTitle.appendChild(navLink)
      if (!componentData.unversioned) {
        navTitle.appendChild(this.createNavVersionDropdown(navItem, componentData))
      }
      return navTitle
    }

    createNavVersionDropdown (navItem, componentData) {
      const navVersionDropdown = createElement('.nav-version-dropdown')
      const versions = Object.values(componentData.versions)
      const currentVersionData = getCurrentVersionData(versions)
      const activeVersion = componentData.name === page.component ? page.version : currentVersionData.version
      const navVersion = createElement('div.nav-version', { dataset: { version: activeVersion } })
      const activeDisplayVersion = componentData.versions[activeVersion].displayVersion

      const navVersionMenu = createElement('div.nav-version-menu')
      navVersionMenu.setAttribute('role', 'listbox')
      navVersionMenu.id = `listbox-${componentData.name}`
      navVersionMenu.setAttribute('aria-labelledby', `combo-${componentData.name}-label`)

      let navVersionWrapper

      if (versions.length === 1) {
        navVersionWrapper = createElement('p.prev-flag')
        navVersionWrapper.textContent = activeDisplayVersion
        navVersionWrapper.title = currentAndOnlyVersion
      } else {
        navVersionWrapper = createElement('div.nav-version-wrapper')
        const navVersionLabel = createElement('span.version-label', activeDisplayVersion)
        navVersionLabel.id = `combo-${componentData.name}-label`
        navVersionWrapper.appendChild(navVersionLabel)

        navVersion.setAttribute('tabindex', '0')
        navVersion.setAttribute('role', 'combobox')
        navVersion.ariaExpanded = false
        navVersion.ariaHasPopup = 'listbox'
        navVersion.id = `combo-${componentData.name}`
        navVersion.setAttribute('aria-labelledby', `combo-${componentData.name}-label`)
        navVersion.setAttribute('aria-controls', `listbox-${componentData.name}`)
        if (activeVersion === currentVersionData.version) {
          addCurrentVersionIndicator(navVersionWrapper, 'tooltip-dot-nav-version-menu')
        }
        if (page.navVersionIconId) {
          navVersionWrapper.appendChild(createSvgElement('.icon.nav-version-icon', '#' + page.navVersionIconId))
        }

        const currentNavGroup = createElement('div')
        currentNavGroup.setAttribute('role', 'group')
        const currentNavLabel = createElement('div.nav-version-label')
        currentNavLabel.setAttribute('role', 'presentation')
        currentNavGroup.appendChild(currentNavLabel)

        const catchallNavGroup = createElement('div')
        catchallNavGroup.setAttribute('role', 'group')
        const catchallNavLabel = createElement('div.nav-version-label')
        catchallNavLabel.setAttribute('role', 'presentation')
        catchallNavGroup.appendChild(catchallNavLabel)

        versions.reduce((lastVersionData, versionData) => {
          if (!isArchiveSite()) {
            if (versionData === currentVersionData) {
              currentNavLabel.textContent = currentVersion
              navVersionMenu.appendChild(currentNavGroup)
            } else if (versionData.prerelease) {
              if (!lastVersionData) {
                currentNavLabel.textContent = 'Prerelease versions'
                navVersionMenu.appendChild(currentNavGroup)
              }
            } else if (lastVersionData === currentVersionData) {
              catchallNavLabel.textContent = previousVersions
              navVersionMenu.appendChild(catchallNavGroup)
            }
          } else if (versionData === currentVersionData) {
            catchallNavLabel.textContent = 'Archived versions'
            navVersionMenu.appendChild(catchallNavGroup)
          }

          const versionDataset = {
            version: versionData.version,
          }
          const navVersionOption = createElement(
            'div.nav-version-option',
            { dataset: versionDataset },
            versionData.displayVersion
          )
          navVersionOption.setAttribute('role', 'option')
          navVersionOption.setAttribute('tabindex', '-1')
          navVersionOption.id = `${componentData.name}-${versionData.displayVersion}`
          navVersionOption.addEventListener('keydown', (e) => {
            if (isSpaceOrEnterKey(e.keyCode)) {
              setTabIndexForVersions()
            }
          })
          navVersionOption.addEventListener('focus', (e) => {
            setAriaActiveDescendant(componentData.name, versionData.displayVersion, true)
            e.stopPropagation()
          })
          navVersionOption.addEventListener('blur', () => {
            setAriaActiveDescendant(componentData.name, versionData.displayVersion, false)
          })
          if (versionData.version === activeVersion) {
            navVersionOption.classList.add('selected')
          }
          if (versionData === currentVersionData) {
            addCurrentVersionIndicator(navVersionOption, 'tooltip-dot-nav-version')
          }
          if (!isArchiveSite() && versionData === currentVersionData) {
            currentNavGroup.appendChild(navVersionOption)
          } else {
            catchallNavGroup.appendChild(navVersionOption)
          }

          navVersionMenu.addEventListener('click', (e) => this.selectVersion(navVersionMenu, navItem, componentData, e))
          return versionData
        }, undefined)
        navVersionWrapper.addEventListener('mousedown', (e) => {
          this.toggleVersionMenu(navVersionMenu)
          e.preventDefault()
        })
        navVersionDropdown.addEventListener('click', trapEvent)
      }
      navVersionWrapper.appendChild(navVersion)
      navVersionDropdown.appendChild(navVersionWrapper)
      navVersion.addEventListener('keydown', (e) => {
        if (isSpaceOrEnterKey(e.keyCode)) {
          this.toggleVersionMenu(navVersionMenu)
          setTabIndexForVersions()
          e.preventDefault()
        }
      })
      navVersion.addEventListener('blur', () => {
        autoCloseVersionDropdown(navVersionMenu)
      })
      if (versions.length > 1) navVersionDropdown.appendChild(navVersionMenu)
      const navOptions = navVersionMenu.querySelectorAll('.nav-version-option')
      navOptions[navOptions.length - 1]?.addEventListener('blur', () => {
        autoCloseVersionDropdown(navVersionMenu)
      })

      return navVersionDropdown
    }

    ensureNavList (navItem, componentData, selectedVersion) {
      if (componentData.unversioned) {
        if (!navItem.querySelector('.nav-list')) {
          navItem.appendChild(this.createNavList(componentData.nav))
        }
      } else {
        let versionData
        const navVersion = navItem.querySelector('.nav-version')
        const navVersionLabel = navVersion.parentElement.querySelector('.version-label')
        if (selectedVersion) {
          navVersion.dataset.version = selectedVersion
          versionData = componentData.versions[selectedVersion]
          navVersionLabel.textContent = versionData.displayVersion
        } else {
          selectedVersion = navVersion.dataset.version
          versionData = componentData.versions[selectedVersion]
        }
        let navList = navItem.querySelector('.nav-list[data-version="' + selectedVersion + '"]')
        const firstNavList = navItem.querySelector('.nav-list[data-version]')
        if (navList) {
          if (navList !== firstNavList) {
            navItem.insertBefore(navList, firstNavList)
          }
        } else {
          navList = this.createNavList(versionData.nav, selectedVersion)
          firstNavList ? navItem.insertBefore(navList, firstNavList) : navItem.appendChild(navList)
        }
      }
    }

    getNavGroupsBottom () {
      return this.navGroups.getBoundingClientRect().bottom
    }

    navGroupHasSingleComponent () {
      const componentsData = this.groupData.components
      return (
        componentsData.length === 1 &&
        componentsData[0].unversioned &&
        componentsData[0].nav.items.length &&
        this.groupData.spreadSingleItem
      )
    }

    processComponents () {
      const componentIconId = document.getElementById('icon-nav-component') && 'icon-nav-component'
      return this.navData.components.reduce((componentsAccum, component) => {
        let versions
        const iconId = 'icon-nav-component-' + component.name
        componentsAccum[component.name] = component = Object.assign({}, component, {
          iconId: document.getElementById(iconId) ? iconId : componentIconId,
          versions: component.versions.reduce(
            (versionsAccum, version) => {
              const versionName = version.version === 'master' || !version.version ? '' : version.version
              versionsAccum[versionName] = version = Object.assign({}, version, {
                version: versionName,
                nav: Object.assign({ items: [] }, version.sets[0]),
              })
              if (versionName && !version.displayVersion) version.displayVersion = versionName
              version.sets.slice(1).forEach((set) => {
                version.nav.items = version.nav.items.concat(set.items) // quick fix to merge multiple sets together
              })
              delete version.sets
              return versionsAccum
            },
            (versions = {})
          ),
        })

        if ('' in versions && Object.keys(versions).length === 1) {
          Object.defineProperty(component, 'nav', {
            get: function () {
              return this.versions[''].nav
            },
          })
          component.unversioned = true
        }

        return componentsAccum
      }, {})
    }

    processSubcomponents (components) {
      this.navData.subcomponents.forEach((subcomponent) => {
        const targetComponent = components[subcomponent.parent]
        if (!(targetComponent || {}).unversioned) return
        const targetItems = targetComponent.nav.items
        Object.values(selectComponents(subcomponent.components, this.componentPool))
          .sort((a, b) => {
            if (!subcomponent.sortAll) return 0
            if (!a.title) return 1
            if (a.title?.toLowerCase() < b.title?.toLowerCase()) return -1
            return 0
          })
          .forEach((component) => {
            const iconId = 'icon-nav-component-' + component.name
            component.iconId = document.getElementById(iconId) ? iconId : targetComponent.iconId
            targetItems.push(component)
          })
      })
    }

    reshapeNavData () {
      this.appendHomeComponent()
      this.appendArchiveComponent()
      this.cleanComponents()
      this.cleanGroups()
    }

    scrollToCurrentPageItem () {
      this.navGroups.scrollTop = 0
      if (!page.scope) return
      const target = (
        page.scope.querySelector('[aria-current=page]') || {
          parentNode: page.scope.previousElementSibling,
        }
      ).parentNode
      const containerRect = this.navGroups.getBoundingClientRect()
      const midpoint = (containerRect.height - containerRect.top) * 0.5
      const adjustment = target.offsetTop + target.offsetHeight * 0.5 - midpoint
      if (adjustment > 0) this.navGroups.scrollTop = adjustment
    }

    selectVersion (navVersionMenu, navItem, componentData, e) {
      const allVersionOptions = navVersionMenu.querySelectorAll('.nav-version-option')
      allVersionOptions.forEach((option) => option.classList.remove('selected'))
      e.target.classList.add('selected')
      this.toggleNav(navItem, componentData, e.target.dataset.version)

      const navVersionWrapper = document.querySelector(
        `[data-component="${navItem.getAttribute('data-component')}"] .nav-version-wrapper`
      )
      if (e.target.dataset.version === getCurrentVersionData(Object.values(componentData.versions)).version) {
        addCurrentVersionIndicator(navVersionWrapper, 'tooltip-dot-nav-version-menu')
      } else {
        removeCurrentVersionIndicator(navVersionWrapper)
      }
      hideVersionMenu(navVersionMenu)
      moveFocusOnFirstElement(navItem)
    }

    toggleNav (navItem, componentData, selectedVersion) {
      if (!selectedVersion && navItem.classList.contains('is-active')) {
        navItem.classList.remove('is-active')
      } else {
        this.ensureNavList(navItem, componentData, selectedVersion)
        navItem.classList[selectedVersion ? 'add' : 'toggle']('is-active')
      }
    }

    toggleVersionMenu (navVersionMenu) {
      if (hideVersionMenu(navVersionMenu)) return
      const maxBottom = this.getNavGroupsBottom()
      let height = navVersionMenu.dataset.height
      if (!height) {
        const measurement = document.body.appendChild(
          createElement('div', {
            style: 'position: absolute; top: 0; left: 0; visibility: hidden',
          })
        )
        const thisClone = Object.assign(navVersionMenu.cloneNode(true), {
          style: 'max-height: none; position: static; transform: none; transition: none',
        })
        navVersionMenu.dataset.height = height =
          measurement.appendChild(thisClone).getBoundingClientRect().height.toFixed(1) + 'px'
        measurement.parentNode.removeChild(measurement)
      }
      closeActiveVersionMenu()
      navVersionMenu.style.marginTop = null
      const bottom = navVersionMenu.getBoundingClientRect().top + parseFloat(height) + 20
      if (bottom > maxBottom) {
        navVersionMenu.style.marginTop = maxBottom - bottom + 'px'
      }
      navVersionMenu.classList.remove('is-clipped')
      navVersionMenu.style.maxHeight = height
      navVersionMenu.classList.add('is-active')
      setTabIndexForVersions()
      navVersionMenu.parentElement.querySelector('.nav-version-wrapper').classList.add('selector-active')
      navVersionMenu.parentElement.querySelector('.nav-version').ariaExpanded = true
    }
  }

  class Page {
    constructor () {
      const head = document.head
      const pageComponentMeta = head.querySelector('meta[name=page-component]')
      if (pageComponentMeta) {
        this.component = pageComponentMeta.getAttribute('content')
        this.navItemToggleIconId = document.getElementById('icon-nav-item-toggle') && 'icon-nav-item-toggle'
        this.navVersionIconId = document.getElementById('icon-nav-version') && 'icon-nav-version'
        this.url = head.querySelector('meta[name=page-url]').getAttribute('content')
        this.version = head.querySelector('meta[name=page-version]').getAttribute('content')
        if (this.version === 'master' || !this.version) this.version = ''
      }
    }
  }

  const navObj = new Nav(nav)
  const page = new Page()
  navObj.buildNav()
})()
