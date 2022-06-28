;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    var gdprEl = document.querySelector('.js-gdpr')
    var gdprClose = document.querySelector('.js-gdpr-close')
    if (!(gdprEl && gdprClose)) return
    var gdprFlag = localStorage.getItem('GDPR')

    function closeGDPR () {
      localStorage.setItem('GDPR', 'off')
      gdprEl.classList.remove('show')
    }

    if (!gdprFlag) gdprEl.classList.add('show')

    gdprClose.addEventListener('click', closeGDPR)
  })
})()
