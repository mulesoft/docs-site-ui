;(function () {
  'use strict'

  const STORAGE_KEY = 'anypoint_session'
  const PROXY_PREFIX = '/anypoint-proxy'
  const LOGIN_URL = PROXY_PREFIX + '/accounts/login'
  const SESSION_TTL_MS = 60 * 60 * 1000

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function getSession () {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const session = JSON.parse(raw)
      if (session.storedAt && Date.now() - session.storedAt > SESSION_TTL_MS) {
        clearSession()
        return null
      }
      return session
    } catch (_) {
      return null
    }
  }

  function setSession (data) {
    data.storedAt = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  function clearSession () {
    localStorage.removeItem(STORAGE_KEY)
  }

  function getToken () {
    const session = getSession()
    return session ? session.accessToken : null
  }

  function getSpec () {
    const el = document.getElementById('openapi-spec-data')
    if (!el) return null
    try {
      return JSON.parse(el.textContent)
    } catch (_) {
      return null
    }
  }

  function findOperation (spec, operationId) {
    const paths = spec.paths || {}
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']
    for (const path in paths) {
      if (!Object.prototype.hasOwnProperty.call(paths, path)) continue
      for (let i = 0; i < methods.length; i++) {
        const op = paths[path][methods[i]]
        if (!op) continue
        const opId = op.operationId || methods[i] + '-' + path.replace(/[^a-zA-Z0-9]/g, '-')
        if (opId === operationId) {
          return { operation: op, method: methods[i], path, pathParams: paths[path].parameters || [] }
        }
      }
    }
    return null
  }

  // ─── Auth UI ──────────────────────────────────────────────────────────────────

  function updateAuthUI () {
    const session = getSession()
    const signinBtn = document.getElementById('openapi-auth-signin')
    const signoutBtn = document.getElementById('openapi-auth-signout')
    const userEl = document.getElementById('openapi-auth-user')
    if (!signinBtn) return

    if (session && session.accessToken) {
      signinBtn.style.display = 'none'
      signoutBtn.style.display = ''
      signoutBtn.textContent = session.user === 'Token' ? 'Revoke Token' : 'Sign Out'
      userEl.style.display = ''
      userEl.textContent = session.user || 'Authenticated'
    } else {
      signinBtn.style.display = ''
      signoutBtn.style.display = 'none'
      userEl.style.display = 'none'
      userEl.textContent = ''
    }
  }

  function showLoginModal (message) {
    const modal = document.getElementById('openapi-login-modal')
    if (!modal) return
    modal.style.display = ''
    const stepCreds = document.getElementById('openapi-login-step-credentials')
    const stepToken = document.getElementById('openapi-login-step-token')
    if (stepCreds) stepCreds.style.display = ''
    if (stepToken) stepToken.style.display = 'none'
    const errEl = document.getElementById('openapi-login-error')
    if (errEl && typeof message === 'string') {
      errEl.textContent = message
      errEl.style.display = ''
    }
  }

  function showTokenStep () {
    const stepCreds = document.getElementById('openapi-login-step-credentials')
    const stepToken = document.getElementById('openapi-login-step-token')
    if (stepCreds) stepCreds.style.display = 'none'
    if (stepToken) stepToken.style.display = ''
    const tokenInput = document.getElementById('openapi-login-token-input')
    if (tokenInput) tokenInput.focus()
  }

  function hideLoginModal () {
    const modal = document.getElementById('openapi-login-modal')
    if (modal) modal.style.display = 'none'
    const errEl = document.getElementById('openapi-login-error')
    if (errEl) {
      errEl.style.display = 'none'
      errEl.textContent = ''
    }
    const tokenInput = document.getElementById('openapi-login-token-input')
    if (tokenInput) tokenInput.value = ''
  }

  function handleLogin (e) {
    e.preventDefault()
    const username = document.getElementById('openapi-login-username').value
    const password = document.getElementById('openapi-login-password').value
    const submitBtn = e.target.querySelector('.openapi-login-submit')

    submitBtn.disabled = true
    submitBtn.textContent = 'Signing in…'

    fetch(LOGIN_URL, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(function (resp) {
        if (!resp.ok) throw new Error('Login failed (HTTP ' + resp.status + ')')
        return resp.json()
      })
      .then(function (data) {
        setSession({
          accessToken: data.access_token,
          user: username,
        })
        hideLoginModal()
        updateAuthUI()
        e.target.reset()
      })
      .catch(function () {
        showTokenStep()
      })
      .finally(function () {
        submitBtn.disabled = false
        submitBtn.textContent = 'Sign In'
      })
  }

  function initAuth () {
    const signinBtn = document.getElementById('openapi-auth-signin')
    const signoutBtn = document.getElementById('openapi-auth-signout')
    const loginForm = document.getElementById('openapi-login-form')
    const cancelBtn = document.getElementById('openapi-login-cancel')
    const overlay = document.getElementById('openapi-login-overlay')
    const backBtn = document.getElementById('openapi-login-back')
    const tokenCancelBtn = document.getElementById('openapi-login-token-cancel')
    const applyTokenBtn = document.getElementById('openapi-login-apply-token')

    if (!signinBtn) return

    signinBtn.addEventListener('click', showLoginModal)

    signoutBtn.addEventListener('click', function () {
      clearSession()
      updateAuthUI()
    })

    if (applyTokenBtn) {
      applyTokenBtn.addEventListener('click', function () {
        const tokenInput = document.getElementById('openapi-login-token-input')
        const token = tokenInput ? tokenInput.value.trim() : ''
        if (token) {
          setSession({ accessToken: token, user: 'Token' })
          hideLoginModal()
          updateAuthUI()
        }
      })
    }

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        const stepCreds = document.getElementById('openapi-login-step-credentials')
        const stepToken = document.getElementById('openapi-login-step-token')
        if (stepCreds) stepCreds.style.display = ''
        if (stepToken) stepToken.style.display = 'none'
      })
    }

    if (loginForm) loginForm.addEventListener('submit', handleLogin)
    if (cancelBtn) cancelBtn.addEventListener('click', hideLoginModal)
    if (tokenCancelBtn) tokenCancelBtn.addEventListener('click', hideLoginModal)
    if (overlay) overlay.addEventListener('click', hideLoginModal)

    updateAuthUI()
  }

  // ─── Try It Panel ──────────────────────────────────────────────────────────

  function populateServerSelect (spec) {
    const serverSelect = document.getElementById('openapi-sidebar-server-select')
    if (!serverSelect) return
    serverSelect.innerHTML = ''
    const servers = spec.servers || [{ url: '', description: 'No servers defined' }]
    for (let i = 0; i < servers.length; i++) {
      const opt = document.createElement('option')
      opt.value = servers[i].url
      opt.textContent = servers[i].url + (servers[i].description ? ' — ' + servers[i].description : '')
      serverSelect.appendChild(opt)
    }
  }

  function getSelectedServer () {
    const serverSelect = document.getElementById('openapi-sidebar-server-select')
    return serverSelect ? serverSelect.value || '' : ''
  }

  const PARAM_START = '\x01'
  const PARAM_END = '\x02'

  function escapeHtml (str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }

  const PARAM_RE = new RegExp(PARAM_START + '([^' + PARAM_END + ']*)' + PARAM_END, 'g')

  // ─── Lightweight Syntax Highlighting ──────────────────────────────────────

  const LANG_KEYWORDS = {
    curl: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    python: [
      'import',
      'from',
      'as',
      'def',
      'return',
      'if',
      'else',
      'elif',
      'for',
      'in',
      'while',
      'True',
      'False',
      'None',
      'and',
      'or',
      'not',
      'with',
      'class',
      'try',
      'except',
      'finally',
      'raise',
      'pass',
      'lambda',
      'yield',
    ],
    javascript: [
      'const',
      'let',
      'var',
      'function',
      'return',
      'if',
      'else',
      'for',
      'while',
      'new',
      'this',
      'class',
      'import',
      'from',
      'export',
      'default',
      'async',
      'await',
      'try',
      'catch',
      'throw',
      'typeof',
      'instanceof',
      'true',
      'false',
      'null',
      'undefined',
    ],
    java: [
      'public',
      'private',
      'protected',
      'static',
      'final',
      'class',
      'interface',
      'extends',
      'implements',
      'import',
      'package',
      'return',
      'if',
      'else',
      'for',
      'while',
      'new',
      'this',
      'void',
      'int',
      'long',
      'double',
      'float',
      'boolean',
      'char',
      'String',
      'try',
      'catch',
      'throw',
      'throws',
      'true',
      'false',
      'null',
      'var',
    ],
    go: [
      'package',
      'import',
      'func',
      'return',
      'if',
      'else',
      'for',
      'range',
      'var',
      'const',
      'type',
      'struct',
      'interface',
      'map',
      'chan',
      'go',
      'defer',
      'select',
      'case',
      'switch',
      'break',
      'continue',
      'nil',
      'true',
      'false',
      'err',
    ],
    php: [
      'function',
      'return',
      'if',
      'else',
      'elseif',
      'for',
      'foreach',
      'while',
      'class',
      'new',
      'echo',
      'print',
      'public',
      'private',
      'protected',
      'static',
      'true',
      'false',
      'null',
      'try',
      'catch',
      'throw',
      'use',
      'namespace',
      'array',
    ],
  }

  const LANG_BUILTINS = {
    curl: ['curl'],
    python: ['requests', 'print', 'json', 'str', 'int', 'list', 'dict', 'len', 'range', 'open', 'type'],
    javascript: ['console', 'fetch', 'JSON', 'Promise', 'Object', 'Array', 'Math', 'Date', 'Error', 'Response'],
    java: ['System', 'HttpClient', 'HttpRequest', 'HttpResponse', 'URI', 'BodyPublishers', 'BodyHandlers'],
    go: ['fmt', 'http', 'log', 'strings', 'json', 'ioutil', 'os', 'io'],
    php: ['curl_init', 'curl_setopt', 'curl_exec', 'curl_close', 'json_decode', 'json_encode', 'var_dump', 'print_r'],
  }

  // Tokenize escaped HTML code into syntax tokens
  function syntaxHighlight (escaped, lang) {
    const keywords = LANG_KEYWORDS[lang] || []
    const builtins = LANG_BUILTINS[lang] || []
    const kwSet = {}
    const biSet = {}
    for (let i = 0; i < keywords.length; i++) kwSet[keywords[i]] = true
    for (let i = 0; i < builtins.length; i++) biSet[builtins[i]] = true

    // Build tokenizer regex from parts (strings, comments, numbers, identifiers, markers)
    const marker = PARAM_START + '[^' + PARAM_END + ']*' + PARAM_END
    const tail = ['\\b\\d+\\.?\\d*\\b', '[a-zA-Z_]\\w*', marker, '[^\\s]', '\\s+']
    let parts
    if (lang === 'curl') {
      // cURL uses single-quoted strings — match them first to avoid
      // &quot; inside body JSON fragmenting the single-quoted string
      parts = ["'(?:\\\\.|[^'\\\\])*'", '-[a-zA-Z]\\b', '--[a-zA-Z][-a-zA-Z]*'].concat(tail)
    } else if (lang === 'php') {
      parts = [
        '&quot;(?:[^&]|&(?!quot;))*?&quot;',
        '&#39;(?:[^&]|&(?!#39;))*?&#39;',
        "'(?:\\\\.|[^'\\\\])*'",
        '"(?:\\\\.|[^"\\\\])*"',
        '\\/\\/[^\\n]*',
        '#[^\\n]*',
        '\\$[a-zA-Z_]\\w*',
      ].concat(tail)
    } else {
      parts = [
        '&quot;(?:[^&]|&(?!quot;))*?&quot;',
        '&#39;(?:[^&]|&(?!#39;))*?&#39;',
        "'(?:\\\\.|[^'\\\\])*'",
        '"(?:\\\\.|[^"\\\\])*"',
        '`(?:\\\\.|[^`\\\\])*`',
        '\\/\\/[^\\n]*',
        '#[^\\n]*',
      ]
        .concat(tail)
        .concat(['\\$[a-zA-Z_]\\w*'])
    }
    const tokenRe = new RegExp('(' + parts.join('|') + ')', 'g')

    let result = ''
    let match
    tokenRe.lastIndex = 0
    while ((match = tokenRe.exec(escaped)) !== null) {
      const tok = match[0]
      // Param markers - pass through untouched
      if (tok.charAt(0) === PARAM_START) {
        result += tok
        // Strings (quoted)
      } else if (/^(&quot;|&#39;|'|"|`)/.test(tok)) {
        result += '<span class="hljs-string">' + tok + '</span>'
        // Comments
      } else if (/^(\/\/|#)/.test(tok) && lang !== 'curl') {
        result += '<span class="hljs-comment">' + tok + '</span>'
        // PHP variables
      } else if (tok.charAt(0) === '$' && lang === 'php') {
        result += '<span class="hljs-variable">' + tok + '</span>'
        // curl flags
      } else if (tok.charAt(0) === '-' && lang === 'curl') {
        result += '<span class="hljs-keyword">' + tok + '</span>'
        // Numbers
      } else if (/^\d/.test(tok)) {
        result += '<span class="hljs-number">' + tok + '</span>'
        // Keywords
      } else if (kwSet[tok]) {
        result += '<span class="hljs-keyword">' + tok + '</span>'
        // Built-ins
      } else if (biSet[tok]) {
        result += '<span class="hljs-built_in">' + tok + '</span>'
      } else {
        result += tok
      }
    }
    return result
  }

  function highlightSnippet (code, lang) {
    const escaped = escapeHtml(code)
    const highlighted = syntaxHighlight(escaped, lang)
    return highlighted
      .replace(PARAM_RE, '<span class="openapi-snippet-param-value">$1</span>')
      .replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, '<span class="openapi-snippet-placeholder">{$1}</span>')
  }

  function updateSnippet (endpoint, spec, operationId) {
    const codeEl = endpoint.querySelector('.openapi-tryit-snippet-code code')
    if (!codeEl) return
    const lang = endpoint.dataset.snippetLang || 'curl'
    const r = getRequestParts(endpoint, spec, operationId, true)
    codeEl.innerHTML = highlightSnippet(GENERATORS[lang](r), lang)
  }

  function populatePanel (endpoint, spec, operationId) {
    const found = findOperation(spec, operationId)
    if (!found) return

    const op = found.operation
    const allParams = (found.pathParams || []).concat(op.parameters || [])

    // Auto-fill parameter inputs
    const inputs = endpoint.querySelectorAll('.openapi-tryit-param-input')
    for (let j = 0; j < inputs.length; j++) {
      const input = inputs[j]
      const param = allParams.find(function (p) {
        return p.name === input.name
      })
      if (param && param.schema && param.schema.default !== undefined) {
        input.value = String(param.schema.default)
      }
      autoFillParam(input, input.name)

      // Update URL preview when params change
      input.addEventListener('input', function () {
        updateSnippet(endpoint, spec, operationId)
      })
    }

    // Request body
    const bodySection = endpoint.querySelector('.openapi-tryit-body-section')
    const bodyTextarea = endpoint.querySelector('.openapi-tryit-body')
    const method = found.method.toLowerCase()
    if ((method === 'post' || method === 'put' || method === 'patch') && op.requestBody) {
      bodySection.style.display = ''
      const content = op.requestBody.content || {}
      const mediaTypes = Object.keys(content)
      const primaryMedia = mediaTypes[0] || 'application/json'
      const ctLabel = bodySection.querySelector('.openapi-tryit-content-type')
      if (ctLabel) ctLabel.textContent = '(' + primaryMedia + ')'

      const mediaObj = content[primaryMedia]
      let templateBody = ''
      if (mediaObj && mediaObj.example) {
        templateBody =
          typeof mediaObj.example === 'string' ? mediaObj.example : JSON.stringify(mediaObj.example, null, 2)
      } else if (mediaObj && mediaObj.examples) {
        const firstEx = Object.values(mediaObj.examples)[0]
        if (firstEx && firstEx.value) {
          templateBody = typeof firstEx.value === 'string' ? firstEx.value : JSON.stringify(firstEx.value, null, 2)
        }
      } else if (mediaObj && mediaObj.schema) {
        const skeleton = generateSkeleton(mediaObj.schema, 0)
        templateBody = skeleton !== undefined ? JSON.stringify(skeleton, null, 2) : ''
      }
      bodyTextarea.value = templateBody
      bodyTextarea.dataset.template = templateBody

      const resetBtn = bodySection.querySelector('.openapi-tryit-reset')
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          bodyTextarea.value = bodyTextarea.dataset.template || ''
          updateSnippet(endpoint, spec, operationId)
        })
      }
    } else {
      bodySection.style.display = 'none'
      bodyTextarea.value = ''
    }

    // Initial URL preview
    updateSnippet(endpoint, spec, operationId)
  }

  function generateSkeleton (schema, depth) {
    if (!schema || depth > 4) return undefined
    if (schema.example !== undefined) return schema.example
    if (schema.default !== undefined) return schema.default
    if (schema.enum && schema.enum.length > 0) return schema.enum[0]

    let type = schema.type
    if (!type) {
      if (schema.properties) type = 'object'
      else if (schema.items) type = 'array'
    }

    if (type === 'object') {
      const obj = {}
      const props = schema.properties || {}
      for (const key in props) {
        if (!Object.prototype.hasOwnProperty.call(props, key)) continue
        const val = generateSkeleton(props[key], depth + 1)
        if (val !== undefined) obj[key] = val
      }
      return Object.keys(obj).length > 0 ? obj : {}
    }
    if (type === 'array') {
      const itemVal = schema.items ? generateSkeleton(schema.items, depth + 1) : null
      return itemVal !== undefined ? [itemVal] : []
    }
    if (type === 'string') {
      if (schema.format === 'date') return '2024-01-01'
      if (schema.format === 'date-time') return '2024-01-01T00:00:00Z'
      if (schema.format === 'email') return 'user@example.com'
      if (schema.format === 'uri' || schema.format === 'url') return 'https://example.com'
      if (schema.format === 'uuid') return '00000000-0000-0000-0000-000000000000'
      return ''
    }
    if (type === 'integer' || type === 'number') return 0
    if (type === 'boolean') return false
    return null
  }

  function autoFillParam (input, paramName) {
    const session = getSession()
    if (!session) return
    const lowerName = paramName.toLowerCase()
    if (lowerName === 'orgid' || lowerName === 'organizationid' || lowerName === 'org_id') {
      if (session.orgId) input.value = session.orgId
    } else if (lowerName === 'envid' || lowerName === 'environmentid' || lowerName === 'env_id') {
      if (session.envId) input.value = session.envId
    }
  }

  function buildRequestUrl (endpoint, spec, operationId, mark) {
    const found = findOperation(spec, operationId)
    if (!found) return ''

    const baseUrl = getSelectedServer()

    let path = found.path
    const queryParts = []
    const inputs = endpoint.querySelectorAll('.openapi-tryit-param-input')
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      const val = input.value.trim()
      if (!val) continue
      const paramIn = input.dataset.in
      const encoded = encodeURIComponent(val)
      const wrapped = mark ? PARAM_START + encoded + PARAM_END : encoded
      if (paramIn === 'path') {
        path = path.replace('{' + input.name + '}', wrapped)
      } else if (paramIn === 'query') {
        queryParts.push(encodeURIComponent(input.name) + '=' + wrapped)
      }
    }

    let url = baseUrl.replace(/\/$/, '') + path
    if (queryParts.length > 0) url += '?' + queryParts.join('&')
    return url
  }

  // Rewrite an absolute API URL to go through the nginx reverse proxy
  function proxyUrl (url) {
    return url.replace(/^https?:\/\/[^/]+/, PROXY_PREFIX)
  }

  function buildHeaders (endpoint, mark) {
    const headers = {}
    const token = getToken()
    if (token) headers.Authorization = 'Bearer ' + token

    const inputs = endpoint.querySelectorAll('.openapi-tryit-param-input')
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      if (input.dataset.in === 'header' && input.value.trim()) {
        const val = input.value.trim()
        headers[input.name] = mark ? PARAM_START + val + PARAM_END : val
      }
    }
    return headers
  }

  // ─── Request Execution ─────────────────────────────────────────────────────

  function setLoading (endpoint, loading) {
    const sendBtn = endpoint.querySelector('.openapi-tryit-send')
    const label = sendBtn.querySelector('.openapi-tryit-send-label')
    const spinner = sendBtn.querySelector('.openapi-tryit-send-spinner')
    sendBtn.disabled = loading
    label.textContent = loading ? 'Sending…' : 'Send Request'
    spinner.style.display = loading ? '' : 'none'
  }

  function sendRequest (endpoint, spec, operationId) {
    if (!getToken()) {
      updateAuthUI()
      showLoginModal('Your session has expired. Please sign in again.')
      return
    }

    const method = (endpoint.dataset.method || 'get').toUpperCase()
    const url = proxyUrl(buildRequestUrl(endpoint, spec, operationId))
    const headers = buildHeaders(endpoint)

    const bodyTextarea = endpoint.querySelector('.openapi-tryit-body')
    const bodySection = endpoint.querySelector('.openapi-tryit-body-section')
    let body = null
    if (bodySection.style.display !== 'none' && bodyTextarea.value.trim()) {
      body = bodyTextarea.value.trim()
      headers['Content-Type'] = 'application/json'
    }

    const responseArea = endpoint.querySelector('.openapi-tryit-response')
    const statusEl = endpoint.querySelector('.openapi-tryit-response-status')
    const timeEl = endpoint.querySelector('.openapi-tryit-response-time')
    const bodyEl = endpoint.querySelector('.openapi-tryit-response-body')

    responseArea.style.display = ''
    statusEl.textContent = ''
    statusEl.className = 'openapi-tryit-response-status'
    timeEl.textContent = ''
    bodyEl.textContent = ''
    setLoading(endpoint, true)

    const startTime = Date.now()

    fetch(url, {
      method,
      headers,
      body,
    })
      .then(function (resp) {
        const elapsed = Date.now() - startTime
        timeEl.textContent = elapsed + 'ms'
        statusEl.textContent = resp.status + ' ' + resp.statusText
        statusEl.className =
          'openapi-tryit-response-status' + (resp.ok ? ' openapi-tryit-status-ok' : ' openapi-tryit-status-error')
        return resp.text()
      })
      .then(function (text) {
        try {
          bodyEl.textContent = JSON.stringify(JSON.parse(text), null, 2)
        } catch (_) {
          bodyEl.textContent = text
        }
      })
      .catch(function (err) {
        const elapsed = Date.now() - startTime
        timeEl.textContent = elapsed + 'ms'
        statusEl.textContent = 'Error'
        statusEl.className = 'openapi-tryit-response-status openapi-tryit-status-error'
        if (err.message && err.message.indexOf('Failed to fetch') !== -1) {
          bodyEl.textContent =
            'Request failed — this is likely a CORS error.\n' +
            'The API server does not allow requests from this origin.\n\n' +
            'Use the cURL button to copy this request and run it from your terminal.'
        } else {
          bodyEl.textContent = err.message || 'Request failed'
        }
      })
      .finally(function () {
        setLoading(endpoint, false)
      })
  }

  // ─── Code Snippet Generation ────────────────────────────────────────────────

  function getRequestParts (endpoint, spec, operationId, mark) {
    const method = (endpoint.dataset.method || 'get').toUpperCase()
    const url = buildRequestUrl(endpoint, spec, operationId, mark)
    const headers = buildHeaders(endpoint, mark)
    const bodyTextarea = endpoint.querySelector('.openapi-tryit-body')
    const bodySection = endpoint.querySelector('.openapi-tryit-body-section')
    let body = null
    if (bodySection.style.display !== 'none' && bodyTextarea.value.trim()) {
      body = bodyTextarea.value.trim()
      headers['Content-Type'] = 'application/json'
    }
    return { method, url, headers, body }
  }

  function generateCurl (r) {
    const parts = ['curl -X ' + r.method + " '" + r.url + "'"]
    for (const key in r.headers) {
      if (Object.prototype.hasOwnProperty.call(r.headers, key)) {
        parts.push("  -H '" + key + ': ' + r.headers[key] + "'")
      }
    }
    if (r.body) {
      parts.push("  -d '" + r.body.replace(/'/g, "'\\''") + "'")
    }
    return parts.join(' \\\n')
  }

  function generatePython (r) {
    const lines = ['import requests', '']
    const headerEntries = Object.keys(r.headers)
    if (headerEntries.length > 0) {
      lines.push('headers = {')
      for (const key of headerEntries) {
        lines.push('    "' + key + '": "' + r.headers[key] + '",')
      }
      lines.push('}')
      lines.push('')
    }
    if (r.body) {
      lines.push('payload = ' + r.body)
      lines.push('')
    }
    const args = ['"' + r.url + '"']
    if (headerEntries.length > 0) args.push('headers=headers')
    if (r.body) args.push('json=payload')
    lines.push('response = requests.' + r.method.toLowerCase() + '(')
    lines.push('    ' + args.join(',\n    '))
    lines.push(')')
    lines.push('')
    lines.push('print(response.status_code)')
    lines.push('print(response.json())')
    return lines.join('\n')
  }

  function generateJavascript (r) {
    const lines = []
    const opts = ['  method: "' + r.method + '"']
    if (Object.keys(r.headers).length > 0) {
      opts.push('  headers: {')
      for (const key in r.headers) {
        if (Object.prototype.hasOwnProperty.call(r.headers, key)) {
          opts.push('    "' + key + '": "' + r.headers[key] + '",')
        }
      }
      opts.push('  }')
    }
    if (r.body) {
      opts.push('  body: JSON.stringify(' + r.body + ')')
    }
    lines.push('const response = await fetch("' + r.url + '", {')
    lines.push(opts.join(',\n'))
    lines.push('});')
    lines.push('')
    lines.push('const data = await response.json();')
    lines.push('console.log(data);')
    return lines.join('\n')
  }

  function generateJava (r) {
    const lines = ['HttpClient client = HttpClient.newHttpClient();', '']
    const builderLines = ['HttpRequest request = HttpRequest.newBuilder()']
    builderLines.push('    .uri(URI.create("' + r.url + '"))')
    for (const key in r.headers) {
      if (Object.prototype.hasOwnProperty.call(r.headers, key)) {
        builderLines.push('    .header("' + key + '", "' + r.headers[key] + '")')
      }
    }
    if (r.body) {
      const escaped = r.body.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
      builderLines.push('    .method("' + r.method + '", HttpRequest.BodyPublishers.ofString("' + escaped + '"))')
    } else {
      if (r.method === 'GET') {
        builderLines.push('    .GET()')
      } else if (r.method === 'DELETE') {
        builderLines.push('    .DELETE()')
      } else {
        builderLines.push('    .method("' + r.method + '", HttpRequest.BodyPublishers.noBody())')
      }
    }
    builderLines.push('    .build();')
    lines.push(builderLines.join('\n'))
    lines.push('')
    lines.push('HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());')
    lines.push('System.out.println(response.statusCode());')
    lines.push('System.out.println(response.body());')
    return lines.join('\n')
  }

  function generateGo (r) {
    const lines = []
    if (r.body) {
      const escaped = r.body.replace(/\\/g, '\\\\').replace(/`/g, '` + "`" + `')
      lines.push('body := strings.NewReader(`' + escaped + '`)')
      lines.push('req, err := http.NewRequest("' + r.method + '", "' + r.url + '", body)')
    } else {
      lines.push('req, err := http.NewRequest("' + r.method + '", "' + r.url + '", nil)')
    }
    lines.push('if err != nil {')
    lines.push('    log.Fatal(err)')
    lines.push('}')
    for (const key in r.headers) {
      if (Object.prototype.hasOwnProperty.call(r.headers, key)) {
        lines.push('req.Header.Set("' + key + '", "' + r.headers[key] + '")')
      }
    }
    lines.push('')
    lines.push('resp, err := http.DefaultClient.Do(req)')
    lines.push('if err != nil {')
    lines.push('    log.Fatal(err)')
    lines.push('}')
    lines.push('defer resp.Body.Close()')
    lines.push('')
    lines.push('fmt.Println(resp.StatusCode)')
    return lines.join('\n')
  }

  function generatePhp (r) {
    const lines = ['$ch = curl_init();', '']
    lines.push('curl_setopt($ch, CURLOPT_URL, "' + r.url + '");')
    lines.push('curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);')
    lines.push('curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "' + r.method + '");')
    const headerList = []
    for (const key in r.headers) {
      if (Object.prototype.hasOwnProperty.call(r.headers, key)) {
        headerList.push('"' + key + ': ' + r.headers[key] + '"')
      }
    }
    if (headerList.length > 0) {
      lines.push('curl_setopt($ch, CURLOPT_HTTPHEADER, [')
      lines.push('    ' + headerList.join(',\n    '))
      lines.push(']);')
    }
    if (r.body) {
      const escaped = r.body.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      lines.push("curl_setopt($ch, CURLOPT_POSTFIELDS, '" + escaped + "');")
    }
    lines.push('')
    lines.push('$response = curl_exec($ch);')
    lines.push('curl_close($ch);')
    lines.push('')
    lines.push('echo $response;')
    return lines.join('\n')
  }

  const GENERATORS = {
    curl: generateCurl,
    python: generatePython,
    javascript: generateJavascript,
    java: generateJava,
    go: generateGo,
    php: generatePhp,
  }

  function copyToClipboard (text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      return
    }
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  // ─── Example Copy Buttons ─────────────────────────────────────────────────

  function initExampleCopyButtons () {
    const buttons = document.querySelectorAll('.openapi-example-copy')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        const details = this.closest('.openapi-example-details')
        const code = details && details.querySelector('pre code')
        if (!code) return
        copyToClipboard(code.textContent)
        const btn = this
        btn.textContent = 'Copied!'
        btn.classList.add('is-copied')
        setTimeout(function () {
          btn.textContent = 'Copy'
          btn.classList.remove('is-copied')
        }, 1500)
      })
    }
  }

  // ─── Schema Tooltips ───────────────────────────────────────────────────────

  function initSchemaTooltips () {
    const refs = document.querySelectorAll('.openapi-schema-ref')
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i]
      const tooltip = ref.querySelector('.openapi-schema-tooltip')
      if (!tooltip) continue

      ref.addEventListener('mouseenter', function () {
        const rect = ref.getBoundingClientRect()
        let top = rect.bottom + 4
        let left = rect.left

        if (top + tooltip.offsetHeight > window.innerHeight) {
          top = rect.top - tooltip.offsetHeight - 4
        }
        if (left + 480 > window.innerWidth) {
          left = window.innerWidth - 490
        }
        if (left < 0) left = 4

        tooltip.style.top = top + 'px'
        tooltip.style.left = left + 'px'
        tooltip.classList.add('is-visible')
      })

      ref.addEventListener('mouseleave', function () {
        tooltip.classList.remove('is-visible')
      })
    }
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  function init () {
    const spec = getSpec()
    if (!spec) return

    initAuth()
    initSchemaTooltips()
    initExampleCopyButtons()
    populateServerSelect(spec)

    const endpoints = document.querySelectorAll('.openapi-endpoint')
    for (let i = 0; i < endpoints.length; i++) {
      ;(function (endpoint) {
        const operationId = endpoint.dataset.operationId
        if (!operationId) return

        const panel = endpoint.querySelector('.openapi-tryit-panel')
        if (!panel) return

        populatePanel(endpoint, spec, operationId)

        // Update snippet when server changes
        const serverSelect = document.getElementById('openapi-sidebar-server-select')
        if (serverSelect) {
          serverSelect.addEventListener('change', function () {
            updateSnippet(endpoint, spec, operationId)
          })
        }

        // Update snippet when body changes
        const bodyTextarea = endpoint.querySelector('.openapi-tryit-body')
        if (bodyTextarea) {
          bodyTextarea.addEventListener('input', function () {
            updateSnippet(endpoint, spec, operationId)
          })
        }

        const sendBtn = endpoint.querySelector('.openapi-tryit-send')
        sendBtn.addEventListener('click', function () {
          sendRequest(endpoint, spec, operationId)
        })

        // Snippet language tabs
        endpoint.dataset.snippetLang = 'curl'
        const tabs = endpoint.querySelectorAll('.openapi-tryit-snippet-tab')
        for (let t = 0; t < tabs.length; t++) {
          tabs[t].addEventListener('click', function () {
            for (let s = 0; s < tabs.length; s++) {
              tabs[s].classList.remove('is-active')
              tabs[s].setAttribute('aria-selected', 'false')
            }
            this.classList.add('is-active')
            this.setAttribute('aria-selected', 'true')
            endpoint.dataset.snippetLang = this.dataset.lang
            updateSnippet(endpoint, spec, operationId)
          })
        }

        // Copy snippet button
        const snippetCopyBtn = endpoint.querySelector('.openapi-tryit-snippet-copy')
        if (snippetCopyBtn) {
          snippetCopyBtn.addEventListener('click', function () {
            const codeEl = endpoint.querySelector('.openapi-tryit-snippet-code code')
            if (!codeEl) return
            copyToClipboard(codeEl.textContent)
            const label = snippetCopyBtn.querySelector('.openapi-tryit-snippet-copy-label')
            label.textContent = 'Copied!'
            snippetCopyBtn.classList.add('is-copied')
            setTimeout(function () {
              label.textContent = 'Copy'
              snippetCopyBtn.classList.remove('is-copied')
            }, 1500)
          })
        }
      })(endpoints[i])
    }

    // Universal snippet theme toggle (persisted via localStorage)
    applySnippetTheme()
    const themeBtns = document.querySelectorAll('.openapi-tryit-snippet-theme')
    for (let t = 0; t < themeBtns.length; t++) {
      themeBtns[t].addEventListener('click', function () {
        const isLight = getSnippetTheme() !== 'light'
        try {
          localStorage.setItem('openapi-snippet-theme', isLight ? 'light' : 'dark')
        } catch (e) {
          /* noop */
        }
        applySnippetTheme()
      })
    }
  }

  function getSnippetTheme () {
    try {
      return localStorage.getItem('openapi-snippet-theme') || 'dark'
    } catch (e) {
      return 'dark'
    }
  }

  function applySnippetTheme () {
    const isLight = getSnippetTheme() === 'light'
    const panels = document.querySelectorAll('.openapi-tryit-panel')
    const themeBtns = document.querySelectorAll('.openapi-tryit-snippet-theme')
    for (let i = 0; i < panels.length; i++) {
      if (isLight) {
        panels[i].classList.add('is-light')
      } else {
        panels[i].classList.remove('is-light')
      }
    }
    for (let j = 0; j < themeBtns.length; j++) {
      const darkIcon = themeBtns[j].querySelector('.openapi-tryit-snippet-theme-dark')
      const lightIcon = themeBtns[j].querySelector('.openapi-tryit-snippet-theme-light')
      if (darkIcon) darkIcon.style.display = isLight ? 'none' : ''
      if (lightIcon) lightIcon.style.display = isLight ? '' : 'none'
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
