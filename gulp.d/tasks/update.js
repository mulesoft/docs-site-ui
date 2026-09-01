'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const pretty = require('pretty')

const languages = ['en', 'jp']

module.exports = (partialsDir) => async () => {
  languages.forEach((language) => {
    updateContent(partialsDir, 'header', language)
    updateContent(partialsDir, 'footer', language)
  })
  updateContent(partialsDir, 'header', 'archive')
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
