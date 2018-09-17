/* global describe:false, it:false */
const assert = require('assert').strict;

const srttc = require('../index');

describe('String type definitions', () => {
  describe('Invalid arguments', () => {
    it('should allow any as a keyword', () => {
      assert.equal(srttc('', 'any'), true);
      assert.equal(srttc(5, 'any'), true);
      assert.equal(srttc(true, 'any'), true);
      assert.equal(srttc({}, 'any'), true);
      assert.equal(srttc([], 'any'), true);
      assert.equal(srttc(() => {}, 'any'), true);
      assert.equal(srttc(null, 'any'), true);
      assert.equal(srttc(undefined, 'any'), true);
    });

    it('should disallow invalid definition strings', () => {
      assert.equal(srttc('', '.'), false);
      assert.equal(srttc('', ' '), false);
      assert.equal(srttc('', '\n'), false);
      assert.equal(srttc('', 'something invalid'), false);
    });

    it('should disallow numbers as definitions', () => {
      assert.equal(srttc('', 5), false);
    });

    it('should disallow booleans as definitions', () => {
      assert.equal(srttc('', true), false);
      assert.equal(srttc('', false), false);
    });
  });

  describe('string', () => {
    it('should allow strings', () => {
      assert.equal(srttc('any old string', 'string'), true);
    });

    it('should disallow numbers', () => {
      assert.equal(srttc(5, 'string'), false);
    });

    it('should disallow booleans', () => {
      assert.equal(srttc(true, 'string'), false);
    });

    it('should disallow arrays', () => {
      assert.equal(srttc([], 'string'), false);
    });

    it('should disallow objects', () => {
      assert.equal(srttc({}, 'string'), false);
    });

    it('should disallow functions', () => {
      assert.equal(srttc(() => {}, 'string'), false);
    });
  });

  describe('number', () => {
    it('should disallow strings', () => {
      assert.equal(srttc('any old string', 'number'), false);
    });

    it('should allow numbers', () => {
      assert.equal(srttc(5, 'number'), true);
    });

    it('should disallow booleans', () => {
      assert.equal(srttc(true, 'number'), false);
    });

    it('should disallow arrays', () => {
      assert.equal(srttc([], 'number'), false);
    });

    it('should disallow objects', () => {
      assert.equal(srttc({}, 'number'), false);
    });

    it('should disallow functions', () => {
      assert.equal(srttc(() => {}, 'number'), false);
    });

    it('should allow NaN', () => {
      assert.equal(srttc(NaN, 'number'), true);
    });

    it('should allow Infinity', () => {
      assert.equal(srttc(Infinity, 'number'), true);
    });

    it('should allow -Infinity', () => {
      assert.equal(srttc(-Infinity, 'number'), true);
    });
  });

  describe('boolean', () => {
    it('should disallow strings', () => {
      assert.equal(srttc('any old string', 'boolean'), false);
    });

    it('should disallow numbers', () => {
      assert.equal(srttc(5, 'boolean'), false);
    });

    it('should allow true', () => {
      assert.equal(srttc(true, 'boolean'), true);
    });

    it('should allow false', () => {
      assert.equal(srttc(false, 'boolean'), true);
    });

    it('should disallow arrays', () => {
      assert.equal(srttc([], 'boolean'), false);
    });

    it('should disallow objects', () => {
      assert.equal(srttc({}, 'boolean'), false);
    });

    it('should disallow functions', () => {
      assert.equal(srttc(() => {}, 'boolean'), false);
    });
  });

  describe('object', () => {
    it('should disallow strings', () => {
      assert.equal(srttc('any old string', 'object'), false);
    });

    it('should disallow numbers', () => {
      assert.equal(srttc(5, 'object'), false);
    });

    it('should disallow booleans', () => {
      assert.equal(srttc(true, 'object'), false);
    });

    it('should allow arrays', () => {
      assert.equal(srttc([], 'object'), true);
    });

    it('should allow objects', () => {
      assert.equal(srttc({}, 'object'), true);
    });

    it('should disallow objects', () => {
      assert.equal(srttc(() => {}, 'object'), false);
    });
  });

  describe('function', () => {
    it('should disallow strings', () => {
      assert.equal(srttc('any old string', 'function'), false);
    });

    it('should disallow numbers', () => {
      assert.equal(srttc(5, 'function'), false);
    });

    it('should disallow booleans', () => {
      assert.equal(srttc(true, 'function'), false);
    });

    it('should disallow arrays', () => {
      assert.equal(srttc([], 'function'), false);
    });

    it('should disallow objects', () => {
      assert.equal(srttc({}, 'function'), false);
    });

    it('should allow functions', () => {
      assert.equal(srttc(() => {}, 'function'), true);
    });
  });

  describe('Primitive arrays', () => {
    describe('any[]', () => {
      it('should allow any arrays', () => {
        assert.equal(srttc([5, 'some string', true, Object, {}], 'any[]'), true);
      });

      it('should disallow non-array values', () => {
        assert.equal(srttc('any old string', 'any[]'), false);
        assert.equal(srttc(5, 'any[]'), false);
        assert.equal(srttc(true, 'any[]'), false);
        assert.equal(srttc({}, 'any[]'), false);
        assert.equal(srttc(() => {}, 'any[]'), false);
      });
    });

    describe('string[]', () => {
      it('should allow string arrays', () => {
        assert.equal(srttc(['any old string', 'some other string'], 'string[]'), true);
      });

      it('should allow empty arrays', () => {
        assert.equal(srttc([], 'string[]'), true);
      });

      it('should disallow strings', () => {
        assert.equal(srttc('any old string', 'string[]'), false);
      });

      it('should disallow number arrays', () => {
        assert.equal(srttc([5, 6], 'string[]'), false);
      });

      it('should disallow boolean arrays', () => {
        assert.equal(srttc([true, false], 'string[]'), false);
      });

      it('should disallow object arrays', () => {
        assert.equal(srttc([{}, {}], 'string[]'), false);
      });

      it('should disallow array arrays', () => {
        assert.equal(srttc([[], []], 'string[]'), false);
      });

      it('should disallow function arrays', () => {
        assert.equal(srttc([() => {}, () => {}], 'string[]'), false);
      });
    });

    describe('number[]', () => {
      it('should allow number arrays', () => {
        assert.equal(srttc([5, NaN], 'number[]'), true);
      });

      it('should allow empty arrays', () => {
        assert.equal(srttc([], 'number[]'), true);
      });

      it('should disallow numbers', () => {
        assert.equal(srttc(5, 'number[]'), false);
      });

      it('should disallow string arrays', () => {
        assert.equal(srttc(['any old string', 'some other string'], 'number[]'), false);
      });

      it('should disallow boolean arrays', () => {
        assert.equal(srttc([true, false], 'number[]'), false);
      });

      it('should disallow object arrays', () => {
        assert.equal(srttc([{}, {}], 'number[]'), false);
      });

      it('should disallow array arrays', () => {
        assert.equal(srttc([[], []], 'number[]'), false);
      });

      it('should disallow function arrays', () => {
        assert.equal(srttc([() => {}, () => {}], 'number[]'), false);
      });
    });

    describe('boolean[]', () => {
      it('should allow boolean arrays', () => {
        assert.equal(srttc([true, false], 'boolean[]'), true);
      });

      it('should allow empty arrays', () => {
        assert.equal(srttc([], 'boolean[]'), true);
      });

      it('should disallow booleans', () => {
        assert.equal(srttc(true, 'boolean[]'), false);
        assert.equal(srttc(false, 'boolean[]'), false);
      });

      it('should disallow string arrays', () => {
        assert.equal(srttc(['any old string', 'some other string'], 'boolean[]'), false);
      });

      it('should disallow number arrays', () => {
        assert.equal(srttc([5, NaN], 'boolean[]'), false);
      });

      it('should disallow object arrays', () => {
        assert.equal(srttc([{}, {}], 'boolean[]'), false);
      });

      it('should disallow array arrays', () => {
        assert.equal(srttc([[], []], 'boolean[]'), false);
      });

      it('should disallow function arrays', () => {
        assert.equal(srttc([() => {}, () => {}], 'boolean[]'), false);
      });
    });

    describe('object[]', () => {
      it('should allow object arrays', () => {
        assert.equal(srttc([{}, {}], 'object[]'), true);
      });

      it('should allow array arrays', () => {
        assert.equal(srttc([[], []], 'object[]'), true);
      });

      it('should allow empty arrays', () => {
        assert.equal(srttc([], 'object[]'), true);
      });

      it('should disallow objects', () => {
        assert.equal(srttc({}, 'object[]'), false);
      });

      it('should disallow string arrays', () => {
        assert.equal(srttc(['any old string', 'some other string'], 'object[]'), false);
      });

      it('should disallow number arrays', () => {
        assert.equal(srttc([5, NaN], 'object[]'), false);
      });

      it('should disallow boolean arrays', () => {
        assert.equal(srttc([true, false], 'object[]'), false);
      });

      it('should disallow function arrays', () => {
        assert.equal(srttc([() => {}, () => {}], 'object[]'), false);
      });
    });

    describe('function[]', () => {
      it('should allow function arrays', () => {
        assert.equal(srttc([() => {}, () => {}], 'function[]'), true);
      });

      it('should allow empty arrays', () => {
        assert.equal(srttc([], 'function[]'), true);
      });

      it('should disallow functions', () => {
        assert.equal(srttc(() => {}, 'function[]'), false);
      });

      it('should disallow string arrays', () => {
        assert.equal(srttc(['any old string', 'some other string'], 'function[]'), false);
      });

      it('should disallow number arrays', () => {
        assert.equal(srttc([5, NaN], 'function[]'), false);
      });

      it('should disallow boolean arrays', () => {
        assert.equal(srttc([true, false], 'function[]'), false);
      });

      it('should disallow object arrays', () => {
        assert.equal(srttc([{}, {}], 'function[]'), false);
      });

      it('should disallow array arrays', () => {
        assert.equal(srttc([[], []], 'function[]'), false);
      });
    });
  });

  describe('Optional Types', () => {
    describe('any?', () => {
      it('should allow anything', () => {
        assert.equal(srttc('', 'any?'), true);
        assert.equal(srttc(5, 'any?'), true);
        assert.equal(srttc(true, 'any?'), true);
        assert.equal(srttc({}, 'any?'), true);
        assert.equal(srttc([], 'any?'), true);
        assert.equal(srttc(() => {}, 'any?'), true);
        assert.equal(srttc(null, 'any?'), true);
        assert.equal(srttc(undefined, 'any?'), true);
      });
    });

    describe('string?', () => {
      it('should allow strings', () => {
        assert.equal(srttc('any old string', 'string?'), true);
      });

      it('should allow null', () => {
        assert.equal(srttc(null, 'string?'), true);
      });

      it('should allow undefined', () => {
        assert.equal(srttc(undefined, 'string?'), true);
      });

      it('should disallow numbers', () => {
        assert.equal(srttc(5, 'string?'), false);
      });

      it('should disallow booleans', () => {
        assert.equal(srttc(true, 'string?'), false);
      });

      it('should disallow arrays', () => {
        assert.equal(srttc([], 'string?'), false);
      });

      it('should disallow objects', () => {
        assert.equal(srttc({}, 'string?'), false);
      });

      it('should disallow functions', () => {
        assert.equal(srttc(() => {}, 'string?'), false);
      });
    });

    describe('number?', () => {
      it('should allow numbers', () => {
        assert.equal(srttc(5, 'number?'), true);
      });

      it('should allow null', () => {
        assert.equal(srttc(null, 'number?'), true);
      });

      it('should allow undefined', () => {
        assert.equal(srttc(undefined, 'number?'), true);
      });

      it('should disallow strings', () => {
        assert.equal(srttc('any old string', 'number?'), false);
      });

      it('should disallow booleans', () => {
        assert.equal(srttc(true, 'number?'), false);
      });

      it('should disallow arrays', () => {
        assert.equal(srttc([], 'number?'), false);
      });

      it('should disallow objects', () => {
        assert.equal(srttc({}, 'number?'), false);
      });

      it('should disallow functions', () => {
        assert.equal(srttc(() => {}, 'number?'), false);
      });
    });

    describe('boolean?', () => {
      it('should allow booleans', () => {
        assert.equal(srttc(true, 'boolean?'), true);
        assert.equal(srttc(false, 'boolean?'), true);
      });

      it('should allow null', () => {
        assert.equal(srttc(null, 'boolean?'), true);
      });

      it('should allow undefined', () => {
        assert.equal(srttc(undefined, 'boolean?'), true);
      });

      it('should disallow strings', () => {
        assert.equal(srttc('any old string', 'boolean?'), false);
      });

      it('should disallow numbers', () => {
        assert.equal(srttc(5, 'boolean?'), false);
      });

      it('should disallow arrays', () => {
        assert.equal(srttc([], 'boolean?'), false);
      });

      it('should disallow objects', () => {
        assert.equal(srttc({}, 'boolean?'), false);
      });

      it('should disallow functions', () => {
        assert.equal(srttc(() => {}, 'boolean?'), false);
      });
    });

    describe('object?', () => {
      it('should allow objects', () => {
        assert.equal(srttc({}, 'object?'), true);
      });

      it('should allow arrays', () => {
        assert.equal(srttc([], 'object?'), true);
      });

      it('should allow null', () => {
        assert.equal(srttc(null, 'object?'), true);
      });

      it('should allow undefined', () => {
        assert.equal(srttc(undefined, 'object?'), true);
      });

      it('should disallow strings', () => {
        assert.equal(srttc('any old string', 'object?'), false);
      });

      it('should disallow numbers', () => {
        assert.equal(srttc(5, 'object?'), false);
      });

      it('should disallow booleans', () => {
        assert.equal(srttc(true, 'object?'), false);
      });

      it('should disallow functions', () => {
        assert.equal(srttc(() => {}, 'object?'), false);
      });
    });

    describe('function?', () => {
      it('should allow strings', () => {
        assert.equal(srttc(() => {}, 'function?'), true);
      });

      it('should allow null', () => {
        assert.equal(srttc(null, 'function?'), true);
      });

      it('should allow undefined', () => {
        assert.equal(srttc(undefined, 'function?'), true);
      });

      it('should disallow strings', () => {
        assert.equal(srttc('any old string', 'function?'), false);
      });

      it('should disallow numbers', () => {
        assert.equal(srttc(5, 'function?'), false);
      });

      it('should disallow booleans', () => {
        assert.equal(srttc(true, 'function?'), false);
      });

      it('should disallow arrays', () => {
        assert.equal(srttc([], 'function?'), false);
      });

      it('should disallow objects', () => {
        assert.equal(srttc({}, 'function?'), false);
      });
    });
  });
});

