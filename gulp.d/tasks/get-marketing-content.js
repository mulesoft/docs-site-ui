'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const pretty = require('pretty')

const languages = ['en', 'jp']

module.exports = () => async () => {
  languages.forEach((language) => {
    updateContent('header', language)
    updateContent('footer', language)
  })
  updateContent('header', 'archive')
}

async function updateContent (component, contentType) {
  try {
    const urlParams = await getUrlParams(contentType)
    const content = await fetch(`https://www.mulesoft.com/api/${component}?${urlParams}`)
    if (await isGoodStatus(content.status)) {
      const body = await content.json()
      if (await hasValidData(body)) {
        fs.writeFileSync(`src/partials/${component}/${component}-content-${contentType}.hbs`, pretty(body.data))
      }
    }
  } catch (error) {
    console.warn(`cannot fetch content right now. Please try again later. Error: ${error}`)
  }
}

async function getUrlParams (contentType) {
  if (languages.includes(contentType)) {
    return `language=${contentType}&selector=true&selector_jp`
  }
}

async function isGoodStatus (status) {
  return status >= 200 && status < 300
}

async function hasValidData (header) {
  return header.data
}
