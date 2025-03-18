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

  function lookupLocale () {
    return locale
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

  const setCopyright = () => {
    document.querySelectorAll('.copyright-year').forEach((elem) => {
      elem.textContent = String(new Date().getFullYear())
    })
  }

  function doLast () {
    localizeDOM()
    setCopyright()
  }

  Object.freeze(messageSets)
  setLocale()
  window.addEventListener('load', doLast)

  return {
    getMessage: lookupMessage,
    getLocale: lookupLocale,
  }
})()

MSCX.cookieConsent = (function () {
  const getAllowedCookieGroups = () => {
    if (window.OnetrustActiveGroups) {
      return window.OnetrustActiveGroups
    }

    // OnetrustActiveGroups isn't available on first page load; read from stored cookie
    // Example: OptanonConsent=[...]groups=1:1,3:1,4:0 returns '1,3'
    const cookies = document.cookie
    const optanonConsentCookie = cookies.split('; ').find((cookie) => cookie.startsWith('OptanonConsent='))

    if (!optanonConsentCookie) {
      return ''
    }

    const groupsMatch = optanonConsentCookie.match(/groups=([^;]+)/)
    if (!groupsMatch) {
      return ''
    }

    const groupsData = decodeURIComponent(groupsMatch[1])
    const allowedGroups = groupsData
      .split(',')
      .filter((group) => group.endsWith(':1'))
      .map((group) => group.split(':')[0])

    return allowedGroups.join(',')
  }

  const hasUserConsentedToCookieGroup = (groupName) => {
    const cookieGroupLookup = {
      required: 1,
      // 2 is listed by OneTrust, but not used by Salesforce
      functional: 3,
      advertising: 4,
    }

    if (!getAllowedCookieGroups().includes(cookieGroupLookup[groupName])) {
      return false
    }
    return true
  }

  const watchForCookieChoiceChange = () => {
    Object.defineProperty(window, 'OnetrustActiveGroups', {
      get () {
        return allowedCookieGroups
      },
      set (newGroups) {
        if (allowedCookieGroups !== '') {
          onCookieChoiceChange(allowedCookieGroups, newGroups)
        }
        allowedCookieGroups = newGroups
      },
    })
  }

  const onCookieChoiceChange = (oldGroups, newGroups) => {
    const oldIncludesFunctional = hasUserConsentedToCookieGroup('functional', oldGroups)
    const newIncludesFunctional = hasUserConsentedToCookieGroup('functional', newGroups)

    if ((oldIncludesFunctional && !newIncludesFunctional) ||
      (!oldIncludesFunctional && newIncludesFunctional)) {
      console.log('Functional cookies added or removed')
      // Reload page here, or dispatch event
    }
  }

  let allowedCookieGroups = window.OnetrustActiveGroups || '' //getAllowedCookieGroups()
  watchForCookieChoiceChange()

  return {
    isGroupAllowed: hasUserConsentedToCookieGroup,
  }
})()
