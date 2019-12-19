;(function () {
  'use strict'

  // connector menu popover
  var connectorMenuTriggers = toArray(document.querySelectorAll('.js-connector-menu-trigger'))

  if (connectorMenuTriggers.length) {
    connectorMenuTriggers.forEach(function (connectorMenuTrigger) {
      var connectorMenu = connectorMenuTrigger.parentNode.querySelector('.js-connector-menu')
      tippy(connectorMenuTrigger, {
        content: connectorMenu.innerHTML,
        duration: [0, 150],
        flip: false,
        interactive: true,
        offset: '32, 0',
        placement: 'left-start',
        role: 'menu',
        theme: 'popover-versions',
        touchHold: true, // maps touch as click (for some reason)
        trigger: 'click',
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
    })
  }

  // connector tier popover
  var connectorTierTrigger = document.querySelector('.js-connector-tier-trigger')
  /* eslint-disable max-len */
  var communityTierMsg = '<p>MuleSoft or members of the community write and maintain Community Connectors.<p>Contact the partner directly for more information. You do not need any special account or license to use a Community connector.'
  var certifiedTierMsg = '<p>MuleSoft Certified connectors are developed by MuleSoft’s partners and developer community and are reviewed and certified by MuleSoft.<p>For support, customers should contact the MuleSoft partner that created the connector.'
  var selectTierMsg = '<p>Connectors in the Select tier are mainted by MuleSoft.<p>Connectors included in the open source Mule distribution can be used by everyone, however support is only included in an Anypoint Platform subscription.'
  var premiumTierMsg = '<p>MuleSoft maintains Premium connectors. You must purchase Premium connectors as add-ons to your subscription.'
  /* eslint-enable max-len */

  if (connectorTierTrigger) {
    var msg
    switch (connectorTierTrigger.getAttribute('data-tier')) {
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
        boundary: 'window',
        content: selectTierMsg,
        duration: [0, 150],
        flip: false,
        maxWidth: 240,
        offset: '0, 10',
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

  var connectorVersionTrigger = document.querySelector('.js-connector-version-trigger')
  var connectorVersion = document.querySelector('.js-connector-version')
  if (connectorVersionTrigger && connectorVersion) {
    tippy(connectorVersionTrigger, {
      boundary: 'window',
      content: connectorVersion.innerHTML,
      duration: [0, 150],
      interactive: true,
      maxWidth: 400,
      offset: '0, 5',
      placement: 'bottom-end',
      role: 'menu',
      trigger: 'click',
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

  function toArray (collection) {
    return [].slice.call(collection)
  }
})()
