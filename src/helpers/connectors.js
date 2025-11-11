'use strict'

module.exports = function ({
  data: {
    root: { site },
  },
}) {
  function getLocalConnectorComponents (components) {
    const connectors = {}

    for (const component in components) {
      if (component.endsWith('-connector') || component.endsWith('-module')) {
        const connector = components[component]
        // Filter out connector versions that are missing the page-connector-type attribute.
        // These are imported from the site manifest with the @antora/atlas-extension in the playbook,
        // and should not display in the build.
        const filteredVersions = connector.versions.filter(
          (version) => version.asciidoc.attributes['page-connector-type']
        )

        if (filteredVersions.length === 0) {
          continue
        }

        // Replace latest with a local version, rather than the latest imported version
        connector.latest = filteredVersions[0]
        connector.versions = filteredVersions
        connectors[component] = connector
      }
    }

    const sortedByTitle = Object.keys(connectors).sort((a, b) => {
      const aTitle = connectors[a].latest.title
      const bTitle = connectors[b].latest.title
      return aTitle.localeCompare(bTitle)
    })

    const sortedConnectors = {}
    sortedByTitle.forEach((key) => {
      sortedConnectors[key] = connectors[key]
    })

    return sortedConnectors
  }

  return getLocalConnectorComponents(site.components)
}
