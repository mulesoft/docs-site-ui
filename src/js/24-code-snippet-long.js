;(() => {
  'use strict'

  const addCodeSnippetToggleBar = (codeSnippet) => {
    const codeSnippetToggleBar = createCodeSnippetToggleBar()
    codeSnippet.appendChild(codeSnippetToggleBar)
  }

  const collapse = (codeSnippet) => codeSnippet?.classList.add('collapsed')

  const createCodeSnippetToggleBar = () => {
    const codeSnippetToggleBar = document.createElement('span')
    codeSnippetToggleBar.innerText = 'Expand content'
    codeSnippetToggleBar.classList.add('code-expand')
    codeSnippetToggleBar.addEventListener('click', () => toggle(codeSnippetToggleBar))
    return codeSnippetToggleBar
  }

  const expand = (element) => element?.classList.remove('collapsed')

  const tallerThan = (element, length) => element.getBoundingClientRect().height > length

  const toggle = (codeSnippetToggleBar) => {
    const codePre = codeSnippetToggleBar.parentNode
    const isCollapsed = codePre.classList.contains('collapsed')
    if (isCollapsed) {
      expand(codePre)
      codeSnippetToggleBar.innerText = 'Collapse content'
    } else {
      collapse(codePre)
      codeSnippetToggleBar.innerText = 'Expand content'
    }
  }

  const tooTall = (element) => tallerThan(element, 166)

  const codeSnippets = document.querySelectorAll('pre')
  codeSnippets.forEach((codeSnippet) => {
    if (tooTall(codeSnippet)) {
      collapse(codeSnippet)
      addCodeSnippetToggleBar(codeSnippet)
    }
  })
})()
