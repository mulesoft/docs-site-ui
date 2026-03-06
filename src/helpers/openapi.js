'use strict'

const yaml = require('js-yaml')

/**
 * OpenAPI 3.0 helper — fetches an OpenAPI YAML spec from Antora attachments,
 * resolves $ref pointers, and returns a template-friendly data structure with
 * pre-rendered HTML for deeply nested schemas.
 *
 * Usage in a Handlebars template:
 *   {{#with (openapi)}} ... {{/with}}         — returns spec data for the current page
 *   {{#each (openapi 'list')}} ... {{/each}}  — returns a sorted list of all API pages
 *
 * The current page must have (for single-spec mode):
 *   :page-openapi-spec: my-api.json   (file in the module's _attachments/)
 */

// ─── $ref resolution ────────────────────────────────────────────────────────

function resolveRef (ref, root) {
  if (!ref || !ref.startsWith('#/')) return undefined
  const parts = ref.replace(/^#\//, '').split('/')
  let node = root
  for (const p of parts) {
    node = node[decodeURIComponent(p.replace(/~1/g, '/').replace(/~0/g, '~'))]
    if (node === undefined) return undefined
  }
  return node
}

function resolveAllRefs (obj, root, seen) {
  if (!obj || typeof obj !== 'object') return obj
  seen = seen || new Set()
  if (seen.has(obj)) return obj
  seen.add(obj)

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveAllRefs(item, root, seen))
  }

  if (obj.$ref) {
    const resolved = resolveRef(obj.$ref, root)
    if (resolved) {
      const merged = Object.assign({}, resolved, obj)
      delete merged.$ref
      // Preserve the schema name from $ref for linking (e.g. #/components/schemas/Foo → "Foo")
      const refMatch = obj.$ref.match(/^#\/components\/schemas\/(.+)$/)
      if (refMatch) merged._schemaName = decodeURIComponent(refMatch[1])
      return resolveAllRefs(merged, root, seen)
    }
  }

  const result = {}
  for (const key of Object.keys(obj)) {
    result[key] = resolveAllRefs(obj[key], root, seen)
  }
  return result
}

// ─── Schema → HTML rendering ───────────────────────────────────────────────

