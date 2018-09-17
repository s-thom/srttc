# srttc

A **S**imple **R**un-**T**ime **T**ype **C**hecker for Javacript

No dependencies, no fuss.

## Usage

```js
import srttc from 'srttc';

srttc(valueToCheck, definition);
```

### any

A special string `any` can be passed to match any type (including null/undefined)

```js
const matches = srttc(5, 'any');
const matches = srttc('a value to compare', 'any');
const matches = srttc(true, 'any');
const matches = srttc({}, 'any');
const matches = srttc(new Error(), 'any');
const matches = srttc([1, 'blah'], 'any');
const matches = srttc(null, 'any');
```

### Primitives

JS Primitive values are defined by their `typeof` string

```js
const matches = srttc(5, 'number');
const matches = srttc('a value to compare', 'string');
const matches = srttc(true, 'boolean');
```

A square bracket pair (`[]`) can be used to quickly note arrays of primitive types

```js
const matches = srttc(['value 1', 'value 2'], 'string[]');
```

This can be suffixed with a question mark (`?`) to mark it as optional

```js
const matches = srttc(undefined, 'string?');
```

### Objects

#### instanceof

Whether a value is an instance of a class can be checked by passing the constructor function of the class

```js
const matches = srttc(new CoolObject(), CoolObject);
```

#### Property comparison

All properties on the definition must be present, but extra properties on the value are ignored

```js
const matches = srttc(
  {
    foo: 5,
    bar: 'a string',
  },
  {
    foo: 'number',
  },
);
```

Properties of objects can be primitives (like above) or other objects

```js
const matches = srttc(
  {
    foo: 5,
    bar: {
      baz: [
        new CoolObject(),
        new CoolObject(),
      ],
      quz: {
        quux: 'some weird string',
      },
    },
  },
  {
    foo: 'number',
    bar: {
      baz: srttc.arrayOf(CoolObject),
      quz: {
        quux: 'string',
      },
    },
  },
);
```

### Arrays

#### Primitive arrays

See the section on [primitives](#primitives)

#### Arrays of more complex types

See the section on [the `srttc.arrayOf() function`](#srttcarrayof)

#### Typed arrays of known length (tuples)

Sometimes arrays have different types based on the position in the array

```js
const matches = srttc([5, 'a string'], ['number', 'string']);
```

Optional types at the end of the array are supported

```js
const matches = srttc([5, 'a string'], ['number', 'string', srttc.optional('boolean')]);
```

### Extra functions

#### `srttc.oneOf()`

Also available as `srttc.or()` and `srttc.union()`

The value must match at least one of the given types for it to be valid

```js
const matches = srttc(5, srttc.oneOf('string', 'number'));
const matches = srttc('a string', srttc.oneOf('string', 'number'));
```

#### `srttc.optional()`

The given type, but also matches on null or undefined.

```js
const matches = srttc('a string', srttc.optional('string'));
const matches = srttc(undefined, srttc.optional('string'));
const matches = srttc('a string', srttc.optional(srttc.oneOf('string', 'number')));
const matches = srttc(5, srttc.optional(srttc.oneOf('string', 'number')));
const matches = srttc(null, srttc.optional(srttc.oneOf('string', 'number')));
```

#### `srttc.arrayOf()`

The value must be an array, and each value in the array must match the given type

```js
const matches = srttc(['value 1', 'value 2'], srttc.arrayOf('string'));
const matches = srttc([['value 1'], ['value 2']], srttc.arrayOf(srttc.arrayOf('string')));
```

You can also specify a minimum and maximum length for the array

```js
const matches = srttc(['value 1', 'value 2'], srttc.arrayOf('string', 0, Infinity));
const matches = srttc(['value 1', 'value 2'], srttc.arrayOf('string', 0, 2));
const matches = srttc(['value 1', 'value 2'], srttc.arrayOf('string', 2, 2));
const matches = srttc(['value 1', 'value 2'], srttc.arrayOf('string', 2, Infinity));
```

## Tests

To run the unit tests, just run `npm test`. The tests are defined in `tests/index.js`

## TODO

Contributions are welcome. Just fork, do a thing, then create a PR.

* [x] Allow `OR` comparisons (e.g. string or number)
* [x] Object (incl. constructor comparison)
* [ ] Error mode (throws error explaining problem instead of returning false)
* [ ] More tests?
