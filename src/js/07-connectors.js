;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    // connector menu popover
    var connectorMenuTriggers = document.querySelectorAll('.js-connector-menu-trigger')
    var connectorMenu = document.querySelector('.js-connector-menu')

    if (connectorMenuTriggers && connectorMenu) {
      tippy(connectorMenuTriggers, {
        content: connectorMenu.innerHTML,
        duration: [0, 150],
        flip: false,
        interactive: true,
        offset: '32, 0',
        placement: 'left-start',
        role: 'menu',
        theme: 'popover-versions',
        touchHold: true, // maps touch as click (for some reason)
        zIndex: 14, // same as z-nav-mobile
        onHide: function (instance) {
          instance.popper.classList.remove('shown')
        },
        onHidden: function (instance) {
          instance.popper.classList.add('hide')
        },
        onShow: function (instance) {
          instance.popper.classList.remove('hide')
        },
        onShown: function (instance) {
          instance.popper.classList.add('shown')
        },
      })
    }

    // connector tier popover
    var connectorTierTrigger = document.querySelector('.js-connector-tier-trigger')
    var communityTierMsg = '<p>MuleSoft or members of the community write and maintain Community Connectors.<p>Contact the partner directly for more information. You do not need any special account or license to use a Community connector.'
    var certifiedTierMsg = '<p>MuleSoft Certified connectors are developed by MuleSoft’s partners and developer community and are reviewed and certified by MuleSoft.<p>For support, customers should contact the MuleSoft partner that created the connector.'
    var selectTierMsg = '<p>Connectors in the Select tier are mainted by MuleSoft.<p>Connectors included in the open source Mule distribution can be used by everyone, however support is only included in an Anypoint Platform subscription.'
    var premiumTierMsg = '<p>MuleSoft maintains Premium connectors. You must purchase Premium connectors as add-ons to your subscription.'
    if (connectorTierTrigger) {
      var msg

      switch(connectorTierTrigger.getAttribute('data-tier')) {
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

      if (msg) {
        tippy(connectorTierTrigger, {
          content: selectTierMsg,
          duration: [0, 150],
          flip: false,
          maxWidth: 240,
          offset: '20, 10',
          placement: 'bottom-end',
          role: 'menu',
          theme: 'popover popover-tier',
          touchHold: true, // maps touch as click (for some reason)
          zIndex: 14, // same as z-nav-mobile
          onHide: function (instance) {
            instance.popper.classList.remove('shown')
          },
          onHidden: function (instance) {
            instance.popper.classList.add('hide')
          },
          onShow: function (instance) {
            instance.popper.classList.remove('hide')
          },
          onShown: function (instance) {
            instance.popper.classList.add('shown')
          },
        })
      }
    }
  })
})()
