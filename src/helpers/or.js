'use strict'

module.exports = function () {
  const values = Object.values(arguments)
  for (let i = 0; i < values.length - 1; i++) {
    const value = values[i]
    if (value !== false && value !== undefined && value !== null) {
      return value
    }
  }
  return false
}
