(function () {
  'use strict'

  window.onscroll = function () { makeSticky() }

  var depContainer = document.getElementsByClassName('notice-banner')[0]
  var toolBar = document.getElementsByClassName('toolbar')[0]
  var sticky = depContainer.offsetTop

  function makeSticky () {
    if (window.pageYOffset + toolBar.offsetHeight + 10 > sticky) {
      depContainer.classList.add('sticky')
    } else {
      depContainer.classList.remove('sticky')
    }
  }
})()
