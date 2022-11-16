;(() => {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath

  document.querySelectorAll('.nav [target="_blank"]').forEach(function (externalLink) {
    addLinkImage(externalLink)
  })

  document.querySelectorAll('.doc [target="_blank"]').forEach(function (externalLink) {
    addLinkImage(externalLink)
  })

  function addLinkImage (link) {
    if (!isDataWeavePlaygroundLink(link) && !isFooterLink(link)) {
      const externalLinkImg = createLinkImage('external-link')
      externalLinkImg.alt = 'Leaving the Site'
      externalLinkImg.setAttribute('title', 'Leaving the Site')
      link.appendChild(externalLinkImg)
    }
  }

  const anchors = document.querySelectorAll('.anchor')
  anchors.forEach(function (anchor) {
    const anchorImg = createLinkImage('anchor')
    const headerText = anchor.parentElement.textContent
    if (headerText) anchorImg.alt = `Jump to ${headerText}`
    anchorImg.setAttribute('title', `Jump to ${headerText}`)

    anchor.addEventListener('click', function () {
      adjustScrollPosition(anchor)
    })
    anchor.appendChild(anchorImg)

    const sideLinks = [...document.querySelectorAll('.toc-menu a')]
    const sideLink = sideLinks.filter((a) => a.textContent === headerText)
    if (sideLink.length > 0) {
      sideLink[0].addEventListener('click', function () {
        adjustScrollPosition(anchor)
      })
    }
  })

  function createLinkImage (element) {
    const img = document.createElement('img')
    img.setAttribute('role', 'link')
    img.classList.add(`${element}-image`)
    img.src = `${uiRootPath}/img/icons/${element}.svg`
    return img
  }

  function isDataWeavePlaygroundLink (e) {
    return e.classList.contains('dw-playground-link')
  }

  function isFooterLink (e) {
    return e.offsetParent.tagName === 'FOOTER'
  }

  function adjustScrollPosition (anchor) {
    const minHeight = getMinHeight()
    var tries = 0
    var autoScrollDown = setInterval(function () {
      if (anchor.getBoundingClientRect().top <= minHeight) {
        window.scrollBy(0, -minHeight / 1.1)
        clearInterval(autoScrollDown)
      }
      if (++tries === 10) {
        clearInterval(autoScrollDown)
      }
    }, 50)
  }

  function getMinHeight () {
    const toolbar = document.querySelector('.toolbar')
    const noticeBanner = document.querySelector('.notice-banner')
    return noticeBanner ? toolbar.scrollHeight + noticeBanner.scrollHeight : toolbar.scrollHeight
  }
})()
