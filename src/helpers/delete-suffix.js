'use strict'

module.exports = (str, suffix) => (suffix && str.endsWith(suffix) ? str.slice(0, -suffix.length) : str)
