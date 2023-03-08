;(() => {
  'use strict'

  class Feedback {
    constructor () {
      this.analytics = window.analytics
      this.feedbackCard = document.querySelector('section.feedback-section')
      if (this.feedbackCard) {
        this.feedbackYesButton = this.feedbackCard.querySelector('button.feedback-yes')
        this.feedbackNoButton = this.feedbackCard.querySelector('button.feedback-no')
      }
    }

    addListeners () {
      if (this.feedbackYesButton) this.feedbackYesButton.addEventListener('click', (e) => this.trackHelpful(e))
      if (this.feedbackNoButton) this.feedbackNoButton.addEventListener('click', (e) => this.trackNotHelpful(e))
    }

    flipCard () {
      this.feedbackCard.classList.add('flip')
    }

    track (msg, e) {
      try {
        analytics &&
        analytics.track(msg, {
          title: document.title,
          url: window.location.href,
        })
        this.flipCard()
      } catch (error) {
        console.warn(error)
      }
      if (e) e.preventDefault()
    }

    trackHelpful (e) {
      this.track('Clicked Helpful Yes', e)
    }

    trackNotHelpful (e) {
      this.track('Clicked Helpful No', e)
    }
  }

  const feedback = new Feedback()
  feedback.addListeners()
})()