function escapeHtml (str) {
  if (!str) return ''
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function typeLabel (schema) {
  if (!schema) return 'any'
  if (schema._schemaName) return schema._schemaName
  if (schema.type === 'array' && schema.items) {
    return typeLabel(schema.items) + '[]'
  }
  if (schema.oneOf) return 'oneOf'
  if (schema.anyOf) return 'anyOf'
  if (schema.allOf) return 'object'
  if (schema.enum) return (schema.type || 'string') + ' (enum)'
  return schema.type || 'any'
}

function renderSchemaTooltip (schema, depth) {
  const saved = schema._schemaName
  delete schema._schemaName
  const html = renderSchemaHtml(schema, depth || 1)
  schema._schemaName = saved
  return html
}

function schemaTypeHtml (schema, label) {
  label = label || typeLabel(schema)
  if (schema && schema._schemaName) {
    return (
      '<span class="openapi-schema-ref">' +
      '<span class="openapi-schema-link">' +
      escapeHtml(label) +
      '</span>' +
      '<div class="openapi-schema-tooltip">' +
      '<div class="openapi-schema-tooltip-header">' + escapeHtml(schema._schemaName) + '</div>' +
      renderSchemaTooltip(schema) +
      '</div>' +
      '</span>'
    )
  }
  return '<span class="openapi-type">' + escapeHtml(label) + '</span>'
}

function renderSchemaHtml (schema, depth) {
  if (!schema) return '<span class="openapi-type">any</span>'
  depth = depth || 0
  if (depth > 8) return '<span class="openapi-type">…</span>'

  // If this schema is a named $ref, render as a link instead of expanding inline
  if (schema._schemaName && depth > 0) {
    return schemaTypeHtml(schema)
  }

  const parts = []

  // Combination keywords
  if (schema.oneOf || schema.anyOf) {
    const keyword = schema.oneOf ? 'oneOf' : 'anyOf'
    const variants = schema.oneOf || schema.anyOf
    parts.push('<div class="openapi-schema-combo">')
    parts.push('<span class="openapi-type">' + keyword + '</span>')
    for (const variant of variants) {
      parts.push('<div class="openapi-schema-variant">')
      parts.push(renderSchemaHtml(variant, depth + 1))
      parts.push('</div>')
    }
    parts.push('</div>')
    return parts.join('')
  }

  if (schema.allOf) {
    const merged = mergeAllOf(schema.allOf)
    return renderSchemaHtml(merged, depth)
  }

  // Array
  if (schema.type === 'array' && schema.items) {
    parts.push('<span class="openapi-type">array</span> of ')
    if (schema.items._schemaName) {
      parts.push(schemaTypeHtml(schema.items))
    } else {
      parts.push(renderSchemaHtml(schema.items, depth + 1))
    }
    return parts.join('')
  }

  // Object
  if (schema.type === 'object' || schema.properties) {
    parts.push('<div class="openapi-schema-object">')
    parts.push('<span class="openapi-type">object</span>')
    if (schema.description) {
      parts.push('<div class="openapi-schema-description">' + escapeHtml(schema.description) + '</div>')
    }
    const props = schema.properties || {}
    const required = schema.required || []
    const propNames = Object.keys(props)
    if (propNames.length > 0) {
      parts.push('<div class="openapi-schema-properties">')
      for (const name of propNames) {
        const prop = props[name]
        const isRequired = required.includes(name)
        parts.push('<div class="openapi-schema-property">')
        parts.push('<span class="openapi-property-name">' + escapeHtml(name) + '</span>')
        parts.push(
          '<span class="openapi-property-type">' +
            (prop._schemaName
              ? schemaTypeHtml(prop)
              : escapeHtml(typeLabel(prop))) +
            '</span>'
        )
        if (isRequired) {
          parts.push('<span class="openapi-required">required</span>')
        }
        if (prop.description) {
          parts.push('<div class="openapi-property-description">' + escapeHtml(prop.description) + '</div>')
        }
        if (prop.enum) {
          const enumValues = prop.enum.map(escapeHtml).join('</code>, <code>')
          parts.push('<div class="openapi-property-enum">Enum: <code>' + enumValues + '</code></div>')
        }
        // Recurse for nested object/array (skip if already rendered as a tooltip via _schemaName)
        if (!prop._schemaName) {
          if ((prop.type === 'object' || prop.properties) && depth < 8) {
            parts.push(renderSchemaHtml(prop, depth + 1))
          }
          const isNestedArray =
            prop.type === 'array' && prop.items && (prop.items.type === 'object' || prop.items.properties) && depth < 8
          if (isNestedArray) {
            parts.push('<div class="openapi-schema-array-items">Items: ')
            parts.push(renderSchemaHtml(prop.items, depth + 1))
            parts.push('</div>')
          }
        }
        parts.push('</div>')
      }
      parts.push('</div>')
    }
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      parts.push('<div class="openapi-schema-additional">Additional properties: ')
      parts.push(renderSchemaHtml(schema.additionalProperties, depth + 1))
      parts.push('</div>')
    }
    parts.push('</div>')
    return parts.join('')
  }

  // Primitive
  let html = '<span class="openapi-type">' + escapeHtml(typeLabel(schema)) + '</span>'
  if (schema.format) {
    html += ' <span class="openapi-format">(' + escapeHtml(schema.format) + ')</span>'
  }
  if (schema.description) {
    html += '<div class="openapi-schema-description">' + escapeHtml(schema.description) + '</div>'
  }
  if (schema.enum) {
    const enumValues = schema.enum.map(escapeHtml).join('</code>, <code>')
    html += '<div class="openapi-property-enum">Enum: <code>' + enumValues + '</code></div>'
  }
  return html
}

function mergeAllOf (allOfArray) {
  const merged = { type: 'object', properties: {}, required: [] }
  for (const sub of allOfArray) {
    if (sub.properties) Object.assign(merged.properties, sub.properties)
    if (sub.required) merged.required = merged.required.concat(sub.required)
    if (sub.description && !merged.description) merged.description = sub.description
  }
  return merged
}

// ─── Spec → template data transformation ────────────────────────────────────

