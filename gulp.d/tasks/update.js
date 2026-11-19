'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const ospath = require('path')
const pretty = require('pretty')

const languages = ['en', 'jp']
const previewAssets = [
  [
    'c360/experience/v1/navigation',
    'https://wp.sfdcdigital.com/mulesoft/en-us/wp-json/c360/experience/v1/navigation',
  ],
  [
    'c360/experience/v2/navigation',
    'https://wp.sfdcdigital.com/mulesoft/en-us/wp-json/c360/experience/v2/navigation',
  ],
  [
    'digital/xsf/components/v1-stable/navs.js',
    'https://a.sfdcstatic.com/digital/xsf/components/v1-stable/navs.js',
  ],
  [
    'digital/one-trust/ext/v1-stable/gdpr.js',
    'https://a.sfdcstatic.com/digital/one-trust/ext/v1-stable/gdpr.js',
  ],
  [
    'digital/@sfdc-ogs/v1-stable/sdk/interactions-core.js',
    'https://a.sfdcstatic.com/digital/@sfdc-ogs/v1-stable/sdk/interactions-core.js',
  ],
  [
    'digital/@sfdc-www/clientlibs-web-components/v1-stable/page-utils.js',
    'https://a.sfdcstatic.com/digital/@sfdc-www/clientlibs-web-components/v1-stable/page-utils.js',
  ],
  [
    'digital/@sfdc-www/clientlibs-web-components/v1-stable/geo-data.js',
    'https://a.sfdcstatic.com/digital/@sfdc-www/clientlibs-web-components/v1-stable/geo-data.js',
  ],
  ['digital/iis/v1-stable/iis.min.js', 'https://c.salesforce.com/digital/iis/v1-stable/iis.min.js'],
]

module.exports = (partialsDir) => async () => {
  await Promise.all([
    ...languages.flatMap((language) => [
      updateContent(partialsDir, 'header', language),
      updateContent(partialsDir, 'footer', language),
    ]),
    updateContent(partialsDir, 'header', 'archive'),
    updatePreviewAssets(partialsDir),
  ])
}

async function updateContent (partialsDir, component, contentType) {
  try {
    const urlParams = await getUrlParams(contentType)
    const url = `https://www.mulesoft.com/api/${component}?${urlParams}&docs-site&no-helmet&promotion-banner=true`
    const content = await fetch(url, {
      headers: {
        Accept: 'application/json, text/html, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/127.0.0.1 Safari/537.36',
      },
    })
    if (await isGoodStatus(content.status)) {
      const body = await content.json()
      if (await hasValidData(body)) {
        fs.writeFileSync(`${partialsDir}/${component}/${component}-content-${contentType}.hbs`, pretty(body.data))
      }
    } else {
      console.warn(`cannot fetch content right now. Please try again later. Status: ${content.status}`)
    }
  } catch (error) {
    console.warn(`cannot fetch content right now. Please try again later. Error: ${error}`)
  }
}

async function updatePreviewAssets (partialsDir) {
  const projectRoot = ospath.resolve(partialsDir, '../..')
  await Promise.all(
    previewAssets.map(async ([relativePath, url]) => {
      try {
        const response = await fetch(url)
        if (!(await isGoodStatus(response.status))) {
          throw new Error(`HTTP ${response.status}`)
        }

        let content
        if (relativePath.endsWith('.js')) {
          content = await response.text()
          if (relativePath.endsWith('/navs.js')) {
            content = content.replaceAll(
              'https://a.sfdcstatic.com/digital/one-trust/ext/v1-stable/gdpr.js',
              '/digital/one-trust/ext/v1-stable/gdpr.js'
            )
          }
        } else {
          const data = await response.json()
          if (relativePath.endsWith('/navigation')) stripSearchAccessToken(data)
          content = JSON.stringify(data)
        }

        const destination = ospath.join(projectRoot, 'preview-site-src', relativePath)
        await fs.ensureDir(ospath.dirname(destination))
        await fs.writeFile(destination, content)
      } catch (error) {
        console.warn(`cannot update preview asset ${relativePath}. Error: ${error}`)
      }
    })
  )
}

function stripSearchAccessToken (value) {
  if (Array.isArray(value)) {
    value.forEach(stripSearchAccessToken)
  } else if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      if (key.toLowerCase() === 'accesstoken') {
        delete value[key]
      } else {
        stripSearchAccessToken(value[key])
      }
    })
  }
}

async function getUrlParams (contentType) {
  const selectorParams = 'selector=true&selector_jp'
  return languages.includes(contentType) ? `language=${contentType}&${selectorParams}` : selectorParams
}

async function isGoodStatus (status) {
  return status >= 200 && status < 300
}

async function hasValidData (header) {
  return header.data
}
