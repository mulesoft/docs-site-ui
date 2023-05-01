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

  const isExpanded = (element) => element.ariaExpanded !== 'false'
  const isMobileScreen = () => !window.matchMedia(' (min-width: 768px)').matches

  const isVisible = (element) =>
    element &&
    window.getComputedStyle(element).display !== 'none' &&
    window.getComputedStyle(element).visibility !== 'hidden'

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

  const toggleAttribute = (element, attrName, bool) => element && element.setAttribute(attrName, bool)
  const toggleClass = (element, className, bool) => element && element.classList.toggle(className, bool)
  const toggleHelpText = (helpText, bool) => (helpText.innerHTML = bool ? 'Take Survey' : 'Hide')

  const toggleTabIndexOutsideOf = (element, bool) => {
    const links = document.querySelectorAll('a, button, select, .tooltip, .menu-ham')
    links.forEach((link) => setTabindex(element, link, bool))
  }

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
          backdrop.addEventListener('click', () => {
            toggleAll(!mobileSurveyIsExpanded)
            toggleTabIndexOutsideOf(mobileSurveyDiv, false)
          })
          mobileSurveyToggleButton.addEventListener('click', () => {
            toggleAll(!mobileSurveyIsExpanded)
            toggleTabIndexOutsideOf(mobileSurveyDiv, false)
          })
          toggleTabIndexOutsideOf(mobileSurveyDiv, !mobileSurveyIsExpanded)
        }
        toggleAll(mobileSurveyIsExpanded)
        toggleHelpText(mobileSurveyHelpText, mobileSurveyIsExpanded)
        if (!mobileSurveyIsExpanded) takeTheSurveyButton.focus()
        e.preventDefault()
      })
    }
  }, 50)
})()
