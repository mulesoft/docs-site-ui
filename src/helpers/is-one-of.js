'use strict'

/**
 * Given a list of arguments, check whether the first argument is the same as 1 of the other arguments.
 *  example 1 - (is-one-of a a b c) -> true
 *  example 2 - (is-one-of c a b c) -> true
 *  example 3 - (is-one-of d a b c) -> false
 *  example 4 - (is-one-of c) -> false
 *  example 5 - (is-one-of) -> false
 * @returns true if the first argument matches any of the subsequent arguments, false otherwise.
 */

module.exports = function () {
  if (arguments.length <= 1) return false
  const values = Object.values(arguments)
  const baseValue = values[0]
  const loopLength = values.length - 1 // the last item of the values array is a self-reference, so exclude it
  for (let i = 1; i < loopLength; i++) {
    if (baseValue === values[i]) {
      return true
    }
  }
  return false
}
