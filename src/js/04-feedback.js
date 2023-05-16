;(() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard || !window.analytics) return

  const buttonLabels = ['Yes', 'No']

  const addListeners = (feedbackCard, buttonLabels) => {
    buttonLabels.forEach((msg) => {
      const feedbackButton = feedbackCard.querySelector(`button.feedback-${msg.toLowerCase()}`)
      if (feedbackButton) feedbackButton.addEventListener('click', (e) => track(`Clicked Helpful ${msg}`, e))
    })
  }

  const flip = (element) => element.classList.add('flip')

  const track = (msg, e) => {
    try {
      window.analytics.track(msg, {
        title: document.title,
        url: window.location.href,
      })
      flip(feedbackCard)
    } catch (error) {
      console.warn(error)
    }
    if (e) e.preventDefault()
  }

  addListeners(feedbackCard, buttonLabels)
})()
