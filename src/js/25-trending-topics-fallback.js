;(() => {
  'use strict'

  if (!document.querySelector('atomic-recs-interface')) return

  const addFallbackLinks = (parentDiv) => {
    const trendingTopicsFallbackDiv = document.querySelector('#trending-topics-fallback')
    if (trendingTopicsFallbackDiv) {
      trendingTopicsFallbackDiv.classList.remove('hidden')
    }
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
          atomicRecsList.parentElement.remove()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, 1000)
})()
