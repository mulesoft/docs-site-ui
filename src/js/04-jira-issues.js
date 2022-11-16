;(function () {
  'use strict'

  var analytics = window.analytics

  var jiraTriggers = document.querySelectorAll('.js-jira')
  if (jiraTriggers) {
    // open jira dialog
    window.ATL_JQ_PAGE_PROPS = {
      triggerFunction: function (showCollectorDialog) {
        var leaveFeedback = function (e) {
          e.preventDefault()
          analytics &&
            analytics.track('Clicked Leave Feedback', {
              title: document.title,
              url: window.location.href,
            })
        }
        for (var i = 0; i < jiraTriggers.length; i++) {
          jiraTriggers[i].addEventListener('click', function (e) {
            leaveFeedback(e)
            showCollectorDialog()
          })
        }
      },
      fieldValues: {
        description: 'URL: ' + window.location.href,
      },
    }
  }

  if (!analytics) return

  // saying thanks
  var thanksSection = document.querySelector('.js-thanks-section')
  if (thanksSection) {
    var thanksYesTrigger = thanksSection.querySelector('.js-thanks-yes')
    var thanksNoTrigger = thanksSection.querySelector('.js-thanks-no')
    var sayThanks = function () {
      thanksSection.classList.add('flip')
    }
    var trackHelpful = function () {
      sayThanks()
      analytics &&
        analytics.track('Clicked Helpful Yes', {
          title: document.title,
          url: window.location.href,
        })
    }
    var trackNotHelpful = function () {
      sayThanks()
      analytics &&
        analytics.track('Clicked Helpful No', {
          title: document.title,
          url: window.location.href,
        })
    }

    thanksYesTrigger.addEventListener('click', trackHelpful)
    thanksNoTrigger.addEventListener('click', trackNotHelpful)
  }
})()
