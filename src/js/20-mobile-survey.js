;(async () => {
  'use strict'

  const aside = document.querySelector('aside')
  const backdrop = document.querySelector('.modal-backdrop')
  const hideClass = 'hide'
  const tabindexStoreMap = {}
  let surveyPopover

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
      toggleClass(surveyPopover, hideClass, true)
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
        toggleAll(mobileSurveyIsExpanded)
        toggleHelpText(mobileSurveyHelpText, mobileSurveyIsExpanded)
        if (!mobileSurveyIsExpanded) takeTheSurveyButton.focus()
        e.preventDefault()
      })
    }

    if (isMobileScreen() && !localStorage.getItem('hide_mobile_survey_popover')) {
      surveyPopover = tippy(mobileSurveyButton, {
        allowHTML: true,
        arrow: tippy.roundArrow,
        content:
          '<p>Take our <strong>5 minute survey</strong> and ' +
          'you’ll have a chance to <strong>win 1 of 10 $25 gift cards</strong>!</p>' +
          '<button aria-label="Close survey popover and never show it again"' +
          'class="survey-popover-close-button" title="Close survey popover and never show it again">' +
          '<img loading="lazy" src="../_/img/icons/close.svg" alt=""></button>',
        hideOnClick: false,
        inertia: true,
        interactive: true,
        offset: [0, 15],
        onHide: () => false, // this means the tippy will always show
        placement: 'top-end',
        showOnCreate: true,
        theme: 'survey-popover',
        touchHold: true,
        zIndex: 'var(--z-survey)',
      }).popper

      const surveyPopoverCloseButton = document.querySelector('.survey-popover-close-button')
      if (surveyPopoverCloseButton) {
        surveyPopoverCloseButton.addEventListener('click', (e) => {
          toggleClass(surveyPopover, hideClass, true)
          localStorage.setItem('hide_mobile_survey_popover', true)
          e.preventDefault()
        })
      }
    }
  }, 50)
})()
