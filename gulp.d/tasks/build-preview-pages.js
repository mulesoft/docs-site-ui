'use strict'

const asciidoctor = require('asciidoctor')()
const fs = require('fs-extra')
const handlebars = require('handlebars')
const { inspect } = require('util')
const { obj: map } = require('through2')
const merge = require('merge-stream')
const ospath = require('path')
const { parse } = require('node-html-parser')
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

module.exports =
  (src, previewSrc, previewDest, sink = () => map(), layouts = {}) =>
    () =>
      Promise.all([
        loadSampleUiModel(previewSrc),
        toPromise(
          merge(
            compileLayouts(src, layouts),
            registerHelpers(src),
            registerPartials(src),
            copyImages(previewSrc, previewDest)
          )
        ),
      ]).then(([baseUiModel]) =>
        merge(
          vfs
            .src('**/*.adoc', {
              base: previewSrc,
              cwd: previewSrc,
            })
            .pipe(
              map((file, enc, next) => {
                const siteRootPath = path.relative(ospath.dirname(file.path), ospath.resolve(previewSrc))
                const uiModel = { ...baseUiModel }
                delete uiModel.nav
                uiModel.siteRootPath = siteRootPath
                uiModel.uiRootPath = path.join(siteRootPath, '_')
                if (file.stem === '404') {
                  uiModel.page = {
                    layout: '404',
                    title: 'Page Not Found',
                  }
                } else {
                  const pageModel = (uiModel.page = {
                    ...uiModel.page,
                  })
                  const doc = asciidoctor.load(file.contents, {
                    safe: 'safe',
                    attributes: ASCIIDOC_ATTRIBUTES,
                  })
                  const attributes = doc.getAttributes()
                  pageModel.layout = doc.getAttribute('page-layout', 'default')
                  pageModel.title = doc.getDocumentTitle()
                  pageModel.url = '/' + file.relative.slice(0, -5) + '.html'
                  if (file.stem === 'home') {
                    pageModel.home = true
                  }
                  const componentName = doc.getAttribute('page-component-name', pageModel.src.component)
                  const versionString = doc.getAttribute(
                    'page-version',
                    doc.hasAttribute('page-component-name') ? undefined : pageModel.src.version
                  )
                  let componentVersion
                  if (componentName) {
                    const component = (pageModel.component = uiModel.site.components[componentName])
                    componentVersion = pageModel.componentVersion = versionString
                      ? component.versions.find(({ version }) => version === versionString)
                      : component.latest
                  } else {
                    const component = (pageModel.component = Object.values(uiModel.site.components)[0])
                    componentVersion = pageModel.componentVersion = component.latest
                  }
                  pageModel.module = 'ROOT'
                  pageModel.version = componentVersion.version
                  pageModel.displayVersion = componentVersion.displayVersion
                  pageModel.editUrl = pageModel.origin.editUrlPattern.replace('%s', file.relative)
                  pageModel.breadcrumbs = [
                    {
                      content: pageModel.title,
                      url: pageModel.url,
                      urlType: 'internal',
                    },
                  ]
                  /* eslint-disable max-len */
                  pageModel.versions = pageModel.component.versions.map(({ version, displayVersion, url }, idx, arr) => {
                  /* eslint-enable max-len */
                    const pageVersion = {
                      version,
                      displayVersion: displayVersion || version,
                      url,
                    }
                    if (!idx) {
                      pageVersion.latest = true
                    } else if (idx === arr.length - 1) {
                      delete pageVersion.url
                      pageVersion.missing = true
                    }
                    return pageVersion
                  })
                  pageModel.attributes = Object.entries({
                    ...attributes,
                    ...componentVersion.asciidoc.attributes,
                  })
                    .filter(([name, val]) => name.startsWith('page-'))
                    .reduce(
                      (accum, [name, val]) => ({
                        ...accum,
                        [name.substr(5)]: val,
                      }),
                      {}
                    )
                  pageModel.contents = Buffer.from(doc.convert())
                  if (doc.isAttribute('page-fragmentize')) {
                    pageModel.contents = fragmentize(pageModel.contents)
                  }
                }
                file.extname = '.html'
                file.contents = Buffer.from(layouts[uiModel.page.layout](uiModel))
                next(null, file)
              })
            ),
          vfs
          // TODO remove need for empty file
            .src('site-navigation-data.js', {
              base: previewSrc,
              cwd: previewSrc,
            })
            .pipe(
              map((file, enc, next) => {
                const navigationData = Object.values(baseUiModel.site.components).map(({ name, title, versions }) => ({
                  name,
                  title,
                  versions: versions.map(({ version, displayVersion, navigation: sets = [] }) =>
                    version === displayVersion ? { version, sets } : { version, displayVersion, sets }
                  ),
                }))
                const navigationSubcomponents = baseUiModel.nav.subcomponents
                const navigationGroups = baseUiModel.nav.groups
                const navigationDataSource =
                'siteNavigationData = ' +
                inspect(navigationData, {
                  depth: null,
                  maxArrayLength: null,
                  breakLength: 250,
                }) +
                '\n' +
                'siteNavigationData.subcomponents = ' +
                inspect(navigationSubcomponents, {
                  depth: null,
                  maxArrayLength: null,
                  breakLength: 250,
                }) +
                '\n' +
                'siteNavigationData.groups = ' +
                inspect(navigationGroups, {
                  depth: null,
                  maxArrayLength: null,
                  breakLength: 250,
                }) +
                '\n' +
                'siteNavigationData.homeUrl = "' +
                baseUiModel.site.homeUrl +
                '"'
                file.contents = Buffer.from(navigationDataSource)
                next(null, file)
              })
            )
        )
          .pipe(vfs.dest(previewDest))
          .pipe(sink())
      )

