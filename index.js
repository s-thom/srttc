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
    throw new Error('Circular reference in definition detected');
  }

  // Parent list to be passed down for the next layer
  const newParentList = [...parentList, definition];

  if (typeof definition === 'string') {
    const match = definition.match(MATCH_REGEX);

    if (!match) {
      return false;
    }

    const [, type, isArray, isOptional] = match;

    if (isOptional) {
      return compare(value, createOptional(type), newParentList);
    }

    if (isArray) {
      return compare(value, [type], newParentList);
    }

    if (type === 'any') {
      return true;
    }

    return typeof value === type;
  } else if (Array.isArray(definition)) {
    if (!Array.isArray(value)) {
      return false;
    }

    // Compare each item in value array to see if it matches any of the items in the definition
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      let isElementValid = false;

      for (let j = 0; j < definition.length; j++) {
        const type = definition[j];

        if (compare(element, type, newParentList)) {
          isElementValid = true;
          break;
        }
      }

      // If this element in the value array didn't match, then the array is invalid
      if (!isElementValid) {
        return false;
      }
    }

    // All items in the array must be fine, so array is fine
    return true;
  } else if (typeof definition === 'function') {
    // Compare constructor function
    if (typeof value !== 'object') {
      return false;
    }

    return value instanceof definition;
  } else if (definition instanceof UnionType) {
    // Go through each type in the union, if one matches, then it's good
    for (let i = 0; i < definition.types.length; i++) {
      const type = definition.types[i];

      const isValid = compare(value, type, newParentList);
      if (isValid) {
        return true;
      }
    }

    return false;
  } else if (typeof definition === 'undefined') {
    return value === undefined;
  } else if (definition === null) {
    return value === null;
  } else if (typeof definition === 'object') {
    if (typeof value !== 'object') {
      return false;
    }

    // Compare object properties
    const definitionKeys = Object.keys(definition);
    for (let i = 0; i < definitionKeys.length; i++) {
      const key = definitionKeys[i];

      const isValid = compare(value[key], definition[key], newParentList);

      // If this key does not match, then the object does not match
      if (!isValid) {
        return false;
      }
    }

    return true;
  }

  return false;
}

class UnionType {
  constructor(types) {
    this.types = types;
  }
}

function createUnion(...types) {
  return new UnionType(types);
}

function createOptional(...types) {
  return createUnion(null, undefined, ...types);
}

srttc.or = createUnion;
srttc.union = createUnion;
srttc.oneOf = createUnion;
srttc.optional = createOptional;

module.exports = srttc;
