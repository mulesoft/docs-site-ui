;(() => {
  'use strict'

  // https://medium.com/quick-code/100vh-problem-with-ios-safari-92ab23c852a8
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  window.addEventListener('resize', appHeight)
  appHeight()
})()
