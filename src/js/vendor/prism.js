/* eslint-disable */
/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-dark&languages=markup+clike+javascript+asciidoc+bash+c+csharp+cpp+dataweave+docker+go+groovy+java+json+kotlin+markup-templating+objectivec+perl+php+python+ruby+rust+scala+sql+swift+xml-doc+yaml */
const _self =
  typeof window !== 'undefined'
    ? window
    : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope
    ? self
    : {}
const Prism = (function (e) {
  const n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
  let t = 0
  const r = {}
  var a = {
    manual: e.Prism && e.Prism.manual,
    disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e(n) {
        return n instanceof i
          ? new i(n.type, e(n.content), n.alias)
          : Array.isArray(n)
          ? n.map(e)
          : n
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/\u00a0/g, ' ')
      },
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1)
      },
      objId: function (e) {
        return e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id
      },
      clone: function e(n, t) {
        let r, i
        switch (((t = t || {}), a.util.type(n))) {
          case 'Object':
            if (((i = a.util.objId(n)), t[i])) return t[i]
            for (const l in ((r = {}), (t[i] = r), n)) n.hasOwnProperty(l) && (r[l] = e(n[l], t))
            return r
          case 'Array':
            return (
              (i = a.util.objId(n)),
              t[i]
                ? t[i]
                : ((r = []),
                  (t[i] = r),
                  n.forEach(function (n, a) {
                    r[a] = e(n, t)
                  }),
                  r)
            )
          default:
            return n
        }
      },
      getLanguage: function (e) {
        for (; e; ) {
          const t = n.exec(e.className)
          if (t) return t[1].toLowerCase()
          e = e.parentElement
        }
        return 'none'
      },
      setLanguage: function (e, t) {
        ;(e.className = e.className.replace(RegExp(n, 'gi'), '')), e.classList.add('language-' + t)
      },
      currentScript: function () {
        if (typeof document === 'undefined') return null
        if ('currentScript' in document) return document.currentScript
        try {
          throw new Error()
        } catch (r) {
          const e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1]
          if (e) {
            const n = document.getElementsByTagName('script')
            for (const t in n) if (n[t].src == e) return n[t]
          }
          return null
        }
      },
      isActive: function (e, n, t) {
        for (let r = 'no-' + n; e; ) {
          const a = e.classList
          if (a.contains(n)) return !0
          if (a.contains(r)) return !1
          e = e.parentElement
        }
        return !!t
      },
    },
    languages: {
      plain: r,
      plaintext: r,
      text: r,
      txt: r,
      extend: function (e, n) {
        const t = a.util.clone(a.languages[e])
        for (const r in n) t[r] = n[r]
        return t
      },
      insertBefore: function (e, n, t, r) {
        const i = (r = r || a.languages)[e]
        const l = {}
        for (const o in i) {
          if (i.hasOwnProperty(o)) {
            if (o == n) for (const s in t) t.hasOwnProperty(s) && (l[s] = t[s])
            t.hasOwnProperty(o) || (l[o] = i[o])
          }
        }
        const u = r[e]
        return (
          (r[e] = l),
          a.languages.DFS(a.languages, function (n, t) {
            t === u && n != e && (this[n] = l)
          }),
          l
        )
      },
      DFS: function e(n, t, r, i) {
        i = i || {}
        const l = a.util.objId
        for (const o in n) {
          if (n.hasOwnProperty(o)) {
            t.call(n, o, n[o], r || o)
            const s = n[o]
            const u = a.util.type(s)
            u !== 'Object' || i[l(s)]
              ? u !== 'Array' || i[l(s)] || ((i[l(s)] = !0), e(s, t, o, i))
              : ((i[l(s)] = !0), e(s, t, null, i))
          }
        }
      },
    },
    plugins: {},
    highlightAll: function (e, n) {
      a.highlightAllUnder(document, e, n)
    },
    highlightAllUnder: function (e, n, t) {
      const r = {
        callback: t,
        container: e,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
      }
      a.hooks.run('before-highlightall', r),
        (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))),
        a.hooks.run('before-all-elements-highlight', r)
      for (var i, l = 0; (i = r.elements[l++]); ) a.highlightElement(i, !0 === n, r.callback)
    },
    highlightElement: function (n, t, r) {
      const i = a.util.getLanguage(n)
      const l = a.languages[i]
      a.util.setLanguage(n, i)
      let o = n.parentElement
      o && o.nodeName.toLowerCase() === 'pre' && a.util.setLanguage(o, i)
      const s = { element: n, language: i, grammar: l, code: n.textContent }
      function u(e) {
        ;(s.highlightedCode = e),
          a.hooks.run('before-insert', s),
          (s.element.innerHTML = s.highlightedCode),
          a.hooks.run('after-highlight', s),
          a.hooks.run('complete', s),
          r && r.call(s.element)
      }
      if (
        (a.hooks.run('before-sanity-check', s),
        (o = s.element.parentElement) &&
          o.nodeName.toLowerCase() === 'pre' &&
          !o.hasAttribute('tabindex') &&
          o.setAttribute('tabindex', '0'),
        !s.code)
      ) {
        return a.hooks.run('complete', s), void (r && r.call(s.element))
      }
      if ((a.hooks.run('before-highlight', s), s.grammar)) {
        if (t && e.Worker) {
          const c = new Worker(a.filename)
          ;(c.onmessage = function (e) {
            u(e.data)
          }),
            c.postMessage(JSON.stringify({ language: s.language, code: s.code, immediateClose: !0 }))
        } else u(a.highlight(s.code, s.grammar, s.language))
      } else u(a.util.encode(s.code))
    },
    highlight: function (e, n, t) {
      const r = { code: e, grammar: n, language: t }
      if ((a.hooks.run('before-tokenize', r), !r.grammar)) {
        throw new Error('The language "' + r.language + '" has no grammar.')
      }
      return (
        (r.tokens = a.tokenize(r.code, r.grammar)),
        a.hooks.run('after-tokenize', r),
        i.stringify(a.util.encode(r.tokens), r.language)
      )
    },
    tokenize: function (e, n) {
      const t = n.rest
      if (t) {
        for (const r in t) n[r] = t[r]
        delete n.rest
      }
      const a = new s()
      return (
        u(a, a.head, e),
        o(e, a, n, a.head, 0),
        (function (e) {
          for (var n = [], t = e.head.next; t !== e.tail; ) n.push(t.value), (t = t.next)
          return n
        })(a)
      )
    },
    hooks: {
      all: {},
      add: function (e, n) {
        const t = a.hooks.all
        ;(t[e] = t[e] || []), t[e].push(n)
      },
      run: function (e, n) {
        const t = a.hooks.all[e]
        if (t && t.length) for (var r, i = 0; (r = t[i++]); ) r(n)
      },
    },
    Token: i,
  }
  function i(e, n, t, r) {
    ;(this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || '').length)
  }
  function l(e, n, t, r) {
    e.lastIndex = n
    const a = e.exec(t)
    if (a && r && a[1]) {
      const i = a[1].length
      ;(a.index += i), (a[0] = a[0].slice(i))
    }
    return a
  }
  function o(e, n, t, r, s, g) {
    for (const f in t) {
      if (t.hasOwnProperty(f) && t[f]) {
        let h = t[f]
        h = Array.isArray(h) ? h : [h]
        for (let d = 0; d < h.length; ++d) {
          if (g && g.cause == f + ',' + d) return
          const v = h[d]
          const p = v.inside
          const m = !!v.lookbehind
          const y = !!v.greedy
          const k = v.alias
          if (y && !v.pattern.global) {
            const x = v.pattern.toString().match(/[imsuy]*$/)[0]
            v.pattern = RegExp(v.pattern.source, x + 'g')
          }
          for (
            let b = v.pattern || v, w = r.next, A = s;
            w !== n.tail && !(g && A >= g.reach);
            A += w.value.length, w = w.next
          ) {
            let E = w.value
            if (n.length > e.length) return
            if (!(E instanceof i)) {
              var P
              let L = 1
              if (y) {
                if (!(P = l(b, A, e, m)) || P.index >= e.length) break
                var S = P.index
                const O = P.index + P[0].length
                let j = A
                for (j += w.value.length; S >= j; ) j += (w = w.next).value.length
                if (((A = j -= w.value.length), w.value instanceof i)) continue
                for (let C = w; C !== n.tail && (j < O || typeof C.value === 'string'); C = C.next) {
                  L++, (j += C.value.length)
                }
                L--, (E = e.slice(A, j)), (P.index -= A)
              } else if (!(P = l(b, 0, E, m))) continue
              S = P.index
              const N = P[0]
              const _ = E.slice(0, S)
              const M = E.slice(S + N.length)
              const W = A + E.length
              g && W > g.reach && (g.reach = W)
              let z = w.prev
              if (
                (_ && ((z = u(n, z, _)), (A += _.length)),
                c(n, z, L),
                (w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N))),
                M && u(n, w, M),
                L > 1)
              ) {
                const I = { cause: f + ',' + d, reach: W }
                o(e, n, t, w.prev, A, I), g && I.reach > g.reach && (g.reach = I.reach)
              }
            }
          }
        }
      }
    }
  }
  function s() {
    const e = { value: null, prev: null, next: null }
    const n = { value: null, prev: e, next: null }
    ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
  }
  function u(e, n, t) {
    const r = n.next
    const a = { value: t, prev: n, next: r }
    return (n.next = a), (r.prev = a), e.length++, a
  }
  function c(e, n, t) {
    for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
    ;(n.next = r), (r.prev = n), (e.length -= a)
  }
  if (
    ((e.Prism = a),
    (i.stringify = function e(n, t) {
      if (typeof n === 'string') return n
      if (Array.isArray(n)) {
        let r = ''
        return (
          n.forEach(function (n) {
            r += e(n, t)
          }),
          r
        )
      }
      const i = {
        type: n.type,
        content: e(n.content, t),
        tag: 'span',
        classes: ['token', n.type],
        attributes: {},
        language: t,
      }
      const l = n.alias
      l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)), a.hooks.run('wrap', i)
      let o = ''
      for (const s in i.attributes) o += ' ' + s + '="' + (i.attributes[s] || '').replace(/"/g, '&quot;') + '"'
      return '<' + i.tag + ' class="' + i.classes.join(' ') + '"' + o + '>' + i.content + '</' + i.tag + '>'
    }),
    !e.document)
  ) {
    return e.addEventListener
      ? (a.disableWorkerMessageHandler ||
          e.addEventListener(
            'message',
            function (n) {
              const t = JSON.parse(n.data)
              const r = t.language
              const i = t.code
              const l = t.immediateClose
              e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close()
            },
            !1
          ),
        a)
      : a
  }
  const g = a.util.currentScript()
  function f() {
    a.manual || a.highlightAll()
  }
  if ((g && ((a.filename = g.src), g.hasAttribute('data-manual') && (a.manual = !0)), !a.manual)) {
    const h = document.readyState
    h === 'loading' || (h === 'interactive' && g && g.defer)
      ? document.addEventListener('DOMContentLoaded', f)
      : window.requestAnimationFrame
      ? window.requestAnimationFrame(f)
      : window.setTimeout(f, 16)
  }
  return a
})(_self)
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
  typeof global !== 'undefined' && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
  prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      'internal-subset': { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [
            { pattern: /^=/, alias: 'attr-equals' },
            { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
          ],
        },
      },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i],
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup),
  Prism.hooks.add('wrap', function (a) {
    a.type === 'entity' && (a.attributes.title = a.content.replace(/&amp;/, '&'))
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      const s = {}
      ;(s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
      const t = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } }
      t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      const n = {}
      ;(n[a] = {
        pattern: RegExp(
          '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
            /__/g,
            function () {
              return a
            }
          ),
          'i'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore('markup', 'cdata', n)
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    value: function (a, e) {
      Prism.languages.markup.tag.inside['special-attr'].push({
        pattern: RegExp('(^|["\'\\s])(?:' + a + ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))', 'i'),
        lookbehind: !0,
        inside: {
          'attr-name': /^[^\s=]+/,
          'attr-value': {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, 'language-' + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
            },
          },
        },
      })
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      '(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'
    ),
    lookbehind: !0,
  },
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript['class-name'][0].pattern =
    /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: RegExp(
        '((?:^|[^$\\w\\xA0-\\uFFFF."\'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))'
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        'regex-source': {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: 'language-regex',
          inside: Prism.languages.regex,
        },
        'regex-delimiter': /^\/|\/$/,
        'regex-flags': /^[a-z]+$/,
      },
    },
    'function-variable': {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: 'function',
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
    'template-string': {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': { pattern: /^\$\{|\}$/, alias: 'punctuation' },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
    'string-property': {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: 'property',
    },
  }),
  Prism.languages.insertBefore('javascript', 'operator', {
    'literal-property': {
      pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: 'property',
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined('script', 'javascript'),
    Prism.languages.markup.tag.addAttribute(
      'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
      'javascript'
    )),
  (Prism.languages.js = Prism.languages.javascript)
!(function (t) {
  const n = {
    pattern: /(^[ \t]*)\[(?!\[)(?:(["'$`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\[\]\\]|\\.)*\]|[^\[\]\\"'$`]|\\.)*\]/m,
    lookbehind: !0,
    inside: {
      quoted: { pattern: /([$`])(?:(?!\1)[^\\]|\\.)*\1/, inside: { punctuation: /^[$`]|[$`]$/ } },
      interpreted: { pattern: /'(?:[^'\\]|\\.)*'/, inside: { punctuation: /^'|'$/ } },
      string: /"(?:[^"\\]|\\.)*"/,
      variable: /\w+(?==)/,
      punctuation: /^\[|\]$|,/,
      operator: /=/,
      'attr-value': /(?!^\s+$).+/,
    },
  }
  const i = (t.languages.asciidoc = {
    'comment-block': { pattern: /^(\/{4,})$[\s\S]*?^\1/m, alias: 'comment' },
    table: {
      pattern: /^\|={3,}(?:(?:\r?\n|\r(?!\n)).*)*?(?:\r?\n|\r)\|={3,}$/m,
      inside: {
        specifiers: {
          pattern:
            /(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*](?:[<^>](?:\.[<^>])?|\.[<^>])?|[<^>](?:\.[<^>])?|\.[<^>])[a-z]*|[a-z]+)(?=\|)/,
          alias: 'attr-value',
        },
        punctuation: { pattern: /(^|[^\\])[|!]=*/, lookbehind: !0 },
      },
    },
    'passthrough-block': { pattern: /^(\+{4,})$[\s\S]*?^\1$/m, inside: { punctuation: /^\++|\++$/ } },
    'literal-block': { pattern: /^(-{4,}|\.{4,})$[\s\S]*?^\1$/m, inside: { punctuation: /^(?:-+|\.+)|(?:-+|\.+)$/ } },
    'other-block': {
      pattern: /^(--|\*{4,}|_{4,}|={4,})$[\s\S]*?^\1$/m,
      inside: { punctuation: /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/ },
    },
    'list-punctuation': {
      pattern: /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
      lookbehind: !0,
      alias: 'punctuation',
    },
    'list-label': { pattern: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im, lookbehind: !0, alias: 'symbol' },
    'indented-block': { pattern: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/, lookbehind: !0 },
    comment: /^\/\/.*/m,
    title: {
      pattern: /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} .+|^\.(?![\s.]).*/m,
      alias: 'important',
      inside: { punctuation: /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/ },
    },
    'attribute-entry': { pattern: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m, alias: 'tag' },
    attributes: n,
    hr: { pattern: /^'{3,}$/m, alias: 'punctuation' },
    'page-break': { pattern: /^<{3,}$/m, alias: 'punctuation' },
    admonition: { pattern: /^(?:CAUTION|IMPORTANT|NOTE|TIP|WARNING):/m, alias: 'keyword' },
    callout: [
      { pattern: /(^[ \t]*)<?\d*>/m, lookbehind: !0, alias: 'symbol' },
      { pattern: /<\d+>/, alias: 'symbol' },
    ],
    macro: {
      pattern: /\b[a-z\d][a-z\d-]*::?(?:[^\s\[\]]*\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
      inside: {
        function: /^[a-z\d-]+(?=:)/,
        punctuation: /^::?/,
        attributes: { pattern: /(?:\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/, inside: n.inside },
      },
    },
    inline: {
      pattern:
        /(^|[^\\])(?:(?:\B\[(?:[^\]\\"']|(["'])(?:(?!\2)[^\\]|\\.)*\2|\\.)*\])?(?:\b_(?!\s)(?: _|[^_\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: _|[^_\\\r\n]|\\.)+)*_\b|\B``(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B`(?!\s)(?:[^`'\s]|\s+\S)+['`]\B|\B(['*+#])(?!\s)(?: \3|(?!\3)[^\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: \3|(?!\3)[^\\\r\n]|\\.)+)*\3\B)|(?:\[(?:[^\]\\"']|(["'])(?:(?!\4)[^\\]|\\.)*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:(?:\r?\n|\r).+?)*\5|\{[^}\r\n]+\}|\[\[\[?.+?(?:(?:\r?\n|\r).+?)*\]?\]\]|<<.+?(?:(?:\r?\n|\r).+?)*>>|\(\(\(?.+?(?:(?:\r?\n|\r).+?)*\)?\)\)))/m,
      lookbehind: !0,
      inside: {
        attributes: n,
        url: {
          pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
          inside: { punctuation: /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/ },
        },
        'attribute-ref': {
          pattern: /^\{.+\}$/,
          inside: {
            variable: { pattern: /(^\{)[a-z\d,+_-]+/, lookbehind: !0 },
            operator: /^[=?!#%@$]|!(?=[:}])/,
            punctuation: /^\{|\}$|::?/,
          },
        },
        italic: { pattern: /^(['_])[\s\S]+\1$/, inside: { punctuation: /^(?:''?|__?)|(?:''?|__?)$/ } },
        bold: { pattern: /^\*[\s\S]+\*$/, inside: { punctuation: /^\*\*?|\*\*?$/ } },
        punctuation: /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)?\)\))$/,
      },
    },
    replacement: { pattern: /\((?:C|R|TM)\)/, alias: 'builtin' },
    entity: /&#?[\da-z]{1,8};/i,
    'line-continuation': { pattern: /(^| )\+$/m, lookbehind: !0, alias: 'punctuation' },
  })
  function e(t) {
    for (var n = {}, e = 0, a = (t = t.split(' ')).length; e < a; e++) n[t[e]] = i[t[e]]
    return n
  }
  ;(n.inside.interpreted.inside.rest = e('macro inline replacement entity')),
    (i['passthrough-block'].inside.rest = e('macro')),
    (i['literal-block'].inside.rest = e('callout')),
    (i.table.inside.rest = e(
      'comment-block passthrough-block literal-block other-block list-punctuation indented-block comment title attribute-entry attributes hr page-break admonition list-label callout macro inline replacement entity line-continuation'
    )),
    (i['other-block'].inside.rest = e(
      'table list-punctuation indented-block comment attribute-entry attributes hr page-break admonition list-label macro inline replacement entity line-continuation'
    )),
    (i.title.inside.rest = e('macro inline replacement entity')),
    t.hooks.add('wrap', function (t) {
      t.type === 'entity' && (t.attributes.title = t.content.replace(/&amp;/, '&'))
    }),
    (t.languages.adoc = t.languages.asciidoc)
})(Prism)
!(function (e) {
  const t =
    '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b'
  const a = { pattern: /(^(["']?)\w+\2)[ \t]+\S.*/, lookbehind: !0, alias: 'punctuation', inside: null }
  const n = {
    bash: a,
    environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
    variable: [
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: !0,
        inside: {
          variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
          punctuation: /\(\(?|\)\)?|,|;/,
        },
      },
      { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: !0, inside: { variable: /^\$\(|^`|\)$|`$/ } },
      {
        pattern: /\$\{[^}]+\}/,
        greedy: !0,
        inside: {
          operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          punctuation: /[\[\]]/,
          environment: { pattern: RegExp('(\\{)' + t), lookbehind: !0, alias: 'constant' },
        },
      },
      /\$(?:\w+|[#?*!@$])/,
    ],
    entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/,
  }
  ;(e.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    'function-name': [
      { pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: !0, alias: 'function' },
      { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
    ],
    'for-or-select': { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: 'variable', lookbehind: !0 },
    'assign-left': {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
      inside: { environment: { pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t), lookbehind: !0, alias: 'constant' } },
      alias: 'variable',
      lookbehind: !0,
    },
    parameter: { pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/, alias: 'variable', lookbehind: !0 },
    string: [
      { pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/, lookbehind: !0, greedy: !0, inside: n },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
        inside: { bash: a },
      },
      {
        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
        lookbehind: !0,
        greedy: !0,
        inside: n,
      },
      { pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
      { pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: !0, inside: { entity: n.entity } },
    ],
    environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
    variable: n.variable,
    function: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    builtin: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
      lookbehind: !0,
      alias: 'class-name',
    },
    boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/, lookbehind: !0 },
    'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
    operator: {
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } },
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
  }),
    (a.inside = e.languages.bash)
  for (
    let s = [
        'comment',
        'function-name',
        'for-or-select',
        'assign-left',
        'parameter',
        'string',
        'environment',
        'function',
        'keyword',
        'builtin',
        'boolean',
        'file-descriptor',
        'operator',
        'punctuation',
        'number',
      ],
      o = n.variable[1].inside,
      i = 0;
    i < s.length;
    i++
  ) {
    o[s[i]] = e.languages.bash[s[i]]
  }
  ;(e.languages.sh = e.languages.bash), (e.languages.shell = e.languages.bash)
})(Prism)
;(Prism.languages.c = Prism.languages.extend('clike', {
  comment: { pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
  'class-name': {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0,
  },
  keyword:
    /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  function: /\b[a-z_]\w*(?=\s*\()/i,
  number:
    /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
  Prism.languages.insertBefore('c', 'string', {
    char: { pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/, greedy: !0 },
  }),
  Prism.languages.insertBefore('c', 'string', {
    macro: {
      pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: 'property',
      inside: {
        string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, Prism.languages.c.string],
        char: Prism.languages.c.char,
        comment: Prism.languages.c.comment,
        'macro-name': [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          { pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: 'function' },
        ],
        directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: 'keyword' },
        'directive-hash': /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
      },
    },
  }),
  Prism.languages.insertBefore('c', 'function', {
    constant:
      /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/,
  }),
  delete Prism.languages.c.boolean
!(function (e) {
  function n(e, n) {
    return e.replace(/<<(\d+)>>/g, function (e, s) {
      return '(?:' + n[+s] + ')'
    })
  }
  function s(e, s, a) {
    return RegExp(n(e, s), a || '')
  }
  function a(e, n) {
    for (let s = 0; s < n; s++) {
      e = e.replace(/<<self>>/g, function () {
        return '(?:' + e + ')'
      })
    }
    return e.replace(/<<self>>/g, '[^\\s\\S]')
  }
  const t = 'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void'
  const r = 'class enum interface record struct'
  const i =
    'add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)'
  const o =
    'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield'
  function l(e) {
    return '\\b(?:' + e.trim().replace(/ /g, '|') + ')\\b'
  }
  const d = l(r)
  const p = RegExp(l(t + ' ' + r + ' ' + i + ' ' + o))
  const c = l(r + ' ' + i + ' ' + o)
  const u = l(t + ' ' + r + ' ' + o)
  const g = a('<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>', 2)
  const b = a('\\((?:[^()]|<<self>>)*\\)', 2)
  const h = '@?\\b[A-Za-z_]\\w*\\b'
  const f = n('<<0>>(?:\\s*<<1>>)?', [h, g])
  const m = n('(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*', [c, f])
  const k = '\\[\\s*(?:,\\s*)*\\]'
  const y = n('<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?', [m, k])
  const w = n('[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>', [g, b, k])
  const v = n('\\(<<0>>+(?:,<<0>>+)+\\)', [w])
  const x = n('(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?', [v, m, k])
  const $ = { keyword: p, punctuation: /[<>()?,.:[\]]/ }
  const _ = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'"
  const B = '"(?:\\\\.|[^\\\\"\r\n])*"'
  ;(e.languages.csharp = e.languages.extend('clike', {
    string: [
      { pattern: s('(^|[^$\\\\])<<0>>', ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']), lookbehind: !0, greedy: !0 },
      { pattern: s('(^|[^@$\\\\])<<0>>', [B]), lookbehind: !0, greedy: !0 },
    ],
    'class-name': [
      { pattern: s('(\\busing\\s+static\\s+)<<0>>(?=\\s*;)', [m]), lookbehind: !0, inside: $ },
      { pattern: s('(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)', [h, x]), lookbehind: !0, inside: $ },
      { pattern: s('(\\busing\\s+)<<0>>(?=\\s*=)', [h]), lookbehind: !0 },
      { pattern: s('(\\b<<0>>\\s+)<<1>>', [d, f]), lookbehind: !0, inside: $ },
      { pattern: s('(\\bcatch\\s*\\(\\s*)<<0>>', [m]), lookbehind: !0, inside: $ },
      { pattern: s('(\\bwhere\\s+)<<0>>', [h]), lookbehind: !0 },
      { pattern: s('(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>', [y]), lookbehind: !0, inside: $ },
      {
        pattern: s('\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))', [x, u, h]),
        inside: $,
      },
    ],
    keyword: p,
    number:
      /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    punctuation: /\?\.?|::|[{}[\];(),.:]/,
  })),
    e.languages.insertBefore('csharp', 'number', { range: { pattern: /\.\./, alias: 'operator' } }),
    e.languages.insertBefore('csharp', 'punctuation', {
      'named-parameter': { pattern: s('([(,]\\s*)<<0>>(?=\\s*:)', [h]), lookbehind: !0, alias: 'punctuation' },
    }),
    e.languages.insertBefore('csharp', 'class-name', {
      namespace: {
        pattern: s('(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])', [h]),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      'type-expression': {
        pattern: s('(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))', [b]),
        lookbehind: !0,
        alias: 'class-name',
        inside: $,
      },
      'return-type': {
        pattern: s('<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))', [x, m]),
        inside: $,
        alias: 'class-name',
      },
      'constructor-invocation': {
        pattern: s('(\\bnew\\s+)<<0>>(?=\\s*[[({])', [x]),
        lookbehind: !0,
        inside: $,
        alias: 'class-name',
      },
      'generic-method': {
        pattern: s('<<0>>\\s*<<1>>(?=\\s*\\()', [h, g]),
        inside: { function: s('^<<0>>', [h]), generic: { pattern: RegExp(g), alias: 'class-name', inside: $ } },
      },
      'type-list': {
        pattern: s(
          '\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))',
          [d, f, h, x, p.source, b, '\\bnew\\s*\\(\\s*\\)']
        ),
        lookbehind: !0,
        inside: {
          'record-arguments': {
            pattern: s('(^(?!new\\s*\\()<<0>>\\s*)<<1>>', [f, b]),
            lookbehind: !0,
            greedy: !0,
            inside: e.languages.csharp,
          },
          keyword: p,
          'class-name': { pattern: RegExp(x), greedy: !0, inside: $ },
          punctuation: /[,()]/,
        },
      },
      preprocessor: {
        pattern: /(^[\t ]*)#.*/m,
        lookbehind: !0,
        alias: 'property',
        inside: {
          directive: {
            pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
            lookbehind: !0,
            alias: 'keyword',
          },
        },
      },
    })
  const E = B + '|' + _
  const R = n('/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>', [E])
  const z = a(n('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [R]), 2)
  const S = '\\b(?:assembly|event|field|method|module|param|property|return|type)\\b'
  const j = n('<<0>>(?:\\s*\\(<<1>>*\\))?', [m, z])
  e.languages.insertBefore('csharp', 'class-name', {
    attribute: {
      pattern: s('((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])', [S, j]),
      lookbehind: !0,
      greedy: !0,
      inside: {
        target: { pattern: s('^<<0>>(?=\\s*:)', [S]), alias: 'keyword' },
        'attribute-arguments': { pattern: s('\\(<<0>>*\\)', [z]), inside: e.languages.csharp },
        'class-name': { pattern: RegExp(m), inside: { punctuation: /\./ } },
        punctuation: /[:,]/,
      },
    },
  })
  const A = ':[^}\r\n]+'
  const F = a(n('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [R]), 2)
  const P = n('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [F, A])
  const U = a(n('[^"\'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)', [E]), 2)
  const Z = n('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [U, A])
  function q(n, a) {
    return {
      interpolation: {
        pattern: s('((?:^|[^{])(?:\\{\\{)*)<<0>>', [n]),
        lookbehind: !0,
        inside: {
          'format-string': {
            pattern: s('(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)', [a, A]),
            lookbehind: !0,
            inside: { punctuation: /^:/ },
          },
          punctuation: /^\{|\}$/,
          expression: { pattern: /[\s\S]+/, alias: 'language-csharp', inside: e.languages.csharp },
        },
      },
      string: /[\s\S]+/,
    }
  }
  e.languages.insertBefore('csharp', 'string', {
    'interpolation-string': [
      {
        pattern: s('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [P]),
        lookbehind: !0,
        greedy: !0,
        inside: q(P, F),
      },
      {
        pattern: s('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [Z]),
        lookbehind: !0,
        greedy: !0,
        inside: q(Z, U),
      },
    ],
    char: { pattern: RegExp(_), greedy: !0 },
  }),
    (e.languages.dotnet = e.languages.cs = e.languages.csharp)
})(Prism)
!(function (e) {
  const t =
    /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/
  const n = '\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b'.replace(/<keyword>/g, function () {
    return t.source
  })
  ;(e.languages.cpp = e.languages.extend('c', {
    'class-name': [
      {
        pattern: RegExp(
          '(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+'.replace(/<keyword>/g, function () {
            return t.source
          })
        ),
        lookbehind: !0,
      },
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
    ],
    keyword: t,
    number: {
      pattern:
        /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0,
    },
    operator:
      />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:false|true)\b/,
  })),
    e.languages.insertBefore('cpp', 'string', {
      module: {
        pattern: RegExp(
          '(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
            '<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>'.replace(/<mod-name>/g, function () {
              return n
            }) +
            ')'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
      },
      'raw-string': { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: 'string', greedy: !0 },
    }),
    e.languages.insertBefore('cpp', 'keyword', {
      'generic-function': {
        pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
        inside: { function: /^\w+/, generic: { pattern: /<[\s\S]+/, alias: 'class-name', inside: e.languages.cpp } },
      },
    }),
    e.languages.insertBefore('cpp', 'operator', { 'double-colon': { pattern: /::/, alias: 'punctuation' } }),
    e.languages.insertBefore('cpp', 'class-name', {
      'base-clause': {
        pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: !0,
        greedy: !0,
        inside: e.languages.extend('cpp', {}),
      },
    }),
    e.languages.insertBefore(
      'inside',
      'double-colon',
      { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp['base-clause']
    )
})(Prism)
!(function (e) {
  e.languages.dataweave = {
    url: /\b[A-Za-z]+:\/\/[\w/:.?=&-]+|\burn:[\w:.?=&-]+/,
    property: { pattern: /(?:\b\w+#)?(?:"(?:\\.|[^\\"\r\n])*"|\b\w+)(?=\s*[:@])/, greedy: !0 },
    string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    'mime-type': /\b(?:application|audio|image|multipart|text|video)\/[\w+-]+/,
    date: { pattern: /\|[\w:+-]+\|/, greedy: !0 },
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    regex: { pattern: /\/(?:[^\\\/\r\n]|\\[^\r\n])+\//, greedy: !0 },
    keyword: /\b(?:and|as|at|case|do|else|fun|if|input|is|match|not|ns|null|or|output|type|unless|update|using|var)\b/,
    function: /\b[A-Z_]\w*(?=\s*\()/i,
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\];(),.:@]/,
    operator: /<<|>>|->|[<>~=]=?|!=|--?-?|\+\+?|!|\?/,
    boolean: /\b(?:false|true)\b/,
  }
})(Prism)
!(function (e) {
  const n = '(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)'.replace(/<SP_BS>/g, function () {
    return '\\\\[\r\n](?:\\s|\\\\[\r\n]|#.*(?!.))*(?![\\s#]|\\\\[\r\n])'
  })
  const r = '"(?:[^"\\\\\r\n]|\\\\(?:\r\n|[^]))*"|\'(?:[^\'\\\\\r\n]|\\\\(?:\r\n|[^]))*\''
  const t = '--[\\w-]+=(?:<STR>|(?!["\'])(?:[^\\s\\\\]|\\\\.)+)'.replace(/<STR>/g, function () {
    return r
  })
  const o = { pattern: RegExp(r), greedy: !0 }
  const i = { pattern: /(^[ \t]*)#.*/m, lookbehind: !0, greedy: !0 }
  function a(e, r) {
    return (
      (e = e
        .replace(/<OPT>/g, function () {
          return t
        })
        .replace(/<SP>/g, function () {
          return n
        })),
      RegExp(e, r)
    )
  }
  ;(e.languages.docker = {
    instruction: {
      pattern:
        /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
      lookbehind: !0,
      greedy: !0,
      inside: {
        options: {
          pattern: a('(^(?:ONBUILD<SP>)?\\w+<SP>)<OPT>(?:<SP><OPT>)*', 'i'),
          lookbehind: !0,
          greedy: !0,
          inside: {
            property: { pattern: /(^|\s)--[\w-]+/, lookbehind: !0 },
            string: [o, { pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/, lookbehind: !0 }],
            operator: /\\$/m,
            punctuation: /=/,
          },
        },
        keyword: [
          {
            pattern: a('(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\\b', 'i'),
            lookbehind: !0,
            greedy: !0,
          },
          {
            pattern: a('(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\\\]+<SP>)AS', 'i'),
            lookbehind: !0,
            greedy: !0,
          },
          { pattern: a('(^ONBUILD<SP>)\\w+', 'i'), lookbehind: !0, greedy: !0 },
          { pattern: /^\w+/, greedy: !0 },
        ],
        comment: i,
        string: o,
        variable: /\$(?:\w+|\{[^{}"'\\]*\})/,
        operator: /\\$/m,
      },
    },
    comment: i,
  }),
    (e.languages.dockerfile = e.languages.docker)
})(Prism)
;(Prism.languages.go = Prism.languages.extend('clike', {
  string: { pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/, lookbehind: !0, greedy: !0 },
  keyword:
    /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  boolean: /\b(?:_|false|iota|nil|true)\b/,
  number: [
    /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
    /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
    /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i,
  ],
  operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin:
    /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/,
})),
  Prism.languages.insertBefore('go', 'string', { char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 } }),
  delete Prism.languages.go['class-name']
!(function (e) {
  const n = {
    pattern: /((?:^|[^\\$])(?:\\{2})*)\$(?:\w+|\{[^{}]*\})/,
    lookbehind: !0,
    inside: {
      'interpolation-punctuation': { pattern: /^\$\{?|\}$/, alias: 'punctuation' },
      expression: { pattern: /[\s\S]+/, inside: null },
    },
  }
  ;(e.languages.groovy = e.languages.extend('clike', {
    string: { pattern: /'''(?:[^\\]|\\[\s\S])*?'''|'(?:\\.|[^\\'\r\n])*'/, greedy: !0 },
    keyword:
      /\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|in|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
    number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
    operator: {
      pattern:
        /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
      lookbehind: !0,
    },
    punctuation: /\.+|[{}[\];(),:$]/,
  })),
    e.languages.insertBefore('groovy', 'string', {
      shebang: { pattern: /#!.+/, alias: 'comment', greedy: !0 },
      'interpolation-string': {
        pattern:
          /"""(?:[^\\]|\\[\s\S])*?"""|(["/])(?:\\.|(?!\1)[^\\\r\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
        greedy: !0,
        inside: { interpolation: n, string: /[\s\S]+/ },
      },
    }),
    e.languages.insertBefore('groovy', 'punctuation', {
      'spock-block': /\b(?:and|cleanup|expect|given|setup|then|when|where):/,
    }),
    e.languages.insertBefore('groovy', 'function', {
      annotation: { pattern: /(^|[^.])@\w+/, lookbehind: !0, alias: 'punctuation' },
    }),
    (n.inside.expression.inside = e.languages.groovy)
})(Prism)
!(function (e) {
  const n =
    /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/
  const t = '(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*'
  const s = {
    pattern: RegExp('(^|[^\\w.])' + t + '[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b'),
    lookbehind: !0,
    inside: {
      namespace: { pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/, inside: { punctuation: /\./ } },
      punctuation: /\./,
    },
  }
  ;(e.languages.java = e.languages.extend('clike', {
    string: { pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/, lookbehind: !0, greedy: !0 },
    'class-name': [
      s,
      {
        pattern: RegExp('(^|[^\\w.])' + t + '[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)'),
        lookbehind: !0,
        inside: s.inside,
      },
      {
        pattern: RegExp(
          '(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)' + t + '[A-Z]\\w*\\b'
        ),
        lookbehind: !0,
        inside: s.inside,
      },
    ],
    keyword: n,
    function: [e.languages.clike.function, { pattern: /(::\s*)[a-z_]\w*/, lookbehind: !0 }],
    number:
      /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0 },
    constant: /\b[A-Z][A-Z_\d]+\b/,
  })),
    e.languages.insertBefore('java', 'string', {
      'triple-quoted-string': {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: 'string',
      },
      char: { pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/, greedy: !0 },
    }),
    e.languages.insertBefore('java', 'class-name', {
      annotation: { pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/, lookbehind: !0, alias: 'punctuation' },
      generics: {
        pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
        inside: { 'class-name': s, keyword: n, punctuation: /[<>(),.:]/, operator: /[?&|]/ },
      },
      import: [
        {
          pattern: RegExp('(\\bimport\\s+)' + t + '(?:[A-Z]\\w*|\\*)(?=\\s*;)'),
          lookbehind: !0,
          inside: { namespace: s.inside.namespace, punctuation: /\./, operator: /\*/, 'class-name': /\w+/ },
        },
        {
          pattern: RegExp('(\\bimport\\s+static\\s+)' + t + '(?:\\w+|\\*)(?=\\s*;)'),
          lookbehind: !0,
          alias: 'static',
          inside: {
            namespace: s.inside.namespace,
            static: /\b\w+$/,
            punctuation: /\./,
            operator: /\*/,
            'class-name': /\w+/,
          },
        },
      ],
      namespace: {
        pattern: RegExp(
          '(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?'.replace(
            /<keyword>/g,
            function () {
              return n.source
            }
          )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
    })
})(Prism)
;(Prism.languages.json = {
  property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 },
  string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 },
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: { pattern: /\bnull\b/, alias: 'keyword' },
}),
  (Prism.languages.webmanifest = Prism.languages.json)
!(function (n) {
  ;(n.languages.kotlin = n.languages.extend('clike', {
    keyword: {
      pattern:
        /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
      lookbehind: !0,
    },
    function: [
      { pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/, greedy: !0 },
      { pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/, lookbehind: !0, greedy: !0 },
    ],
    number:
      /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
  })),
    delete n.languages.kotlin['class-name']
  const e = {
    'interpolation-punctuation': { pattern: /^\$\{?|\}$/, alias: 'punctuation' },
    expression: { pattern: /[\s\S]+/, inside: n.languages.kotlin },
  }
  n.languages.insertBefore('kotlin', 'string', {
    'string-literal': [
      {
        pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
        alias: 'multiline',
        inside: { interpolation: { pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i, inside: e }, string: /[\s\S]+/ },
      },
      {
        pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/,
        alias: 'singleline',
        inside: {
          interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i, lookbehind: !0, inside: e },
          string: /[\s\S]+/,
        },
      },
    ],
    char: { pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/, greedy: !0 },
  }),
    delete n.languages.kotlin.string,
    n.languages.insertBefore('kotlin', 'keyword', {
      annotation: { pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/, alias: 'builtin' },
    }),
    n.languages.insertBefore('kotlin', 'function', { label: { pattern: /\b\w+@|@\w+\b/, alias: 'symbol' } }),
    (n.languages.kt = n.languages.kotlin),
    (n.languages.kts = n.languages.kotlin)
})(Prism)
!(function (e) {
  function n(e, n) {
    return '___' + e.toUpperCase() + n + '___'
  }
  Object.defineProperties((e.languages['markup-templating'] = {}), {
    buildPlaceholders: {
      value: function (t, a, r, o) {
        if (t.language === a) {
          const c = (t.tokenStack = [])
          ;(t.code = t.code.replace(r, function (e) {
            if (typeof o === 'function' && !o(e)) return e
            for (var r, i = c.length; t.code.indexOf((r = n(a, i))) !== -1; ) ++i
            return (c[i] = e), r
          })),
            (t.grammar = e.languages.markup)
        }
      },
    },
    tokenizePlaceholders: {
      value: function (t, a) {
        if (t.language === a && t.tokenStack) {
          t.grammar = e.languages[a]
          let r = 0
          const o = Object.keys(t.tokenStack)
          !(function c(i) {
            for (let u = 0; u < i.length && !(r >= o.length); u++) {
              const g = i[u]
              if (typeof g === 'string' || (g.content && typeof g.content === 'string')) {
                const l = o[r]
                const s = t.tokenStack[l]
                const f = typeof g === 'string' ? g : g.content
                const p = n(a, l)
                const k = f.indexOf(p)
                if (k > -1) {
                  ++r
                  const m = f.substring(0, k)
                  const d = new e.Token(a, e.tokenize(s, t.grammar), 'language-' + a, s)
                  const h = f.substring(k + p.length)
                  const v = []
                  m && v.push.apply(v, c([m])),
                    v.push(d),
                    h && v.push.apply(v, c([h])),
                    typeof g === 'string' ? i.splice.apply(i, [u, 1].concat(v)) : (g.content = v)
                }
              } else g.content && c(g.content)
            }
            return i
          })(t.tokens)
        }
      },
    },
  })
})(Prism)
;(Prism.languages.objectivec = Prism.languages.extend('c', {
  string: { pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
  keyword:
    /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
  operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
})),
  delete Prism.languages.objectivec['class-name'],
  (Prism.languages.objc = Prism.languages.objectivec)
!(function (e) {
  const n =
    '(?:\\((?:[^()\\\\]|\\\\[^])*\\)|\\{(?:[^{}\\\\]|\\\\[^])*\\}|\\[(?:[^[\\]\\\\]|\\\\[^])*\\]|<(?:[^<>\\\\]|\\\\[^])*>)'
  e.languages.perl = {
    comment: [
      { pattern: /(^\s*)=\w[\s\S]*?=cut.*/m, lookbehind: !0, greedy: !0 },
      { pattern: /(^|[^\\$])#.*/, lookbehind: !0, greedy: !0 },
    ],
    string: [
      {
        pattern: RegExp(
          '\\b(?:q|qq|qw|qx)(?![a-zA-Z0-9])\\s*(?:' +
            [
              '([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1',
              '([a-zA-Z0-9])(?:(?!\\2)[^\\\\]|\\\\[^])*\\2',
              n,
            ].join('|') +
            ')'
        ),
        greedy: !0,
      },
      { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
      { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
    ],
    regex: [
      {
        pattern: RegExp(
          '\\b(?:m|qr)(?![a-zA-Z0-9])\\s*(?:' +
            [
              '([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1',
              '([a-zA-Z0-9])(?:(?!\\2)[^\\\\]|\\\\[^])*\\2',
              n,
            ].join('|') +
            ')[msixpodualngc]*'
        ),
        greedy: !0,
      },
      {
        pattern: RegExp(
          '(^|[^-])\\b(?:s|tr|y)(?![a-zA-Z0-9])\\s*(?:' +
            [
              '([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\2)[^\\\\]|\\\\[^])*\\2(?:(?!\\2)[^\\\\]|\\\\[^])*\\2',
              '([a-zA-Z0-9])(?:(?!\\3)[^\\\\]|\\\\[^])*\\3(?:(?!\\3)[^\\\\]|\\\\[^])*\\3',
              n + '\\s*' + n,
            ].join('|') +
            ')[msixpodualngcer]*'
        ),
        lookbehind: !0,
        greedy: !0,
      },
      {
        pattern:
          /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|x|xor)\b))/,
        greedy: !0,
      },
    ],
    variable: [
      /[&*$@%]\{\^[A-Z]+\}/,
      /[&*$@%]\^[A-Z_]/,
      /[&*$@%]#?(?=\{)/,
      /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+(?![\w$]))+(?:::)*/,
      /[&*$@%]\d+/,
      /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
    ],
    filehandle: { pattern: /<(?![<=])\S*?>|\b_\b/, alias: 'symbol' },
    'v-string': { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: 'string' },
    function: { pattern: /(\bsub[ \t]+)\w+/, lookbehind: !0 },
    keyword:
      /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    number:
      /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    operator:
      /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)\b/,
    punctuation: /[{}[\];(),:]/,
  }
})(Prism)
!(function (e) {
  const a = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/
  const t = [
    { pattern: /\b(?:false|true)\b/i, alias: 'boolean' },
    { pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i, greedy: !0, lookbehind: !0 },
    { pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i, greedy: !0, lookbehind: !0 },
    /\b(?:null)\b/i,
    /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
  ]
  const i =
    /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i
  const n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/
  const s = /[{}\[\](),:;]/
  e.languages.php = {
    delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: 'important' },
    comment: a,
    variable: /\$+(?:\w+\b|(?=\{))/,
    package: {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: !0,
      inside: { punctuation: /\\/ },
    },
    'class-name-definition': {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: !0,
      alias: 'class-name',
    },
    'function-definition': { pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i, lookbehind: !0, alias: 'function' },
    keyword: [
      {
        pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
        alias: 'type-casting',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern:
          /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
        alias: 'type-hint',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern:
          /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
        alias: 'return-type',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
        alias: 'type-declaration',
        greedy: !0,
      },
      {
        pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
        alias: 'type-declaration',
        greedy: !0,
        lookbehind: !0,
      },
      { pattern: /\b(?:parent|self|static)(?=\s*::)/i, alias: 'static-context', greedy: !0 },
      { pattern: /(\byield\s+)from\b/i, lookbehind: !0 },
      /\bclass\b/i,
      {
        pattern:
          /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
        lookbehind: !0,
      },
    ],
    'argument-name': { pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i, lookbehind: !0 },
    'class-name': [
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
        greedy: !0,
        lookbehind: !0,
      },
      { pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
      { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern:
          /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /\b[a-z_]\w*(?=\s*\$)/i, alias: 'type-declaration', greedy: !0 },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ['class-name-fully-qualified', 'type-declaration'],
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: 'static-context', greedy: !0 },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
        alias: ['class-name-fully-qualified', 'static-context'],
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i, alias: 'type-hint', greedy: !0, lookbehind: !0 },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ['class-name-fully-qualified', 'type-hint'],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i, alias: 'return-type', greedy: !0, lookbehind: !0 },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: ['class-name-fully-qualified', 'return-type'],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
    ],
    constant: t,
    function: {
      pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
      lookbehind: !0,
      inside: { punctuation: /\\/ },
    },
    property: { pattern: /(->\s*)\w+/, lookbehind: !0 },
    number: i,
    operator: n,
    punctuation: s,
  }
  const l = {
    pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
    lookbehind: !0,
    inside: e.languages.php,
  }
  const r = [
    {
      pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
      alias: 'nowdoc-string',
      greedy: !0,
      inside: {
        delimiter: { pattern: /^<<<'[^']+'|[a-z_]\w*;$/i, alias: 'symbol', inside: { punctuation: /^<<<'?|[';]$/ } },
      },
    },
    {
      pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
      alias: 'heredoc-string',
      greedy: !0,
      inside: {
        delimiter: {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: 'symbol',
          inside: { punctuation: /^<<<"?|[";]$/ },
        },
        interpolation: l,
      },
    },
    { pattern: /`(?:\\[\s\S]|[^\\`])*`/, alias: 'backtick-quoted-string', greedy: !0 },
    { pattern: /'(?:\\[\s\S]|[^\\'])*'/, alias: 'single-quoted-string', greedy: !0 },
    { pattern: /"(?:\\[\s\S]|[^\\"])*"/, alias: 'double-quoted-string', greedy: !0, inside: { interpolation: l } },
  ]
  e.languages.insertBefore('php', 'variable', {
    string: r,
    attribute: {
      pattern:
        /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
      greedy: !0,
      inside: {
        'attribute-content': {
          pattern: /^(#\[)[\s\S]+(?=\]$)/,
          lookbehind: !0,
          inside: {
            comment: a,
            string: r,
            'attribute-class-name': [
              { pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i, alias: 'class-name', greedy: !0, lookbehind: !0 },
              {
                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                alias: ['class-name', 'class-name-fully-qualified'],
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
              },
            ],
            constant: t,
            number: i,
            operator: n,
            punctuation: s,
          },
        },
        delimiter: { pattern: /^#\[|\]$/, alias: 'punctuation' },
      },
    },
  }),
    e.hooks.add('before-tokenize', function (a) {
      ;/<\?/.test(a.code) &&
        e.languages['markup-templating'].buildPlaceholders(
          a,
          'php',
          /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g
        )
    }),
    e.hooks.add('after-tokenize', function (a) {
      e.languages['markup-templating'].tokenizePlaceholders(a, 'php')
    })
})(Prism)
;(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
  'string-interpolation': {
    pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: !0,
        inside: {
          'format-spec': { pattern: /(:)[^:(){}]+(?=\}$)/, lookbehind: !0 },
          'conversion-option': { pattern: /![sra](?=[:}]$)/, alias: 'punctuation' },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  'triple-quoted-string': { pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: 'string' },
  string: { pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 },
  function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 },
  'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: !0,
    alias: ['annotation', 'punctuation'],
    inside: { punctuation: /\./ },
  },
  keyword:
    /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin:
    /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:False|None|True)\b/,
  number:
    /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python)
!(function (e) {
  ;(e.languages.ruby = e.languages.extend('clike', {
    comment: { pattern: /#.*|^=begin\s[\s\S]*?^=end/m, greedy: !0 },
    'class-name': {
      pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword:
      /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    operator: /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
    punctuation: /[(){}[\].,;]/,
  })),
    e.languages.insertBefore('ruby', 'operator', { 'double-colon': { pattern: /::/, alias: 'punctuation' } })
  const n = {
    pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
    lookbehind: !0,
    inside: {
      content: { pattern: /^(#\{)[\s\S]+(?=\}$)/, lookbehind: !0, inside: e.languages.ruby },
      delimiter: { pattern: /^#\{|\}$/, alias: 'punctuation' },
    },
  }
  delete e.languages.ruby.function
  const t =
    '(?:' +
    [
      '([^a-zA-Z0-9\\s{(\\[<=])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1',
      '\\((?:[^()\\\\]|\\\\[^]|\\((?:[^()\\\\]|\\\\[^])*\\))*\\)',
      '\\{(?:[^{}\\\\]|\\\\[^]|\\{(?:[^{}\\\\]|\\\\[^])*\\})*\\}',
      '\\[(?:[^\\[\\]\\\\]|\\\\[^]|\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\])*\\]',
      '<(?:[^<>\\\\]|\\\\[^]|<(?:[^<>\\\\]|\\\\[^])*>)*>',
    ].join('|') +
    ')'
  const i = '(?:"(?:\\\\.|[^"\\\\\r\n])*"|(?:\\b[a-zA-Z_]\\w*|[^\\s\0-\\x7F]+)[?!]?|\\$.)'
  e.languages.insertBefore('ruby', 'keyword', {
    'regex-literal': [
      { pattern: RegExp('%r' + t + '[egimnosux]{0,6}'), greedy: !0, inside: { interpolation: n, regex: /[\s\S]+/ } },
      {
        pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
        lookbehind: !0,
        greedy: !0,
        inside: { interpolation: n, regex: /[\s\S]+/ },
      },
    ],
    variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    symbol: [
      { pattern: RegExp('(^|[^:]):' + i), lookbehind: !0, greedy: !0 },
      { pattern: RegExp('([\r\n{(,][ \t]*)' + i + '(?=:(?!:))'), lookbehind: !0, greedy: !0 },
    ],
    'method-definition': {
      pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
      lookbehind: !0,
      inside: { function: /\b\w+$/, keyword: /^self\b/, 'class-name': /^\w+/, punctuation: /\./ },
    },
  }),
    e.languages.insertBefore('ruby', 'string', {
      'string-literal': [
        { pattern: RegExp('%[qQiIwWs]?' + t), greedy: !0, inside: { interpolation: n, string: /[\s\S]+/ } },
        {
          pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
          greedy: !0,
          inside: { interpolation: n, string: /[\s\S]+/ },
        },
        {
          pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: 'heredoc-string',
          greedy: !0,
          inside: {
            delimiter: {
              pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
              inside: { symbol: /\b\w+/, punctuation: /^<<[-~]?/ },
            },
            interpolation: n,
            string: /[\s\S]+/,
          },
        },
        {
          pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: 'heredoc-string',
          greedy: !0,
          inside: {
            delimiter: {
              pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
              inside: { symbol: /\b\w+/, punctuation: /^<<[-~]?'|'$/ },
            },
            string: /[\s\S]+/,
          },
        },
      ],
      'command-literal': [
        {
          pattern: RegExp('%x' + t),
          greedy: !0,
          inside: { interpolation: n, command: { pattern: /[\s\S]+/, alias: 'string' } },
        },
        {
          pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
          greedy: !0,
          inside: { interpolation: n, command: { pattern: /[\s\S]+/, alias: 'string' } },
        },
      ],
    }),
    delete e.languages.ruby.string,
    e.languages.insertBefore('ruby', 'number', {
      builtin:
        /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
      constant: /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/,
    }),
    (e.languages.rb = e.languages.ruby)
})(Prism)
!(function (e) {
  for (var a = '/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/', t = 0; t < 2; t++) {
    a = a.replace(/<self>/g, function () {
      return a
    })
  }
  ;(a = a.replace(/<self>/g, function () {
    return '[^\\s\\S]'
  })),
    (e.languages.rust = {
      comment: [
        { pattern: RegExp('(^|[^\\\\])' + a), lookbehind: !0, greedy: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
      ],
      string: { pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/, greedy: !0 },
      char: { pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/, greedy: !0 },
      attribute: {
        pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
        greedy: !0,
        alias: 'attr-name',
        inside: { string: null },
      },
      'closure-params': {
        pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
        lookbehind: !0,
        greedy: !0,
        inside: { 'closure-punctuation': { pattern: /^\||\|$/, alias: 'punctuation' }, rest: null },
      },
      'lifetime-annotation': { pattern: /'\w+/, alias: 'symbol' },
      'fragment-specifier': { pattern: /(\$\w+:)[a-z]+/, lookbehind: !0, alias: 'punctuation' },
      variable: /\$\w+/,
      'function-definition': { pattern: /(\bfn\s+)\w+/, lookbehind: !0, alias: 'function' },
      'type-definition': { pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/, lookbehind: !0, alias: 'class-name' },
      'module-declaration': [
        { pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/, lookbehind: !0, alias: 'namespace' },
        {
          pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
          lookbehind: !0,
          alias: 'namespace',
          inside: { punctuation: /::/ },
        },
      ],
      keyword: [
        /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
        /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/,
      ],
      function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
      macro: { pattern: /\b\w+!/, alias: 'property' },
      constant: /\b[A-Z_][A-Z_\d]+\b/,
      'class-name': /\b[A-Z]\w*\b/,
      namespace: {
        pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
        inside: { punctuation: /::/ },
      },
      number:
        /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
      boolean: /\b(?:false|true)\b/,
      punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
      operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
    }),
    (e.languages.rust['closure-params'].inside.rest = e.languages.rust),
    (e.languages.rust.attribute.inside.string = e.languages.rust.string)
})(Prism)
;(Prism.languages.scala = Prism.languages.extend('java', {
  'triple-quoted-string': { pattern: /"""[\s\S]*?"""/, greedy: !0, alias: 'string' },
  string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  keyword:
    /<-|=>|\b(?:abstract|case|catch|class|def|derives|do|else|enum|extends|extension|final|finally|for|forSome|given|if|implicit|import|infix|inline|lazy|match|new|null|object|opaque|open|override|package|private|protected|return|sealed|self|super|this|throw|trait|transparent|try|type|using|val|var|while|with|yield)\b/,
  number: /\b0x(?:[\da-f]*\.)?[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
  builtin: /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
  symbol: /'[^\d\s\\]\w*/,
})),
  Prism.languages.insertBefore('scala', 'triple-quoted-string', {
    'string-interpolation': {
      pattern:
        /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*?"""|"(?:[^$"\r\n]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*")/i,
      greedy: !0,
      inside: {
        id: { pattern: /^\w+/, greedy: !0, alias: 'function' },
        escape: { pattern: /\\\$"|\$[$"]/, greedy: !0, alias: 'symbol' },
        interpolation: {
          pattern: /\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
          greedy: !0,
          inside: { punctuation: /^\$\{?|\}$/, expression: { pattern: /[\s\S]+/, inside: Prism.languages.scala } },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  delete Prism.languages.scala['class-name'],
  delete Prism.languages.scala.function,
  delete Prism.languages.scala.constant
Prism.languages.sql = {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
  variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/],
  string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0 },
  identifier: {
    pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
    greedy: !0,
    lookbehind: !0,
    inside: { punctuation: /^`|`$/ },
  },
  function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  keyword:
    /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
  number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  operator:
    /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/,
}
;(Prism.languages.swift = {
  comment: {
    pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
    lookbehind: !0,
    greedy: !0,
  },
  'string-literal': [
    {
      pattern: RegExp(
        '(^|[^"#])(?:"(?:\\\\(?:\\((?:[^()]|\\([^()]*\\))*\\)|\r\n|[^(])|[^\\\\\r\n"])*"|"""(?:\\\\(?:\\((?:[^()]|\\([^()]*\\))*\\)|[^(])|[^\\\\"]|"(?!""))*""")(?!["#])'
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        interpolation: { pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/, lookbehind: !0, inside: null },
        'interpolation-punctuation': { pattern: /^\)|\\\($/, alias: 'punctuation' },
        punctuation: /\\(?=[\r\n])/,
        string: /[\s\S]+/,
      },
    },
    {
      pattern: RegExp(
        '(^|[^"#])(#+)(?:"(?:\\\\(?:#+\\((?:[^()]|\\([^()]*\\))*\\)|\r\n|[^#])|[^\\\\\r\n])*?"|"""(?:\\\\(?:#+\\((?:[^()]|\\([^()]*\\))*\\)|[^#])|[^\\\\])*?""")\\2'
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        interpolation: { pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/, lookbehind: !0, inside: null },
        'interpolation-punctuation': { pattern: /^\)|\\#+\($/, alias: 'punctuation' },
        string: /[\s\S]+/,
      },
    },
  ],
  directive: {
    pattern: RegExp(
      '#(?:(?:elseif|if)\\b(?:[ \t]*(?:![ \t]*)?(?:\\b\\w+\\b(?:[ \t]*\\((?:[^()]|\\([^()]*\\))*\\))?|\\((?:[^()]|\\([^()]*\\))*\\))(?:[ \t]*(?:&&|\\|\\|))?)+|(?:else|endif)\\b)'
    ),
    alias: 'property',
    inside: {
      'directive-name': /^#\w+/,
      boolean: /\b(?:false|true)\b/,
      number: /\b\d+(?:\.\d+)*\b/,
      operator: /!|&&|\|\||[<>]=?/,
      punctuation: /[(),]/,
    },
  },
  literal: {
    pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
    alias: 'constant',
  },
  'other-directive': { pattern: /#\w+\b/, alias: 'property' },
  attribute: { pattern: /@\w+/, alias: 'atrule' },
  'function-definition': { pattern: /(\bfunc\s+)\w+/, lookbehind: !0, alias: 'function' },
  label: {
    pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
    lookbehind: !0,
    alias: 'important',
  },
  keyword:
    /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
  boolean: /\b(?:false|true)\b/,
  nil: { pattern: /\bnil\b/, alias: 'constant' },
  'short-argument': /\$\d+\b/,
  omit: { pattern: /\b_\b/, alias: 'keyword' },
  number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
  'class-name': /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
  function: /\b[a-z_]\w*(?=\s*\()/i,
  constant: /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
  operator: /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
  punctuation: /[{}[\]();,.:\\]/,
}),
  Prism.languages.swift['string-literal'].forEach(function (e) {
    e.inside.interpolation.inside = Prism.languages.swift
  })
!(function (a) {
  function e(e, n) {
    a.languages[e] && a.languages.insertBefore(e, 'comment', { 'doc-comment': n })
  }
  const n = a.languages.markup.tag
  const t = { pattern: /\/\/\/.*/, greedy: !0, alias: 'comment', inside: { tag: n } }
  const g = { pattern: /'''.*/, greedy: !0, alias: 'comment', inside: { tag: n } }
  e('csharp', t), e('fsharp', t), e('vbnet', g)
})(Prism)
!(function (e) {
  const n = /[*&][^\s[\]{},]+/
  const r = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/
  const t = '(?:' + r.source + '(?:[ \t]+' + n.source + ')?|' + n.source + '(?:[ \t]+' + r.source + ')?)'
  const a =
    '(?:[^\\s\\x00-\\x08\\x0e-\\x1f!"#%&\'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*'.replace(
      /<PLAIN>/g,
      function () {
        return '[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]'
      }
    )
  const d = '"(?:[^"\\\\\r\n]|\\\\.)*"|\'(?:[^\'\\\\\r\n]|\\\\.)*\''
  function o(e, n) {
    n = (n || '').replace(/m/g, '') + 'm'
    const r = '([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\\]|\\}|(?:[\r\n]\\s*)?#))'
      .replace(/<<prop>>/g, function () {
        return t
      })
      .replace(/<<value>>/g, function () {
        return e
      })
    return RegExp(r, n)
  }
  ;(e.languages.yaml = {
    scalar: {
      pattern: RegExp(
        '([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)'.replace(
          /<<prop>>/g,
          function () {
            return t
          }
        )
      ),
      lookbehind: !0,
      alias: 'string',
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(
        '((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)'
          .replace(/<<prop>>/g, function () {
            return t
          })
          .replace(/<<key>>/g, function () {
            return '(?:' + a + '|' + d + ')'
          })
      ),
      lookbehind: !0,
      greedy: !0,
      alias: 'atrule',
    },
    directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: 'important' },
    datetime: {
      pattern: o(
        '\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?'
      ),
      lookbehind: !0,
      alias: 'number',
    },
    boolean: { pattern: o('false|true', 'i'), lookbehind: !0, alias: 'important' },
    null: { pattern: o('null|~', 'i'), lookbehind: !0, alias: 'important' },
    string: { pattern: o(d), lookbehind: !0, greedy: !0 },
    number: {
      pattern: o('[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)', 'i'),
      lookbehind: !0,
    },
    tag: r,
    important: n,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
  }),
    (e.languages.yml = e.languages.yaml)
})(Prism)
/* eslint-enable */
