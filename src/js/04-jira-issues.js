;(function () {
  'use strict'

  var analytics = window.analytics
  // track not helpful
  var trackNotHelpful = function () {
    analytics && analytics.track('Clicked Helpful No', { title: document.title, url: window.location.href })
  }

  // open jira dialog
  window.ATL_JQ_PAGE_PROPS = {
    triggerFunction: function (showCollectorDialog) {
      document.querySelector('.js-jira').addEventListener('click', function (e) {
        e.preventDefault()
        showCollectorDialog()
        trackNotHelpful()
      })
      document.querySelector('.js-jira').addEventListener('touchend', function (e) {
        e.preventDefault()
        showCollectorDialog()
        trackNotHelpful()
      })
    },
    fieldValues: {
      description: 'URL: ' + window.location.href,
    },
  }

  // saying thanks
  var thanksSection = document.querySelector('.js-thanks-section')
  var thanksTrigger = thanksSection.querySelector('.js-thanks')
  var sayThanks = function () {
    thanksSection.classList.add('flip')
    analytics && analytics.track('Clicked Helpful Yes', { title: document.title, url: window.location.href })
  }

  thanksTrigger.addEventListener('click', sayThanks)
  thanksTrigger.addEventListener('touchend', sayThanks)
})()
