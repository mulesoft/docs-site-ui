;(() => {
  'use strict'

  const atomicFacetsLayoutSection = document.querySelector('atomic-layout-section[section="facets"]')
  if (!atomicFacetsLayoutSection) return

  let tries = 500

  const addVersionFacets = () => {
    const atomicFacetManager = atomicFacetsLayoutSection.querySelector('atomic-facet-manager')
    const components = window.siteNavigationData
    components.forEach((component) => {
      const versionFacet = createVersionFacet(component.name, component.title)
      atomicFacetManager.appendChild(versionFacet)
    })
    delete window.siteNavigationData
  }

  const createVersionFacet = (name, title) => {
    const versionFacet = document.createElement('atomic-facet')
    versionFacet.setAttribute('depends-on-product', title)
    versionFacet.setAttribute('facet-id', `${name}-version`)
    versionFacet.setAttribute('field', 'mulesoftversionwithlatest')
    versionFacet.setAttribute('heading-level', 2)
    versionFacet.setAttribute('label', `${title} Version`)
    versionFacet.setAttribute('number-of-value', 20)
    versionFacet.setAttribute('sort-criteria', 'score')
    return versionFacet
  }

  const updateFacetTexts = (facetDiv) => {
    if (facetDiv) {
      const facetInput = facetDiv.querySelector('input')
      if (facetInput) facetInput.placeholder = 'Search Products'
    }
  }

  addVersionFacets()

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
