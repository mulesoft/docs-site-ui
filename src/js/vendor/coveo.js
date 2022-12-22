;(function () {
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
  var nav = document.querySelector('.nav')

  // show/hide coveo search
  var searchTrigger = nav.querySelector('.search button')
  var searchUI = document.querySelector('.js-search-ui')
  var searchClose = document.querySelector('.js-search-close')

  function focusOnSearchBox () {
    var maxTries = 1000
    var checkExist = setInterval(function () {
      var searchBox = document.querySelector('[form=coveo-dummy-form]')
      if (searchBox) {
        searchBox.setAttribute('id', 'coveo-form')
        searchBox.focus()
        var suggestions = document.querySelector('.magic-box-hasSuggestion')
        if (suggestions) {
          suggestions.classList.remove('magic-box-hasSuggestion')
          clearInterval(checkExist)
        }
      }
      if (--maxTries === 0) clearInterval(checkExist)
    }, 10)
  }

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
    nav.classList.remove('is-active')
    tippy.hideAll()
    focusOnSearchBox()
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

  function resizeCoveoOmnibox () {
    var checkExist = setInterval(function () {
      const coveoOmnibox = document.getElementsByClassName('CoveoOmnibox')[0]
      if (coveoOmnibox) {
        const coveoResultsColumn = document.getElementsByClassName('coveo-results-column')[0]
        coveoOmnibox.style.width =
          coveoResultsColumn && window.innerWidth >= 768 ? `${coveoResultsColumn.offsetWidth}px` : '92%'
      }
      clearInterval(checkExist)
    }, 300)
  }

  searchTrigger.addEventListener('click', showCoveo)
  searchTrigger.addEventListener('click', resizeCoveoOmnibox)
  backdrop.addEventListener('click', hideCoveo)
  searchClose.addEventListener('click', hideCoveo)
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) hideCoveo(e)
  })

  window.onresize = function (e) {
    resizeCoveoOmnibox()
  }
  root.addEventListener('click', trapEvent)
})()
