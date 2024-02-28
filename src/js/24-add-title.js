;(() => {
  const getAnchor = (url) => {
    const urlParts = url.split('#')
    return (urlParts.length > 1) ? urlParts[1] : null
  }

  const hasSameOrigin = (url) => url.startsWith(window.location.origin)

  const populateTitle = (a) => {
    if (a.hasAttribute('title')) return
    if (hasSameOrigin(a.href)) {
      const anchor = getAnchor(a.href)
      console.log(anchor)
      fetch(a.href).then((response) => {
        return response.text().then((html) => {
          /* eslint-disable no-undef */
          const desc = new DOMParser()
            /* eslint-enable no-undef */
            .parseFromString(html, 'text/html')
            .querySelector('#preamble, article p').textContent
          a.removeAttribute('title-loading')
          a.setAttribute(
            'title',
            desc.replace(/\n/g, ' ').replace(/ +/g, ' ').trim()
          )
        })
      })
    }
  }

  document.querySelectorAll('article a').forEach((a) => {
    populateTitle(a)
  })
})()
