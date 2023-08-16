;(() => {
  'use strict'

  const collapse = (codeSnippet) => {
    codeSnippet.classList.add('collapsed')
    const codeSnippetToggleBar = createCodeSnippetToggleBar()
    codeSnippet.appendChild(codeSnippetToggleBar)
  }

  const createCodeSnippetToggleBar = () => {
    const codeSnippetToggleBar = document.createElement('span')
    codeSnippetToggleBar.innerText = 'Expand content'
    codeSnippetToggleBar.classList.add('code-expand')
    return codeSnippetToggleBar
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
