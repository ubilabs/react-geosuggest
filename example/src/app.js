/* global google */

import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from '../../src/Geosuggest';

class App extends React.Component {
  /**
   * When the input receives focus
   */
  onFocus() {
    console.log('onFocus'); // eslint-disable-line
  }

  /**
   * When the input loses focus
   * @param {String} value The user input
   */
  onBlur(value) {
    console.log('onBlur', value); // eslint-disable-line
  }

  /**
   * When the input got changed
   * @param {String} value The new value
   */
  onChange(value) {
    console.log('input changes to :' + value); // eslint-disable-line
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect(suggest) {
    console.log(suggest); // eslint-disable-line
  }

  /**
   * When there are no suggest results
   * @param {String} userInput The user input
   */
  onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
  }

  /**
   * Render the example app
   * @return {Function} React render function
   */
  render() {
    var fixtures = [
      {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
      {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
      {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
    ];

    return ( // eslint-disable-line
      <div>
        <Geosuggest
          fixtures={fixtures}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          onSuggestNoResults={this.onSuggestNoResults}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app')); // eslint-disable-line
