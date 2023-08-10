; (() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard) return

  const feedbackAckMsgSpan = feedbackCard.querySelector('span#feedback-ack')
  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')

  const feedbackFormDiv = feedbackCard.querySelector('div.feedback-form')
  const feedbackForm = feedbackFormDiv?.querySelector('form')

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

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (atLeastOneCheckboxChecked(feedbackForm)) {
          submitFeedbackToBackend(feedbackForm)
          hide(feedbackFormDiv)
          show(feedbackFormThankYouSign)
          feedbackFormThankYouSign.focus()
        } else {
          const checkboxesValidationText = feedbackForm.querySelector('span#checkboxes-validation-text')
          show(checkboxesValidationText)
          const focusElement = getFirstVisibleFocusableChildElement(feedbackFormDiv)
          focusElement?.focus()
        }
      })
    }
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

  const hide = (element) => element?.classList.add('hide')
  const show = (element) => element?.classList.remove('hide')

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

  const updateFeedbackAckMsg = (feedbackAckMsgSpan, decisionStr) => {
    feedbackAckMsgSpan.setAttribute('aria-label', `You voted for ${decisionStr === 'yes' ? 'helpful' : 'not helpful'}.`)
  }

  const userSelectedHelpful = (feedbackButton) => feedbackButton.id === 'feedback-yes'

  addListeners(feedbackCard, decision)
})()
