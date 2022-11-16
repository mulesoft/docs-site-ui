;(function () {
  'use strict'

  if (isHomePage()) {
    hideToolBarAtLargeScreenSize()
  }

  function isHomePage () {
    return document.querySelector('#latest-releases')
  }

  function hideToolBarAtLargeScreenSize () {
    const toolbar = document.querySelector('.toolbar')
    toolbar.classList.add('toolbar-home')
  }
})()
