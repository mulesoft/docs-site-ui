;(() => {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
  const toolbar = document.querySelector('.toolbar')
  const noticeBanner = document.querySelector('.notice-banner')
  const topBanner = document.querySelector('.top-banner')

  const adjustForBanners = (scrollValue) => {
    const [topBanner, noticeBanner] = document.querySelectorAll('.top-banner, .notice-banner')
    if (topBanner) scrollValue += topBanner.offsetHeight
    if (noticeBanner) scrollValue += noticeBanner.offsetHeight
    return scrollValue
  }

  const adjustScrollPosition = (anchor) => {
    const minHeight = getMinHeight()
    let tries = 0
    const autoScrollDown = setInterval(() => {
      const isAtMinHeight = anchor.getBoundingClientRect().top <= minHeight
      if (isAtMinHeight) {
        const scrollAmount = -adjustForBanners(minHeight) / 1.5
        window.scrollBy(0, scrollAmount)
        clearInterval(autoScrollDown)
      }
      tries++
      if (tries === 10) {
        clearInterval(autoScrollDown)
      }
    }, 50)
  }

  const createLinkImage = (iconName, titleText) => {
    const img = document.createElement('img')
    if (titleText) {
      img.alt = titleText
      img.setAttribute('title', titleText)
    }
    img.setAttribute('role', 'link')
    img.classList.add(`${iconName}-image`)
    img.src = `${uiRootPath}/img/icons/${iconName}.svg`
    return img
  }

  const getAnchorLink = (link) => link.href.split('#')[1]

  const getMinHeight = () => {
    let bannerHeights = hasNoticeBanner() ? noticeBanner.offsetHeight : 0
    bannerHeights += hasTopBanner() ? topBanner.offsetHeight : 0
    return toolbar.scrollHeight + bannerHeights
  }

  const hasNoticeBanner = () => isVisible(document.querySelector('.notice-banner'))
  const hasTopBanner = () => isVisible(document.querySelector('.top-banner'))
  const isVisible = (element) => element && !element.classList.contains('hide')

  const processAnchorLinks = () => {
    document.querySelectorAll('.anchor').forEach((anchor) => {
      anchor.addEventListener('click', () => {
        adjustScrollPosition(anchor)
      })

      const headerText = anchor.parentElement.textContent
      if (headerText) {
        const anchorImg = createLinkImage('anchor', headerText)
        anchor.appendChild(anchorImg)
        anchor.setAttribute('aria-label', `Jump to ${headerText}`)

        const sidebarLinks = [...document.querySelectorAll('.toc-menu a')].filter((a) => a.textContent === headerText)
        if (sidebarLinks.length > 0) {
          sidebarLinks[0].addEventListener('click', () => {
            adjustScrollPosition(anchor)
          })
        }
      }
    })
  }

  const processSamePageLinks = () => {
    const destLinks = new Map([...document.querySelectorAll('.doc [id]')].map((el) => [el.id, el]))
    const samePageLinks = [...document.querySelectorAll('.doc a[href^="#"]')]

    samePageLinks.forEach((samePageLink) => {
      const anchorLink = getAnchorLink(samePageLink)
      const destLinkElement = destLinks.get(anchorLink)

      if (destLinkElement) {
        samePageLink.addEventListener('click', () => {
          adjustScrollPosition(destLinkElement)
        })
      }
    })
  }

  processAnchorLinks()
  processSamePageLinks()
})()
