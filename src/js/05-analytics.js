;(() => {
  'use strict'

  const addGithubTracker = () => {
    const githubLinks = document.querySelectorAll('.js-github')
    githubLinks.forEach((githubLink) => {
      githubLink.addEventListener('click', trackGithub)
    })
  }

  const trackGithub = () => {
    const analytics = window.analytics
    analytics &&
      analytics.track('Clicked GitHub Link', {
        url: window.location.href,
      })
  }

  addGithubTracker()
})()
