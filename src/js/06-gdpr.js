;(() => {
  'use strict'

  document.addEventListener('DOMContentLoaded', () => {
    var gdprEl = document.querySelector('.js-gdpr')
    var gdprClose = document.querySelector('.js-gdpr-close')
    if (!(gdprEl && gdprClose)) return
    var gdprFlag = localStorage.getItem('GDPR')

    const closeGDPR = () => {
      localStorage.setItem('GDPR', 'off')
      gdprEl.classList.remove('show')
    }

    if (!gdprFlag) gdprEl.classList.add('show')

    gdprClose.addEventListener('click', closeGDPR)
  })
})()
