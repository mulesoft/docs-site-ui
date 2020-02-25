'use strict'

module.exports = (str, prefix) => prefix && str.startsWith(prefix) ? str.slice(prefix.length) : str
