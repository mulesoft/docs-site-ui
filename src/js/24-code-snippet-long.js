;(() => {
  'use strict'

  const collapse = (codeSnippet) => {
    codeSnippet.classList.add('collapsed')
  }

  const tallerThan = (element, length) => element.getBoundingClientRect().height > length
  const tooTall = (element) => tallerThan(element, 166)

  const codeSnippets = document.querySelectorAll('pre')
  codeSnippets.forEach((codeSnippet) => {
    if (tooTall(codeSnippet)) {
      collapse(codeSnippet)
    }
  })
})()
