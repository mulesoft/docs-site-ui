;(() => {
  'use strict'

  const atomicFacetsLayoutSection = document.querySelector('atomic-layout-section[section="facets"]')
  if (!atomicFacetsLayoutSection) return

  let tries = 500

  const updateFacetTexts = (facetDiv) => {
    if (facetDiv) {
      const facetInput = facetDiv.querySelector('input')
      if (facetInput) facetInput.placeholder = 'Search Products'
    }
  }

  const updateFacet = setInterval(() => {
    if (--tries <= 0) clearInterval(updateFacet)

    const atomicFacet = document.querySelector('atomic-facet')
    const facetShadowRoot = atomicFacet?.shadowRoot
    const firstFacetDiv = facetShadowRoot?.querySelector('div[part="facet"]')
    if (firstFacetDiv) {
      try {
        updateFacetTexts(firstFacetDiv)
        clearInterval(updateFacet)
      } catch (error) {
        console.error(error)
      }
    }
  }, 100)
})()
