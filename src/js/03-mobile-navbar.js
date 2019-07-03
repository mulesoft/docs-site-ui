;(function () {
  'use strict'

  var backdrop = document.querySelector('.modal-backdrop')
  var nav = document.querySelector('nav.nav')
  var navToggle = document.querySelector('.nav-toggle')

  function openNav (e) {
    document.body.addEventListener('click', closeNav)
    document.body.addEventListener('touchend', closeNav)
    cancelBubble(e)
    nav.classList.add('active')
    document.body.classList.add('no-scroll', 'mobile')
    backdrop.classList.add('show', 'mobile')
  }

  function closeNav (e) {
    document.body.removeEventListener('click', closeNav)
    document.body.removeEventListener('touchend', closeNav)
    nav.classList.remove('active')
    document.body.classList.remove('no-scroll', 'mobile')
    backdrop.classList.remove('show', 'mobile')
  }

  function cancelBubble (e) {
    e.stopPropagation()
    if (!e.target.href) e.preventDefault()
  }

  navToggle.addEventListener('click', openNav)
  navToggle.addEventListener('touchend', openNav)

  nav.addEventListener('click', cancelBubble)
  nav.addEventListener('touchend', cancelBubble)
})()