describe('Function type definitions', () => {
  describe('Constructor checks', () => {
    it('should allow constructor functions to be checked', () => {
      assert.equal(srttc([], Array), true);
      assert.equal(srttc(new Error('an error'), Error), true);
      assert.equal(srttc(new Error('an error'), Object), true);

      class TestClass {}

      assert.equal(srttc(new TestClass(), TestClass), true);
    });

    it('should disallow incorrect constructor functions', () => {
      assert.equal(srttc([], Error), false);

      class TestClass {}

      assert.equal(srttc([], TestClass), false);
      assert.equal(srttc({}, TestClass), false);
    });

    it('should disallow incorrect values', () => {
      assert.equal(srttc(5, Error), false);
      assert.equal(srttc('some string', Array), false);
      assert.equal(srttc(null, Object), false);
    });
  });
});

describe('Object type definitions', () => {
  describe('Circular references', () => {
    it('should catch circular definition object references', () => {
      const defA = {};
      const defB = {};

      // Set up circular reference between definition objects
      defA.b = defB;
      defB.a = defA;

      // Note, actual object doesn't have to be circular
      const actualObj = {
        b: {
          a: {
            b: {},
          },
        },
      };

      assert.throws(() => {
        srttc(actualObj, defA);
      });
    });

    it('should catch circular definition array references', () => {
      const defA = [];
      const defB = [];

      // Set up circular reference between definition objects
      defA.push(defB);
      defB.push(defA);

      // Note, actual object doesn't have to be circular
      const actualObj = [[[]]];

      assert.throws(() => {
        srttc(actualObj, defA);
      });
    });

    it('should allow circular value objects', () => {
      const valA = {};
      const valB = {};

      // Set up circular reference between value objects
      valA.b = valB;
      valB.a = valA;

      // Definition is not circular
      const definition = {
        b: {
          a: {
            b: {},
          },
        },
      };

      assert.equal(srttc(valA, definition), true);
    });

    it('should allow circular value arrays', () => {
      const valA = [];
      const valB = [];

      // Set up circular reference between value objects
      valA.push(valB);
      valB.push(valA);

      // Definition is not circular
      const definition = [[[Array]]];

      assert.equal(srttc(valA, definition), true);
    });
  });

  describe('Nested objects', () => {
    it('should allow an object with a primitive property', () => {
      const value = {
        foo: 5,
      };

      // Definition is not circular
      const definition = {
        foo: 'number',
      };

      assert.equal(srttc(value, definition), true);
    });

    it('should disallow an object without a primitive property', () => {
      const value = {};

      // Definition is not circular
      const definition = {
        foo: 'number',
      };

      assert.equal(srttc(value, definition), false);
    });

    it('should allow an object with an optional primitive property', () => {
      const value = {
        foo: 5,
      };

      // Definition is not circular
      const definition = {
        foo: 'number?',
      };

      assert.equal(srttc(value, definition), true);
    });

    it('should allow an object without an optional primitive property', () => {
      const value = {};

      // Definition is not circular
      const definition = {
        foo: 'number?',
      };

      assert.equal(srttc(value, definition), true);
    });

    it('should allow an object with an object property', () => {
      const value = {
        bar: {
          foo: 5,
        },
      };

      // Definition is not circular
      const definition = {
        bar: {
          foo: 'number',
        },
      };

      assert.equal(srttc(value, definition), true);
    });
  });
});

