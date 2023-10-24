'use strict';

var l10n = l10n || {
  fallbackLocale: 'en',
  messages: 'includeLocMessagesAtBuildtime'
};

l10n.setLocale = function (lang) {
  let docLang = document.documentElement.lang;

  if (this.messages.hasOwnProperty(lang)) {
    this.locale = lang;
  } else if (this.messages.hasOwnProperty(docLang)) {
    this.locale = docLang;
  } else {
    this.locale = this.fallbackLocale;
  }

  this.message = this.messages[this.locale];
  if (this.locale !== this.fallbackLocale) {
    Object.setPrototypeOf(this.message, this.messages[this.fallbackLocale]);
  }
};

l10n.getMessage = function (messageKey) {
  if (!messageKey in this.message) {
    console.error(`Missing UI string: ${messageKey}`)
    return messageKey;
  }

  return this.message[messageKey];
}

l10n.localizeDOM = function() {
  let loadingElems = document.querySelectorAll('.hide-until-l10n');

  l10n.localizeAttribute('data-l10n-text', 'textContent');
  l10n.localizeAttribute('data-l10n-label', 'aria-label');
  // Optionally, hide elements until loaded to prevent FOUC
  loadingElems.forEach((elem) => {
    elem.classList.remove('hide-until-l10n')
  })
};

l10n.localizeAttribute = function(attributeSrc, attributeTarget) {
  let locMsg = '';
  let elems = document.querySelectorAll(`[${attributeSrc}]`);

  elems.forEach((elem) => {
    locMsg = l10n.getMessage(elem.getAttribute(attributeSrc));
    if (attributeTarget === 'textContent') {
      elem.textContent = locMsg;
    } else {
      elem.setAttribute(attributeTarget, locMsg);
    }
  });
};

l10n.init = function() {
  Object.freeze(l10n.messages);
  l10n.setLocale('ja');
  window.addEventListener('load', l10n.localizeDOM);
}();
