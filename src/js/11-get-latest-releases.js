;(function () {
  'use strict'

  var latestReleases = document.getElementById('latest-releases')
  if (latestReleases) {
    var releasesDiv = document.createElement('div')
    releasesDiv.setAttribute('class', 'ulist')
    latestReleases.parentNode.appendChild(releasesDiv)
  }
})()
