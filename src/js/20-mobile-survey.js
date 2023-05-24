;(async () => {
  'use strict'

  const aside = document.querySelector('aside')
  const backdrop = document.querySelector('.modal-backdrop')
  const hideClass = 'hide'
  const tabindexStoreMap = {}

  const contains = (parentElement, element) => parentElement.contains(element)

  // source:
  // https://stackoverflow.com/questions/2631820/
  // how-do-i-ensure-saved-click-coordinates-can-be-reload-to-the-same-place-even-if/2631931
  const getXPath = (element) => {
    if (element.id !== '') return `id("${element.id}")`
    if (element === document.body) return element.nodeName.toLowerCase()

    let ix = 0
    const siblings = element.parentNode.childNodes
    for (const sibling of siblings) {
      if (sibling === element) return `${getXPath(element.parentNode)}/${element.tagName}[${ix + 1}]`
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++
    }
  }

  const hideForever = (mobileSurveyPopover, e) => {
    toggleClass(mobileSurveyPopover, hideClass, true, e)
    localStorage.setItem('docs_mulesoft_hide_mobile_survey_popover', true)
  }

  const isExpanded = (element) => element.ariaExpanded !== 'false'
  const isMobileScreen = () => !window.matchMedia(' (min-width: 768px)').matches

  const isVisible = (element) =>
    element &&
    window.getComputedStyle(element).display !== 'none' &&
    window.getComputedStyle(element).visibility !== 'hidden'

  const mobileSurveyIsHidden = () => localStorage.getItem('docs_mulesoft_hide_mobile_survey_popover')

  const setTabindex = (parentElement, link, yes) => {
    if (!contains(parentElement, link)) {
      const tabIndex = link.tabIndex
      const linkPath = getXPath(link)
      link.removeAttribute('tabindex')
      if (yes) {
        if (!(linkPath in tabindexStoreMap) || tabindexStoreMap[linkPath] == null) {
          tabindexStoreMap[linkPath] = tabIndex
        }
        link.tabIndex = -1
      } else if (linkPath in tabindexStoreMap && tabindexStoreMap[linkPath] != null) {
        link.tabIndex = tabindexStoreMap[linkPath]
        tabindexStoreMap[linkPath] = null
      }
    }
  }

  const toggleAttribute = (element, attrName, bool, e) => {
    if (e) e.preventDefault()
    return element?.setAttribute(attrName, bool)
  }

  const toggleClass = (element, className, bool, e) => {
    if (e) e.preventDefault()
    return element?.classList?.toggle(className, bool)
  }

  const toggleHelpText = (helpText, bool) => (helpText.innerHTML = bool ? 'Take Survey' : 'Hide')

  const toggleTabIndexOutsideOf = (element, bool) => {
    const links = document.querySelectorAll('a, button, select, .tooltip, .menu-ham')
    links.forEach((link) => setTabindex(element, link, bool))
  }

  const pilotSurveyIsHidden = () => localStorage.getItem('docs_mulesoft_hide_pilot_survey')

  const hideSurvey = (percent) => pilotSurveyIsHidden() || Math.random() < percent / 100

  // For some reason, mobile survey doesn't show up right after the page loads until I add this timeout.
  // Keep this timeout here for now until we have a better solution
  setTimeout(() => {
    const mobileSurveyDiv = document.querySelector('div.mobile-survey-div')
    if (!mobileSurveyDiv) return

    if (hideSurvey(1)) {
      toggleClass(document.querySelector('aside > section.survey'), 'hide', true)
      toggleClass(mobileSurveyDiv, 'hide', true)
      localStorage.setItem('docs_mulesoft_hide_pilot_survey', true)
      return
    }

    const mobileSurveyToggleButton = mobileSurveyDiv.querySelector('button.survey-toggle')
    const mobileSurveyButton = mobileSurveyDiv.querySelector('button.mobile-survey-button')
    const mobileSurveySection = mobileSurveyDiv.querySelector('section.mobile-survey')
    const mobileSurveyHelpText = mobileSurveyDiv.querySelector('p.mobile-survey-help-text')
    const takeTheSurveyLink = mobileSurveyDiv.querySelector('.survey-link')
    const mobileSurveyPopover = mobileSurveyDiv.querySelector('.survey-popover')

    const mobileSurveyIconImage = mobileSurveyButton.querySelector('img.survey-icon-image')
    const mobileSurveyIconCloseImage = mobileSurveyButton.querySelector('img.survey-icon-close-image')

    const toggleAll = (yes) => {
      toggleClass(mobileSurveySection, hideClass, yes)
      toggleClass(mobileSurveyIconImage, hideClass, !yes)
      toggleClass(mobileSurveyIconCloseImage, hideClass, yes)
      toggleClass(mobileSurveyPopover, hideClass, true)
      toggleAttribute(mobileSurveyButton, 'aria-expanded', !yes)
      if (isMobileScreen()) toggleClass(backdrop, 'show', !yes)
    }

    window.addEventListener('resize', () => toggleClass(mobileSurveyDiv, hideClass, isVisible(aside)))
    toggleClass(mobileSurveyDiv, hideClass, isVisible(aside))

    if (mobileSurveyButton) {
      mobileSurveyButton.addEventListener('focus', (e) => toggleClass(mobileSurveyHelpText, 'hide', false, e))
      mobileSurveyButton.addEventListener('mouseover', (e) => toggleClass(mobileSurveyHelpText, 'hide', false, e))
      mobileSurveyButton.addEventListener('blur', (e) => toggleClass(mobileSurveyHelpText, 'hide', true, e))
      mobileSurveyButton.addEventListener('mouseout', (e) => toggleClass(mobileSurveyHelpText, 'hide', true, e))

      mobileSurveyButton.addEventListener('click', (e) => {
        const mobileSurveyIsExpanded = isExpanded(mobileSurveyButton)

        if (isMobileScreen()) {
          toggleClass(backdrop, 'show', !mobileSurveyIsExpanded)
          backdrop.addEventListener('click', () => {
            toggleAll(true)
            toggleTabIndexOutsideOf(mobileSurveyDiv, false)
            mobileSurveyButton.focus()
          })
          mobileSurveyToggleButton.addEventListener('click', () => {
            toggleAll(true)
            toggleTabIndexOutsideOf(mobileSurveyDiv, false)
            mobileSurveyButton.focus()
          })
          toggleTabIndexOutsideOf(mobileSurveyDiv, !mobileSurveyIsExpanded)
        }
        hideForever(mobileSurveyPopover)
        toggleAll(mobileSurveyIsExpanded)
        toggleHelpText(mobileSurveyHelpText, mobileSurveyIsExpanded)
        if (!mobileSurveyIsExpanded) takeTheSurveyLink.focus()
        e.preventDefault()
      })
    }

    if (!mobileSurveyIsHidden()) {
      toggleClass(mobileSurveyPopover, hideClass, false)
      const surveyPopoverCloseButton = document.querySelector('.survey-popover-close-button')
      if (surveyPopoverCloseButton) {
        surveyPopoverCloseButton.addEventListener('click', (e) => hideForever(mobileSurveyPopover, e))
      }
      if (takeTheSurveyLink) {
        takeTheSurveyLink.addEventListener('click', () => hideForever(mobileSurveyPopover))
      }
      const surveyPopoverContentLink = document.querySelector('.survey-popover-content a')
      if (surveyPopoverContentLink) {
        surveyPopoverContentLink.addEventListener('click', () => hideForever(mobileSurveyPopover))
      }
    }
  }, 50)
})()
