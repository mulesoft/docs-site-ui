(function () {
  'use strict'

  var depContainer = document.getElementsByClassName('notice-banner')[0]
  if (depContainer) {
    var toolBar = document.getElementsByClassName('toolbar')[0]
    var sticky = depContainer.offsetTop
    window.onscroll = function () { makeSticky(depContainer, toolBar, sticky) }
  }

  function makeSticky (dc, t, s) {
    if (window.pageYOffset + t.offsetHeight + 10 > s) {
      dc.classList.add('sticky')
    } else {
      dc.classList.remove('sticky')
    }
  }
})()
