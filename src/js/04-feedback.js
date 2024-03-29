;(() => {
  'use strict'

  const feedbackCard = document.querySelector('section.feedback-section')
  if (!feedbackCard) return

  const formSubmitAPIVersion = 'v1'
  const maxCharCount = 800

  const questionSets = 'feedbackQuestions'
  const questionsMap = questionSets[formSubmitAPIVersion]

  const feedbackAckMsgSpan = feedbackCard.querySelector('span#feedback-ack')
  const feedbackOptionButtons = feedbackCard.querySelectorAll('div.feedback-options button')

  const feedbackFormDiv = feedbackCard.querySelector('div.feedback-form')
  const feedbackForm = feedbackFormDiv?.querySelector('form')
  const feedbackFieldSet = feedbackForm?.querySelector('fieldset')
  const feedbackFormTextarea = feedbackForm?.querySelector('textarea')
  const feedbackFormTextareaCharCount = feedbackForm?.querySelector('span.feedback-form-textarea-character-count')

  const feedbackFormThankYouSign = feedbackCard.querySelector('span.feedback-form-thank-you')

  const thumbDirections = ['yes', 'no']
  let selectedThumbDirection

  // these variables are used to prevent bot attacks by creating a time buffer between
  // "user" clicking yes/no and clicking the submit button
  let timerStart
  let timerEnd
  const bufferMilliseconds = 500

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
          timerStart = Date.now()
          trackAnalytics(decision)
          selectedThumbDirection = decision === 'yes'
          updateFeedbackAckMsg(feedbackAckMsgSpan, decision)
          feedbackButton.classList.add('selected')
          feedbackOptionButtons.forEach((button) => {
            button.disabled = true
          })

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
        timerEnd = Date.now()
        if (timerEnd - timerStart > bufferMilliseconds) {
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
        }
      })
    }

    if (feedbackFormTextarea) {
      initializeCharCount(feedbackFormTextareaCharCount)
      feedbackFormTextarea.addEventListener('keyup', (e) => {
        const currentCharCount = feedbackFormTextarea.value.length
        feedbackFormTextareaCharCount.innerText = `${maxCharCount - currentCharCount} / ${maxCharCount}`
        e.preventDefault()
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
    for (const checkbox of checkboxes) {
      if (!isHidden(checkbox) && checkbox.checked) return true
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
      survey_id: getSurveyID(window.location.host),
      survey_version: formSubmitAPIVersion,
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
    for (const input of inputs) {
      if (!isHidden(input)) return input
    }
  }

  const getSurveyID = (baseURL) => {
    const surveyIDsSet = 'surveyIDs'
    const fallbackSurveyID = 'others'
    const lang = document.documentElement.lang
    const surveyIDLabel = Object.hasOwn(surveyIDsSet[lang], baseURL) ? surveyIDsSet[lang][baseURL] : fallbackSurveyID
    return `mulesoft_docs_${surveyIDLabel}`
  }

  const initializeCharCount = (charCountSpan) => {
    charCountSpan.innerText = `${maxCharCount} / ${maxCharCount}`
  }

  const isHidden = (element) => element.offsetParent === null

  const populateForm = (feedbackFieldSet, yes) => {
    addLegend(feedbackFieldSet, yes)
    addQuestions(feedbackFieldSet, yes)
  }

  const parseCheckbox = (checkbox, yes) => {
    if (checkbox) return yes ? 'yes' : 'no'
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

  addListeners(feedbackCard, thumbDirections)
})()
