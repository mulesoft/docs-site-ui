;(async () => {
  'use strict'

  const aside = document.querySelector('aside')
  const hideClass = 'hide'

  const isExpanded = (element) => element.ariaExpanded !== 'false'

  const isVisible = (element) => element &&
    window.getComputedStyle(element).display !== 'none' &&
    window.getComputedStyle(element).visibility !== 'hidden'

  const hide = (element) => element && element.classList.add(hideClass)
  const show = (element) => element && element.classList.remove(hideClass)

  const toggleAriaExpanded = (element, bool) => element && element.setAttribute('aria-expanded', bool)
  const toggleVisibility = (element, bool) => element && element.classList.toggle(hideClass, bool)

  // For some reason, mobile survey doesn't show up right after the page loads until I add this timeout.
  // Keep this timeout here for now until we have a better solution
  setTimeout(() => {
    const mobileSurveyDiv = document.querySelector('div.mobile-survey-div')
    if (!mobileSurveyDiv) return

    const mobileSurveyButton = mobileSurveyDiv.querySelector('button.mobile-survey-button')
    const mobileSurveyHelpText = mobileSurveyDiv.querySelector('p.mobile-survey-help-text')
    const mobileSurveySection = mobileSurveyDiv.querySelector('section.mobile-survey')

    const mobileSurveyIconImage = mobileSurveyButton.querySelector('img.survey-icon-image')
    const mobileSurveyIconCloseImage = mobileSurveyButton.querySelector('img.survey-icon-close-image')

    window.addEventListener('resize', () => toggleVisibility(mobileSurveyDiv, isVisible(aside)))
    toggleVisibility(mobileSurveyDiv, isVisible(aside))

    if (mobileSurveyButton) {
      mobileSurveyButton.addEventListener('mouseenter', () => show(mobileSurveyHelpText))
      mobileSurveyButton.addEventListener('mouseleave', () => hide(mobileSurveyHelpText))

      mobileSurveyButton.addEventListener('click', (e) => {
        const mobileSurveyIsExpanded = isExpanded(mobileSurveyButton)

        // TODO: add mobile behavior
        toggleVisibility(mobileSurveySection, mobileSurveyIsExpanded)
        toggleVisibility(mobileSurveyIconImage, !mobileSurveyIsExpanded)
        toggleVisibility(mobileSurveyIconCloseImage, mobileSurveyIsExpanded)

        toggleAriaExpanded(mobileSurveyButton, !mobileSurveyIsExpanded)
        e.preventDefault()
      })
    }
  }, 50)
})()
