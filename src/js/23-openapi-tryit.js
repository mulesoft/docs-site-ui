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

  function updateUrlPreview (endpoint, spec, operationId) {
    const urlEl = endpoint.querySelector('.openapi-tryit-url-path')
    if (!urlEl) return
    const url = buildRequestUrl(endpoint, spec, operationId)
    urlEl.textContent = url
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
        updateUrlPreview(endpoint, spec, operationId)
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
        })
      }
    } else {
      bodySection.style.display = 'none'
      bodyTextarea.value = ''
    }

    // Initial URL preview
    updateUrlPreview(endpoint, spec, operationId)
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

  function buildRequestUrl (endpoint, spec, operationId) {
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
      if (paramIn === 'path') {
        path = path.replace('{' + input.name + '}', encodeURIComponent(val))
      } else if (paramIn === 'query') {
        queryParts.push(encodeURIComponent(input.name) + '=' + encodeURIComponent(val))
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

  function buildHeaders (endpoint) {
    const headers = {}
    const token = getToken()
    if (token) headers.Authorization = 'Bearer ' + token

    const inputs = endpoint.querySelectorAll('.openapi-tryit-param-input')
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      if (input.dataset.in === 'header' && input.value.trim()) {
        headers[input.name] = input.value.trim()
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

  function getRequestParts (endpoint, spec, operationId) {
    const method = (endpoint.dataset.method || 'get').toUpperCase()
    const url = buildRequestUrl(endpoint, spec, operationId)
    const headers = buildHeaders(endpoint)
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

  const LANG_LABELS = {
    curl: 'cURL',
    python: 'Python',
    javascript: 'JavaScript',
    java: 'Java',
    go: 'Go',
    php: 'PHP',
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
    populateServerSelect(spec)

    const endpoints = document.querySelectorAll('.openapi-endpoint')
    for (let i = 0; i < endpoints.length; i++) {
      ;(function (endpoint) {
        const operationId = endpoint.dataset.operationId
        if (!operationId) return

        const panel = endpoint.querySelector('.openapi-tryit-panel')
        if (!panel) return

        populatePanel(endpoint, spec, operationId)

        // Update URL preview when server changes
        const serverSelect = document.getElementById('openapi-sidebar-server-select')
        if (serverSelect) {
          serverSelect.addEventListener('change', function () {
            updateUrlPreview(endpoint, spec, operationId)
          })
        }

        const sendBtn = endpoint.querySelector('.openapi-tryit-send')
        sendBtn.addEventListener('click', function () {
          sendRequest(endpoint, spec, operationId)
        })

        // Copy snippet group
        const copyGroup = endpoint.querySelector('.openapi-tryit-copy-group')
        const copyBtn = copyGroup.querySelector('.openapi-tryit-copy-btn')
        const copyToggle = copyGroup.querySelector('.openapi-tryit-copy-toggle')
        const copyMenu = copyGroup.querySelector('.openapi-tryit-copy-menu')
        const copyLabel = copyGroup.querySelector('.openapi-tryit-copy-label')
        let currentLang = 'curl'

        function doCopy () {
          const r = getRequestParts(endpoint, spec, operationId)
          const snippet = GENERATORS[currentLang](r)
          copyToClipboard(snippet)
          const origText = copyLabel.textContent
          copyLabel.textContent = 'Copied!'
          copyBtn.classList.add('is-copied')
          setTimeout(function () {
            copyLabel.textContent = origText
            copyBtn.classList.remove('is-copied')
          }, 1500)
        }

        copyBtn.addEventListener('click', doCopy)

        copyToggle.addEventListener('click', function () {
          const open = copyMenu.style.display !== 'none'
          copyMenu.style.display = open ? 'none' : ''
          copyToggle.setAttribute('aria-expanded', String(!open))
        })

        copyMenu.addEventListener('click', function (e) {
          const option = e.target.closest('.openapi-tryit-copy-option')
          if (!option) return
          currentLang = option.dataset.lang
          copyLabel.textContent = LANG_LABELS[currentLang]
          copyMenu.style.display = 'none'
          copyToggle.setAttribute('aria-expanded', 'false')
          doCopy()
        })

        // Close menu on outside click
        document.addEventListener('click', function (e) {
          if (!copyGroup.contains(e.target)) {
            copyMenu.style.display = 'none'
            copyToggle.setAttribute('aria-expanded', 'false')
          }
        })
      })(endpoints[i])
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
