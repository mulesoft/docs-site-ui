;(() => {
  'use strict'

  document.addEventListener('DOMContentLoaded', () => {
    const gdprEl = document.querySelector('.js-gdpr')
    const gdprClose = document.querySelector('.js-gdpr-close')
    if (!(gdprEl && gdprClose)) return

    const gdprFlag = localStorage.getItem('GDPR')
    if (!gdprFlag) gdprEl.classList.add('show')

    const closeGDPR = () => {
      localStorage.setItem('GDPR', 'off')
      gdprEl.classList.remove('show')
    }

    gdprClose.addEventListener('click', closeGDPR)
  })
})()
