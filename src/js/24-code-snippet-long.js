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
    codeSnippetToggleBar.tabIndex = 0
    codeSnippetToggleBar.setAttribute('aria-expanded', 'false')
    codeSnippetToggleBar.setAttribute('aria-controls', 'code-snippet-content')
    codeSnippetToggleBar.setAttribute('aria-label', 'Expand content')
    codeSnippetToggleBar.setAttribute('role', 'button')
    codeSnippetToggleBar.setAttribute('title', 'Expand content')
    codeSnippetToggleBar.addEventListener('click', () => toggle(codeSnippetToggleBar))
    codeSnippetToggleBar.addEventListener('keyup', (e) => {
      if (isEnterKey(e.keyCode)) {
        e.preventDefault()
        toggle(codeSnippetToggleBar)
      }
    })
    return codeSnippetToggleBar
  }

  const expand = (element) => element?.classList.remove('collapsed')
  const isCollapsed = (element) => element?.classList.contains('collapsed')
  const isEnterKey = (keyCode) => keyCode === 13

  const tallerThan = (element, length) => element.getBoundingClientRect().height > length

  const toggle = (codeSnippetToggleBar) => {
    const codePre = codeSnippetToggleBar.parentNode
    if (isCollapsed(codePre)) {
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
