;(() => {
  const MAX_TITLE_LENGTH = 255

  const CACHE_MAP = {}

  const hasSameOrigin = (url) => url.startsWith(window.location.origin)
  const isAnchor = (url) => url.startsWith('#')
  const separateURL = (url) => url.split('#')

  const setTitle = (a, html) => {
    /* eslint-disable no-undef */
    const domParser = new DOMParser()
    /* eslint-enable no-undef */
    const desc = domParser
      .parseFromString(html, 'text/html')
      .querySelector('#preamble p, article p').textContent
    let titleText = desc.replace(/\n/g, ' ').replace(/ +/g, ' ').trim()
    if (desc) {
      titleText = titleText.length > MAX_TITLE_LENGTH ? `${titleText.substring(0, MAX_TITLE_LENGTH)}...` : titleText
      a.setAttribute('title', titleText)
    }
  }

  const populateTitle = (a) => {
    if (a.hasAttribute('title')) return
    if (hasSameOrigin(a.href)) {
      let anchor, baseURL, desc

      if (isAnchor(a.href)) [baseURL, anchor] = separateURL(a.href)

      if (anchor) {
        const anchorElement = document.querySelector(`#${anchor}`)?.nextElementSibling
        if (anchorElement) {
          desc =
            anchorElement.tagName === 'P' ? anchorElement.textContent : anchorElement.querySelector('p').textContent
        }
        setTitle(a, desc)
      } else {
        if (CACHE_MAP[baseURL]) {
          const html = CACHE_MAP[baseURL]
          setTitle(a, html)
        } else {
          fetch(a.href).then(async (response) => {
            const html = await response.text()
            CACHE_MAP[baseURL] = html
            setTitle(a, html)
          })
        }
      }
    }
  }

  document.querySelectorAll('article a').forEach((a) => {
    populateTitle(a)
  })
})()
