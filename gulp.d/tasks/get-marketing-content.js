'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const pretty = require('pretty')

module.exports = () => async () => {
  updateContent('header', 'en')
  updateContent('header', 'jp')
  updateContent('footer', 'en')
  updateContent('footer', 'jp')
}

async function updateContent (component, lang) {
  try {
    const content = await fetch(`https://www.mulesoft.com/api/${component}?language=${lang}&selector=true&selector_jp`)
    if (await isGoodStatus(content.status)) {
      const body = await content.json()
      if (await hasValidData(body)) {
        fs.writeFileSync(`src/partials/${component}/${component}-content-${lang}.hbs`, pretty(body.data))
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
