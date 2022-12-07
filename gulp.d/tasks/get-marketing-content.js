'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const pretty = require('pretty')

module.exports = () => async () => {
  updateContent('header')
  // updateContent('footer')
}

async function updateContent (component) {
  try {
    const content = await fetch(`https://www.mulesoft.com/api/${component}`)
    if (await isGoodStatus(content.status)) {
      try {
        const body = await content.json()
        if (await hasValidData(body)) {
          fs.writeFileSync(`src/partials/${component}/${component}-content.hbs`, pretty(body.data))
        }
      } catch (error) {
        console.warn(
          `mulesoft endpoint returns invalid data. Keeping old version, no action is required. Error: ${error}`
        )
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