function loadSampleUiModel (src) {
  return fs.readFile(ospath.join(src, 'ui-model.yml'), 'utf8').then((contents) => {
    const uiModel = yaml.load(contents)
    uiModel.env = process.env
    Object.entries(uiModel.site.components).forEach(([name, component]) => {
      component.name = name
      if (!component.versions) {
        component.versions = [(component.latest = { url: '#' })]
      }
      component.versions.forEach((version) => {
        Object.defineProperty(version, 'name', {
          value: component.name,
          enumerable: true,
        })
        if (!('displayVersion' in version)) {
          version.displayVersion = version.version
        }
        if (!('asciidoc' in version)) {
          version.asciidoc = { attributes: {} }
        }
      })
      Object.defineProperties(component, {
        asciidoc: {
          get () {
            return this.latest.asciidoc
          },
        },
        title: {
          get () {
            return this.latest.title
          },
        },
        url: {
          get () {
            return this.latest.url
          },
        },
      })
    })
    return uiModel
  })
}

function registerPartials (src) {
  return vfs.src('partials/**/*.hbs', { base: src, cwd: src }).pipe(
    map((file, enc, next) => {
      handlebars.registerPartial(file.stem, file.contents.toString())
      next()
    })
  )
}

function registerHelpers (src) {
  handlebars.registerHelper('relativize', relativize)
  handlebars.registerHelper('resolvePage', resolvePage)
  handlebars.registerHelper('resolvePageURL', resolvePageURL)
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

function relativize (url) {
  return url ? (url.charAt() === '#' ? url : url.slice(1)) : '#'
}

function resolvePage (spec, context = {}) {
  if (spec) return { pub: { url: resolvePageURL(spec) } }
}

function resolvePageURL (spec, context = {}) {
  if (spec) {
    return '/' + spec.slice(0, spec.lastIndexOf('.')) + '.html'
  }
}

function toPromise (stream) {
  return new Promise((resolve, reject) => stream.on('error', reject).on('finish', resolve))
}

function fragmentize (contents) {
  const HEADING_TAGS = {
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
  }
  return parse(`<div>${contents.toString()}</div>`)
    .querySelectorAll('[id]')
    .reduce((accum, el) => {
      const { id, parentNode, rawTagName } = el
      if (
        HEADING_TAGS[rawTagName] &&
        parentNode &&
        !el.classList.contains('discrete') &&
        parentNode.classList.contains('sect' + String.fromCharCode(rawTagName.charCodeAt(1) - 1))
      ) {
        el = parentNode
      }
      accum[id] = el.outerHTML
      return accum
    }, {})
}
