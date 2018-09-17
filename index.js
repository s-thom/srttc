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
      return compare(value, createArray(type), newParentList);
    }

    if (type === 'any') {
      return true;
    }

    return typeof value === type;
  } else if (Array.isArray(definition)) {
    if (!Array.isArray(value)) {
      return false;
    }

    // Compare length of tuple definition to the definition
    // Since optional type validation is done afterwards, this only needs to
    // check for when there's more values than definition types
    if (definition.length < value.length) {
      return false;
    }

    for (let i = 0; i < definition.length; i++) {
      const element = value[i]; // Undefined if not present, which works for optional types
      const type = definition[i];

      // If this element in the value array didn't match, then the array is invalid
      if (!compare(element, type, newParentList)) {
        return false;
      }
    }

    // All items in the array must be fine, so array is fine
    return true;
  } else if (definition instanceof ArrayType) {
    if (!Array.isArray(value)) {
      return false;
    }

    // Check array length constraints
    if (value.length < definition.minLength) {
      return false;
    } else if (value.length > definition.maxLength) {
      return false;
    }

    // Compare each item in value array to see if it matches any of the items in the definition
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      // If this element in the value array didn't match, then the array is invalid
      if (!compare(element, definition.type, newParentList)) {
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

class ArrayType {
  constructor(type, minLength, maxLength) {
    this.type = type;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
}

function createUnion(...types) {
  return new UnionType(types);
}

function createOptional(type) {
  return createUnion(null, undefined, type);
}

function createArray(type, minLength = 0, maxLength = Infinity) {
  return new ArrayType(type, minLength, maxLength);
}

srttc.or = createUnion;
srttc.union = createUnion;
srttc.oneOf = createUnion;
srttc.optional = createOptional;
srttc.arrayOf = createArray;

module.exports = srttc;
