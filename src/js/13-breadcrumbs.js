;(() => {
  'use strict'

  const isHomePage = () => {
    return document.querySelector('#latest-releases')
  }

  const hideToolBarAtLargeScreenSize = () => {
    const toolbar = document.querySelector('.toolbar')
    toolbar.classList.add('toolbar-home')
  }

  if (isHomePage()) {
    hideToolBarAtLargeScreenSize()
  }
})()
