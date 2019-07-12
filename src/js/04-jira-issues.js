;(function () {
  'use strict'

  var analytics = window.analytics

  // open jira dialog
  window.ATL_JQ_PAGE_PROPS = {
    triggerFunction: function (showCollectorDialog) {
      document.querySelector('.js-jira').addEventListener('click', function (e) {
        e.preventDefault()
        showCollectorDialog()
      })
      document.querySelector('.js-jira').addEventListener('touchend', function (e) {
        e.preventDefault()
        showCollectorDialog()
      })
    },
    fieldValues: {
      description: 'URL: ' + window.location.href,
    },
  }

  // saying thanks
  var thanksSection = document.querySelector('.js-thanks-section')
  var thanksYesTrigger = thanksSection.querySelector('.js-thanks-yes')
  var thanksNoTrigger = thanksSection.querySelector('.js-thanks-no')
  var sayThanks = function () {
    thanksSection.classList.add('flip')
  }
  var trackHelpful = function () {
    sayThanks()
    analytics && analytics.track('Clicked Helpful Yes', { title: document.title, url: window.location.href })
  }
  var trackNotHelpful = function () {
    sayThanks()
    analytics && analytics.track('Clicked Helpful No', { title: document.title, url: window.location.href })
  }

  thanksYesTrigger.addEventListener('click', trackHelpful)
  thanksYesTrigger.addEventListener('touchend', trackHelpful)
  thanksNoTrigger.addEventListener('click', trackNotHelpful)
  thanksNoTrigger.addEventListener('touchend', trackNotHelpful)
})()
