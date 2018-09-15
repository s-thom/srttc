# srttc

A **S**imple **R**un-**T**ime **T**ype **C**hecker for Javacript

## Usage

```js
import srttc from 'srttc';

srttc(valueToCheck, definition);

// True
const matches = srttc(5, 'number');
const matches = srttc('a value to compare', 'string');
const matches = srttc(undefined, 'string?');
const matches = srttc(['value 1', 'value 2'], 'string[]');
const matches = srttc(['value 1', 'value 2'], ['string']);
const matches = srttc(['value 1', 5], ['string', 'number']);
const matches = srttc({foo: 7}, {foo: 'number'});
const matches = srttc(new Baz(), Baz);
const matches = srttc({foo: {bar: new Baz()}}, {foo: {bar: Baz}});

// False
const matches = srttc(5, 'string');
const matches = srttc('a value to compare', 'boolean');
const matches = srttc(undefined, 'string');
const matches = srttc(['value 1', 'value 2'], 'string[]');
const matches = srttc(['value 1', 'value 2'], ['string']);
const matches = srttc(['value 1', 5], ['string', 'number']);
const matches = srttc({foo: 7}, {foo: 'number'});
const matches = srttc(new Baz(), Baz);
const matches = srttc({foo: {bar: new Baz()}}, {foo: {bar: Baz}});
```

## TODO

* [ ] Allow `OR` comparisons (e.g. string or number)
* [x] Object (incl. constructor comparison)
* [ ] Error mode (throws error explaining problem instead of returning false)
