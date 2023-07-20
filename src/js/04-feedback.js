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
  const feedbackFormCancelButton = feedbackForm?.querySelector('input[name="cancel"]')
  const feedbackFormSubmitButton = feedbackForm?.querySelector('input[name="submit"]')
  const feedbackFormErrorSummary = feedbackForm?.querySelector('span#error-summary')

  const feedbackFormThankYouSign = feedbackCard.querySelector('span.feedback-form-thank-you')

  const decision = ['Yes', 'No']
  const inputNamesWithValidation = ['feedback']
  let feedbackSubmitted
  let voted

  const addListeners = (feedbackCard, decision) => {
    decision.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button.feedback-${decision.toLowerCase()}`)
      const feedbackButtonHelpText = feedbackCard.querySelector(`p#feedback-${decision.toLowerCase()}-help-text`)
      if (feedbackButton) {
        feedbackButton.addEventListener('click', (e) => {
          e.preventDefault()
          voted = true
          trackAnalytics(decision)
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
        submitFeedbackToBackend(feedbackForm)
        hide(feedbackFormDiv)
        show(feedbackFormThankYouSign)
        updateErrorSummary(feedbackFormErrorSummary)
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
          updateErrorSummary(feedbackFormErrorSummary)
          input.ariaInvalid = true
          input.setAttribute('aria-labelledby', `${inputName}-validation-text`)
          document.activeElement.blur()
          setTimeout(() => {
            focusOnFirstInvalidInput(feedbackForm)
          }, 100)
        })
      }
    })
  }

  const addValidationViz = (element) => element.classList.add('invalid')

  const aggregateErrorMessages = (errorMessages) => {
    let errorMsgs = ''
    errorMessages.forEach((error, index) => {
      if (error.innerText) {
        errorMsgs += `\n${index + 1}: ${error.innerText};`
      }
    })
    return errorMsgs
  }

  const createBody = (form) => {
    const formData = new FormData(form) // eslint-disable-line
    const formJSON = {
      pageURL: document.location.href,
      subject: formData.get('feedback'),
    }

    if (formData.get('feedback-detail')) formJSON.detail = formData.get('feedback-detail')

    return JSON.stringify(formJSON)
  }

  const submitFeedbackToBackend = (form) => {
    const body = createBody(form)

    console.log(body)

    /* eslint-disable */
    fetch('/api/v1/form-submit', {
      body,
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      /* eslint-enable */
      .then((response) => {
        if (response.ok) {
          console.log('Form submitted successfully')
          console.log(response)
        } else {
          console.error('Error submitting form')
        }
      })
      .catch((error) => {
        console.error('Network error:', error)
      })
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
      input.removeAttribute('aria-labelledby')
      input.removeAttribute('aria-invalid')
      updateErrorSummary(feedbackFormErrorSummary)
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

  const updateErrorSummary = (errorSummary) => {
    if (errorSummary) {
      const validationErrors = feedbackForm.querySelectorAll('.validation-text:not(.hide)')
      const errorCount = validationErrors.length
      if (errorCount) {
        const errorMsg = aggregateErrorMessages(validationErrors)
        errorSummary.innerText = `${errorCount} error${errorCount !== 1 ? 's' : ''} found in this form: ${errorMsg}`
      } else {
        errorSummary.innerText = ''
      }
    }
  }

  const updateFeedbackAckMsg = (feedbackAckMsgDiv, decisionStr) => {
    const msg = feedbackAckMsgDiv.querySelector('p')
    if (msg) {
      msg.innerText += ` ${decisionStr}`
      msg.setAttribute(
        'aria-label',
        `You voted for ${decisionStr === 'Yes' ? 'helpful' : 'not helpful'}.`
      )
    }
  }

  addListeners(feedbackCard, decision)
})()
