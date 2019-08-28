;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    var gdprFlag = localStorage.getItem('GDPR')
    var gdprEl = document.querySelector('.js-gdpr')
    var gdprClose = document.querySelector('.js-gdpr-close')

    function closeGDPR () {
      localStorage.setItem('GDPR', 'off')
      gdprEl.classList.remove('show')
    }

    if (!gdprFlag) gdprEl.classList.add('show')

    gdprClose.addEventListener('click', closeGDPR)
    gdprClose.addEventListener('touchend', closeGDPR)
  })
})()
