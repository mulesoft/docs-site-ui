;(() => {
  'use strict'

  const surveySection = document.querySelector('aside > section.survey')
  if (!surveySection) return

  const eligibleCountryTimezones = [
    // United States
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',

    // Ireland
    'Europe/Dublin',

    // Australia
    'Australia/Sydney',
    'Australia/Adelaide',
    'Australia/Perth',
    'Australia/Eucla',

    // Canada (except Quebec)
    'America/Toronto',
    'America/Winnipeg',
    'America/Edmonton',
    'America/Vancouver',

    // New Zealand
    'Pacific/Auckland',

    // United Kingdom
    'Europe/London',
  ]

  const surveyToggleButton = surveySection.querySelector('button.survey-toggle')
  const surveyTextDiv = surveySection.querySelector('div.survey-text')

  const addSourceParam = (link) => {
    const currentPageUrl = window.location.pathname
    link.href = `${link.href}?source=${encodeURIComponent(currentPageUrl)}`
  }

  const toggleAttribute = (element, attrName, bool, e) => {
    if (e) e.preventDefault()
    return element?.setAttribute(attrName, bool)
  }

  const toggleClass = (element, className, bool, e) => {
    if (e) e.preventDefault()
    return element?.classList?.toggle(className, bool)
  }

  const userInCountries = (timezones) => timezones.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)

  if (!userInCountries(eligibleCountryTimezones)) {
    surveySection.remove()
    return
  }

  toggleClass(surveySection, 'hide', false)

  if (surveyToggleButton) {
    surveyToggleButton.addEventListener('click', (e) => {
      const surveyIsExpanded = surveyToggleButton.ariaExpanded !== 'false'
      toggleClass(surveySection, 'short', surveyIsExpanded)
      toggleClass(surveyTextDiv, 'hide', surveyIsExpanded)
      toggleAttribute(surveyToggleButton, 'aria-expanded', !surveyIsExpanded)
      e.preventDefault()
    })
  }

  if (takeTheSurveyLink) addSourceParam(takeTheSurveyLink)
})()
