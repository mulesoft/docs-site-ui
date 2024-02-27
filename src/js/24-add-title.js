;(() => {
  const hasSameOrigin = (href) => href.startsWith(window.location.origin)

  const populateTitle = (a) => {
    if (a.hasAttribute('title')) return

    a.setAttribute('title-loading', true)
    if (hasSameOrigin(a.href)) {
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
