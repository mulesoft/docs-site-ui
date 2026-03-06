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

  // ─── Auth UI ────────────────────────────────────────────────────────────────

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
    // Always start on credentials step
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

  function populatePanel (endpoint, spec, operationId) {
    const found = findOperation(spec, operationId)
    if (!found) return

    const op = found.operation
    const allParams = (found.pathParams || []).concat(op.parameters || [])

    // Auto-fill parameter inputs already rendered in the table
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
    // Strip the scheme + host, keep path and query string intact
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
    statusEl.textContent = 'Sending…'
    statusEl.className = 'openapi-tryit-response-status'
    timeEl.textContent = ''
    bodyEl.textContent = ''

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
            'Use "Copy as cURL" to run this request from your terminal instead.'
        } else {
          bodyEl.textContent = err.message || 'Request failed'
        }
      })
  }

  // ─── cURL Generation ───────────────────────────────────────────────────────

  function generateCurl (endpoint, spec, operationId) {
    const method = (endpoint.dataset.method || 'get').toUpperCase()
    const url = buildRequestUrl(endpoint, spec, operationId)
    const headers = buildHeaders(endpoint)

    const parts = ['curl -X ' + method + " '" + url + "'"]
    for (const key in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        parts.push("  -H '" + key + ': ' + headers[key] + "'")
      }
    }

    const bodyTextarea = endpoint.querySelector('.openapi-tryit-body')
    const bodySection = endpoint.querySelector('.openapi-tryit-body-section')
    if (bodySection.style.display !== 'none' && bodyTextarea.value.trim()) {
      parts.push("  -H 'Content-Type: application/json'")
      parts.push("  -d '" + bodyTextarea.value.trim().replace(/'/g, "'\\''") + "'")
    }

    return parts.join(' \\\n')
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

  // ─── Init ──────────────────────────────────────────────────────────────────

  function init () {
    const spec = getSpec()
    if (!spec) return

    initAuth()
    populateServerSelect(spec)

    // Populate all endpoint sections on load
    const endpoints = document.querySelectorAll('.openapi-endpoint')
    for (let i = 0; i < endpoints.length; i++) {
      ;(function (endpoint) {
        const operationId = endpoint.dataset.operationId
        if (!operationId) return

        const tryitInline = endpoint.querySelector('.openapi-tryit-inline')
        if (!tryitInline) return

        populatePanel(endpoint, spec, operationId)

        const sendBtn = endpoint.querySelector('.openapi-tryit-send')
        sendBtn.addEventListener('click', function () {
          sendRequest(endpoint, spec, operationId)
        })

        const curlBtn = endpoint.querySelector('.openapi-tryit-curl')
        curlBtn.addEventListener('click', function () {
          const curl = generateCurl(endpoint, spec, operationId)
          copyToClipboard(curl)
          const originalText = curlBtn.textContent
          curlBtn.textContent = 'Copied!'
          setTimeout(function () {
            curlBtn.textContent = originalText
          }, 2000)
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
