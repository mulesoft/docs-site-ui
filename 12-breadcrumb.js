;(function () {
  'use strict'

  if (isHomePage()) {
    hideToolBarAtLargeScreenSize()
  }

  function isHomePage () {
    const activeComponent = document.querySelector('.is-active')
    return activeComponent?.getAttribute('data-component') === 'home'
  }

  function hideToolBarAtLargeScreenSize () {
    const toolbar = document.querySelector('.toolbar')
    toolbar.classList.add('toolbar-home')
  }
})()
