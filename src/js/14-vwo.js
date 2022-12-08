;(() => {
  'use strict'

  const landingPagePathnames = ['/general/', '/general/index', '/general/11-2022-index']

  const isLandingPage = () => {
    const output = landingPagePathnames.filter((pathName) => window.location.pathname.endsWith(pathName))
    return output.length > 0
  }

  const addVMOListener = (item) => {
    item.addEventListener(
      'click',
      (_evt) => {
        window._vis_opt_queue = window._vis_opt_queue || []
        window._vis_opt_queue.push(() => {
          try {
            /* eslint-disable no-undef */
            _vis_opt_register_conversion(2, 145)
            /* eslint-enable no-undef */
          } catch (_error) {
            console.warn('_vis_opt_register_conversion not defined. Skipping...')
          }
        })
      },
      false
    )
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (isLandingPage()) {
      document.querySelectorAll('.doc a').forEach((item) => {
        addVMOListener(item)
      })
    }
  })
})()
