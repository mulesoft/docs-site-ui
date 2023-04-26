;(() => {
  'use strict'

  const surveySection = document.querySelector('section.survey')
  if (!surveySection) return

  const surveyToggleButton = surveySection.querySelector('button.survey-toggle')
  const surveyIconDiv = surveySection.querySelector('div.survey-icon')
  const surveyTextDiv = surveySection.querySelector('div.survey-text')

  if (surveyToggleButton) {
    surveyToggleButton.addEventListener('click', (e) => {
      const surveyIsExpanded = surveyToggleButton.ariaExpanded !== 'false'
      const operation = surveyIsExpanded ? 'add' : 'remove'
      surveySection.classList[operation]('short')
      if (surveyIconDiv) surveyIconDiv.classList[operation]('hide')
      if (surveyTextDiv) surveyTextDiv.classList[operation]('hide')
      surveyToggleButton.setAttribute('aria-expanded', !surveyIsExpanded)
      e.preventDefault()
    })
  }
})()