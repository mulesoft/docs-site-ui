;(() => {
  'use strict'

  for (const item of document.querySelectorAll('.doc a')) {
    item.addEventListener(
      'click',
      (evt) => {
        window._vis_opt_queue = window._vis_opt_queue || []
        window._vis_opt_queue.push(() => {
          try {
            /* eslint-disable no-undef */
            _vis_opt_register_conversion(2145)
            /* eslint-enable no-undef */
          } catch (_error) {
            console.warn('_vis_opt_register_conversion not defined. Skipping...')
          }
        })
      },
      false
    )
  }
})()
