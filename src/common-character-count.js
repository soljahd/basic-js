const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  s1Array = s1.split('');
  s2Array = s2.split('');

  return s1Array.reduce((accum, current) => {
    let index = s2Array.indexOf(current);
    if (index !== -1) {
      accum += 1;
      s2Array.splice(index, 1);
    }
    return accum;
  }, 0);
}

module.exports = {
  getCommonCharacterCount
};
