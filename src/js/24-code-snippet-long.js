;(() => {
  'use strict'

  // 23 (height per line) * 20 (20 lines)
  // make sure to also change the `.collapsed` max-height property in doc.css
  const maxCodeSnippetLength = 460

  // used for calculating the code snippet IDs
  const codeIDMap = new Map()

  const addCodeSnippetToggleBar = (codeSnippet) => {
    const codeSnippetToggleBar = createCodeSnippetToggleBar(codeSnippet.id)
    codeSnippet.appendChild(codeSnippetToggleBar)
  }

  const addOverLay = (codeSnippet) => {
    const overlay = createOverlay()
    codeSnippet.appendChild(overlay)
  }

  const collapse = (codeSnippet) => codeSnippet?.classList.add('collapsed')

  const createCodeSnippetToggleBar = (codeSnippetID) => {
    const codeSnippetToggleBar = document.createElement('span')
    codeSnippetToggleBar.innerText = 'Expand content'
    codeSnippetToggleBar.classList.add('code-expand')
    codeSnippetToggleBar.tabIndex = 0
    codeSnippetToggleBar.setAttribute('role', 'button')
    codeSnippetToggleBar.setAttribute('aria-expanded', false)
    codeSnippetToggleBar.setAttribute('aria-controls', codeSnippetID)
    codeSnippetToggleBar.addEventListener('click', () => toggle(codeSnippetToggleBar))
    codeSnippetToggleBar.addEventListener('keyup', (e) => {
      if (isEnterKey(e.keyCode)) {
        e.preventDefault()
        toggle(codeSnippetToggleBar)
      }
    })
    return codeSnippetToggleBar
  }

  const createOverlay = () => {
    const overlay = document.createElement('div')
    overlay.classList.add('code-overlay')
    return overlay
  }

  const expand = (element) => element?.classList.remove('collapsed')
  const isCollapsed = (element) => element?.classList.contains('collapsed')
  const isEnterKey = (keyCode) => keyCode === 13

  const setID = (codePre) => {
    const code = codePre.querySelector('code')
    if (code) {
      const language = code.getAttribute('data-lang')
      codeIDMap.set(language, codeIDMap.has(language) ? codeIDMap.get(language) + 1 : 1)
      codePre.id = `${language}-snippet-${codeIDMap.get(language)}`
    }
    return codePre
  }

  const tallerThan = (element, length) => element.getBoundingClientRect().height > length

  const toggle = (codeSnippetToggleBar) => {
    const codePre = codeSnippetToggleBar.parentNode
    if (isCollapsed(codePre)) {
      expand(codePre)
      codeSnippetToggleBar.innerText = 'Collapse content'
      codeSnippetToggleBar.setAttribute('aria-expanded', true)
    } else {
      collapse(codePre)
      codeSnippetToggleBar.innerText = 'Expand content'
      codeSnippetToggleBar.setAttribute('aria-expanded', false)
    }
  }

  const tooTall = (element) => tallerThan(element, maxCodeSnippetLength)

  const codeSnippets = document.querySelectorAll('pre')
  codeSnippets.forEach((codeSnippet) => {
    if (tooTall(codeSnippet)) {
      codeSnippet = setID(codeSnippet)
      collapse(codeSnippet)
      addCodeSnippetToggleBar(codeSnippet)
      addOverLay(codeSnippet)
    }
  })
})()
