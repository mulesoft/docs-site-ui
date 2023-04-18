'use strict'

/**
 * Given a list of arguments, loop through the list and return the argument is not false, undefined, or null.
 *  example 1 - (or true-statement false-statement) -> true-statement
 *  example 2 - (or false-statement false-statement-2 true-statement false-statement-3) -> true-statement
 *  example 3 - (or true-statement) -> true
 *  example 4 - (or false-statement) -> false
 *  example 5 - (or false-statement false-statement-2 false-statement-3 false-statement-4) -> false
 *  example 6 - (or) -> false
 * @returns the first argument from the list that is not false, undefined, or null. False if no such argument exists
 */

module.exports = function () {
  if (arguments.length <= 1) return false
  const values = Object.values(arguments)
  const loopLength = values.length - 1 // the last item of the values array is a self-reference, so exclude it
  for (let i = 0; i < loopLength; i++) {
    const value = values[i]
    if (value !== false && value !== undefined && value !== null) {
      return value
    }
  }
  return false
}
