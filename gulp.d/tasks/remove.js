'use strict'

const fs = require('fs-extra')
const { obj: map } = require('through2')
const vfs = require('vinyl-fs')

module.exports = (files) => () =>
  vfs.src(files, { allowEmpty: true }).pipe(
    map((file, _enc, next) => {
      if (fs.existsSync(file.path)) fs.remove(file.path, next)
    })
  )
