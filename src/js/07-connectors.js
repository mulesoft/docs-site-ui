;(function () {
  'use strict'

  // connector level popover
  var connectorTierTrigger = document.querySelector('.js-connector-level-trigger')
  /* eslint-disable max-len */
  var communityTierMsg =
    '<p>MuleSoft or members of the community write and maintain Community Connectors.<p>Contact the partner directly for more information. You do not need any special account or license to use a Community connector.'
  var certifiedTierMsg =
    '<p>MuleSoft Certified connectors are developed by MuleSoft’s partners and developer community and are reviewed and certified by MuleSoft.<p>For support, customers should contact the MuleSoft partner that created the connector.'
  var selectTierMsg =
    '<p>Connectors in the Select level are maintained by MuleSoft.<p>Connectors included in the open source Mule distribution can be used by everyone, however support is only included in an Anypoint Platform subscription.'
  var premiumTierMsg =
    '<p>MuleSoft maintains Premium connectors. You must purchase Premium connectors as add-ons to your subscription.'
  /* eslint-enable max-len */

  if (connectorTierTrigger) {
    var msg
    var level = connectorTierTrigger.getAttribute('data-level')
    if (level) {
      switch (level.toLowerCase()) {
        case 'community':
          msg = communityTierMsg
          break
        case 'certified':
          msg = certifiedTierMsg
          break
        case 'select':
          msg = selectTierMsg
          break
        case 'premium':
          msg = premiumTierMsg
          break
      }
    }

    if (msg) {
      tippy(connectorTierTrigger, {
        allowHTML: true,
        content: msg,
        // duration: [0, 150],
        maxWidth: 240,
        offset: [0, 10],
        placement: 'bottom-end',
        theme: 'connector-popover',
        touchHold: true, // maps touch as click (for some reason)
        zIndex: 14, // same as z-nav-mobile
      })
    }
  }
})()