function buildOperations (spec) {
  const operations = []
  const paths = spec.paths || {}
  for (const path of Object.keys(paths)) {
    const pathItem = paths[path]
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']
    for (const method of methods) {
      if (!pathItem[method]) continue
      const op = pathItem[method]
      const parameters = (pathItem.parameters || []).concat(op.parameters || []).map((param) => ({
        name: param.name,
        in: param.in,
        description: param.description || '',
        required: !!param.required,
        type: typeLabel(param.schema),
        deprecated: !!param.deprecated,
      }))

      const requestBody = buildRequestBody(op.requestBody)
      const responses = buildResponses(op.responses)
      const examples = buildExamples(op)

      // Extract API version from path prefix (e.g. /v2/... → v2, otherwise v1)
      const versionMatch = path.match(/^\/(v\d+)\//)
      const apiVersion = versionMatch ? versionMatch[1] : 'v1'

      operations.push({
        operationId: op.operationId || method + '-' + path.replace(/[^a-zA-Z0-9]/g, '-'),
        method: method.toUpperCase(),
        methodLower: method,
        path,
        summary: op.summary || '',
        description: op.description || '',
        tags: op.tags || ['default'],
        deprecated: !!op.deprecated,
        parameters,
        hasParameters: parameters.length > 0,
        requestBody,
        hasRequestBody: !!requestBody,
        responses,
        hasResponses: responses.length > 0,
        examples,
        hasExamples: examples.length > 0,
        security: op.security || null,
        apiVersion,
      })
    }
  }
  return operations
}

function buildRequestBody (reqBody) {
  if (!reqBody) return null
  const content = reqBody.content || {}
  const mediaTypes = Object.keys(content).map((mediaType) => {
    const mediaObj = content[mediaType]
    return {
      mediaType,
      schemaHtml: renderSchemaHtml(mediaObj.schema),
      example: mediaObj.example ? JSON.stringify(mediaObj.example, null, 2) : null,
    }
  })
  return {
    description: reqBody.description || '',
    required: !!reqBody.required,
    mediaTypes,
  }
}

function getStatusClass (code) {
  if (code.startsWith('2')) return 'success'
  if (code.startsWith('4')) return 'client-error'
  if (code.startsWith('5')) return 'server-error'
  return 'info'
}

function buildResponses (responses) {
  if (!responses) return []
  return Object.keys(responses).map((statusCode) => {
    const resp = responses[statusCode]
    const content = resp.content || {}
    const mediaTypes = Object.keys(content).map((mediaType) => {
      const mediaObj = content[mediaType]
      return {
        mediaType,
        schemaHtml: renderSchemaHtml(mediaObj.schema),
        example: mediaObj.example ? JSON.stringify(mediaObj.example, null, 2) : null,
      }
    })
    return {
      statusCode,
      statusClass: getStatusClass(statusCode),
      description: resp.description || '',
      mediaTypes,
      hasContent: mediaTypes.length > 0,
    }
  })
}

function buildExamples (op) {
  const examples = []
  // Collect from requestBody
  if (op.requestBody && op.requestBody.content) {
    for (const [mediaType, mediaObj] of Object.entries(op.requestBody.content)) {
      if (mediaObj.examples) {
        for (const [name, ex] of Object.entries(mediaObj.examples)) {
          examples.push({
            name,
            mediaType,
            source: 'request',
            value: typeof ex.value === 'string' ? ex.value : JSON.stringify(ex.value, null, 2),
            summary: ex.summary || '',
          })
        }
      }
    }
  }
  // Collect from responses
  if (op.responses) {
    for (const [statusCode, resp] of Object.entries(op.responses)) {
      if (resp.content) {
        for (const [mediaType, mediaObj] of Object.entries(resp.content)) {
          if (mediaObj.examples) {
            for (const [name, ex] of Object.entries(mediaObj.examples)) {
              examples.push({
                name,
                mediaType,
                source: 'response ' + statusCode,
                value: typeof ex.value === 'string' ? ex.value : JSON.stringify(ex.value, null, 2),
                summary: ex.summary || '',
              })
            }
          }
        }
      }
    }
  }
  return examples
}

function buildSecurity (spec) {
  const schemes = spec.components && spec.components.securitySchemes ? spec.components.securitySchemes : {}
  return Object.keys(schemes).map((name) => {
    const scheme = schemes[name]
    return {
      name,
      type: scheme.type || '',
      scheme: scheme.scheme || '',
      bearerFormat: scheme.bearerFormat || '',
      description: scheme.description || '',
      in: scheme.in || '',
      openIdConnectUrl: scheme.openIdConnectUrl || '',
    }
  })
}

function buildSchemas (spec) {
  const schemas = spec.components && spec.components.schemas ? spec.components.schemas : {}
  return Object.keys(schemas).map((name) => ({
    name,
    schemaHtml: renderSchemaHtml(schemas[name]),
  }))
}

function groupByTags (operations, spec) {
  const tagMap = {}
  const tagMeta = {}
  if (spec.tags) {
    for (const tag of spec.tags) {
      tagMeta[tag.name] = { description: tag.description || '' }
    }
  }

  for (const op of operations) {
    for (const tag of op.tags) {
      if (!tagMap[tag]) {
        tagMap[tag] = {
          name: tag,
          slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: tagMeta[tag] ? tagMeta[tag].description : '',
          operations: [],
        }
      }
      tagMap[tag].operations.push(op)
    }
  }

  return Object.values(tagMap)
}

function groupByVersion (operations) {
  const versionMap = {}
  for (const op of operations) {
    const ver = op.apiVersion
    if (!versionMap[ver]) {
      versionMap[ver] = { version: ver, operations: [] }
    }
    versionMap[ver].operations.push(op)
  }
  // Sort version keys naturally: v1, v2, v3, etc.
  return Object.keys(versionMap)
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''), 10) || 0
      const numB = parseInt(b.replace(/\D/g, ''), 10) || 0
      return numA - numB
    })
    .map((key) => versionMap[key])
}

// ─── Spec fetching ──────────────────────────────────────────────────────────

