;(() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard) return

  const formSubmitAPIVersion = 'v1'

  const questionsMap = {
    yes: {
      legend: 'Thanks for the feedback! What made this article helpful? (Please check at least 1 checkbox.)',
      is_accurate: 'Contains accurate information',
      is_comprehensive: 'Includes all of the information I need',
      is_clear: 'Easy to understand, with clear explanations and visuals',
      other: 'Something else',
    },
    no: {
      legend: "We're sorry to hear that. How can we improve this article? (Please check at least 1 checkbox.),",
      is_accurate: 'Contains inaccurate or outdated information',
      is_comprehensive: 'Missing important information',
      is_clear: 'Confusing or difficult to understand',
      is_descriptive: "The article is OK, but I don't like how the product described works",
      other: 'Something else',
    },
  }

  const feedbackAckMsgSpan = feedbackCard.querySelector('span#feedback-ack')
  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')

  const feedbackFormDiv = feedbackCard.querySelector('div.feedback-form')
  const feedbackForm = feedbackFormDiv?.querySelector('form')
  const feedbackFieldSet = feedbackForm?.querySelector('fieldset')

  const feedbackFormThankYouSign = feedbackCard.querySelector('span.feedback-form-thank-you')

  const thumbDirections = ['yes', 'no']
  let selectedThumbDirection

  const addLegend = (feedbackFieldSet, yes) => {
    const legend = document.createElement('legend')
    legend.innerText = questionsMap[yes].legend
    feedbackFieldSet.appendChild(legend)
  }

  const addListeners = (feedbackCard, thumbDirections) => {
    thumbDirections.forEach((decision) => {
      const feedbackButton = feedbackCard.querySelector(`button#feedback-${decision}`)
      if (feedbackButton) {
        feedbackButton.addEventListener('click', (e) => {
          e.preventDefault()
          trackAnalytics(decision)
          selectedThumbDirection = decision === 'yes'
          updateFeedbackAckMsg(feedbackAckMsgSpan, decision)
          feedbackButton.classList.add('selected')
          feedbackOptionButtons.forEach((button) => {
            button.disabled = true
          })
          if (userSelectedHelpful(feedbackButton)) removeIcon(feedbackButton)

          show(feedbackFormDiv)
          populateForm(feedbackFieldSet, decision)
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

  const addQuestion = (feedbackFieldSet, questionType, question) => {
    const questionDiv = document.createElement('div')

    const input = createInput(questionType)
    questionDiv.appendChild(input)

    const label = createLabel(questionType, question)
    questionDiv.appendChild(label)

    feedbackFieldSet.appendChild(questionDiv)
  }

  const addQuestions = (feedbackFieldSet, yes) => {
    const questions = Object.entries(questionsMap[yes])
    for (const [key, value] of questions) {
      if (key !== 'legend') addQuestion(feedbackFieldSet, key, value)
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
      comment: formData.get('comment'),
      component: document.head.querySelector("meta[name='page-component']").content || '',
      language: document.documentElement.lang,
      is_helpful: selectedThumbDirection ? 'yes' : 'no',
      page_path: document.location.pathname,
      created_time: getCurrentUTCTime(),
    }

    const checkboxFields = getCheckboxFields()
    checkboxFields.forEach((field) => {
      formJSON[field] = parseCheckbox(formData.get(field), selectedThumbDirection)
    })

    return JSON.stringify(formJSON)
  }

  const createInput = (id) => {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = input.name = id
    return input
  }

  const createLabel = (questionType, question) => {
    const label = document.createElement('label')
    label.setAttribute('for', questionType)
    label.innerText = question
    return label
  }

  const getCheckboxFields = () => Object.keys(questionsMap.no)

  const getCurrentUTCTime = () => {
    const currentDate = new Date()
    return currentDate.toISOString().replace('T', ' ').substring(0, 19)
  }

  const getFirstVisibleFocusableChildElement = (element) => {
    const inputs = element.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      if (!isHidden(inputs[i])) return inputs[i]
    }
  }

  const isHidden = (element) => element.offsetParent === null

  const populateForm = (feedbackFieldSet, yes) => {
    addLegend(feedbackFieldSet, yes)
    addQuestions(feedbackFieldSet, yes)
  }

  const parseCheckbox = (checkbox, yes) => {
    if (checkbox) return yes ? 'yes' : 'no'
  }

  const removeIcon = (element) => {
    const icon = element.querySelector('img')
    icon?.remove()
  }

  const submitFeedbackToBackend = (form) => {
    const body = createBody(form)

    /* eslint-disable */
    fetch(`/api/${formSubmitAPIVersion}/form-submit`, {
      body,
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      /* eslint-enable */
      .then((response) => {
        response.ok ? console.log('Form submitted successfully') : console.error('Error submitting form')
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

  addListeners(feedbackCard, thumbDirections)
})()
