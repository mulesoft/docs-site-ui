;(() => {
  'use strict'

  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const appHeight = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  window.addEventListener('resize', appHeight)
  appHeight()
})()