describe('Arrays', () => {
  describe('Array length constraints', () => {
    it('should allow arrays with a length within the range', () => {
      assert.equal(srttc(['any old string', 'some other string'], srttc.arrayOf('string', 1, 3)), true);
    });

    it('should disallow arrays with a length lower than the range', () => {
      assert.equal(srttc([], srttc.arrayOf('string', 1, 3)), false);
    });

    it('should disallow arrays with a length higher than the range', () => {
      assert.equal(srttc(['any old string', 'some other string', 'yet another string', 'i\'m running out of strings'], srttc.arrayOf('string', 1, 3)), false);
    });
  });
});

describe('Unions', () => {
  describe('General unions', () => {
    describe('string or string[]', () => {
      it('should allow a string', () => {
        assert.equal(srttc('any old string', srttc.oneOf('string', 'string[]')), true);
      });

      it('should allow a string array', () => {
        assert.equal(srttc(['any old string', 'another string'], srttc.oneOf('string', 'string[]')), true);
      });

      it('should disallow a number', () => {
        assert.equal(srttc(5, srttc.oneOf('string', 'string[]')), false);
      });

      it('should disallow a number array', () => {
        assert.equal(srttc([5, NaN, 7], srttc.oneOf('string', 'string[]')), false);
      });

      it('should disallow a mixed type array', () => {
        assert.equal(srttc(['any old string', ['a string array']], srttc.oneOf('string', 'string[]')), false);
      });
    });
  });

  describe('Optional', () => {
    it('should allow an object with an optional property', () => {
      const value = {
        foo: 5,
      };

      const definition = {
        foo: srttc.optional('number'),
      };

      assert.equal(srttc(value, definition), true);
    });

    it('should allow an object without an optional property', () => {
      const value = {};

      const definition = {
        foo: srttc.optional('number'),
      };

      assert.equal(srttc(value, definition), true);
    });

    it('should allow an object with an optional complex property', () => {
      const value = {
        foo: {
          bar: 'baz',
        },
      };

      const definition = {
        foo: srttc.optional({
          bar: 'string',
        }),
      };

      assert.equal(srttc(value, definition), true);
    });

    it('should allow an object without an optional complex property', () => {
      const value = {};

      const definition = {
        foo: srttc.optional({
          bar: 'string',
        }),
      };

      assert.equal(srttc(value, definition), true);
    });

    it('should disallow an object with an optional property of the wrong type', () => {
      const value = {
        foo: 5,
      };

      const definition = {
        foo: srttc.optional({
          bar: 'string',
        }),
      };

      assert.equal(srttc(value, definition), false);
    });
  });
});


