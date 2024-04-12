/* eslint-disable no-var */
;(() => {
  'use strict'

  if (MSCX.l10n.getLocale() !== 'jp') {
    return
  }

  const xrefLinks = document.querySelectorAll('article a.xref')

  function linkContainsText (linkElement) {
    const hasText = linkElement.textContent.trim().length > 0
    return hasText
  }

  function linkIsOnlyContentInParent (linkElement) {
    const parentElement = linkElement.parentElement

    if (parentElement) {
      const childNodes = parentElement.childNodes
      return childNodes.length === 1 && childNodes[0] === linkElement
    }

    return false
  }

  function linkAlreadyContainsBrackets (linkElement) {
    const linkText = linkElement.textContent
    return linkText.includes('「') || linkText.includes('」') || linkText.includes('『') || linkText.includes('』')
  }

  // Does not work in preview builds, only full builds include xref class above
  function wrapXrefLinksInJpBrackets () {
    xrefLinks.forEach((link) => {
      const linkUrl = new URL(link.href)

      if (!linkContainsText(link)) return
      if (linkAlreadyContainsBrackets(link)) return
      if (linkIsOnlyContentInParent(link)) return

      if (linkUrl.hash) {
        link.innerHTML = `「${link.innerHTML}」`
      } else {
        link.innerHTML = `『${link.innerHTML}』`
      }
    })
  }

  wrapXrefLinksInJpBrackets()
})()
