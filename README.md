# React Geosuggest [![Build Status](https://travis-ci.org/ubilabs/react-geosuggest.svg?branch=master)](https://travis-ci.org/ubilabs/react-geosuggest)

A [React](http://facebook.github.io/react/) autosuggest for the Google Maps Places API. You can also define your own suggests as defaults.


## Demo

Live demo: [ubilabs.github.io/react-geosuggest](http://ubilabs.github.io/react-geosuggest/)


## Installation

As this component uses the Google Maps Places API to get suggests, you must include the Google Maps Places API in the `<head>` of your HTML:

```html
<!DOCTYPE html>
  <html>
  <head>
    …
    <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
  </head>
  <body>
    …
  </body>
</html>
```


The easiest way to use geosuggest is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-geosuggest.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-geosuggest --save
```


## Usage

The Geosuggest works out of the box by just including it. However, you can customize the behaviour with the properties noted below.

```
var Geosuggest = require('react-geosuggest');

<Geosuggest />
```

### Properties

#### placeholder
Type: `String`
Default: `Search places`

The input field will get this placeholder text.

#### initialValue
Type: `String`
Default: `''`

An initial value for the input, when you want to prefill the suggest.

#### className
Type: `String`
Default: `''`

Add an additional class to the geosuggest container.

#### inputClassName
Type: `String`
Default: `''`

Add an additional class to the input.

#### disabled
Type: `Boolean`
Default: `false`

Defines whether the input is disabled.

#### location
Type: `google.maps.LatLng`
Default: `null`

To get localized suggestions, define a location to bias the suggests.

#### radius
Type: `Number`
Default: `0`

The radius defines the area around the location to use for biasing the suggests. It must be accompanied by a `location` parameter.

#### bounds
Type: [`LatLngBounds`](https://developers.google.com/maps/documentation/javascript/reference?csw=1#LatLngBounds)
Default: `null`

The bounds to use for biasing the suggests. If this is set, `location` and `radius` are ignored.

#### country
Type: `String`
Default: `null`

Restricts predictions to the specified country (ISO 3166-1 Alpha-2 country code, case insensitive). E.g., us, br, au.

#### types
Type: `Array`
Default: `null`

Restricts the suggestions against the passed in types. If none are specified, all types are used. Consult the Google Docs for [possible types](https://developers.google.com/places/supported_types).

#### fixtures
Type: `Array`
Default: `[]`

An array with fixtures (defaults). Each fixture has to be an object with a `label` key in it. Optionally provide a `location`, but the Geosuggest will geocode the label if no location is provided.

You can also add a `className` key to a fixture. This class will be applied to the fixture item.

#### googleMaps
Type: `Object`
Default: `google.maps`

In case you want to provide your own Google Maps object, pass it in as googleMaps. The default is the global google maps object.

#### onFocus
Type: `Function`
Default: `function() {}`

Gets triggered when the input field receives focus.

#### onBlur
Type: `Function`
Default: `function() {}`

Gets triggered when input field loses focus.

#### onChange
Type: `Function`
Default: `function(value) {}`

Gets triggered when input field changes the value

#### onSuggestSelect
Type: `Function`
Default: `function(suggest) {}`

Gets triggered when a suggest got selected. Only parameter is an object with data of the selected suggest. This data is available:

* `label` – Type `String` – The label name
* `placeId` – Type `String` – If it is a preset, equals the `label`. Else it is the Google Maps `placeID`
* `location` – Type `Object` – The location containing `lat` and `lng`
* `gmaps` – Type `Object` – *Optional!* The complete response when there was a Google Maps geocode necessary (e.g. no location provided for presets). [Check the Google Maps Reference](https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult) for more information on it’s structure.

#### getSuggestLabel
Type: `Function`
Default: `function(suggest) { return suggest.description; }`

Used to generate a custom label for a suggest. Only parameter is a suggest (google.maps.places.AutocompletePrediction). [Check the Google Maps Reference](https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult) for more information on it’s structure.

#### skipSuggest
Type: `Function`
Default: `function(suggest) {}`

If the function returns true then the suggest will not be included in the displayed results. Only parameter is an object with data of the selected suggest. (See above)

#### autoActivateFirstSuggest
Type: `Boolean`
Default: `false`

Automatically activate the first suggestion as you type. If false, the exact term(s) in the input will be used when searching and may return a result not in the list of suggestions.

#### Others

All standard `input[type="text"]` attributes are allowed. See the [documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) for more information.

### Exposed component functions

#### focus()
Call `focus` to focus on the element. The suggest list will be expanded with the current suggestions.

#### update(value)
It is possible to update the value of the input contained within the GeoSuggest component by calling the `update` function with a new desired `value` of the type String.

#### clear()
It is also possible to clear the value of the input contained within the GeoSuggest component by calling the `clear` function.

### Example

```
var React = require('react'),
  Geosuggest = require('./src/Geosuggest.jsx');

var App = React.createClass({
  /**
   * Render the example app
   */
  render: function() {
    var fixtures = [
      {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
      {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
      {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
    ];

    return (
      <div>
        <Geosuggest
          placeholder="Start typing!"
          initialValue="Hamburg"
          fixtures={fixtures}
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20" />
      </div>
    )
  },

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect: function(suggest) {
    console.log(suggest);
  }
});

React.render(<App />, document.getElementById('app'));
```

## Styling

This component uses [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) for namespacing the CSS classes. So styling should be easy and without conflicts. See the [geosuggest.css](https://github.com/ubilabs/react-geosuggest/blob/master/src/geosuggest.css) for an example styling.


## Contributing

### Development

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

### Deployment

To release & deploy, run the following

```
npm run release:patch|minor|major
```


## License

The MIT License (MIT)
Copyright (c) 2015 Ubilabs <katzki@ubilabs.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
