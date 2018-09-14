/**
 * Expression to match string parts
 * First group: Name of type
 * Second group: Matches if array of type
 * Third group: Matches if type is optional
 */
const MATCH_REGEX = /^(\w+)(\[])?(\?)?$/;

/**
 * Check the type of a value
 *
 * @param {any} value The value to be checked
 * @param {any} definition Definition for the value to be checked against
 * @returns {boolean} Whether the type matches the definition
 */
function srttc(value, definition) {
  return compare(value, definition, []);
}

/**
 *
 * @param {any} value The value to be checked
 * @param {any} definition Definition for the value to be checked against
 * @param {any[]} parentList List of items compared to in order to reach this point. Part of avoiding circular references
 * @returns {boolean} Whether the type matches the definition
 */
function compare(value, definition, parentList) {
  // Check to avoid circular references
  if (parentList.includes(definition)) {
    return false;
  }

  // Parent list to be passed down for the next layer
  const newParentList = [...parentList, definition];

  if (typeof definition === 'string') {
    const match = definition.match(MATCH_REGEX);

    if (!match) {
      return false;
    }

    const [, type, isArray, isOptional] = match;

    if (isOptional && (value === null || value === undefined)) {
      return true;
    }

    if (isArray) {
      return compare(value, [type], newParentList);
    }

    if (type === 'any') {
      return true;
    }

    return typeof value === type;
  } else if (Array.isArray(definition)) {
    // Compare each item in value array to see if it matches any of the items in the definition
    throw new Error('Not implemented');
  } else if (typeof definition === 'function') {
    // Compare constructor function
    throw new Error('Not implemented');
  } else if (typeof definition === 'object') {
    // Compare object properties
    throw new Error('Not implemented');
  }

  return false;
}

module.exports = srttc;
