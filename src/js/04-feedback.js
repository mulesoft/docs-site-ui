; (() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard) return

  const feedbackAckMsgSpan = feedbackCard.querySelector('span#feedback-ack')
  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')

  const feedbackFormDiv = feedbackCard.querySelector('div.feedback-form')
  const feedbackForm = feedbackFormDiv?.querySelector('form')
  const feedbackFormErrorSummary = feedbackForm?.querySelector('span#error-summary')

  const feedbackFormThankYouSign = feedbackCard.querySelector('span.feedback-form-thank-you')

  const decision = ['yes', 'no']

  const addListeners = (feedbackCard, decision) => {
    decision.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button#feedback-${decision}`)
      if (feedbackButton) {
        feedbackButton.addEventListener('click', (e) => {
          e.preventDefault()
          trackAnalytics(decision)
          updateFeedbackAckMsg(feedbackAckMsgSpan, decision)
          feedbackButton.classList.add('selected')
          feedbackOptionButtons.forEach((button) => { button.disabled = true })
          if (userSelectedHelpful(feedbackButton)) removeIcon(feedbackButton)

          show(feedbackFormDiv)
          show(feedbackFormDiv.querySelector(`fieldset#questions-${decision}`))
          const focusElement = getFirstVisibleFocusableChildElement(feedbackFormDiv)
          focusElement?.focus()
        })
      }
    })

    // addValidationListeners(inputNamesWithValidation)

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (atLeastOneCheckboxChecked(feedbackForm)) {
          submitFeedbackToBackend(feedbackForm)
          hide(feedbackFormDiv)
          show(feedbackFormThankYouSign)
          updateErrorSummary(feedbackFormErrorSummary)
          feedbackFormThankYouSign.focus()
        }
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

  const atLeastOneCheckboxChecked = (feedbackForm) => {
    const checkboxes = feedbackForm.querySelectorAll('input[type="checkbox"]')
    for (let i = 0; i < checkboxes.length; i++) {
      if (!isHidden(checkboxes[i]) && checkboxes[i].checked) return true
    }
  }

  const createBody = (form) => {
    const formData = new FormData(form) // eslint-disable-line
    const formJSON = {
      pageURL: document.location.href,
      summary: formData.get('feedback'),
    }

    return JSON.stringify(formJSON)
  }

  const getFirstVisibleFocusableChildElement = (element) => {
    const inputs = element.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      if (!isHidden(inputs[i])) return inputs[i]
    }
  }

  const isHidden = (element) => element.offsetParent === null

  const removeIcon = (element) => {
    const icon = element.querySelector('img')
    icon?.remove()
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

  const updateFeedbackAckMsg = (feedbackAckMsgSpan, decisionStr) => {
    feedbackAckMsgSpan.setAttribute('aria-label', `You voted for ${decisionStr === 'yes' ? 'helpful' : 'not helpful'}.`)
  }

  const userSelectedHelpful = (feedbackButton) => feedbackButton.id === 'feedback-yes'

  addListeners(feedbackCard, decision)
})()
