'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const pretty = require('pretty')

module.exports = () => async () => {
  const language = 'en'
  updateContent('header', language)
  updateContent('footer', language)
}

async function updateContent (component, language) {
  try {
    const content =
      await fetch(`https://www.mulesoft.com/api/${component}?language=${language}&selector=true&selector_jp`)
    if (await isGoodStatus(content.status)) {
      const body = await content.json()
      if (await hasValidData(body)) {
        fs.writeFileSync(`src/partials/${component}/${component}-content.hbs`, pretty(body.data))
      }
    }
  } catch (error) {
    console.warn(`cannot fetch content right now. Please try again later. Error: ${error}`)
  }
}

async function isGoodStatus (status) {
  return status >= 200 && status < 300
}

async function hasValidData (header) {
  return header.data
}
