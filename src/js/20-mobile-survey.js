;(async () => {
  'use strict'

  const hasAside = () => {
    const aside = document.querySelector('aside')
    return (
      aside &&
      window.getComputedStyle(aside).display !== 'none' &&
      window.getComputedStyle(aside).visibility !== 'hidden'
    )
  }

  const hide = (element) => element.classList.add('hide')
  const show = (element) => element.classList.remove('hide')

  setTimeout(() => {
    const mobileSurveyDiv = document.querySelector('div.mobile-survey-div')
    if (!mobileSurveyDiv) return

    const mobileSurveyButton = mobileSurveyDiv.querySelector('button.mobile-survey-button')
    const mobileSurveyHelpText = mobileSurveyDiv.querySelector('p.mobile-survey-help-text')
    const mobileSurveySection = mobileSurveyDiv.querySelector('section.mobile-survey')
    const mobileSurveyIconImage = mobileSurveyButton.querySelector('img.survey-icon-image')
    const mobileSurveyIconCloseImage = mobileSurveyButton.querySelector('img.survey-icon-close-image')
    console.log(mobileSurveyIconImage)

    const toggleVisibility = () => {
      hasAside() ? mobileSurveyDiv.classList.add('hide') : mobileSurveyDiv.classList.remove('hide')
    }

    window.addEventListener('resize', toggleVisibility)
    toggleVisibility()

    if (mobileSurveyButton) {
      mobileSurveyButton.addEventListener('click', (e) => {
        const mobileSurveyIsExpanded = mobileSurveyButton.ariaExpanded !== 'false'
        const operation = mobileSurveyIsExpanded ? 'add' : 'remove'
        if (mobileSurveySection) mobileSurveySection.classList[operation]('hide')
        if (mobileSurveyButton) mobileSurveyButton.setAttribute('aria-expanded', !mobileSurveyIsExpanded)

        if (mobileSurveyIconImage) mobileSurveyIconImage.classList.toggle('hide', !mobileSurveyIsExpanded)
        if (mobileSurveyIconCloseImage) mobileSurveyIconCloseImage.classList[operation]('hide')
        e.preventDefault()
      })

      mobileSurveyButton.addEventListener('mouseenter', () => show(mobileSurveyHelpText))
      mobileSurveyButton.addEventListener('mouseleave', () => hide(mobileSurveyHelpText))
    }
  }, 50)
})()
