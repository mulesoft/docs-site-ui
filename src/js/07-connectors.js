;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    var connectorMenuTriggers = document.querySelectorAll('.js-connector-menu-trigger')
    var connectorMenu = document.querySelector('.js-connector-menu')
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
      trigger: 'mouseenter focus click',
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
    });
  })
})()
