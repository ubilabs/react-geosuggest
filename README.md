# React Geosuggest [![Build Status](https://travis-ci.org/ubilabs/react-geosuggest.svg?branch=master)](https://travis-ci.org/ubilabs/react-geosuggest)

A [React](http://facebook.github.io/react/) autosuggest for the Google Maps Places API. You can also define your own suggests as defaults. Works with [Preact](https://github.com/developit/preact), too.


## Demo

Live demo: [ubilabs.github.io/react-geosuggest](http://ubilabs.github.io/react-geosuggest/)


## Installation

As this component uses the Google Maps Places API to get suggests, you must include the Google Maps Places API in the `<head>` of your HTML:

```html
<!DOCTYPE html>
  <html>
  <head>
    …
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places"></script>
  </head>
  <body>
    …
  </body>
</html>
```

Visit the [Google Developer Console](https://console.developers.google.com) to generate your API key. The API's that you have to enable in your Google API Manager Dashboard are [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start), [Google Places API Web Service](https://developers.google.com/places/web-service/) and [Google Maps Javascript API] (https://developers.google.com/maps/documentation/javascript/).

The easiest way to use geosuggest is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-geosuggest.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```sh
npm install react-geosuggest --save
```

## Usage

The Geosuggest works out of the box by just including it. However, you can customize the behaviour with the properties noted below.

### ES6:

```js
import Geosuggest from 'react-geosuggest';

<Geosuggest />
```

### ES5:

```js
var Geosuggest = require('react-geosuggest').default;

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

#### style
Type: `Object`
Default: `{
  'input': {},
  'suggests': {},
  'suggestItem': {}
}`

Add an additional style to `Geosuggest`.
This would support overriding/adding styles to the input suggestList and suggestItem.

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
Type: `String` | `Array<String>`
Default: `null`

Restricts predictions to the specified country (ISO 3166-1 Alpha-2 country code, case insensitive). E.g., us, br, au.

#### types
Type: `Array`
Default: `null`

The types of predictions to be returned. Four types are supported: `establishment` for businesses, `geocode` for addresses, `(regions)` for administrative regions and `(cities)` for localities. If nothing is specified, all types are returned. Consult the Google Docs for [up to date types](https://developers.google.com/maps/documentation/javascript/reference#AutocompletionRequest).

#### fixtures
Type: `Array`
Default: `[]`

An array with fixtures (defaults). Each fixture has to be an object with a `label` key in it. Optionally provide a `location`, but the Geosuggest will geocode the label if no location is provided.

You can also add a `className` key to a fixture. This class will be applied to the fixture item.

#### googleMaps
Type: `Object`
Default: `google.maps`

In case you want to provide your own Google Maps object, pass it in as googleMaps. The default is the global google maps object.

#### ignoreTab
Type: `Boolean`
Default: `false`

When the tab key is pressed, the `onSelect` handler is invoked. Set to true to not invoke `onSelect` on tab press.

#### queryDelay
Type: `Number`
Default: `250`

Sets the delay in milliseconds after typing before a request will be sent to find suggestions.
Specify `0` if you wish to fetch suggestions after every keystroke.

#### onFocus
Type: `Function`
Default: `function() {}`

Gets triggered when the input field receives focus.

#### onBlur
Type: `Function`
Default: `function(value) {}`

Gets triggered when input field loses focus.

#### onChange
Type: `Function`
Default: `function(value) {}`

Gets triggered when input field changes the value.

#### onKeyPress
Type: `Function`
Default: `function(event) {}`

Gets triggered when input field gets key press.

#### onSuggestSelect
Type: `Function`
Default: `function(suggest) {}`

Gets triggered when a suggest got selected. Only parameter is an object with data of the selected suggest. This data is available:

* `label` – Type `String` – The label name
* `placeId` – Type `String` – If it is a preset, equals the `label`. Else it is the Google Maps `placeID`
* `location` – Type `Object` – The location containing `lat` and `lng`
* `gmaps` – Type `Object` – *Optional!* The complete response when there was a Google Maps geocode necessary (e.g. no location provided for presets). [Check the Google Maps Reference](https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult) for more information on it’s structure.

#### onActivateSuggest
Type: `Function`
Default: `function(suggest) {}`

Gets triggered when a suggest is activated in the list. Only parameter is an object with data of the selected suggest. This data is available:

* `label` – Type `String` – The label name
* `placeId` – Type `String` – If it is a preset, equals the `label`. Else it is the Google Maps `placeID`

#### onSuggestNoResults
Type: `Function`
Default: `function(userInput) {}`

Gets triggered when there are no suggest results found

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

#### label
Type: `String`
Default: `null`

If the `label` and a `id` prop (see "Others") were supplied, a `<label>` tag with the passed label text will be rendered. The `<label>` element's `for` attribute will correctly point to the `id` of the `<input>` element.

#### suggestsClassName
Type: `String`
Default: `''`

Add an additional class to suggest list.

#### suggestsHiddenClassName
Type: `String`
Default: `null`

Additional `className` to toggle as the list of suggestions changes visibility.

#### suggestItemClassName
Type: `String`
Default: `''`

Add an additional class to suggest item.

#### suggestItemActiveClassName
Type: `String`,
Default: `null`

Additional `className` to add when a suggestion item is active.

#### Others

All [allowed attributes for `input[type="text"]`](https://github.com/ubilabs/react-geosuggest/blob/master/src/filter-input-attributes.js#L4)
All [DOM clipboard events](https://facebook.github.io/react/docs/events.html#clipboard-events).  
All [DOM mouse events](https://facebook.github.io/react/docs/events.html#mouse-events) except for drag & drop.


### Exposed component functions
These functions are accessible by setting "ref" on the component (see example below)

#### focus()
Call `focus` to focus on the element. The suggest list will be expanded with the current suggestions.

#### blur()
Call `blur` to blur (unfocus) the element. The suggest list will be closed.

#### update(value)
It is possible to update the value of the input contained within the GeoSuggest component by calling the `update` function with a new desired `value` of the type String.

#### clear()
It is also possible to clear the value of the input contained within the GeoSuggest component by calling the `clear` function.

### Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';

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
          ref={el=>this._geoSuggest=el}
          placeholder="Start typing!"
          initialValue="Hamburg"
          fixtures={fixtures}
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20" />

        {* Buttons to trigger exposed component functions *}
        <button onClick={()=>this._geoSuggest.focus()}>Focus</button>
        <button onClick={()=>this._geoSuggest.update('New Zeland')}>Update</button>
        <button onClick={()=>this._geoSuggest.clear()}>Clear</button>
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

ReactDOM.render(<App />, document.getElementById('app'));
```

## Styling

This component uses [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) for namespacing the CSS classes. So styling should be easy and without conflicts. See the [geosuggest.css](https://github.com/ubilabs/react-geosuggest/blob/master/src/geosuggest.css) for an example styling.

### Note:

The `geosuggest__suggests--hidden` class is added to hide the suggestion list. You should copy the style below into your CSS file.
```css
.geosuggest__suggests--hidden {
  max-height: 0;
  overflow: hidden;
  border-width: 0;
}
```
The above class is added whenever the suggestion list needs to be hidden. This occurs when the user selects an item from the list or when the user triggers the `blur` event on the input.

Similarly, you need to have the class `geosuggest__item--active` similar to this:
```css
.geosuggest__item--active {
  background: #267dc0;
  color: #fff;
}
```
to see what item is selected, f.ex. when using the arrow keys to navigate the suggestion list.

## Contributing

Issues and pull requests are welcome!  
Please read the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md) before starting to work on a PR.

## License

See [LICENSE.md](LICENSE.md)
