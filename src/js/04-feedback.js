;(() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard
  // TODO: add this back before PR is merged
  // || !window.analytics
  ) return

  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')
  const feedbackAckMsgDiv = feedbackCard.querySelector('div.feedback-ack')
  const giveFeedbackButton = feedbackCard.querySelector('button.give-feedback')
  const feedbackDetailedForm = feedbackCard.querySelector('div.feedback-detailed-form')
  const decision = ['Yes', 'No']

  const addListeners = (feedbackCard, decision) => {
    decision.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button.feedback-${decision.toLowerCase()}`)
      if (feedbackButton) feedbackButton.addEventListener('click', (e) => track(decision, e))
    })

    if (giveFeedbackButton) {
      giveFeedbackButton.addEventListener('click', (e) => {
        hide(giveFeedbackButton)
        show(feedbackDetailedForm)
        feedbackDetailedForm.querySelector('input').focus()
        e.preventDefault()
      })
    }
  }

  const hide = (element) => element.classList.add('hide')
  const show = (element) => element.classList.remove('hide')

  const track = (decision, e) => {
    try {
      // TODO: add this back before PR is merged
      // window.analytics.track(`Clicked Helpful ${decision}`, {
      //   title: document.title,
      //   url: window.location.href,
      // })
      feedbackOptionButtons.forEach((button) => hide(button))
      show(feedbackAckMsgDiv)
      updateFeedbackAckMsg(feedbackAckMsgDiv, decision)
      show(feedbackDetailedForm)
      feedbackDetailedForm.querySelector('input').focus()
    } catch (error) {
      console.warn(error)
    }
    if (e) e.preventDefault()
  }

  const updateFeedbackAckMsg = (feedbackAckMsgDiv, decision) => {
    const msg = feedbackAckMsgDiv.querySelector('p')
    if (msg) msg.innerText += ` ${decision}`
  }

  addListeners(feedbackCard, decision)
})()
