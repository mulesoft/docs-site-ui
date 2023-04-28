;(() => {
  'use strict'

  const surveySection = document.querySelector('aside > section.survey')
  if (!surveySection) return

  const surveyToggleButton = surveySection.querySelector('button.survey-toggle')
  const surveyTextDiv = surveySection.querySelector('div.survey-text')

  const toggleAttribute = (element, attrName, bool) => element && element.setAttribute(attrName, bool)
  const toggleClass = (element, className, bool) => element && element.classList.toggle(className, bool)

  if (surveyToggleButton) {
    surveyToggleButton.addEventListener('click', (e) => {
      const surveyIsExpanded = surveyToggleButton.ariaExpanded !== 'false'
      toggleClass(surveySection, 'short', surveyIsExpanded)
      toggleClass(surveyTextDiv, 'hide', surveyIsExpanded)
      toggleAttribute(surveyToggleButton, 'aria-expanded', !surveyIsExpanded)
      e.preventDefault()
    })
  }
})()
