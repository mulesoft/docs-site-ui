;(() => {
  'use strict'

  const isSpaceOrEnterKey = (keyCode) => {
    return [13, 32].includes(keyCode)
  }

  const hasAside = () => {
    return document.querySelector('.js-toc')
  }

  const toolbarIsVisible = () => {
    const toolbar = document.querySelector('.toolbar')
    if (toolbar) {
      return window.getComputedStyle(toolbar).display !== 'none'
    }
    return false
  }

  const remove = (asideSkipLink) => {
    asideSkipLink.remove()
  }

  const skipLinks = document.querySelectorAll('.skip-link')
  skipLinks[0].addEventListener('keydown', (e) => {
    if (isSpaceOrEnterKey(e.keyCode)) {
      document.querySelector('#search-button').focus()
      e.preventDefault()
    }
  })

  skipLinks[1].addEventListener('keydown', (e) => {
    if (isSpaceOrEnterKey(e.keyCode)) {
      if (toolbarIsVisible()) {
        document.querySelector('.toolbar a:not(.home-link)').focus()
      } else {
        document.querySelector('.doc a').focus()
      }
    }
  })

  if (hasAside()) {
    skipLinks[2].addEventListener('keydown', (e) => {
      if (isSpaceOrEnterKey(e.keyCode)) {
        document.querySelector('.js-toc a').focus()
      }
    })
  } else {
    remove(skipLinks[2])
  }
})()
