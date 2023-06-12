;(async () => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard) return

  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')

  const feedbackAckMsgDiv = feedbackCard.querySelector('div.feedback-ack')
  const feedbackSecondRow = feedbackCard.querySelector('div.feedback-second-row')

  const giveFeedbackButtons = feedbackCard.querySelectorAll('button.give-feedback')

  const feedbackFormDiv = feedbackCard.querySelector('div.feedback-form')
  const feedbackForm = feedbackFormDiv?.querySelector('form')
  const feedbackFormCancelButton = feedbackForm?.querySelector('input[name="cancel"]')
  const feedbackFormSubmitButton = feedbackForm?.querySelector('input[name="submit"]')

  const feedbackFormThankYouSign = feedbackCard.querySelector('span.feedback-form-thank-you')

  const decision = ['Yes', 'No']
  const inputNamesWithValidation = ['feedback', 'email']
  const gusURL = 'http://gus-wi-creator:3000/api/gus/workitem'
  let voted
  let feedbackSubmitted

  const addListeners = (feedbackCard, decision) => {
    decision.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button.feedback-${decision.toLowerCase()}`)
      const feedbackButtonHelpText = feedbackCard.querySelector(`p#feedback-${decision.toLowerCase()}-help-text`)
      if (feedbackButton) {
        feedbackButton.addEventListener('click', (e) => {
          e.preventDefault()
          voted = true
          trackAnalytics(decision)
          feedbackButton.setAttribute('aria-pressed', true)
          feedbackOptionButtons.forEach((button) => hide(button))
          show(feedbackAckMsgDiv)
          updateFeedbackAckMsg(feedbackAckMsgDiv, decision)
          if (!feedbackSubmitted) {
            show(feedbackFormDiv)
            feedbackForm.querySelector('input').focus()
          }
        })
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
        e.stopImmediatePropagation()
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
        show(feedbackFormThankYouSign)
        feedbackSubmitted = true
        voted ? feedbackFormThankYouSign.focus() : feedbackOptionButtons[0].focus()
      })

      feedbackFormSubmitButton.addEventListener('click', () => {
        removeAllValidationVizIfValid(inputNamesWithValidation)
      })
    }
  }

  const addValidationListeners = (inputNames) => {
    inputNames.forEach((inputName) => {
      const input = document.querySelector(`input#${inputName}`)
      if (input) {
        const validationText = document.querySelector(`span#${inputName}-validation-text`)
        input.addEventListener('invalid', (e) => {
          e.preventDefault()
          show(validationText)
          addValidationViz(input)
          input.ariaInvalid = true
          input.setAttribute('aria-labelledby', `${inputName}-validation-text`)
        })
      }
    })
  }

  const addValidationViz = (element) => element.classList.add('invalid')

  const createBody = (form) => {
    const formData = new FormData(form) // eslint-disable-line
    return JSON.stringify({
      pageURL: document.location.href,
      subject: formData.get('feedback'),
      detail: formData.get('feedback-detail') || 'not provided',
      name: formData.get('name') || 'not provided',
      email: formData.get('email') || 'not provided',
    })
  }

  async function createGUSWorkItem (form) {
    const body = createBody(form)
    console.log(body)

    // const xhr = new XMLHttpRequest() // eslint-disable-line

    // xhr.addEventListener('readystatechange', function () {
    //   if (this.readyState === 4) {
    //     console.log(this.responseText)
    //   }
    // })

    // xhr.open('POST', 'http://localhost:3000/api/gus/workitem')
    // xhr.setRequestHeader('Content-Type', 'application/json')
    // xhr.send(body)

    /* eslint-disable */
    const response = await fetch(gusURL, {
      /* eslint-enable */
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    console.log(response)
  }

  const focusOnFirstInvalidInput = (feedbackForm) => {
    const firstInvalidInput = feedbackForm?.querySelector('input.invalid')
    if (firstInvalidInput) firstInvalidInput.focus()
  }

  const hide = (element) => {
    if (element) element.classList.add('hide')
  }

  const removeAllValidationVizIfValid = (inputNames, override) => {
    inputNames.forEach((inputName) => {
      const input = document.querySelector(`input#${inputName}`)
      const validationText = document.querySelector(`span#${inputName}-validation-text`)
      if (override || input.checkValidity()) removeValidationViz(input, validationText)
    })
    if (!override) focusOnFirstInvalidInput(feedbackForm)
  }

  const removeValidationViz = (input, validationText) => {
    if (input) {
      input.classList.remove('invalid')
      input.removeAttribute('aria-describedby')
      input.removeAttribute('aria-invalid')
    }
    if (validationText) validationText.classList.add('hide')
  }

  const show = (element) => {
    if (element) element.classList.remove('hide')
  }

  const trackAnalytics = (decision) => {
    try {
      if (window.analytics) {
        window.analytics.track(`Clicked Helpful ${decision}`, {
          title: document.title,
          url: window.location.href,
        })
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const updateFeedbackAckMsg = (feedbackAckMsgDiv, decision) => {
    const msg = feedbackAckMsgDiv.querySelector('p')
    if (msg) {
      msg.innerText += ` ${decision}`
      msg.setAttribute('aria-label', `You voted for ${decision ? 'helpful' : 'not helpful'}`)
    }
  }

  addListeners(feedbackCard, decision)
})()
