;(() => {
  'use strict'

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
        const scrollAmount = -adjustForBanners(minHeight) / 2
        window.scrollBy(0, scrollAmount)
        clearInterval(autoScrollDown)
      }
      tries++
      if (tries === 10) {
        clearInterval(autoScrollDown)
      }
    }, 50)
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

      const parentHeading = anchor.parentElement
      const headerText = parentHeading.textContent
      if (headerText) {
        const sidebarLinks = [...document.querySelectorAll('.toc-menu a')].filter((a) => a.textContent === headerText)
        if (sidebarLinks.length > 0) {
          sidebarLinks[0].addEventListener('click', () => {
            adjustScrollPosition(parentHeading)
            setTimeout(() => {
              parentHeading.focus()
            }, 100)
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
