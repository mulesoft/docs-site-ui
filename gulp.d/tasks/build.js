'use strict'

const autoprefixer = require('autoprefixer')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const fs = require('fs-extra')
const { obj: map } = require('through2')
const merge = require('merge-stream')
const ospath = require('path')
const path = ospath.posix
const postcss = require('gulp-postcss')
const postcssCalc = require('postcss-calc')
const postcssCustomMedia = require('postcss-custom-media')
const postcssImport = require('postcss-import')
const postcssNesting = require('postcss-nesting')
const postcssUrl = require('postcss-url')
const postcssVar = require('postcss-custom-properties')
const replace = require('gulp-replace')
const uglify = require('gulp-terser')
const vfs = require('vinyl-fs')

module.exports = (src, dest, preview, previewSrc) => (done) => {
  const opts = { base: src, cwd: src }
  const previewOpts = { base: previewSrc, cwd: previewSrc }
  const sourcemaps = preview || process.env.SOURCEMAPS === 'true'
  const postcssPlugins = [
    postcssImport,
    postcssUrl([
      {
        filter: '**/~typeface-*/files/*',
        url: (asset) => {
          const relpath = asset.pathname.substr(1)
          const abspath = require.resolve(relpath)
          const basename = ospath.basename(abspath)
          const destpath = ospath.join(dest, 'font', basename)
          if (!fs.pathExistsSync(destpath)) {
            fs.copySync(abspath, destpath)
          }
          return path.join('..', 'font', basename)
        },
      },
    ]),
    postcssCustomMedia,
    postcssNesting,
    postcssVar({
      preserve: 'preserve-computed',
    }),
    preview ? postcssCalc : () => {},
    autoprefixer,
    preview ? () => {} : cssnano({ preset: 'default' }),
  ]

  import('gulp-imagemin')
    .then(({ default: imagemin, gifsicle, mozjpeg, optipng, svgo }) =>
      merge(
        vfs
          .src('js/+([0-9])-*.js', { ...opts, sourcemaps })
          .pipe(replace(/'includeLocMessagesAtBuildtime'/g, fs.readFileSync(`${src}/locales/messages.json`, 'utf-8')))
          .pipe(replace(/'feedbackQuestions'/g, fs.readFileSync(`${src}/locales/feedback-questions.json`, 'utf-8')))
          .pipe(replace(/'surveyIDs'/g, fs.readFileSync(`${src}/locales/survey-ids.json`, 'utf-8')))
          .pipe(uglify())
          .pipe(concat('js/site.js')),
        vfs
          .src('js/vendor/*.js', { ...opts, read: false })
          .pipe(
            // see https://gulpjs.org/recipes/browserify-multiple-destination.html
            map((file, enc, next) => {
              if (file.relative.endsWith('.bundle.js')) {
                file.contents = browserify(file.relative, {
                  basedir: src,
                  detectGlobals: false,
                })
                  .plugin('browser-pack-flat/plugin')
                  .bundle()
                file.path = file.path.slice(0, file.path.length - 10) + '.js'
                next(null, file)
              } else {
                fs.readFile(file.path, 'UTF-8').then((contents) => {
                  file.contents = Buffer.from(contents)
                  next(null, file)
                })
              }
            })
          )
          .pipe(buffer())
          .pipe(uglify()),
        vfs
          .src(
            [
              require.resolve('@popperjs/core/dist/umd/popper.min.js'),
              require.resolve('tippy.js/dist/tippy.umd.min.js'),
            ],
            opts
          )
          .pipe(
            map((file, _enc, next) => {
              file.contents = Buffer.from(file.contents.toString().replace(/\n\/\/# sourceMappingURL=.*/, ''))
              next(null, file)
            })
          )
          .pipe(concat('js/vendor/tippy.js')),
        vfs
          .src([require.resolve('@docsearch/js/dist/umd/index.js')], opts)
          .pipe(
            map((file, _enc, next) => {
              file.contents = Buffer.from(file.contents.toString().replace(/\n\/\/# sourceMappingURL=.*/, ''))
              next(null, file)
            })
          )
          .pipe(concat('js/vendor/docsearch.js')),
        vfs
          .src('css/site.css', { ...opts, sourcemaps })
          .pipe(postcss(postcssPlugins))
          .pipe(
            preview
              ? map()
              : map((file, enc, next) => {
                file.contents = Buffer.from(file.contents.toString().replace(/(\*\/|}(?!}))/g, '$1\n'))
                next(null, file)
              })
          ),
        vfs.src('font/*.{ttf,woff*(2)}', opts),
        vfs.src('c360/experience/**/navigation', previewOpts).pipe(
          map((file, enc, next) => {
            file.extname = '.js'
            file.contents = Buffer.from(
              'window.wpdata = window.wpdata || {};\n' +
                'window.wpdata.navigation = Object.assign(window.wpdata.navigation || {}, ' +
                file.contents.toString() +
                ');'
            )
            next(null, file)
          })
        ),
        vfs.src('digital/**/*', previewOpts).pipe(
          map((file, enc, next) => {
            if (file.relative === 'digital/xsf/components/v1-stable/navs.js') {
              const contents = file.contents
                .toString()
                .replaceAll(
                  'import("/digital/one-trust/ext/v1-stable/gdpr.js")',
                  'Promise.resolve(window.gdprStatic || {})'
                )
                .replaceAll(
                  '.c360-nav",n," {visibility: visible;display: block;position: fixed;top: 0;width: 100%;background-color: #fff;z-index: 20000;}',
                  '.c360-nav",n," {visibility: visible;display: block;position: fixed;top: 0;width: 100%;background-color: var(--c360-nav-c-header-background, #fff);z-index: 20000;}'
                )
                .replaceAll(
                  '.c360-nav__nav-items",n," {display: none;height: calc(100vh - var(--nav-integration-c-nav-height));height: calc((var(--vh, 1vh) * 100) - var(--nav-integration-c-nav-height));background-color: #fff;}',
                  '.c360-nav__nav-items",n," {display: none;height: calc(100vh - var(--nav-integration-c-nav-height));height: calc((var(--vh, 1vh) * 100) - var(--nav-integration-c-nav-height));background-color: var(--c360-nav-c-header-background, #fff);}'
                )
                .replaceAll(
                  '.c360-nav__nav-items-list--l1",n," {position: relative;display: flex;flex-direction: column;}',
                  '.c360-nav__nav-items-list--l1",n," {position: relative;display: flex;flex-direction: column;background-color: var(--c360-nav-c-header-background, transparent);}'
                )
                .replaceAll(
                  '.l1-button",n," {--sds-c-button-color-background: transparent;--sds-c-button-color-background-hover: transparent;--sds-c-button-color-background-active: transparent;--sds-c-button-text-color: #032d60;',
                  '.l1-button",n," {--sds-c-button-color-background: transparent;--sds-c-button-color-background-hover: transparent;--sds-c-button-color-background-active: transparent;--sds-c-button-text-color: var(--c360-nav-c-link-color, #032d60);'
                )
                .replaceAll(
                  '.l1-button.login",n," span",n," {font-size: 16px;}',
                  '.l1-button.login",n," {--sds-c-button-text-color: var(--c360-nav-c-utility-color, #032d60);}.l1-button.login",n," span",n," {font-size: 16px;color: var(--c360-nav-c-utility-color, #032d60);}'
                )
                .replaceAll(
                  'hgf-button.login--in-header",n," {--sds-c-button-spacing-inline-start: 0px;--sds-c-button-spacing-inline-end: 0px;--sds-c-button-color-background: transparent;--sds-c-button-text-color: #032d60;',
                  'hgf-button.login--in-header",n," {--sds-c-button-spacing-inline-start: 0px;--sds-c-button-spacing-inline-end: 0px;--sds-c-button-color-background: transparent;--sds-c-button-text-color: var(--c360-nav-c-utility-color, #032d60);'
                )
                .replaceAll(
                  "::slotted([slot='start']) {margin-inline-end: var(--c360-g-spacing-2);}",
                  "::slotted([slot='start']) {color: var(--c360-nav-c-utility-color, inherit);margin-inline-end: var(--c360-g-spacing-2);}"
                )
                .replaceAll(
                  '.header",n," .icon-globe-hover",n," {display: none;}',
                  '.header",n," .icon-globe",n," {filter: var(--c360-nav-c-utility-icon-filter, none);}.header",n," .icon-globe-hover",n," {display: none;}'
                )
                .replaceAll(
                  '.contact-heading"+n+",.phone-numbers"+n+" {font-size: var(--c360-g-menu-off-font-size);margin: 4px 0px;color: #032d60;',
                  '.contact-heading"+n+",.phone-numbers"+n+" {font-size: var(--c360-g-menu-off-font-size);margin: 4px 0px;color: var(--c360-nav-c-utility-color, #032d60);'
                )
                .replaceAll(
                  '.utility-button",n," img.login",n,",.utility-button",n," img.login--hover",n," {position: relative;top: 3px;height: 18px;width: 18px;}',
                  '.utility-button",n," img.login",n,",.utility-button",n," img.login--hover",n," {position: relative;top: 3px;height: 18px;width: 18px;filter: var(--c360-nav-c-utility-icon-filter, none);}'
                )
                .replaceAll(
                  '.icon-phone",n," {',
                  '.icon-phone",n," {filter: var(--c360-nav-c-utility-icon-filter, none);'
                )
                .replaceAll(
                  '.icon-globe",n," {',
                  '.icon-globe",n," {filter: var(--c360-nav-c-utility-icon-filter, none);'
                )
                .replaceAll(
                  '.authed-message-notification",n," {width: 8px;height: 8px;clip-path: circle();background: #032d60;',
                  '.authed-message-notification",n," {width: 8px;height: 8px;clip-path: circle();background: var(--c360-nav-c-utility-color, #032d60);'
                )
                .replaceAll(
                  '.head-text",n," {font-family: var(--hgf-g-font-display);color: #444444;font-size: 14px;',
                  '.head-text",n," {font-family: var(--hgf-g-font-display);color: var(--hgf-c-footer-heading-color, #444444);font-size: 14px;'
                )
                .replaceAll(
                  '.generic-links",n," > li",n," a",n," {font-size: 12px;color: var(--hgf-g-blue-vibrant-40);}',
                  '.generic-links",n," > li",n," a",n," {font-size: 12px;color: var(--sds-g-color-blue-50);}'
                )
                .replaceAll(
                  '.contact-us",n," a",n," {font-family: \'Salesforce Sans\';font-style: normal;font-weight: 700;font-size: 14px;line-height: 20px;text-decoration-line: underline;color: #032d60;}',
                  '.contact-us",n," a",n," {font-family: \'Salesforce Sans\';font-style: normal;font-weight: 700;font-size: 14px;line-height: 20px;text-decoration-line: underline;color: var(--sds-g-color-blue-50);}'
                )
                .replaceAll(
                  '.topFooterNavigation",n," .footer-logo",n," .logo-img",n," {',
                  '.topFooterNavigation",n," .footer-logo",n," .logo-img",n," {filter: var(--hgf-c-footer-logo-filter, none);'
                )
                .replaceAll(
                  '.salesforce-social-icon",n," {background-size: contain;height: 30px;width: 30px;display: inline-block;fill: #444444;}',
                  '.salesforce-social-icon",n," {background-size: contain;height: 30px;width: 30px;display: inline-block;fill: var(--hgf-c-footer-icon-color, #444444);filter: var(--hgf-c-footer-icon-filter, none);}'
                )
                .replaceAll(
                  '.bottom-footer-icon",n," {background-size: contain;display: inline-block;fill: #444444;',
                  '.bottom-footer-icon",n," {background-size: contain;display: inline-block;fill: var(--hgf-c-footer-icon-color, #444444);'
                )
                .replaceAll(
                  '.social-media-links",n," svg.salesforce-social-icon",n," {',
                  '.social-media-links",n," svg.salesforce-social-icon",n," {fill: var(--hgf-c-footer-icon-color, #444444);'
                )
                .replaceAll(
                  '.footerNavigation",n," .footer-phone-number",n," {font-family: var(--hgf-g-font-display);color: #222222;',
                  '.footerNavigation",n," .footer-phone-number",n," {font-family: var(--hgf-g-font-display);color: var(--hgf-c-footer-heading-color, #222222);'
                )
                .replaceAll(
                  '.footerNavigation",n," .footer-phone-number",n," .callus-link-text",n," {font-size: 14px;line-height: 20px;color: #444444;}',
                  '.footerNavigation",n," .footer-phone-number",n," .callus-link-text",n," {font-size: 14px;line-height: 20px;color: var(--hgf-c-footer-heading-color, #444444);}'
                )
              file.contents = Buffer.from(contents)
            }
            next(null, file)
          })
        ),
        vfs.src('img/**/*.{gif,ico,jpg,png,svg}', opts).pipe(
          // Preview copies don't need native image optimization.
          preview
            ? map()
            : imagemin(
              [
                gifsicle(),
                mozjpeg(),
                optipng(),
                svgo({
                  plugins: [{ name: 'removeViewBox', active: false }],
                }),
              ].reduce((accum, it) => (it ? accum.concat(it) : accum), [])
            )
        ),
        vfs.src('helpers/*.js', opts),
        vfs.src('layouts/*.hbs', opts),
        vfs.src('partials/**/*.hbs', opts)
      )
        .pipe(vfs.dest(dest, { sourcemaps: sourcemaps && '.' }))
        .on('finish', done)
        .on('error', done)
    )
    .catch(done)
}
