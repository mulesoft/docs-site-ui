;(() => {
  'use strict'

  if (!document.querySelector('atomic-recs-interface')) return

  let tries = 500

  const checkRecs = setInterval(() => {
    if (--tries <= 0) clearInterval(checkRecs)

    const atomicRecsList = document.querySelector('atomic-recs-list')
    const recsListShadowRoot = atomicRecsList?.shadowRoot
    if (recsListShadowRoot) {
      try {
        if (recsListShadowRoot.childElementCount === 0) {
          const trendingTopicsFallback = 'trendingTopicsFallback'
          trendingTopicsFallback["en"].forEach((link) => {
            const a = document.createElement('a')
            a.innerText = link.name
            a.setAttribute('href', link.url)
            a.classList.add('trending-topics-hardcoded')
            atomicRecsList.parentElement.parentElement.appendChild(a)
          })
        }
        clearInterval(checkRecs)
      } catch (error) {
        console.error(error)
      }
    }
  }, 100)
})()
