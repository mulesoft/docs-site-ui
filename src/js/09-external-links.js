;(() => {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath

  const appendExternalLinkIcon = (link) => {
    const isDataWeavePlaygroundLink = link?.classList.contains('dw-playground-link')
    const isFooterLink = link?.offsetParent?.tagName === 'FOOTER'
    if (!isDataWeavePlaygroundLink && !isFooterLink) {
      const externalLinkImg = createLinkImage('external-link', 'Leaving the Site')
      link.appendChild(externalLinkImg)
    }
  }

  const createLinkImage = (iconName, titleText) => {
    const img = document.createElement('img')
    img.setAttribute('role', 'link')
    img.classList.add(`${iconName}-image`)
    img.src = `${uiRootPath}/img/icons/${iconName}.svg`
    if (titleText) {
      img.alt = titleText
      img.setAttribute('title', titleText)
    }
    return img
  }

  const isExternalLink = (url) =>
    !url.startsWith(window.location.origin) && url.startsWith('http') && !isLocalToProd(window.location.origin, url)

  const isLocalToProd = (origin, url) =>
    (origin.startsWith('http://localhost') || origin.startsWith('file://')) && url.includes('docs.mulesoft.com')

  const opensInNewWindow = (linkTarget) => linkTarget === '_blank'

  const processExternalLinks = (selectors) => {
    const selectorText = selectors.map((el) => `${el} :not(#trending-topics-fallback) > * > a`).join(', ')
    const externalLinks = document.querySelectorAll(selectorText)
    externalLinks.forEach((externalLink) => {
      if (isExternalLink(externalLink.href)) {
        if (!opensInNewWindow(externalLink.target)) externalLink.target = '_blank'
        appendExternalLinkIcon(externalLink)
      }
    })
  }

  const updateLearningMapLinks = () => {
    const article = document.querySelector('article.learning-map')
    if (!article) return

    const links = article.querySelectorAll('.lm-table a, .lm-table-border a')

    links.forEach((link) => {
      const href = link.href

      if (href.startsWith('https://www.youtube.com')) {
        link.classList.add('lm-link-video')
        console.log(href)
      } else if (href.startsWith('https://trailhead.salesforce.com')) {
        link.classList.add('lm-link-trailhead')
      } else if (href.startsWith('https://docs.mulesoft.com') || href.startsWith('https://www.mulesoft.com')) {
        link.classList.add('lm-link-docs')
      }
    })
  }

  processExternalLinks(['.doc', '.nav'])
  updateLearningMapLinks()
})()
