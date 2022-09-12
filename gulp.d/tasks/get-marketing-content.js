'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = () => async () => {
  updateContent('header')
  updateContent('footer')
}

async function updateContent (component) {
  const content = await fetch(`https://www.mulesoft.com/api/${component}`)
  if (await isGoodStatus(content.status)) {
    const body = await content.json()
    if (await hasValidData(body)) {
      fs.writeFileSync(`src/partials/${component}-content.hbs`, body.data)
    }
  }
}

async function isGoodStatus (status) {
  return status >= 200 && status < 300
}

async function hasValidData (header) {
  return header.data
}
