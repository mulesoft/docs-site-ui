;(() => {
  'use strict'

  if (!document.querySelector('atomic-recs-interface')) return

  setTimeout(() => {
    const atomicRecsList = document.querySelector('atomic-recs-list')
    const recsListShadowRoot = atomicRecsList?.shadowRoot
    if (recsListShadowRoot) {
      try {
        if (recsListShadowRoot.childElementCount === 0) {
          const trendingTopicsFallback = 'trendingTopicsFallback'
          trendingTopicsFallback[document.documentElement.lang].forEach((link) => {
            const a = document.createElement('a')
            a.innerText = link.name
            a.setAttribute('href', link.url)
            a.classList.add('trending-topics-hardcoded')
            atomicRecsList.parentElement.parentElement.appendChild(a)
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, 5000)
})()
