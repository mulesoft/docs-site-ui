;(() => {
  'use strict'

  if (!document.querySelector('atomic-recs-interface')) return

  const addFallbackLinks = (parentDiv) => {
    const trendingTopicsFallback = 'trendingTopicsFallback'
    const title = document.createElement('h2')
    title.innerText = trendingTopicsFallback[document.documentElement.lang].title
    parentDiv.appendChild(title)
    trendingTopicsFallback[document.documentElement.lang].links.forEach((link) => {
      const div = document.createElement('div')
      const a = document.createElement('a')
      a.innerText = link.name
      a.setAttribute('href', link.url)
      a.classList.add('trending-topics-hardcoded')
      parentDiv.appendChild(div)
      div.appendChild(a)
    })
  }

  const hasValidRecommendations = (recsListShadowRoot) => {
    if (recsListShadowRoot.childElementCount === 0) return false
    const atomicRecsResult = recsListShadowRoot.querySelector('atomic-recs-result')
    if (atomicRecsResult) {
      const recsResultShadowRoot = atomicRecsResult.shadowRoot
      const atomicText = recsResultShadowRoot.querySelector('atomic-text')
      return atomicText?.value !== 'no-title'
    }
    return true
  }

  setTimeout(() => {
    const atomicRecsList = document.querySelector('atomic-recs-list')
    const recsListShadowRoot = atomicRecsList?.shadowRoot
    if (recsListShadowRoot) {
      try {
        if (!hasValidRecommendations(recsListShadowRoot)) {
          addFallbackLinks(atomicRecsList.parentElement.parentElement)
          atomicRecsList.remove()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, 4000)
})()
