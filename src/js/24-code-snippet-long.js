;(() => {
  'use strict'

  // 23 (height per line) * 20 (20 lines)
  // make sure to also change the `.collapsed` max-height property in doc.css
  const maxCodePreLength = 460

  // used for calculating the code pre IDs
  const codeIDMap = new Map()

  const addCodePreToggleBar = (codePre) => {
    const codePreToggleBar = createCodePreToggleBar(codePre.id)
    codePre.appendChild(codePreToggleBar)
  }

  const addListeners = (codePreToggleBar) => {
    codePreToggleBar.addEventListener('click', () => toggle(codePreToggleBar))
    codePreToggleBar.addEventListener('keyup', (e) => {
      if (isEnterKey(e.keyCode)) {
        e.preventDefault()
        toggle(codePreToggleBar)
      }
    })
  }

  const addOverLay = (codePre) => {
    const overlay = createOverlay()
    codePre.appendChild(overlay)
  }

  const collapse = (codePre) => codePre?.classList.add('collapsed')

  const createCodePreToggleBar = (codePreID) => {
    const codePreToggleBar = document.createElement('span')
    setAttributes(codePreToggleBar, codePreID)
    addListeners(codePreToggleBar)
    return codePreToggleBar
  }

  const createOverlay = () => {
    const overlay = document.createElement('div')
    overlay.classList.add('code-overlay')
    return overlay
  }

  const expand = (element) => element?.classList.remove('collapsed')
  const isCollapsed = (element) => element?.classList.contains('collapsed')
  const isEnterKey = (keyCode) => keyCode === 13

  const setAttributes = (codePreToggleBar, ariaControlsValue) => {
    codePreToggleBar.innerText = 'Expand content'
    codePreToggleBar.classList.add('code-expand')
    codePreToggleBar.tabIndex = 0
    codePreToggleBar.setAttribute('role', 'button')
    codePreToggleBar.setAttribute('aria-controls', ariaControlsValue)
    codePreToggleBar.setAttribute('aria-expanded', false)
  }

  const setID = (codePre) => {
    const code = codePre.querySelector('code')
    if (code) {
      const language = code.getAttribute('data-lang')
      codeIDMap.set(language, codeIDMap.has(language)
        ? codeIDMap.get(language) + 1
        : 1)
      codePre.id = `${language}-snippet-${codeIDMap.get(language)}`
    }
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

  const tooTall = (element) => tallerThan(element, maxCodePreLength)

  const codePres = document.querySelectorAll('pre')
  codePres.forEach((codePre) => {
    if (tooTall(codePre)) {
      setID(codePre)
      collapse(codePre)
      addCodePreToggleBar(codePre)
      addOverLay(codePre)
    }
  })
})()