function fetchSpec (specFile, component, version, moduleName, contentCatalog) {
  if (!specFile) return null

  const files = contentCatalog.findBy({
    component,
    version,
    module: moduleName,
    family: 'attachment',
  })

  if (files && files.length > 0) {
    const match = files.find((f) => f.src && f.src.basename === specFile)
    if (match) {
      try {
        return yaml.load(match.contents.toString())
      } catch (e) {
        return null
      }
    }
  }

  // Fallback: try to find by stem across all attachments
  const allFiles = contentCatalog.findBy({ family: 'attachment' })
  if (allFiles) {
    const match = allFiles.find((f) => f.src && f.src.basename === specFile)
    if (match) {
      try {
        return yaml.load(match.contents.toString())
      } catch (e) {
        return null
      }
    }
  }

  return null
}

function fetchSpecForPage (page, contentCatalog) {
  const specFile = page.attributes['openapi-spec']
  if (!specFile) return null
  const component = page.component
  return fetchSpec(specFile, component.name || component, page.version, page.module || 'ROOT', contentCatalog)
}

// ─── List mode: return all API pages ────────────────────────────────────────

function listApis (contentCatalog, page, isPreview) {
  const allAttachments = contentCatalog.findBy({ family: 'attachment' })
  if (!allAttachments || !allAttachments.length) return []

  const component = page.component
  const componentName = component.name || component

  const apis = allAttachments.reduce((accum, file) => {
    if (!file.src || !file.src.basename) return accum
    const basename = file.src.basename
    if (!basename.endsWith('.yaml') && !basename.endsWith('.yml')) return accum
    let spec
    try {
      spec = yaml.load(file.contents.toString())
    } catch (_) {
      return accum
    }
    if (!spec || (!spec.openapi && !spec.swagger)) return accum

    const stem = basename.replace(/\.ya?ml$/, '')
    const title = (spec.info && spec.info.title) || stem
    const description = ((spec.info && spec.info.description) || '').replace(/\n/g, ' ')
    const version = (spec.info && spec.info.version) || ''
    const fileComponent = file.component || (file.src && file.src.component) || componentName
    const url =
      isPreview && fileComponent === componentName ? '/' + stem + '.html' : '/' + fileComponent + '/' + stem + '.html'
    const paths = spec.paths || {}
    const pathCount = Object.keys(paths).length
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']
    const endpoints = []
    for (const p of Object.keys(paths)) {
      const pathItem = paths[p]
      for (const m of methods) {
        if (!pathItem[m]) continue
        const op = pathItem[m]
        const operationId = op.operationId || m + '-' + p.replace(/[^a-zA-Z0-9]/g, '-')
        endpoints.push({
          method: m.toUpperCase(),
          path: p,
          summary: (op.summary || op.operationId || '').replace(/\n/g, ' '),
          operationId,
        })
      }
    }

    const endpointsJson = JSON.stringify(endpoints)

    accum.push({ title, description, version, url, pathCount, endpointsJson })
    return accum
  }, [])

  apis.sort((a, b) => a.title.localeCompare(b.title))
  return apis
}

// ─── Main helper ────────────────────────────────────────────────────────────

module.exports = function (...args) {
  // Support both (openapi) and (openapi 'list') calling conventions.
  // When called without positional args, Handlebars passes the options hash as the only argument.
  const options = args[args.length - 1]
  const mode = args.length > 1 ? args[0] : undefined
  const { data } = options
  const { contentCatalog, page } = data.root
  if (!contentCatalog) return null

  if (mode === 'list') return listApis(contentCatalog, page, !!data.root.preview)

  if (!page) return null
  const specFile = page.attributes && page.attributes['openapi-spec']
  if (!specFile) return null

  const rawSpec = fetchSpecForPage(page, contentCatalog)
  if (!rawSpec) return null

  // Resolve all $ref pointers
  const spec = resolveAllRefs(rawSpec, rawSpec)

  const operations = buildOperations(spec)
  const tags = groupByTags(operations, spec)
  const versionGroups = groupByVersion(operations)
  const security = buildSecurity(spec)
  const schemas = buildSchemas(spec)

  return {
    info: {
      title: (spec.info && spec.info.title) || '',
      description: (spec.info && spec.info.description) || '',
      version: (spec.info && spec.info.version) || '',
      contact: (spec.info && spec.info.contact) || null,
      license: (spec.info && spec.info.license) || null,
    },
    servers: (spec.servers || []).map((s) => ({
      url: s.url,
      description: s.description || '',
    })),
    specJson: JSON.stringify(spec),
    security,
    hasSecurity: security.length > 0,
    tags,
    hasTags: tags.length > 0,
    versionGroups,
    hasMultipleVersions: versionGroups.length > 1,
    schemas,
    hasSchemas: schemas.length > 0,
    operationCount: operations.length,
  }
}
