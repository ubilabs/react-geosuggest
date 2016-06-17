import React from 'react'; // eslint-disable-line no-unused-vars
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import googleStub from './google_stub';
import Geosuggest from '../src/Geosuggest';

window.google = global.google = googleStub();

describe('Component: Geosuggest', () => {
  let component = null,
    onSuggestSelect = null,
    onActivateSuggest = null,
    onFocus = null,
    onChange = null,
    onBlur = null,
    render = props => {
      onSuggestSelect = sinon.spy();
      onActivateSuggest = sinon.spy();
      onChange = sinon.spy();
      onFocus = sinon.spy();
      onBlur = sinon.spy();

      component = TestUtils.renderIntoDocument(
        <Geosuggest
          radius='20'
          queryDelay={0}
          onSuggestSelect={onSuggestSelect}
          onActivateSuggest={onActivateSuggest}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            'input': {
              'borderColor': '#000'
            },
            'suggests': {
              'borderColor': '#000'
            },
            'suggestItem': {
              'borderColor': '#000',
              'borderWidth': 1
            }
          }}
          {...props}
        />
      );
    };

  describe('default', () => { // eslint-disable-line max-statements
    beforeEach(() => render());

    it('should have an input field', () => {
      const input = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      expect(input).to.have.lengthOf(1);
    });

    it('should not show any suggestions when the input is empty', done => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest-item'); // eslint-disable-line max-len
        expect(suggestItems.length).to.equal(0);
        done();
      });
    });

    it('should call `onSuggestSelect` when we type a city name and choose some of the suggestions', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onSuggestSelect` when we type a city name and click on one of the suggestions', done => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);

      setImmediate(() => {
        const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest-item'); // eslint-disable-line max-len
        TestUtils.Simulate.click(suggestItems[0]);
        expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        done();
      });
    });

    it('should call `onActivateSuggest` when we key down to a suggestion', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      expect(onActivateSuggest.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onFocus` when we focus the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);
      expect(onFocus.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onBlur` when we remove the focus from the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.blur(geoSuggestInput);
      expect(onBlur.withArgs('New').calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onChange` when we change the input value', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      expect(onChange.withArgs('New').calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onChange` when the update method is called', () => {
      component.update('New');
      expect(onChange.withArgs('New').calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should clear the input text when calling `clear`', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      component.clear();
      expect(geoSuggestInput.value).to.equal('');
    });

    it('should add external inline `style` to input component', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      expect(geoSuggestInput.style['border-color']).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestList component', () => { // eslint-disable-line max-len
      const geoSuggestList = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__suggests'); // eslint-disable-line max-len
      expect(geoSuggestList.style['border-color']).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestItem component', done => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);

      setImmediate(function() {
        const geoSuggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest-item'); // eslint-disable-line max-len
        expect(geoSuggestItems[0].style['border-color']).to.be.equal('#000');
        done();
      });
    });

    it('should hide the suggestion box when there are no suggestions', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'), // eslint-disable-line max-len
        geoSuggestList = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__suggests'), // eslint-disable-line max-len
        classList = geoSuggestList.classList;

      geoSuggestInput.value = 'There is no result for this. Really.';
      TestUtils.Simulate.change(geoSuggestInput);

      expect(classList.contains('geosuggest__suggests--hidden')).to.be.true; // eslint-disable-line max-len, no-unused-expressions
    });

    it('should call onSuggestSelect on enter', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call onSuggestSelect on tab', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 9,
        which: 9
      });
      expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });
  });

  describe('with tab ignored', () => {
    beforeEach(() => render({ignoreTab: true}));

    it('should not call onSuggestSelect on tab', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 9,
        which: 9
      });
      expect(onSuggestSelect.calledOnce).to.be.false; // eslint-disable-line no-unused-expressions, max-len
    });
  });

  describe('with fixtures', () => {
    let fixtures = [
      {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}}
    ];
    beforeEach(() => render({fixtures}));
    it('should show the fixtures when the input is empty', done => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest-item'); // eslint-disable-line max-len
        expect(suggestItems.length).to.equal(fixtures.length);
        done();
      });
    });
  });
});
