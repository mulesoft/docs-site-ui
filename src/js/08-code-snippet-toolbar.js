;(function () {
  'use strict'

  var CMD_RX = /^\$ (\S[^\\\n]*(\\\n(?!\$ )[^\\\n]*)*)(?=\n|$)/gm
  var LINE_CONTINUATION_RX = /( ) *\\\n *|\\\n( ?) */g
  var TRAILING_SPACE_RX = / +$/gm
  var config = (
    document.getElementById('site-script') || {
      dataset: {},
    }
  ).dataset

  ;[].slice.call(document.querySelectorAll('.doc pre.highlight, .doc .literalblock pre')).forEach(function (pre) {
    var code, dwPlayground, language, lang, copy, toast, toolbox
    var uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    if (pre.classList.contains('highlight')) {
      code = pre.querySelector('code')
      if ((language = code.dataset.lang) && language !== 'console') {
        ;(lang = document.createElement('span')).className = 'source-lang'
        lang.appendChild(document.createTextNode(language))
      }
      if (relatesToDataweave(language) && code.dataset?.sourceUrl) {
        ;(dwPlayground = document.createElement('span')).className = 'dw-playground'
        dwPlayground.id = 'dw-playground'
        var dwButton = document.createElement('button')
        dwButton.className = 'code-snippet-button'
        dwButton.setAttribute('title', 'Edit in Playground')

        var dwA = document.createElement('a')
        dwA.className = 'dw-playground-link'
        dwA.href = constructDWPlaygroundURL(code.dataset?.sourceUrl)
        dwA.target = '_blank'

        var dwImg = document.createElement('img')
        dwImg.src = uiRootPath + '/img/icons/lab-default.svg'
        dwImg.alt = 'Edit in Playground icon'
        dwImg.className = 'code-snippet-icon'

        dwButton.appendChild(dwImg)
        dwButton.addEventListener('mouseover', function () {
          dwButton.firstChild.src = uiRootPath + '/img/icons/lab-hover.svg'
        })
        dwButton.addEventListener('mouseout', function () {
          dwButton.firstChild.src = uiRootPath + '/img/icons/lab-default.svg'
        })

        dwA.appendChild(dwButton)
        dwPlayground.appendChild(dwA)
      }
    } else if (pre.innerText.startsWith('$ ')) {
      var block = pre.parentNode.parentNode
      block.classList.remove('literalblock')
      block.classList.add('listingblock')
      pre.classList.add('highlightjs', 'highlight')
      ;(code = document.createElement('code')).className = 'language-console hljs'
      code.dataset.lang = 'console'
      code.appendChild(pre.firstChild)
      pre.appendChild(code)
    } else {
      return
    }
    ;(toolbox = document.createElement('div')).className = 'source-toolbox'
    if (lang) toolbox.appendChild(lang)
    if (window.navigator.clipboard) {
      ;(copy = document.createElement('button')).className = 'code-snippet-button'
      copy.setAttribute('title', 'Copy to Clipboard')
      if (config.svgAs === 'svg') {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('class', 'code-snippet-icon')
        var use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
        use.setAttribute('href', uiRootPath + '/img/icons/copy-default.svg')
        svg.appendChild(use)
        copy.appendChild(svg)
      } else {
        var img = document.createElement('img')
        img.src = uiRootPath + '/img/icons/copy-default.svg'
        img.alt = 'copy icon'
        img.className = 'code-snippet-icon'
        copy.appendChild(img)
      }

      copy.firstChild.addEventListener('mouseover', function () {
        copy.firstChild.src = uiRootPath + '/img/icons/copy-hover.svg'
      })
      copy.firstChild.addEventListener('mouseout', function () {
        copy.firstChild.src = uiRootPath + '/img/icons/copy-default.svg'
      })
      ;(toast = document.createElement('span')).className = 'copy-toast'
      toast.appendChild(document.createTextNode('✓ Copied'))
      copy.appendChild(toast)
      toolbox.appendChild(copy)
    }
    if (dwPlayground) toolbox.appendChild(dwPlayground)
    pre.appendChild(toolbox)
    if (copy) {
      copy.addEventListener('click', writeToClipboard.bind(copy, code))
    }
  })

  function constructDWPlaygroundURL (sourceUrl) {
    var path = sourceUrl
      ? '?projectMethod=GHRepo&repo=mulesoft%2Fdocs-dataweave&path=' + encodeURIComponent(sourceUrl)
      : ''
    return 'https://developer.mulesoft.com/learn/dataweave/playground' + path
  }

  function relatesToDataweave (language) {
    return language && ['dataweave', 'dw', 'json', 'xml'].includes(language.toLowerCase())
  }

  function extractCommands (text) {
    var cmds = []
    var m
    while ((m = CMD_RX.exec(text))) {
      cmds.push(m[1].replace(LINE_CONTINUATION_RX, '$1$2'))
    }
    return cmds.join(' && ')
  }

  function writeToClipboard (code) {
    var text = code.innerText.replace(TRAILING_SPACE_RX, '')
    if (code.dataset.lang === 'console' && text.startsWith('$ ')) {
      text = extractCommands(text)
    }
    window.navigator.clipboard.writeText(text).then(
      function () {
        this.classList.add('clicked')
        this.offsetHeight // eslint-disable-line no-unused-expressions
        this.classList.remove('clicked')
      }.bind(this),
      function () {}
    )
  }
})()
