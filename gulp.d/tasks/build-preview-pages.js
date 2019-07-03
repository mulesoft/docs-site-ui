'use strict'

const asciidoctor = require('asciidoctor.js')()
const fs = require('fs-extra')
const handlebars = require('handlebars')
const { inspect } = require('util')
const { obj: map } = require('through2')
const merge = require('merge-stream')
const ospath = require('path')
const path = ospath.posix
const requireFromString = require('require-from-string')
const vfs = require('vinyl-fs')
const yaml = require('js-yaml')

const ASCIIDOC_ATTRIBUTES = {
  experimental: '',
  icons: 'font',
  sectanchors: '',
  'source-highlighter': 'highlight.js',
}

module.exports = (src, previewSrc, previewDest, sink = () => map(), layouts = {}) => () =>
  Promise.all([
    loadSampleUiModel(previewSrc),
    toPromise(
      merge(
        compileLayouts(src, layouts),
        registerPartials(src),
        registerHelpers(src),
        copyImages(previewSrc, previewDest)
      )
    ),
  ])
    .then(([baseUiModel]) => ({ ...baseUiModel, env: process.env }))
    .then((baseUiModel) =>
      merge(
        vfs.src('**/*.adoc', { base: previewSrc, cwd: previewSrc }).pipe(
          map((file, enc, next) => {
            const siteRootPath = path.relative(ospath.dirname(file.path), ospath.resolve(previewSrc))
            const uiModel = { ...baseUiModel }
            uiModel.page = { ...uiModel.page }
            uiModel.siteRootPath = siteRootPath
            uiModel.siteRootUrl = path.join(siteRootPath, 'index.html')
            uiModel.uiRootPath = path.join(siteRootPath, '_')
            if (file.stem === '404') {
              uiModel.page = { layout: '404', title: 'Page Not Found' }
            } else {
              const doc = asciidoctor.load(file.contents, { safe: 'safe', attributes: ASCIIDOC_ATTRIBUTES })
              uiModel.page.attributes = Object.entries(doc.getAttributes())
                .filter(([name, val]) => name.startsWith('page-'))
                .reduce((accum, [name, val]) => {
                  accum[name.substr(5)] = val
                  return accum
                }, {})
              uiModel.page.layout = doc.getAttribute('page-layout', 'default')
              uiModel.page.title = doc.getDocumentTitle()
              uiModel.page.contents = Buffer.from(doc.convert())
              // FIXME load a separate UI model for each page
              if (file.stem === 'home') {
                Object.assign(uiModel.page, {
                  url: '/home.html',
                  home: true,
                  version: 'master',
                  component: uiModel.site.components.general,
                  componentVersion: uiModel.site.components.general.versions[0],
                })
              }
            }
            file.extname = '.html'
            file.contents = Buffer.from(layouts[uiModel.page.layout](uiModel))
            next(null, file)
          })
        ),
        vfs
          // TODO remove need for empty file
          .src('site-navigation-data.js', { base: previewSrc, cwd: previewSrc })
          .pipe(
            map((file, enc, next) => {
              const navigationData = Object.values(baseUiModel.site.components).map(({ name, title, versions }) => ({
                name,
                title,
                versions: versions.map((v) => ({ version: v.version, sets: v.navigation })),
              }))
              const navigationDataSourceString =
                'window.siteNavigationData = ' +
                inspect(navigationData, { depth: null, maxArrayLength: null, breakLength: 250 })
              file.contents = Buffer.from(navigationDataSourceString)
              next(null, file)
            })
          )
      )
        .pipe(vfs.dest(previewDest))
        .pipe(sink())
    )

function loadSampleUiModel (src) {
  return fs.readFile(ospath.join(src, 'ui-model.yml'), 'utf8').then((contents) => yaml.safeLoad(contents))
}

function registerPartials (src) {
  return vfs.src('partials/*.hbs', { base: src, cwd: src }).pipe(
    map((file, enc, next) => {
      handlebars.registerPartial(file.stem, file.contents.toString())
      next()
    })
  )
}

function registerHelpers (src) {
  return vfs.src('helpers/*.js', { base: src, cwd: src }).pipe(
    map((file, enc, next) => {
      handlebars.registerHelper(file.stem, requireFromString(file.contents.toString()))
      next()
    })
  )
}

function compileLayouts (src, layouts) {
  return vfs.src('layouts/*.hbs', { base: src, cwd: src }).pipe(
    map((file, enc, next) => {
      layouts[file.stem] = handlebars.compile(file.contents.toString(), { preventIndent: true })
      next()
    })
  )
}

function copyImages (src, dest) {
  return vfs.src('**/*.{png,svg}', { base: src, cwd: src }).pipe(vfs.dest(dest))
}

function toPromise (stream) {
  return new Promise((resolve, reject) => stream.on('error', reject).on('finish', resolve))
}
