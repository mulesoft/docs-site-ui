'use strict'

/**
 * OpenAPI 3.0 helper — fetches an OpenAPI JSON spec from Antora attachments,
 * resolves $ref pointers, and returns a template-friendly data structure with
 * pre-rendered HTML for deeply nested schemas.
 *
 * Usage in a Handlebars template:
 *   {{#with (openapi)}} ... {{/with}}
 *
 * The current page must have:
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
  if (schema.type === 'array' && schema.items) {
    return typeLabel(schema.items) + '[]'
  }
  if (schema.oneOf) return 'oneOf'
  if (schema.anyOf) return 'anyOf'
  if (schema.allOf) return 'object'
  if (schema.enum) return (schema.type || 'string') + ' (enum)'
  return schema.type || 'any'
}

function renderSchemaHtml (schema, depth) {
  if (!schema) return '<span class="openapi-type">any</span>'
  depth = depth || 0
  if (depth > 8) return '<span class="openapi-type">…</span>'

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
    parts.push(renderSchemaHtml(schema.items, depth + 1))
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
        parts.push('<span class="openapi-property-type">' + escapeHtml(typeLabel(prop)) + '</span>')
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
        // Recurse for nested object/array
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

// ─── Main helper ────────────────────────────────────────────────────────────

function fetchSpec (page, contentCatalog) {
  const specFile = page.attributes['openapi-spec']
  if (!specFile) return null

  // Build the resource ID for the attachment
  const component = page.component
  const version = page.version
  const module = page.module || 'ROOT'

  const files = contentCatalog.findBy({
    component: component.name || component,
    version,
    module,
    family: 'attachment',
  })

  if (files && files.length > 0) {
    const match = files.find((f) => f.src && f.src.basename === specFile)
    if (match) {
      try {
        return JSON.parse(match.contents.toString())
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
        return JSON.parse(match.contents.toString())
      } catch (e) {
        return null
      }
    }
  }

  return null
}

module.exports = function ({ data }) {
  const { contentCatalog, page } = data.root
  if (!contentCatalog || !page) return null

  const specFile = page.attributes && page.attributes['openapi-spec']
  if (!specFile) return null

  const rawSpec = fetchSpec(page, contentCatalog)
  if (!rawSpec) return null

  // Resolve all $ref pointers
  const spec = resolveAllRefs(rawSpec, rawSpec)

  const operations = buildOperations(spec)
  const tags = groupByTags(operations, spec)
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
    schemas,
    hasSchemas: schemas.length > 0,
    operationCount: operations.length,
  }
}
