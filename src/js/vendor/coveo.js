; (function () {
  'use strict'

  var analytics = window.analytics

  // coveo setup
  var config = document.getElementById('coveo-script').dataset
  var root = document.querySelector('.js-coveo')
  var coveoInit

  Coveo.SearchEndpoint.endpoints.default = new Coveo.SearchEndpoint({
    restUri: 'https://platform.cloud.coveo.com/rest/search',
    accessToken: config.accessToken,
  })

  root.addEventListener('buildingQuery', function (e) {
    e.detail.queryBuilder.pipeline = config.queryPipeline
  })

  // modal setup
  var backdrop = document.querySelector('.modal-backdrop')
  var nav = document.querySelector('nav.nav')

  // show/hide coveo search
  var searchTrigger = nav.querySelector('.search button')
  var searchUI = document.querySelector('.js-search-ui')
  var searchClose = document.querySelector('.js-search-close')

  function showCoveo (e) {
    if (!coveoInit) {
      Coveo.init(root)
      coveoInit = true
    }
    backdrop.classList.add('show')
    backdrop.classList.remove('mobile')
    document.body.classList.add('no-scroll')
    document.body.classList.remove('mobile')
    searchUI.classList.add('show')
    nav.classList.remove('active')
    tippy.hideAll()
    analytics && analytics.track('Clicked Open Search')
    trapEvent(e)
  }

  function hideCoveo (e) {
    backdrop.classList.remove('show')
    document.body.classList.remove('no-scroll')
    searchUI.classList.remove('show')
  }

  function trapEvent (e) {
    e.stopPropagation()
  }

  searchTrigger.addEventListener('click', showCoveo)
  backdrop.addEventListener('click', hideCoveo)
  searchClose.addEventListener('click', hideCoveo)
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) hideCoveo(e)
  })
  root.addEventListener('click', trapEvent)
})()
