;(() => {
  const MAX_TITLE_LENGTH = 150

  const getAnchor = (url) => {
    const urlParts = url.split('#')
    return urlParts.length > 1 ? urlParts[1] : null
  }

  const hasSameOrigin = (url) => url.startsWith(window.location.origin)
  const isAnchor = (url) => url.startsWith('#')

  const populateTitle = (a) => {
    if (a.hasAttribute('title')) return
    if (hasSameOrigin(a.href)) {
      let anchor
      let desc

      if (isAnchor(a.href)) anchor = getAnchor(a.href)

      if (anchor) {
        const anchorElement = document.querySelector(`#${anchor}`)?.nextElementSibling
        if (anchorElement) {
          desc =
            anchorElement.tagName === 'P' ? anchorElement.textContent : anchorElement.querySelector('p').textContent
        }
      } else {
        fetch(a.href).then((response) => {
          return response.text().then((html) => {
            /* eslint-disable no-undef */
            desc = new DOMParser()
              /* eslint-enable no-undef */
              .parseFromString(html, 'text/html')
              .querySelector('#preamble p, article p').textContent
          })
        })
      }
      let titleText = desc.replace(/\n/g, ' ').replace(/ +/g, ' ').trim()
      if (desc) {
        titleText = titleText.length > MAX_TITLE_LENGTH ? `${titleText.substring(0, 512)}...` : titleText
        a.setAttribute('title', titleText)
      }
    }
  }

  document.querySelectorAll('article a').forEach((a) => {
    populateTitle(a)
  })
})()
