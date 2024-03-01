;(() => {
  const MAX_TITLE_LENGTH = 255

  const CACHE_MAP = {}

  const hasSameOrigin = (url) => url.startsWith(window.location.origin)
  const isAnchorFromSamePage = (url) => url.startsWith('#')
  const separateURL = (url) => url.split('#')

  const setTitle = (a, title) => {
    let firstParagraph = title.replace(/\n/g, ' ').replace(/ +/g, ' ').trim()
    firstParagraph =
      firstParagraph.length > MAX_TITLE_LENGTH ? `${firstParagraph.substring(0, MAX_TITLE_LENGTH)}...` : firstParagraph
    a.setAttribute('title', firstParagraph)
  }

  const populateTitle = (a) => {
    if (a.hasAttribute('title') || !hasSameOrigin(a.href)) return
    let anchor, baseURL, title

    if (isAnchorFromSamePage(a.href)) [baseURL, anchor] = separateURL(a.href)

    if (anchor) {
      const anchorElement = document.querySelector(`#${anchor}`)?.nextElementSibling
      if (anchorElement) {
        title =
          anchorElement.tagName === 'P' ? anchorElement.textContent : anchorElement.querySelector('p').textContent
        setTitle(a, title)
      }
    } else {
      if (CACHE_MAP[baseURL]) {
        const title = CACHE_MAP[baseURL]
        setTitle(a, title)
      } else {
        fetch(a.href).then(async (response) => {
          const html = await response.text()
          /* eslint-disable no-undef */
          const domParser = new DOMParser()
          /* eslint-enable no-undef */
          const title = domParser
            .parseFromString(html, 'text/html')
            .querySelector('#preamble p, article p').textContent
          CACHE_MAP[baseURL] = title
          setTitle(a, title)
        })
      }
    }
  }

  document.querySelectorAll('article a').forEach((a) => {
    populateTitle(a)
  })
})()
