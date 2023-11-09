'use strict'

/*
 * HTML is escaped by Antora builds.
 * Partially unescape specified content at build-time
 * (never in browser) to allow rendering as HTML.
 * Example: Banners with links can be defined in page attributes
 * or in antora.yml with page-notice-banner-message.
 */
module.exports = function (text) {
  return text.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
}
