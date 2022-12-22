;(() => {
  'use strict'

  /* eslint-disable max-len */
  const msgMap = {
    community:
      '<p>MuleSoft or members of the community write and maintain Community Connectors.<p>Contact the partner directly for more information. You do not need any special account or license to use a Community connector.',
    certified:
      '<p>MuleSoft Certified connectors are developed by MuleSoft’s partners and developer community and are reviewed and certified by MuleSoft.<p>For support, customers should contact the MuleSoft partner that created the connector.',
    select:
      '<p>Connectors in the Select level are maintained by MuleSoft.<p>Connectors included in the open source Mule distribution can be used by everyone, however support is only included in an Anypoint Platform subscription.',
    premium:
      '<p>MuleSoft maintains Premium connectors. You must purchase Premium connectors as add-ons to your subscription.',
  }
  /* eslint-enable max-len */

  const addPopoverToConnectorLevel = () => {
    var connectorTierTrigger = document.querySelector('.js-connector-level-trigger')
    if (connectorTierTrigger) {
      const level = connectorTierTrigger.getAttribute('data-level')
      if (level) {
        const msg = msgMap[level.toLowerCase()]
        if (msg) {
          createConnectorLevelPopover(connectorTierTrigger, msg)
        }
      }
    }
  }

  const createConnectorLevelPopover = (connectorTierTrigger, msg) => {
    tippy(connectorTierTrigger, {
      allowHTML: true,
      content: msg,
      maxWidth: 240,
      offset: [0, 10],
      placement: 'bottom-end',
      theme: 'connector-popover',
      touchHold: true, // maps touch as click (for some reason)
      zIndex: 14, // same as z-nav-mobile
    })
  }

  addPopoverToConnectorLevel()
})()
