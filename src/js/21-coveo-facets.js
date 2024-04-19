;(() => {
  'use strict'

  const searchProducts = MSCX.l10n.getMessage('search-results-filter-placeholder-text')
  const atomicFacetsLayoutSection = document.querySelector('atomic-layout-section[section="facets"]')
  if (!atomicFacetsLayoutSection) return

  let tries = 500

  const addVersionFacets = () => {
    const components = window.siteNavigationData
    components.forEach((component) => {
      const versionFacet = createVersionFacet(component.name, component.title, component.versions)
      if (versionFacet) atomicFacetsLayoutSection.appendChild(versionFacet)
    })
    delete window.siteNavigationData
  }

  const createVersionFacet = (componentID, componentDisplayName, versions) => {
    if (isSearchable(componentID)) {
      const formattedVersions = getFormattedDisplayVersions(versions)
      if (formattedVersions) {
        const versionFacet = document.createElement('atomic-facet')
        versionFacet.setAttribute('allowed-values', formattedVersions)
        versionFacet.setAttribute('depends-on-product', componentDisplayName)
        versionFacet.setAttribute('facet-id', `${componentID}-version`)
        versionFacet.setAttribute('field', 'mulesoftversionwithlatest')
        versionFacet.setAttribute('heading-level', 2)
        versionFacet.setAttribute('label', `${componentDisplayName} Version`)
        versionFacet.setAttribute('number-of-value', 20)
        versionFacet.setAttribute('sort-criteria', 'score')
        versionFacet.setAttribute('with-search', false)

        return versionFacet
      }
    }
  }

  const getFormattedDisplayVersions = (versions) => {
    const listOfVersions = versions.map((t) => t.displayVersion || t.version)
    if (listOfVersions.length && isNumberedVersion(listOfVersions[0])) {
      const latest = MSCX.l10n.getMessage('latest')
      listOfVersions[0] += ` [${latest}]`
      return `["${listOfVersions.slice(0, 25).join('", "')}"]`
    }
  }

  const isNumberedVersion = (versionName) => !['default', 'latest', 'master'].includes(versionName)
  const isSearchable = (componentName) => !['general, reuse'].includes(componentName)

  const updateFacetTexts = (facetDiv) => {
    if (facetDiv) {
      const facetInput = facetDiv.querySelector('input')
      if (facetInput) facetInput.placeholder = searchProducts
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
