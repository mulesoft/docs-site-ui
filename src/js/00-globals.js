'use strict'

window.MSCX = window.MSCX || {
  l10n: {
    fallbackLocale: 'en',
    messages: 'includeLocMessagesAtBuildtime',
  },
}

MSCX.l10n.setLocale = function (lang) {
  const docLang = document.documentElement.lang

  if (Object.hasOwn(this.messages, lang)) {
    this.locale = lang
  } else if (Object.hasOwn(this.messages, docLang)) {
    this.locale = docLang
  } else {
    this.locale = this.fallbackLocale
  }

  this.message = this.messages[this.locale]
  if (this.locale !== this.fallbackLocale) {
    Object.setPrototypeOf(this.message, this.messages[this.fallbackLocale])
  }
}

MSCX.l10n.getMessage = function (messageKey) {
  if (!(messageKey in this.message)) {
    console.error(`Missing UI string: ${messageKey}`)
    return messageKey
  }

  return this.message[messageKey]
}

MSCX.l10n.localizeDOM = function () {
  const loadingElems = document.querySelectorAll('.hide-until-l10n')

  MSCX.l10n.localizeAttribute('data-l10n-text', 'textContent')
  MSCX.l10n.localizeAttribute('data-l10n-label', 'aria-label')
  // Optionally, hide elements until loaded to prevent FOUC
  loadingElems.forEach((elem) => {
    elem.classList.remove('hide-until-l10n')
  })
}

MSCX.l10n.localizeAttribute = function (attributeSrc, attributeTarget) {
  let locMsg = ''
  const elems = document.querySelectorAll(`[${attributeSrc}]`)

  elems.forEach((elem) => {
    locMsg = MSCX.l10n.getMessage(elem.getAttribute(attributeSrc))
    if (attributeTarget === 'textContent') {
      elem.textContent = locMsg
    } else {
      elem.setAttribute(attributeTarget, locMsg)
    }
  })
}

MSCX.l10n.init = (function () {
  Object.freeze(MSCX.l10n.messages)
  MSCX.l10n.setLocale()
  window.addEventListener('load', MSCX.l10n.localizeDOM)
})()
