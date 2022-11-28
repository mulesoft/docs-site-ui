;(() => {
  'use strict'

  const isSpaceOrEnterKey = (keyCode) => {
    return [13, 32].includes(keyCode)
  }

  const hasAside = () => {
    return document.querySelector('.js-toc')
  }

  const remove = (asideSkipLink) => {
    asideSkipLink.remove()
  }

  const skipLinks = document.querySelectorAll('.skip-link')
  skipLinks[0].addEventListener('keydown', (e) => {
    if (isSpaceOrEnterKey(e.keyCode)) {
      document.querySelector('.nav a').focus()
    }
  })

  skipLinks[1].addEventListener('keydown', (e) => {
    if (isSpaceOrEnterKey(e.keyCode)) {
      document.querySelector('.main a:not(.home-link)').focus()
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
