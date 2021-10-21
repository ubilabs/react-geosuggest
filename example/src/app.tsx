/* global google */
/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from '../../src/Geosuggest';

const App = (): JSX.Element => {
  /**
   * When the input receives focus
   */
  const onFocus = (): void => console.log('onFocus');

  /**
   * When the input loses focus
   */
  const onBlur = (value?: string): void => console.log('onBlur', value);

  /**
   * When the input got changed
   */
  const onChange = (value: string): void =>
    console.log(`input changes to : ${value}`);

  /**
   * When a suggest got selected
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuggestSelect = (suggest: any): void => console.log(suggest);

  /**
   * When there are no suggest results
   */
  const onSuggestNoResults = (userInput: string): void =>
    console.log(`onSuggestNoResults for : ${userInput}`);

  const fixtures = [
    {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
    {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
    {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
  ];

  return (
    <Geosuggest
      label="Geoautocomplete"
      id="geosuggest"
      fixtures={fixtures}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onSuggestSelect={onSuggestSelect}
      onSuggestNoResults={onSuggestNoResults}
      location={new google.maps.LatLng(53.558572, 9.9278215)}
      radius="20"
    />
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
