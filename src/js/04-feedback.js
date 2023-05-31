;(() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard) return

  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')

  const feedbackAckMsgDiv = feedbackCard.querySelector('div.feedback-ack')
  const giveFeedbackButton = feedbackCard.querySelector('button.give-feedback')

  const feedbackSecondRow = feedbackCard.querySelector('div.feedback-second-row')
  const secondGiveFeedbackButton = feedbackSecondRow?.querySelector('button.give-feedback')

  const feedbackForm = feedbackCard.querySelector('div.feedback-form')
  const feedbackFormCancelButton = feedbackForm?.querySelector('#feedback-form-cancel-button')
  const feedbackFormSummaryInput = feedbackForm?.querySelector('input#summary')
  const feedbackFormSummaryValidationText = feedbackForm?.querySelector('p.summary-validation-text')

  const postFeedbackThankYouButton = feedbackCard.querySelector('span.post-feedback')

  const decision = ['Yes', 'No']
  let voted

  const addListeners = (feedbackCard, decision) => {
    decision.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button.feedback-${decision.toLowerCase()}`)
      if (feedbackButton) feedbackButton.addEventListener('click', (e) => track(decision, e))
    })

    if (giveFeedbackButton) {
      giveFeedbackButton.addEventListener('click', (e) => {
        e.preventDefault()
        hide(giveFeedbackButton)
        show(feedbackForm)
        feedbackForm.querySelector('input').focus()
      })
    }

    if (secondGiveFeedbackButton) {
      secondGiveFeedbackButton.addEventListener('click', (e) => {
        e.preventDefault()
        hide(feedbackSecondRow)
        show(feedbackForm)
        feedbackForm.querySelector('input').focus()
      })
    }

    if (feedbackFormCancelButton) {
      feedbackFormCancelButton.addEventListener('click', (e) => {
        e.preventDefault()
        hide(feedbackForm)
        removeValidationViz(feedbackFormSummaryInput)
        voted ? show(feedbackSecondRow) : show(giveFeedbackButton)
      })
    }

    if (feedbackFormSummaryInput) {
      feedbackFormSummaryInput.addEventListener('invalid', (e) => {
        e.preventDefault()
        show(feedbackFormSummaryValidationText)
        addValidationViz(feedbackFormSummaryInput)
      })
    }

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault()
        removeValidationViz(feedbackFormSummaryInput)
        // TODO: add GUS API integration
        hide(feedbackForm)
        show(postFeedbackThankYouButton)
      })
    }
  }

  const addValidationViz = (element) => element.classList.add('invalid')
  const hide = (element) => element.classList.add('hide')

  const removeValidationViz = (element) => {
    element.classList.remove('invalid')
    feedbackFormSummaryValidationText.classList.add('hide')
  }

  const show = (element) => element.classList.remove('hide')

  const track = (decision, e) => {
    voted = true
    try {
      if (window.analytics) {
        window.analytics.track(`Clicked Helpful ${decision}`, {
          title: document.title,
          url: window.location.href,
        })
      }
      feedbackOptionButtons.forEach((button) => hide(button))
      show(feedbackAckMsgDiv)
      updateFeedbackAckMsg(feedbackAckMsgDiv, decision)
      show(feedbackForm)
      feedbackForm.querySelector('input').focus()
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
