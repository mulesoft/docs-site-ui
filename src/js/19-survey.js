;(() => {
  'use strict'

  const surveySection = document.querySelector('aside > section.survey')
  if (!surveySection) return

  const surveyToggleButton = surveySection.querySelector('button.survey-toggle')
  const surveyTextDiv = surveySection.querySelector('div.survey-text')
  const takeTheSurveyButton = surveySection.querySelector('a.survey-button')

  const toggleAttribute = (element, attrName, bool, e) => {
    element?.setAttribute(attrName, bool)
    if (e) e.preventDefault()
  }

  const toggleClass = (element, className, bool, e) => {
    element?.classList?.toggle(className, bool)
    if (e) e.preventDefault()
  }

  if (surveyToggleButton) {
    surveyToggleButton.addEventListener('click', (e) => {
      const surveyIsExpanded = surveyToggleButton.ariaExpanded !== 'false'
      toggleClass(surveySection, 'short', surveyIsExpanded)
      toggleClass(surveyTextDiv, 'hide', surveyIsExpanded)
      toggleAttribute(surveyToggleButton, 'aria-expanded', !surveyIsExpanded)
      e.preventDefault()
    })
  }

  if (takeTheSurveyButton) {
    const currentPageUrl = window.location.href
    takeTheSurveyButton.href = `${takeTheSurveyButton.href}?source=${encodeURIComponent(currentPageUrl)}`
  }
})()
