# d3fc-extent

Extends the D3 extent functionality to allow padding, multiple accessors and date support

[Main d3fc package](https://github.com/ScottLogic/d3fc)

# Installation

```bash
npm install d3fc-extent
```

# Linear Extent

Calculates the extent of an array of data which can be used to set the range on a scale. Can also optionally pad the data in various ways as described below.

## Example usage

```javascript

import linearExtent from 'd3fc-extent';

const data = [{ x: 1 }, { x: 2 }, { x: 4 }, { x: 8 }, { x: 16 }];

const extent = linearExtent()
  .accessors([d => d.x])
  .pad([1, 4])
  .padUnit('domain');

extent(data);

// [0, 20]

```

## API

<a name="linear_padUnit" href="#linear"></a> *fc_extent*.**linearExtent**()

Constructs a new linear extent calculator.

<a name="linear_accessors" href="#linear_accessors"></a> *linear*.**accessors**([*accessors*])

If *accessors* is specified, sets the array of value accessors to the specified array and returns this extent instance.
If *accessors* is not specified, returns the current array of value accessors, which defaults `[]`.

<a name="linear_pad" href="#linear_pad"></a> *linear*.**pad**([*values*])

If *values* is specified, sets the amount of padding applied to the minimum and maximum values of the extent, to the specified array `[minPad, maxPad]` and returns this extent instance. The unit of these values is set by [padUnit](#linear_padUnit).
If *values* is not specified, returns the current array of padding values, which defaults `[0, 0]`.

<a name="linear_padUnit" href="#linear_padUnit"></a> *linear*.**padUnit**([*value*])

If *value* is specified, sets the unit of the [pad](#linear_pad) values applied to minimum and maximum values and returns this extent instance. Possible values are -
* 'percent' - the default behavior of applying the values as a percentage of the extent e.g. pad values of `[0.5, 0.5]` would double the calculated extent.
* 'domain' - the padding values specified are applied directly to the calculated extent.
If *value* is not specified, returns the current array of padding unit, which defaults `percent`.

<a name="linear_symmetricalAbout" href="#linear_symmetricalAbout"></a> *linear*.**symmetricalAbout**([*value*])

If *value* is specified, sets the value around which the extent will be centered around and returns this extent instance. Can also be set to `null` to disable centering. Note this is applied before padding.
If *value* is not specified, returns the current center value, which defaults `null`.

<a name="linear_include" href="#linear_include"></a> *linear*.**include**([*values*])

If *values* is specified, sets the array of additional values to include within the calculated extent to the specified array and returns this extent instance. This allows for always including an origin (e.g. `[0]`) or specifying a minimum extent to always be displayed (e.g. `[10, 20]`).
Note included values are applied before [symmetricalAbout](#linear_symmetricalAbout).
If *values* is not specified, returns the current array of included values, which defaults `[]`.


# Date Extent

Calculates the extent of an array of data which can be used to set the range on a scale. Can also optionally pad the data in various ways as described below. Equivalent in functionality to [linear](#linear) but supports `Date`s.

## Example usage

```javascript

import dateExtent from 'd3fc-extent';

const data = [{ x: new Date(2016, 0, 1) }, { x: new Date(2016, 0, 11) }];

const extent = dateExtent()
  .accessors([d => d.x])
  .pad([0, 0.2]);

extent(data);

// [ 2016-01-01T00:00:00.000Z, 2016-01-13T00:00:00.000Z ]

```

## API

<a name="date_padUnit" href="#date"></a> *fc_extent*.**dateExtent**()

Constructs a new date extent calculator.

<a name="date_accessors" href="#date_accessors"></a> *date*.**accessors**([*accessors*])

If *accessors* is specified, sets the array of value accessors to the specified array and returns this extent instance. The value returned be the accessors must be a `Date`.
If *accessors* is not specified, returns the current array of value accessors, which defaults `[]`.

<a name="date_pad" href="#date_pad"></a> *date*.**pad**([*values*])

If *values* is specified, sets the amount of padding applied to the minimum and maximum values of the extent, to the specified array `[minPad, maxPad]` and returns this extent instance. The unit of these values is set by [padUnit](#date_padUnit).
If *values* is not specified, returns the current array of padding values, which defaults `[0, 0]`.

<a name="date_padUnit" href="#date_padUnit"></a> *date*.**padUnit**([*value*])

If *value* is specified, sets the unit of the [pad](#date_pad) values applied to minimum and maximum values and returns this extent instance. Possible values are -
* 'percent' - the default behavior of applying the values as a percentage of the extent e.g. pad values of `[0.5, 0.5]` would double the calculated extent.
* 'domain' - the padding values specified in milliseconds are applied directly to the calculated extent.
If *value* is not specified, returns the current array of padding unit, which defaults `percent`.

<a name="date_symmetricalAbout" href="#date_symmetricalAbout"></a> *date*.**symmetricalAbout**([*value*])

If *value* is specified, sets the value around which the extent will be centered around and returns this extent instance. Can also be set to `null` to disable centering. Note this is applied before padding.
If *value* is not specified, returns the current center value, which defaults `null`.

<a name="date_include" href="#date_include"></a> *date*.**include**([*values*])

If *values* is specified, sets the array of additional values to include within the calculated extent to the specified array and returns this extent instance.
If *values* is not specified, returns the current array of included values, which defaults `[]`.



include is applied after padding
pad is always an array
symmetrical PERCENTAGE padding is no longer divided in two
fields is renamed accessors and no longer supports field name strings (instead use arrow functions e.g. d => d.foo)