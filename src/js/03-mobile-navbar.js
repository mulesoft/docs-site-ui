;(function () {
  'use strict'

  function bindNavToggle (backdrop, body, nav, navToggle) {
    if (backdrop) {
      backdrop.addEventListener('click', toggleNav.bind(nav, backdrop, body))
    }
    if (navToggle) {
      navToggle.addEventListener('click', toggleNav.bind(nav, backdrop, body))
    }
  }

  function toggleNav (backdrop, body, e) {
    if (e.target === backdrop && !this.classList.contains('is-active')) {
      return
    }
    body.classList.toggle('mobile')
    body.classList.toggle('no-scroll')
    backdrop.classList.toggle('mobile')
    backdrop.classList.toggle('show')
    this.classList.toggle('is-active')
    e.stopPropagation()
  }

  bindNavToggle(
    document.querySelector('.modal-backdrop'),
    document.body,
    document.querySelector('.nav'),
    document.querySelector('.nav-toggle')
  )
})()
