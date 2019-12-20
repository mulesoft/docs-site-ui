'use strict'

module.exports = function () {
  return Object.values(this.site.components).filter((it) => it.latest.asciidocConfig.attributes['page-connector-type'])
}
