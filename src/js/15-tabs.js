;(() => {
  // original copied from:
  // https://github.com/asciidoctor/asciidoctor-tabs/blob/5d8c67f24774772bd980958c8388c566c1a3ed69/data/js/tabs.js
  'use strict'

  const config = (document.currentScript || {}).dataset || {}
  const forEach = Array.prototype.forEach

  const isSpaceOrEnterKey = (keyCode) => {
    return [13, 32].includes(keyCode)
  }

  init(document.querySelectorAll('.tabs'))

  function init (tabsBlocks) {
    if (!tabsBlocks.length) return
    forEach.call(tabsBlocks, function (tabs) {
      const syncIds = tabs.classList.contains('is-sync') ? {} : undefined
      const tablist = tabs.querySelector('.tablist ul')
      tablist.setAttribute('role', 'tablist')
      let initial
      forEach.call(tablist.querySelectorAll('li'), function (tab, idx) {
        tab.setAttribute('role', (tab.className = 'tab')) // NOTE converter may not have set class on li
        let id, anchor, syncId
        if (!(id = tab.id)) {
          if (!(anchor = tab.querySelector('a[id]'))) return // invalid state
          tab.id = id = anchor.parentNode.removeChild(anchor).id
        }
        const panel = tabs.querySelector('.tabpanel[aria-labelledby~="' + id + '"]')
        if (!panel) return // invalid state
        tab.tabIndex = 0
        syncIds &&
          ((syncId = tab.textContent.trim()) in syncIds ? (syncId = undefined) : true) &&
          (syncIds[(tab.dataset.syncId = syncId)] = tab)
        idx || ((initial = { tab, panel }) && syncIds) ? toggleHidden(panel, true) : toggleSelected(tab, true)
        tab.setAttribute('aria-controls', panel.id)
        panel.setAttribute('role', 'tabpanel')
        forEach.call(panel.querySelectorAll('table.tableblock'), function (table) {
          const container = Object.assign(document.createElement('div'), { className: 'tablecontainer' })
          table.parentNode.insertBefore(container, table).appendChild(table)
        })
        const onClick = syncId === undefined ? activateTab : activateTabSync
        tab.addEventListener('click', onClick.bind({ tabs, tab, panel }))
        tab.addEventListener('keydown', (e) => {
          if (isSpaceOrEnterKey(e.keyCode)) {
            e.preventDefault()
            onClick.call({ tabs, tab, panel })
          }
        })
      })
      if (syncIds && initial) {
        let syncGroupId
        for (let i = 0, lst = tabs.classList, len = lst.length, className; i !== len; i++) {
          if (!(className = lst.item(i)).startsWith('data-sync-group-id=')) continue
          tabs.dataset.syncGroupId = syncGroupId = lst.remove(className) || className.slice(19).replace(/\u00a0/g, ' ')
          break
        }
        if (syncGroupId === undefined) tabs.dataset.syncGroupId = syncGroupId = Object.keys(syncIds).sort().join('|')
        const preferredSyncId =
          'syncStorageKey' in config &&
          window[(config.syncStorageScope || 'local') + 'Storage'].getItem(config.syncStorageKey + '-' + syncGroupId)
        const tab = preferredSyncId && syncIds[preferredSyncId]
        tab && Object.assign(initial, { tab, panel: document.getElementById(tab.getAttribute('aria-controls')) })
        toggleSelected(initial.tab, true) || toggleHidden(initial.panel, false)
      }
    })
    onHashChange()
    toggleClassOnEach(tabsBlocks, 'is-loading', 'remove')
    window.setTimeout(toggleClassOnEach.bind(null, tabsBlocks, 'is-loaded', 'add'), 0)
    window.addEventListener('hashchange', onHashChange)
  }

  function activateTab (e) {
    const tab = this.tab
    const tabs = this.tabs || (this.tabs = tab.closest('.tabs'))
    const panel = this.panel || (this.panel = document.getElementById(tab.getAttribute('aria-controls')))
    forEach.call(tabs.querySelectorAll('.tablist .tab'), function (el) {
      toggleSelected(el, el === tab)
    })
    forEach.call(tabs.querySelectorAll('.tabpanel'), function (el) {
      toggleHidden(el, el !== panel)
    })
    if (!this.isSync && 'syncStorageKey' in config && 'syncGroupId' in tabs.dataset) {
      const storageKey = config.syncStorageKey + '-' + tabs.dataset.syncGroupId
      window[(config.syncStorageScope || 'local') + 'Storage'].setItem(storageKey, tab.dataset.syncId)
    }
    if (!e) return
    const loc = window.location
    const hashIdx = loc.hash ? loc.href.indexOf('#') : -1
    if (~hashIdx) window.history.replaceState(null, '', loc.href.slice(0, hashIdx))
    e.preventDefault()
  }

  function activateTabSync (e) {
    activateTab.call(this, e)
    const thisTabs = this.tabs
    const thisTab = this.tab
    const initialY = thisTabs.getBoundingClientRect().y
    forEach.call(document.querySelectorAll('.tabs'), function (tabs) {
      if (tabs === thisTabs || tabs.dataset.syncGroupId !== thisTabs.dataset.syncGroupId) return
      forEach.call(tabs.querySelectorAll('.tablist .tab'), function (tab) {
        if (tab.dataset.syncId === thisTab.dataset.syncId) activateTab.call({ tabs, tab, isSync: true })
      })
    })
    let shiftedBy = thisTabs.getBoundingClientRect().y - initialY
    if (shiftedBy && (shiftedBy = Math.round(shiftedBy))) window.scrollBy({ top: shiftedBy, behavior: 'instant' })
  }

  function toggleClassOnEach (elements, className, method) {
    forEach.call(elements, function (el) {
      el.classList[method](className)
    })
  }

  function toggleHidden (el, state) {
    el.classList[(el.hidden = state) ? 'add' : 'remove']('is-hidden')
  }

  function toggleSelected (el, state) {
    el.setAttribute('aria-selected', '' + state)
    el.classList[state ? 'add' : 'remove']('is-selected')
  }

  function onHashChange () {
    const id = window.location.hash.slice(1)
    if (!id) return
    const tab = document.getElementById(~id.indexOf('%') ? decodeURIComponent(id) : id)
    if (!(tab && tab.classList.contains('tab'))) return
    'syncId' in tab.dataset ? activateTabSync.call({ tab }) : activateTab.call({ tab })
  }
})()
