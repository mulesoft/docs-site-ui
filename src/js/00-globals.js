'use strict'

window.MSCX = window.MSCX || {}

MSCX.l10n = (function () {
  const messageSets = 'includeLocMessagesAtBuildtime'
  const fallbackLocale = 'en'
  let messages = {}
  let locale = ''

  function setLocale (lang) {
    const docLang = document.documentElement.lang

    if (Object.hasOwn(messageSets, lang)) {
      locale = lang
    } else if (Object.hasOwn(messageSets, docLang)) {
      locale = docLang
    } else {
      locale = fallbackLocale
    }

    messages = messageSets[locale]
    if (locale !== fallbackLocale) {
      Object.setPrototypeOf(messages, messageSets[fallbackLocale])
    }
  }

  function lookupMessage (messageKey) {
    if (!(messageKey in messages)) {
      console.error(`Missing UI string: ${messageKey}`)
      return messageKey
    }

    return messages[messageKey]
  }

  function localizeDOM () {
    const loadingElems = document.querySelectorAll('.hide-until-l10n')

    localizeAttribute('data-l10n-alt', 'alt')
    localizeAttribute('data-l10n-label', 'aria-label')
    localizeAttribute('data-l10n-title', 'title')
    localizeAttribute('data-l10n-text', 'textContent')

    loadingElems.forEach((elem) => {
      elem.classList.remove('hide-until-l10n')
    })
  }

  function localizeAttribute (attributeSrc, attributeTarget) {
    let locMsg = ''
    const elems = document.querySelectorAll(`[${attributeSrc}]`)

    elems.forEach((elem) => {
      locMsg = lookupMessage(elem.getAttribute(attributeSrc))

      if (attributeTarget === 'textContent') {
        elem.textContent = locMsg
      } else {
        elem.setAttribute(attributeTarget, locMsg)
      }
    })
  }

  Object.freeze(messageSets)
  setLocale()
  window.addEventListener('load', localizeDOM)

  return {
    getMessage: lookupMessage,
  }
})()
