'use strict'

const fs = require('fs-extra')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = () => async () => {
  const h = await fetch('https://www.mulesoft.com/api/header')
  if (await isGoodStatus(h.status)) {
    const header = await h.json()
    fs.writeFileSync('src/partials/header-content.hbs', header.data)
  }
}

async function isGoodStatus (status) {
  return status >= 200 && status < 300
}
