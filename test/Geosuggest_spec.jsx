import React from 'react'; // eslint-disable-line no-unused-vars
import {expect} from 'chai';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import googleStub from './google_stub';
import Geosuggest from '../src/Geosuggest';

window.google = global.google = googleStub();

describe('Component: Geosuggest', () => {
  let component = null,
    onSuggestSelect = null,
    onActivateSuggest = null,
    onSuggestNoResults = null,
    onFocus = null,
    onKeyDown = null,
    onKeyPress = null,
    onChange = null,
    onBlur = null,
    render = props => {
      onSuggestSelect = sinon.spy();
      onActivateSuggest = sinon.spy();
      onSuggestNoResults = sinon.spy();
      onChange = sinon.spy();
      onFocus = sinon.spy();
      onKeyDown = sinon.spy();
      onKeyPress = sinon.spy();
      onBlur = sinon.spy();

      component = TestUtils.renderIntoDocument(
        <Geosuggest
          radius='20'
          queryDelay={0}
          onSuggestSelect={onSuggestSelect}
          onActivateSuggest={onActivateSuggest}
          onSuggestNoResults={onSuggestNoResults}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
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

    it('should not show any suggestions when the input is empty', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'), // eslint-disable-line max-len, one-var
        suggests = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__suggests'); // eslint-disable-line max-len

      expect(suggestItems.length).to.equal(0);
      expect(suggests[0].classList.contains('geosuggest__suggests--hidden')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
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
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onSuggestSelect` when we type a city name and click on one of the suggestions', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'); // eslint-disable-line max-len, one-var
      TestUtils.Simulate.click(suggestItems[0]);
      expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onActivateSuggest` when we key down to a suggestion', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
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

    it('should call `onKeyDown` when we key press in the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.keyDown(geoSuggestInput);
      expect(onKeyDown.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onKeyPress` when we key press in the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.keyPress(geoSuggestInput);
      expect(onKeyPress.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should clear the input text when calling `clear`', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      component.clear();
      expect(geoSuggestInput.value).to.equal('');
    });

    it('should not change the active suggest while it remains in the list', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'Ne';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.args[0][0].placeId).to.equal(onActivateSuggest.args[0][0].placeId); // eslint-disable-line max-len
    });

    it('should reset the active suggest when it disappears from the list', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'Ne';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      geoSuggestInput.value = '';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onActivateSuggest.args.length).to.be.equal(0); // eslint-disable-line max-len
    });

    it('should deactivate the active suggest when pressing arrow down on the last suggest', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'Ne';
      TestUtils.Simulate.change(geoSuggestInput);

      const geoSuggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'); // eslint-disable-line max-len, one-var
      for (let i = 0; i < geoSuggestItems.length + 1; i++) {
        TestUtils.Simulate.keyDown(geoSuggestInput, {
          key: 'keyDown',
          keyCode: 40,
          which: 40
        });
      }

      const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item--active'); // eslint-disable-line max-len, one-var
      expect(activeItems.length).to.be.equal(0);
    });

    it('should activate the last suggest in the list when pressing arrow up', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len

      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });

      const allItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'), // eslint-disable-line max-len, one-var
        activeItem = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__item--active'); // eslint-disable-line max-len

      expect(activeItem).to.be.equal(allItems[allItems.length - 1]);
    });

    it('should have the focus after calling `focus`', () => {
      component.focus();
      expect(document.activeElement.classList.contains('geosuggest__input')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should not have the focus after calling `blur`', () => {
      component.focus();
      expect(document.activeElement.classList.contains('geosuggest__input')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
      component.blur();
      expect(document.activeElement.classList.contains('geosuggest__input')).to.be.false; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should add external inline `style` to input component', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      expect(geoSuggestInput.style['border-color']).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestList component', () => { // eslint-disable-line max-len
      const geoSuggestList = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__suggests'); // eslint-disable-line max-len
      expect(geoSuggestList.style['border-color']).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestItem component', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      const geoSuggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'); // eslint-disable-line max-len, one-var
      expect(geoSuggestItems[0].style['border-color']).to.be.equal('#000');
    });

    it('should hide the suggestion box when there are no suggestions', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'), // eslint-disable-line max-len
        geoSuggestList = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__suggests'); // eslint-disable-line max-len

      geoSuggestInput.value = 'There is no result for this. Really.';
      TestUtils.Simulate.change(geoSuggestInput);

      expect(geoSuggestList.classList.contains('geosuggest__suggests--hidden')).to.be.true; // eslint-disable-line max-len, no-unused-expressions
    });

    it('should call `onSuggestNoResults` when there are no suggestions', () => {
      const input = component.input,
        geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len

      input.value = 'There is no result for this. Really.';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      expect(onSuggestNoResults.calledOnce).to.be.true;  // eslint-disable-line max-len, no-unused-expressions
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
    const fixtures = [
      {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
      {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
      {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
    ];

    beforeEach(() => render({fixtures}));

    it('should show the fixtures on focus when the input is empty', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'); // eslint-disable-line max-len, one-var
      expect(suggestItems.length).to.equal(fixtures.length);
    });

    it('should filter the fixtures depending on the user input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len

      geoSuggestInput.value = 'Rio';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'); // eslint-disable-line max-len, one-var
      expect(suggests.length).to.be.equal(1);
    });

    it('should fire `onSuggestSelect` when selecting a fixture', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len

      geoSuggestInput.value = 'Rio';
      TestUtils.Simulate.change(geoSuggestInput);
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

    it('should show the fixtures when pressing arrow up', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'), // eslint-disable-line max-len
        suggest = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__suggests'); // eslint-disable-line max-len

      expect(suggest.classList.contains('geosuggest__suggests--hidden')).to.be.true; // eslint-disable-line no-unused-expressions, max-len

      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });

      expect(suggest.classList.contains('geosuggest__suggests--hidden')).to.be.false; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should show a maximum of `maxFixtures` fixtures', () => {
      render({maxFixtures: 2, fixtures});
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'); // eslint-disable-line max-len, one-var
      expect(suggestItems.length).to.equal(2);
    });
  });

  describe('with autoActivateFirstSuggest enabled', () => {
    const props = {
      autoActivateFirstSuggest: true
    };

    beforeEach(() => render(props));

    it('should not activate a suggest before focus', () => {
      const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item--active'); // eslint-disable-line max-len
      expect(activeItems.length).to.be.equal(0);
      expect(onActivateSuggest.called).to.be.false; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should call `onActivateSuggest` when auto-activating the first suggest', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      expect(onActivateSuggest.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should not change the active suggest when it is set already', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      geoSuggestInput.value = 'New York';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      expect(onActivateSuggest.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should activate a suggest once there is some input', done => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item--active'); // eslint-disable-line max-len
        expect(activeItems.length).to.be.equal(1);
        done();
      });
    });
  });

  describe('with label and id props', () => {
    const props = {
      id: 'geosuggest-id',
      label: 'some label'
    };

    beforeEach(() => render(props));

    it('should render a <label> if the `label` and `id` props were supplied', () => { // eslint-disable-line max-len
      const label = TestUtils.findRenderedDOMComponentWithTag(component, 'label'); // eslint-disable-line max-len
      expect(label).to.not.equal(null);
    });
  });

  describe('without label and id props', () => {
    beforeEach(() => render());

    it('should not render a <label> if no `label` and `id` props were supplied', () => { // eslint-disable-line max-len
      expect(() =>
        TestUtils.findRenderedDOMComponentWithTag(component, 'label')
      ).to.throw(Error);
    });
  });

  describe('with suggestsHiddenClassName and suggestItemActiveClassName', () => { // eslint-disable-line max-len
    const props = {
      suggestsHiddenClassName: 'suggests-hidden-class',
      suggestItemActiveClassName: 'suggest-item-active',
      autoActivateFirstSuggest: true
    };

    beforeEach(() => render(props));

    it('should apply suggestsHiddenClassName when the list is hidden', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__suggests'); // eslint-disable-line max-len, one-var
      expect(suggests[0].classList.contains('suggests-hidden-class')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
      expect(suggests[0].classList.contains('geosuggest__suggests--hidden')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should apply suggestItemActiveClassName when a list item is active', done => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'suggest-item-active'); // eslint-disable-line max-len
        expect(activeItems.length).to.be.equal(1);
        expect(activeItems[0].classList.contains('geosuggest__item--active')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        done();
      });
    });
  });

  describe('with suggestsClassName and suggestItemClassName', () => { // eslint-disable-line max-len
    const props = {
      suggestsClassName: 'suggests-class',
      suggestItemClassName: 'suggest-item'
    };

    beforeEach(() => render(props));

    it('should apply suggestsClassName to the list', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__suggests'); // eslint-disable-line max-len, one-var
      expect(suggests[0].classList.contains('suggests-class')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
    });

    it('should apply suggestItemClassName to each list item', done => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const totalItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'suggest-item'), // eslint-disable-line max-len
          itemsWithItemClass = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item'); // eslint-disable-line max-len

        expect(totalItems.length).to.be.equal(itemsWithItemClass.length);
        done();
      });
    });
  });

  describe('with renderSuggestItem with custom fixture attributes', () => {
    const fixtures = [
        {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}, firstName: 'John'} // eslint-disable-line max-len
      ],
      renderSuggestItem = suggest => {
        return <span className="my-custom-suggest-item">
            <span className="my-custom-suggest-item__first-name">
              { suggest.firstName }
            </span>
            <span>{ suggest.label }</span>
          </span>;
      };

    beforeEach(() => render({fixtures, renderSuggestItem}));

    it('should render result of renderSuggestItem into the SuggestItem', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len

      TestUtils.Simulate.focus(geoSuggestInput);

      const wrapper = TestUtils.scryRenderedDOMComponentsWithClass(component, 'my-custom-suggest-item'), // eslint-disable-line one-var, max-len
        innerContent = TestUtils.scryRenderedDOMComponentsWithClass(component, 'my-custom-suggest-item__first-name'); // eslint-disable-line one-var, max-len

      expect(wrapper).to.exist; // eslint-disable-line no-unused-expressions
      expect(innerContent).to.exist; // eslint-disable-line no-unused-expressions, max-len
    });
  });

  describe('with highLightMatch', () => { // eslint-disable-line max-len
    const props = {
      suggestsClassName: 'suggests-class'
    };

    beforeEach(() => render(props));

    it('should highlight matched text', () => { // eslint-disable-line max-len
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(component, 'geosuggest__input'); // eslint-disable-line max-len
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      let matchedText = TestUtils.scryRenderedDOMComponentsWithClass(component, 'geosuggest__item__matched-text'); // eslint-disable-line max-len
      expect(matchedText).to.have.length.of.at.least(1); // eslint-disable-line max-len
    });
  });
});
