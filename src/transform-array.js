const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`'arr' parameter must be an instance of the Array!`);
  }

  let resultArr = [];
  let skipNext = false;

  for (let i = 0; i < arr.length; i += 1) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    if (arr[i] === '--discard-next') {
      skipNext = true;
    } else if (arr[i] === '--discard-prev') {
      if (resultArr.length > 0 && arr[i - 2] !== '--discard-next') {
        resultArr.pop();
      }
    } else if (arr[i] === '--double-next') {
      if (i + 1 < arr.length) {
        resultArr.push(arr[i + 1]);
      }
    } else if (arr[i] === '--double-prev') {
      if (i - 1 >= 0 && arr[i - 2] !== '--discard-next') {
        resultArr.push(arr[i - 1]);
      }
    } else {
      resultArr.push(arr[i]);
    }
  }

  return resultArr;
}

module.exports = {
  transform
};
