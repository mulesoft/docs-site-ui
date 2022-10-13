'use strict'

module.exports = function ({
  data: {
    root: { site },
  },
}) {
  var siteJson = Object.values(site)
  console.log(siteJson[siteJson.length - 1])
  return site.components
}
