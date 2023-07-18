;(() => {
  'use strict'

  if (!window.analytics) return
  const trackGithub = () => window.analytics.track('Clicked GitHub Link', { url: window.location.href })
  document.querySelectorAll('.github').forEach((githubLink) => githubLink.addEventListener('click', trackGithub))
})()
