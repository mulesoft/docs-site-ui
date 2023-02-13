'use strict'

module.exports = function (value, options) {
  if (value === this.switch_value || (value === 'default' && this.switch_break === false)) {
    this.switch_break = true
    return options.fn(this)
  }
}
