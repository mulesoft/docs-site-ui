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
  // const gusURL = 'https://gus--gusshared.sandbox.my.salesforce.com/services/data/v57.0/sobjects/ADM_Work__c'
  let voted
  let feedbackSubmitted

  const addListeners = (feedbackCard, decision) => {
    decision.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button.feedback-${decision.toLowerCase()}`)
      const feedbackButtonHelpText = feedbackCard.querySelector(`p#feedback-${decision.toLowerCase()}-help-text`)
      if (feedbackButton) {
        feedbackButton.addEventListener('click', (e) => track(decision, e))
        feedbackButton.addEventListener('mouseover', () => show(feedbackButtonHelpText))
        feedbackButton.addEventListener('mouseout', () => hide(feedbackButtonHelpText))
        feedbackButton.addEventListener('focus', () => show(feedbackButtonHelpText))
        feedbackButton.addEventListener('blur', () => hide(feedbackButtonHelpText))
      }
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
        if (voted) {
          show(feedbackSecondRow)
          show(giveFeedbackButtons[1])
          giveFeedbackButtons[1].focus()
        } else {
          show(giveFeedbackButtons[0])
          giveFeedbackButtons[0].focus()
        }
      })
    }

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault()
        removeAllValidationVizIfValid(inputNamesWithValidation)
        createGUSWorkItem(feedbackForm)
        hide(feedbackFormDiv)
        show(postFeedbackThankYouButton)
        feedbackSubmitted = true
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

  const createBody = (form) => {
    const body = {
      Found_in_Build__c: 'a06T0000001Vew6IAC',
      Priority__c: 'Normal',
      Product_Tag__c: 'a1aEE00000044TFYAY',
    }

    const formData = new FormData(form) // eslint-disable-line
    body.Subject__c = formData.get('summary')
    body.Details__c = `name: ${formData.get('name') || 'not provided'}
email: ${formData.get('email') || 'not provided'}
page URL: ${document.location.href}
detail: ${formData.get('detail') || 'not provided'}`

    return body
  }

  const createGUSWorkItem = (form) => {
    const body = createBody(form)
    console.log(body)

    // TODO: send the form to GUS
    // const response = fetch(gusURL, {
    //   mode: 'no-cors',
    //   body,
    //   headers: {
    //     Authorization: 'Bearer fakeToken',
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'post',
    // })
    // console.log(response.json())
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
      if (!feedbackSubmitted) {
        show(feedbackFormDiv)
        feedbackForm.querySelector('input').focus()
      }
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
