'use strict'

module.exports = (str, suffix) => str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
