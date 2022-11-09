'use strict'

const fs = require('fs')
const https = require('https')
const path = require('path')

const HEADER_ENDPOINT_URL = 'https://www.mulesoft.com/api/header?searchbox=false'
const HEADER_TEMPLATE_RELPATH = 'header-content.hbs'
const FOOTER_ENDPOINT_URL = 'https://www.mulesoft.com/api/footer'
const FOOTER_TEMPLATE_RELPATH = 'footer-content.hbs'
const DEPENDENCIES_ENDPOINT_URL = 'https://www.mulesoft.com/api/dependencies'

module.exports = (partialsDir) => () =>
  Promise.all([
    getHbs(HEADER_ENDPOINT_URL, path.join(partialsDir, HEADER_TEMPLATE_RELPATH)),
    getHbs(FOOTER_ENDPOINT_URL, path.join(partialsDir, FOOTER_TEMPLATE_RELPATH)),
    getDependencies(DEPENDENCIES_ENDPOINT_URL, partialsDir),
  ])

function getHbs (url, to) {
  return new Promise((resolve) =>
    https.get(url, (response) => {
      const body = []
      response.on('data', (d) => body.push(d))
      response.on('end', () => {
        fs.writeFileSync(to, JSON.parse(body.join('')).data.replace(/ ?<!--.*?-->/g, '') + '\n')
        resolve()
      })
    })
  )
}

function getDependencies (url, partialsDir) {
  return new Promise((resolve) =>
    https.get(url, (response) => {
      const body = []
      response.on('data', (d) => body.push(d))
      response.on('end', () => {
        let { scripts, styles } = JSON.parse(body.join('')).data
        scripts = scripts.reduce((accum, src) => {
          accum.push(`<script async src="${src}"></script>`)
          return accum
        }, [])
        styles = styles.reduce((accum, href) => {
          accum.push(`<link rel="stylesheet" href="${href}" type="text/css">`)
          return accum
        }, [])
        fs.writeFileSync(path.join(partialsDir, 'marketing-scripts.hbs'), scripts.join('') + '\n')
        fs.writeFileSync(path.join(partialsDir, 'marketing-styles.hbs'), styles.join('') + '\n')
        resolve()
      })
    })
  )
}
