;(function () {
  'use strict'

  var analytics = window.analytics

  var gitHubLinks = document.querySelectorAll('.js-github')
  var trackGitHub = function () {
    analytics && analytics.track('Clicked GitHub Link', { url: window.location.href })
  }

  for (var i = 0; i < gitHubLinks.length; i++) {
    gitHubLinks[i].addEventListener('click', trackGitHub)
    gitHubLinks[i].addEventListener('touchend', trackGitHub)
  }
})()
