;(() => {
  'use strict'

  const addGithubTracker = () => {
    if (window.analytics) {
      const githubLinks = document.querySelectorAll('.js-github')
      githubLinks.forEach((githubLink) => {
        githubLink.addEventListener('click', trackGithub)
      })
    }
  }

  const trackGithub = () => {
    if (window.analytics) {
      window.analytics.track('Clicked GitHub Link', {
        url: window.location.href,
      })
    }
  }

  addGithubTracker()
})()
