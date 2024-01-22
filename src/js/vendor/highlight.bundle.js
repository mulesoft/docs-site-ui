;(() => {
  const hljs = require('highlight.js/lib/highlight')
  hljs.registerLanguage('asciidoc', require('highlight.js/lib/languages/asciidoc'))
  hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
  hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
  hljs.registerLanguage('cs', require('highlight.js/lib/languages/cs'))
  hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'))
  hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
  hljs.registerLanguage('groovy', require('highlight.js/lib/languages/groovy'))
  hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
  hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
  hljs.registerLanguage('kotlin', require('highlight.js/lib/languages/kotlin'))
  hljs.registerLanguage('objectivec', require('highlight.js/lib/languages/objectivec'))
  hljs.registerLanguage('perl', require('highlight.js/lib/languages/perl'))
  hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
  //hljs.registerLanguage('powershell', require('highlight.js/lib/languages/powershell'))
  hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
  hljs.registerLanguage('ruby', require('highlight.js/lib/languages/ruby'))
  hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'))
  hljs.registerLanguage('scala', require('highlight.js/lib/languages/scala'))
  hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
  hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
  hljs.registerLanguage('swift', require('highlight.js/lib/languages/swift'))
  hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
  hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'))
  hljs.registerLanguage('dataweave', (hljs) => {
    return {
      contains: [
        hljs.REGEXP_MODE,
        {
          className: 'string',
          begin: '"',
          end: '"',
          contains: [{ className: 'subst', begin: '\\\\.', end: '\\\\.' }],
        },
        {
          className: 'number',
          begin: '\\b\\d+(\\.\\d+)?\\b',
          relevance: 0,
        },
        {
          className: 'variable',
          begin: '\\bvars\\.[a-zA-Z_]+\\b',
        },
        {
          className: 'key',
          begin: /(["'])\w+\1\s*:/,
          returnBegin: true,
          contains: [
            {
              className: 'string',
              begin: /(["'])\w+\1/,
            },
          ],
        },
        {
          className: 'property',
          begin: /(?::)\s*/,
          end: /([,}\n])/,
          contains: [
            {
              className: 'string',
              begin: '"',
              end: '"',
              contains: [{ className: 'subst', begin: '\\\\.', end: '\\\\.' }],
            },
            {
              className: 'number',
              begin: '\\b\\d+(\\.\\d+)?\\b',
              relevance: 0,
            },
            {
              className: 'variable',
              begin: '\\bvars\\.[a-zA-Z_]+\\b',
            },
          ],
        },
        {
          className: 'mime-type',
          begin: /\b(?:text|audio|video|application|multipart|image)\/[\w+-]+/,
        },
        {
          className: 'date',
          begin: /\|[\w:+-]+\|/,
          relevance: 0,
        },
        {
          className: 'comment',
          variants: [
            { begin: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/ },
            { begin: /(^|[^\\:])\/\/.*/ },
          ],
        },
        {
          className: 'regex',
          begin: /\/(?:[^\\/\r\n]|\\[^\r\n])+\//,
          relevance: 0,
        },
        {
          className: 'function',
          begin: /\b[A-Za-z_]\w*(?=\s*\()/i,
          relevance: 0,
        },
        {
          className: 'punctuation',
          begin: /[{}[\];(),.:@]/,
        },
        {
          className: 'operator',
          begin: /<<|>>|->|[<>~=]=?|!=|--?-?|\+\+?|!|\?/,
          relevance: 0,
        },
        {
          className: 'boolean',
          begin: /\b(?:true|false)\b/,
          relevance: 0,
        },
        {
          className: 'keyword',
          // eslint-disable-next-line max-len
          begin: /\b(?:match|input|output|ns|type|update|null|if|else|using|unless|at|is|as|case|do|fun|var|not|and|or)\b/,
          relevance: 0,
        },
      ],
    }
  })
  hljs.initHighlightingOnLoad()
})()
