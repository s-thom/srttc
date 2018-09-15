# srttc

A **S**imple **R**un-**T**ime **T**ype **C**hecker for Javacript

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

Throughout this section, this will be the example object:

```js
const obj = ;
```

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

### Extra functions

#### `srttc.oneOf()`

Also available as `srttc.or()` and `srttc.union()`

The value must match at least one of the given types for it to be valid

```js
const matches = srttc(5, srttc.oneOf('string', 'number'));
const matches = srttc('a string', srttc.oneOf('string', 'number'));
```

#### `srttc.optional()`

Like `srttc.oneOf()`, but also matches on null or undefined.

```js
const matches = srttc('a string', srttc.optional('string'));
const matches = srttc(undefined, srttc.optional('string'));
const matches = srttc('a string', srttc.optional('string', 'number'));
```

#### `srttc.arrayOf()`

The value must be an array, and each value in the array must match the given type

```js
const matches = srttc(['value 1', 'value 2'], srttc.arrayOf('string'));
const matches = srttc([['value 1'], ['value 2']], srttc.arrayOf(srttc.arrayOf('string')));
```

## Tests

To run the unit tests, just run `npm test`. The tests are defined in `tests/index.js`

## TODO

Contributions are welcome. Just fork, do a thing, then create a PR.

* [x] Allow `OR` comparisons (e.g. string or number)
* [x] Object (incl. constructor comparison)
* [ ] Error mode (throws error explaining problem instead of returning false)
* [ ] More tests?
