;(() => {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath

  const appendExternalLinkIcon = (link) => {
    const isDataWeavePlaygroundLink = link && link.classList.contains('dw-playground-link')
    const isFooterLink = link && link.offsetParent && link.offsetParent.tagName === 'FOOTER'
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

  const processExternalLinks = (selectors) => {
    const selectorText = selectors.map((el) => `${el} [target="_blank"]`).join(', ')
    const externalLinks = document.querySelectorAll(selectorText)
    externalLinks.forEach((externalLink) => {
      appendExternalLinkIcon(externalLink)
    })
  }

  processExternalLinks(['.doc', '.nav'])
})()
