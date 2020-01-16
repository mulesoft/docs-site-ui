'use strict'

// NOTE override built-in resolvePageUrl to fix bug
module.exports = function (spec, { data: { root }, hash: context }) {
  const page = root.site.contentCatalog.resolvePage(spec, context)
  if (page) return page.pub.url
}
