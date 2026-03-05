;(function () {
  'use strict'

  const STORAGE_KEY = 'anypoint_session'
  const LOGIN_URL = 'https://anypoint.mulesoft.com/accounts/login'

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function getSession () {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch (_) {
      return null
    }
  }

  function setSession (data) {
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
      userEl.style.display = ''
      userEl.textContent = session.user || 'Authenticated'
    } else {
      signinBtn.style.display = ''
      signoutBtn.style.display = 'none'
      userEl.style.display = 'none'
      userEl.textContent = ''
    }
  }

  function showLoginModal () {
    const modal = document.getElementById('openapi-login-modal')
    if (modal) modal.style.display = ''
  }

  function hideLoginModal () {
    const modal = document.getElementById('openapi-login-modal')
    if (modal) modal.style.display = 'none'
    const errEl = document.getElementById('openapi-login-error')
    if (errEl) {
      errEl.style.display = 'none'
      errEl.textContent = ''
    }
  }

  function handleLogin (e) {
    e.preventDefault()
    const username = document.getElementById('openapi-login-username').value
    const password = document.getElementById('openapi-login-password').value
    const errEl = document.getElementById('openapi-login-error')
    const submitBtn = e.target.querySelector('.openapi-login-submit')

    submitBtn.disabled = true
    submitBtn.textContent = 'Signing in…'

    fetch(LOGIN_URL, {
      method: 'POST',
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
      .catch(function (err) {
        const isCors = err instanceof TypeError && /fetch|network/i.test(err.message)
        if (isCors) {
          hideLoginModal()
          const manualSection = document.getElementById('openapi-auth-manual')
          if (manualSection) manualSection.style.display = ''
          const tokenInput = document.getElementById('openapi-auth-token-input')
          if (tokenInput) {
            tokenInput.placeholder = 'CORS blocked login — paste a Bearer token here'
            tokenInput.focus()
          }
        } else {
          errEl.textContent = err.message || 'Login failed'
          errEl.style.display = ''
        }
      })
      .finally(function () {
        submitBtn.disabled = false
        submitBtn.textContent = 'Sign In'
      })
  }

  function initAuth () {
    const signinBtn = document.getElementById('openapi-auth-signin')
    const signoutBtn = document.getElementById('openapi-auth-signout')
    const toggleManualBtn = document.getElementById('openapi-auth-toggle-manual')
    const manualSection = document.getElementById('openapi-auth-manual')
    const applyTokenBtn = document.getElementById('openapi-auth-apply-token')
    const loginForm = document.getElementById('openapi-login-form')
    const cancelBtn = document.getElementById('openapi-login-cancel')
    const overlay = document.getElementById('openapi-login-overlay')

    if (!signinBtn) return

    signinBtn.addEventListener('click', showLoginModal)

    signoutBtn.addEventListener('click', function () {
      clearSession()
      updateAuthUI()
    })

    toggleManualBtn.addEventListener('click', function () {
      const isHidden = manualSection.style.display === 'none'
      manualSection.style.display = isHidden ? '' : 'none'
    })

    applyTokenBtn.addEventListener('click', function () {
      const tokenInput = document.getElementById('openapi-auth-token-input')
      const token = tokenInput.value.trim()
      if (token) {
        setSession({ accessToken: token, user: 'Manual token' })
        updateAuthUI()
        manualSection.style.display = 'none'
        tokenInput.value = ''
      }
    })

    if (loginForm) loginForm.addEventListener('submit', handleLogin)
    if (cancelBtn) cancelBtn.addEventListener('click', hideLoginModal)
    if (overlay) overlay.addEventListener('click', hideLoginModal)

    updateAuthUI()
  }

  // ─── Try It Panel ──────────────────────────────────────────────────────────

  function populatePanel (panel, spec, operationId) {
    const found = findOperation(spec, operationId)
    if (!found) return

    const op = found.operation
    const allParams = (found.pathParams || []).concat(op.parameters || [])

    // Server dropdown
    const serverSelect = panel.querySelector('.openapi-tryit-server-select')
    serverSelect.innerHTML = ''
    const servers = spec.servers || [{ url: '', description: 'No servers defined' }]
    for (let i = 0; i < servers.length; i++) {
      const opt = document.createElement('option')
      opt.value = servers[i].url
      opt.textContent = servers[i].url + (servers[i].description ? ' — ' + servers[i].description : '')
      serverSelect.appendChild(opt)
    }

    // Parameter inputs
    const paramsContainer = panel.querySelector('.openapi-tryit-params')
    paramsContainer.innerHTML = ''
    if (allParams.length > 0) {
      for (let j = 0; j < allParams.length; j++) {
        const param = allParams[j]
        const row = document.createElement('div')
        row.className = 'openapi-tryit-param-row'

        const label = document.createElement('label')
        label.textContent = param.name
        if (param.required) {
          const reqSpan = document.createElement('span')
          reqSpan.className = 'openapi-required'
          reqSpan.textContent = ' *'
          label.appendChild(reqSpan)
        }
        const sublabel = document.createElement('span')
        sublabel.className = 'openapi-tryit-param-meta'
        sublabel.textContent = ' (' + (param.in || '') + ')'
        label.appendChild(sublabel)

        const input = document.createElement('input')
        input.type = 'text'
        input.className = 'openapi-tryit-param-input'
        input.name = param.name
        input.dataset.in = param.in || ''
        input.placeholder = param.description || param.name
        if (param.schema && param.schema.default !== undefined) {
          input.value = String(param.schema.default)
        }

        // Auto-fill known param names from session
        autoFillParam(input, param.name)

        row.appendChild(label)
        row.appendChild(input)
        paramsContainer.appendChild(row)
      }
    }

    // Request body
    const bodySection = panel.querySelector('.openapi-tryit-body-section')
    const bodyTextarea = panel.querySelector('.openapi-tryit-body')
    const method = found.method.toLowerCase()
    if ((method === 'post' || method === 'put' || method === 'patch') && op.requestBody) {
      bodySection.style.display = ''
      const content = op.requestBody.content || {}
      const mediaTypes = Object.keys(content)
      const primaryMedia = mediaTypes[0] || 'application/json'
      const ctLabel = bodySection.querySelector('.openapi-tryit-content-type')
      if (ctLabel) ctLabel.textContent = '(' + primaryMedia + ')'

      const mediaObj = content[primaryMedia]
      if (mediaObj && mediaObj.example) {
        bodyTextarea.value =
          typeof mediaObj.example === 'string' ? mediaObj.example : JSON.stringify(mediaObj.example, null, 2)
      } else if (mediaObj && mediaObj.examples) {
        const firstEx = Object.values(mediaObj.examples)[0]
        if (firstEx && firstEx.value) {
          bodyTextarea.value =
            typeof firstEx.value === 'string' ? firstEx.value : JSON.stringify(firstEx.value, null, 2)
        }
      } else {
        bodyTextarea.value = ''
      }
    } else {
      bodySection.style.display = 'none'
      bodyTextarea.value = ''
    }
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

  function buildRequestUrl (panel, spec, operationId) {
    const found = findOperation(spec, operationId)
    if (!found) return ''

    const serverSelect = panel.querySelector('.openapi-tryit-server-select')
    const baseUrl = serverSelect.value || ''

    let path = found.path
    const queryParts = []
    const inputs = panel.querySelectorAll('.openapi-tryit-param-input')
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

  function buildHeaders (panel) {
    const headers = {}
    const token = getToken()
    if (token) headers.Authorization = 'Bearer ' + token

    const inputs = panel.querySelectorAll('.openapi-tryit-param-input')
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      if (input.dataset.in === 'header' && input.value.trim()) {
        headers[input.name] = input.value.trim()
      }
    }
    return headers
  }

  // ─── Request Execution ─────────────────────────────────────────────────────

  function sendRequest (panel, spec, operationId) {
    const endpoint = panel.closest('.openapi-endpoint')
    const method = (endpoint.dataset.method || 'get').toUpperCase()
    const url = buildRequestUrl(panel, spec, operationId)
    const headers = buildHeaders(panel)

    const bodyTextarea = panel.querySelector('.openapi-tryit-body')
    const bodySection = panel.querySelector('.openapi-tryit-body-section')
    let body = null
    if (bodySection.style.display !== 'none' && bodyTextarea.value.trim()) {
      body = bodyTextarea.value.trim()
      headers['Content-Type'] = 'application/json'
    }

    const responseArea = panel.querySelector('.openapi-tryit-response')
    const statusEl = panel.querySelector('.openapi-tryit-response-status')
    const timeEl = panel.querySelector('.openapi-tryit-response-time')
    const bodyEl = panel.querySelector('.openapi-tryit-response-body')

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

  function generateCurl (panel, spec, operationId) {
    const endpoint = panel.closest('.openapi-endpoint')
    const method = (endpoint.dataset.method || 'get').toUpperCase()
    const url = buildRequestUrl(panel, spec, operationId)
    const headers = buildHeaders(panel)

    const parts = ['curl -X ' + method + " '" + url + "'"]
    for (const key in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        parts.push("  -H '" + key + ': ' + headers[key] + "'")
      }
    }

    const bodyTextarea = panel.querySelector('.openapi-tryit-body')
    const bodySection = panel.querySelector('.openapi-tryit-body-section')
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

    // Populate all Try It panels on load
    const endpoints = document.querySelectorAll('.openapi-endpoint')
    for (let i = 0; i < endpoints.length; i++) {
      ;(function (endpoint) {
        const operationId = endpoint.dataset.operationId
        if (!operationId) return

        const panel = endpoint.querySelector('.openapi-tryit-panel')
        if (!panel) return

        populatePanel(panel, spec, operationId)

        // Toggle panel on small screens
        const heading = endpoint.querySelector('.openapi-tryit-heading')
        if (heading) {
          heading.addEventListener('click', function () {
            if (window.innerWidth >= 1100) return
            heading.classList.toggle('is-open')
            panel.classList.toggle('is-open')
          })
        }

        const sendBtn = panel.querySelector('.openapi-tryit-send')
        sendBtn.addEventListener('click', function () {
          sendRequest(panel, spec, operationId)
        })

        const curlBtn = panel.querySelector('.openapi-tryit-curl')
        curlBtn.addEventListener('click', function () {
          const curl = generateCurl(panel, spec, operationId)
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
