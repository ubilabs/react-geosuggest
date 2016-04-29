import React from 'react';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import predictions from './fixtures/predictions';
import Geosuggest from '../src/Geosuggest';


window.google = global.google = {
  'maps': {
    'LatLng': () => true,
    'places': {
      AutocompleteService() {
        return {
          'getPlacePredictions': sinon.stub().callsArgWith(1, predictions())
        };
      }
    },
    Geocoder() {
      return {
        geocode: sinon.stub().callsArgWith(1, [
          {
            geometry: {
              location: {
                lat: () => 0,
                lng: () => 0
              }
            }
          }
        ], 'OK')
      };
    },
    'GeocoderStatus': {
      'OK': 'OK'
    }
  }
};

describe('Component: Geosuggest', () => {

  let component,
    onSuggestSelect,
    onActivateSuggest,
    isLocationCalled,
    isActivateCalled;

  beforeEach(() => {
    isLocationCalled = false;
    isActivateCalled = false;
    onSuggestSelect = () => isLocationCalled = true;
    onActivateSuggest = () => isActivateCalled = true;

    component = TestUtils.renderIntoDocument(
      <Geosuggest
        radius="20"
        onSuggestSelect={onSuggestSelect}
        onActivateSuggest={onActivateSuggest}
      />
    );
  });

  it('should have an input field', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__input');

    expect(input).to.have.lengthOf(1);
  });

  it('should call `onSuggestSelect` when we type a city name and choose some of the suggestions', () => {
    const input = component.refs.input;
    const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input');
    input.value = 'New';
    TestUtils.Simulate.change(geoSuggestInput);
    TestUtils.Simulate.keyDown(geoSuggestInput, {key: "keyDown", keyCode: 40, which: 40});
    TestUtils.Simulate.keyDown(geoSuggestInput, {key: "keyDown", keyCode: 40, which: 40});
    TestUtils.Simulate.keyDown(geoSuggestInput, {key: "Enter", keyCode: 13, which: 13});
    expect(isLocationCalled).to.be.true;
  });

  it('should call `onActivateSuggest` when we key down to a suggestion', () => {
    const input = component.refs.input;
    const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input');
    input.value = 'New';
    TestUtils.Simulate.change(geoSuggestInput);
    TestUtils.Simulate.keyDown(geoSuggestInput, {key: "keyDown", keyCode: 40, which: 40});
    expect(isActivateCalled).to.be.true;
  });

});
