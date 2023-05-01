;(async () => {
  'use strict'

  const aside = document.querySelector('aside')
  const backdrop = document.querySelector('.modal-backdrop')
  const hideClass = 'hide'

  const isExpanded = (element) => element.ariaExpanded !== 'false'
  const isMobileScreen = () => !window.matchMedia(' (min-width: 768px)').matches

  const isVisible = (element) =>
    element &&
    window.getComputedStyle(element).display !== 'none' &&
    window.getComputedStyle(element).visibility !== 'hidden'

  const toggleAttribute = (element, attrName, bool) => element && element.setAttribute(attrName, bool)
  const toggleClass = (element, className, bool) => element && element.classList.toggle(className, bool)
  const toggleHelpText = (helpText, bool) => (helpText.innerHTML = bool ? 'Take Survey' : 'Hide')

  // For some reason, mobile survey doesn't show up right after the page loads until I add this timeout.
  // Keep this timeout here for now until we have a better solution
  setTimeout(() => {
    const mobileSurveyDiv = document.querySelector('div.mobile-survey-div')
    if (!mobileSurveyDiv) return

    const mobileSurveyToggleButton = mobileSurveyDiv.querySelector('button.survey-toggle')
    const mobileSurveyButton = mobileSurveyDiv.querySelector('button.mobile-survey-button')
    const mobileSurveySection = mobileSurveyDiv.querySelector('section.mobile-survey')
    const mobileSurveyHelpText = mobileSurveyDiv.querySelector('p.mobile-survey-help-text')
    const takeTheSurveyButton = mobileSurveyDiv.querySelector('.survey-button')

    const mobileSurveyIconImage = mobileSurveyButton.querySelector('img.survey-icon-image')
    const mobileSurveyIconCloseImage = mobileSurveyButton.querySelector('img.survey-icon-close-image')

    const toggleAll = (yes) => {
      toggleClass(mobileSurveySection, hideClass, yes)
      toggleClass(mobileSurveyIconImage, hideClass, !yes)
      toggleClass(mobileSurveyIconCloseImage, hideClass, yes)
      toggleAttribute(mobileSurveyButton, 'aria-expanded', !yes)
      if (isMobileScreen()) toggleClass(backdrop, 'show', !yes)
    }

    window.addEventListener('resize', () => toggleClass(mobileSurveyDiv, hideClass, isVisible(aside)))
    toggleClass(mobileSurveyDiv, hideClass, isVisible(aside))

    if (mobileSurveyButton) {
      mobileSurveyButton.addEventListener('click', (e) => {
        const mobileSurveyIsExpanded = isExpanded(mobileSurveyButton)

        if (isMobileScreen()) {
          toggleClass(backdrop, 'show', !mobileSurveyIsExpanded)
          backdrop.addEventListener('click', () => toggleAll(!mobileSurveyIsExpanded))
          mobileSurveyToggleButton.addEventListener('click', () => toggleAll(!mobileSurveyIsExpanded))
        }
        toggleAll(mobileSurveyIsExpanded)
        toggleHelpText(mobileSurveyHelpText, mobileSurveyIsExpanded)
        if (!mobileSurveyIsExpanded) takeTheSurveyButton.focus()
        e.preventDefault()
      })
    }
  }, 50)
})()
