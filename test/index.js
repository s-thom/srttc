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
});
