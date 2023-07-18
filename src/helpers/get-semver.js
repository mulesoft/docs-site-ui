/**
 * The purpose of this helper function is to separate the semantic version into major, minor, and patch values.
 * These values would then be assigned as values of the page metadata, and then used for sorting purposes.
 * @param {*} version - semver versions, for example 0.3.9 or 1.14
 * @returns object containing separate values of major, minor, and patch. For examples:
 *          0.3.9 -> {major: "0", minor: "3", patch: "9"}
 *          1.14 -> {major: "1", minor: "14", patch: undefined)
 */

const parseSemver = (version) => {
  const [major, minor, patch] = version.split('.')
  return { major, minor, patch }
}

module.exports = (version) => {
  return parseSemver(version)
}
