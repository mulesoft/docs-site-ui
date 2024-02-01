;(() => {
  'use strict'

  if (!window.analytics) return
  const trackGithub = () => window.analytics.track('Clicked GitHub Link', { url: window.location.href })
  document.querySelectorAll('.github').forEach((githubLink) => githubLink.addEventListener('click', trackGithub))
  const trackRSS = () => window.analytics.track('Clicked RSS Link')
  document.querySelectorAll('.release-notes-rss').forEach((rssLink) => rssLink.addEventListener('click', trackRSS))
})()
