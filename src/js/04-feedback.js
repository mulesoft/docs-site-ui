;(() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard) return

  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')

  const feedbackAckMsgDiv = feedbackCard.querySelector('div.feedback-ack')
  const feedbackSecondRow = feedbackCard.querySelector('div.feedback-second-row')

  const giveFeedbackButtons = feedbackCard.querySelectorAll('button.give-feedback')

  const feedbackFormDiv = feedbackCard.querySelector('div.feedback-form')
  const feedbackForm = feedbackFormDiv?.querySelector('form')
  const feedbackFormCancelButton = feedbackForm?.querySelector('button#feedback-form-cancel-button')
  const feedbackFormSubmitButton = feedbackForm?.querySelector('input.feedback-form-button')

  const postFeedbackThankYouButton = feedbackCard.querySelector('span.post-feedback')

  const decision = ['Yes', 'No']
  const inputNamesWithValidation = ['summary', 'email']
  let voted

  const addListeners = (feedbackCard, decision) => {
    decision.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button.feedback-${decision.toLowerCase()}`)
      if (feedbackButton) feedbackButton.addEventListener('click', (e) => track(decision, e))
    })

    giveFeedbackButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        hide(button)
        show(feedbackFormDiv)
        feedbackForm.querySelector('input').focus()
      })
    })

    addValidationListeners(inputNamesWithValidation)

    if (feedbackFormCancelButton) {
      feedbackFormCancelButton.addEventListener('click', (e) => {
        e.preventDefault()
        hide(feedbackFormDiv)
        removeAllValidationVizIfValid(inputNamesWithValidation)
        voted ? show(feedbackSecondRow) : show(giveFeedbackButtons[0])
      })
    }

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        console.log(e)
        e.preventDefault()
        removeAllValidationVizIfValid(inputNamesWithValidation)
        createGUSWorkItem(feedbackForm)
        hide(feedbackForm)
        show(postFeedbackThankYouButton)
      })

      feedbackFormSubmitButton.addEventListener('click', () => {
        removeAllValidationVizIfValid(inputNamesWithValidation)
      })
    }
  }

  const addValidationListeners = (inputNames) => {
    inputNames.forEach((inputName) => {
      const input = document.querySelector(`input#${inputName}`)
      const validationText = document.querySelector(`p#${inputName}-validation-text`)
      if (input) {
        input.addEventListener('invalid', (e) => {
          e.preventDefault()
          show(validationText)
          addValidationViz(input)
        })
      }
    })
  }

  const addValidationViz = (element) => element.classList.add('invalid')

  const createGUSWorkItem = (form) => {
    const data = new FormData(form) // eslint-disable-line
    console.log(data)
    // TODO: send the form to GUS
  }

  const hide = (element) => {
    if (element) element.classList.add('hide')
  }

  const removeAllValidationVizIfValid = (inputNames) => {
    inputNames.forEach((inputName) => {
      const input = document.querySelector(`input#${inputName}`)
      const validationText = document.querySelector(`p#${inputName}-validation-text`)
      if (input.checkValidity()) removeValidationViz(input, validationText)
    })
  }

  const removeValidationViz = (input, validationText) => {
    if (input) input.classList.remove('invalid')
    if (validationText) validationText.classList.add('hide')
  }

  const show = (element) => {
    if (element) element.classList.remove('hide')
  }

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
      show(feedbackFormDiv)
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
