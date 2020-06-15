'use strict'

module.exports = function ({
  data: {
    root: { site },
  },
}) {
  return Object.values(site.components).filter(({ asciidoc }) => asciidoc.attributes['page-connector-type'])
}
