'use strict'

module.exports = function () {
  if (arguments.length === 0) return false
  const values = Object.values(arguments)
  const baseValue = values[0]
  for (let i = 1; i < values.length - 1; i++) {
    if (baseValue === values[i]) {
      return true
    }
  }
  return false
}
