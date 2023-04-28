;(() => {
  'use strict'

  const surveySection = document.querySelector('aside > section.survey')
  if (!surveySection) return

  const surveyToggleButton = surveySection.querySelector('button.survey-toggle')
  const surveyTextDiv = surveySection.querySelector('div.survey-text')

  if (surveyToggleButton) {
    surveyToggleButton.addEventListener('click', (e) => {
      const surveyIsExpanded = surveyToggleButton.ariaExpanded !== 'false'
      const operation = surveyIsExpanded ? 'add' : 'remove'
      surveySection.classList[operation]('short')
      if (surveyTextDiv) surveyTextDiv.classList[operation]('hide')
      surveyToggleButton.setAttribute('aria-expanded', !surveyIsExpanded)
      e.preventDefault()
    })
  }
})()
