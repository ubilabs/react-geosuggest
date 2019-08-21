import React = require('react');
import chai = require('chai');
import TestUtils = require('react-dom/test-utils');
import * as sinon from 'sinon';
import googleStub from './google_stub';
import Geosuggest from '../src/Geosuggest';

const expect = chai.expect;
(window as any).google = (global as any).google = googleStub();

/* tslint:disable:no-unused-expression */

describe('Component: Geosuggest', () => {
  let component: any = null;
  let onSuggestSelect: sinon.SinonSpy = sinon.spy();
  let onActivateSuggest: sinon.SinonSpy = sinon.spy();
  let onSuggestNoResults: sinon.SinonSpy = sinon.spy();
  let onFocus: sinon.SinonSpy = sinon.spy();
  let onKeyDown: sinon.SinonSpy = sinon.spy();
  let onKeyPress: sinon.SinonSpy = sinon.spy();
  let onChange: sinon.SinonSpy = sinon.spy();
  let onBlur: sinon.SinonSpy = sinon.spy();
  const render = (props = {}) => {
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
        radius="20"
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
          input: {
            borderColor: '#000'
          },
          suggestItem: {
            borderColor: '#000',
            borderWidth: 1
          },
          suggests: {
            borderColor: '#000'
          }
        }}
        {...props}
      />
    );
  };

  describe('default', () => {
    beforeEach(() => render());

    it('should have an input field', () => {
      const input = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__input'
      );
      expect(input).to.have.lengthOf(1);
    });

    it('should not show any suggestions when the input is empty', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__suggests'
      );

      expect(suggestItems.length).to.equal(0);
      expect(suggests[0].classList.contains('geosuggest__suggests--hidden')).to
        .be.true;
    });

    it('should call `onSuggestSelect` when we type a city name and choose some of the suggestions', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
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
      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should call `onSuggestSelect` when we type a city name and click on one of the suggestions', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      TestUtils.Simulate.click(suggestItems[0]);
      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should call `onSuggestSelect` when we clear out the selected city', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
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
      expect(onSuggestSelect.calledOnce).to.be.true;
      geoSuggestInput.value = '';
      TestUtils.Simulate.change(geoSuggestInput);
      expect(onSuggestSelect.calledWithExactly()).to.be.true;
    });

    it('should call `onActivateSuggest` when we key down to a suggestion', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      expect(onActivateSuggest.calledOnce).to.be.true;
    });

    it('should call `onFocus` when we focus the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.focus(geoSuggestInput);
      expect(onFocus.calledOnce).to.be.true;
    });

    it('should call `onBlur` when we remove the focus from the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      TestUtils.Simulate.focus(geoSuggestInput);
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.blur(geoSuggestInput);
      expect(onBlur.withArgs('New').calledOnce).to.be.true;
    });

    it('should call `onChange` when we change the input value', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      expect(onChange.withArgs('New').calledOnce).to.be.true;
    });

    it('should call `onChange` when the update method is called', () => {
      component.update('New');
      expect(onChange.withArgs('New').calledOnce).to.be.true;
    });

    it('should call `onKeyDown` when we key press in the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.keyDown(geoSuggestInput);
      expect(onKeyDown.calledOnce).to.be.true;
    });

    it('should call `onKeyPress` when we key press in the input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.keyPress(geoSuggestInput);
      expect(onKeyPress.calledOnce).to.be.true;
    });

    it('should clear the input text when calling `clear`', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      component.clear();
      expect(geoSuggestInput.value).to.equal('');
    });

    it('should not change the active suggest while it remains in the list', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
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
      expect(onSuggestSelect.args[0][0].placeId).to.equal(
        onActivateSuggest.args[0][0].placeId
      );
    });

    it('should reset the active suggest when it disappears from the list', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New York';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      geoSuggestInput.value = 'London';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.args[0][0].placeId).to.not.equal(
        onActivateSuggest.args[0][0].placeId
      );
    });

    it('should deactivate the active suggest when pressing arrow down on the last suggest', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'Ne';
      TestUtils.Simulate.change(geoSuggestInput);

      const geoSuggestItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      for (let i = 0; i < geoSuggestItems.length + 1; i++) {
        TestUtils.Simulate.keyDown(geoSuggestInput, {
          key: 'keyDown',
          keyCode: 40,
          which: 40
        });
      }

      const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item--active'
      );
      expect(activeItems.length).to.be.equal(0);
    });

    it('should activate the last suggest in the list when pressing arrow up', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;

      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });

      const allItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      const activeItem = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__item--active'
      );

      expect(activeItem).to.be.equal(allItems[allItems.length - 1]);
    });

    it('should have the focus after calling `focus`', () => {
      component.focus();
      expect(document.activeElement!.classList.contains('geosuggest__input')).to
        .be.true;
    });

    it('should not have the focus after calling `blur`', () => {
      component.focus();
      expect(document.activeElement!.classList.contains('geosuggest__input')).to
        .be.true;
      component.blur();
      expect(document.activeElement!.classList.contains('geosuggest__input')).to
        .be.false;
    });

    it('should add external inline `style` to input component', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      expect(geoSuggestInput.style.borderColor).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestList component', () => {
      const geoSuggestList = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__suggests'
      ) as HTMLInputElement;
      expect(geoSuggestList.style.borderColor).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestItem component', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      const geoSuggestItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      ) as HTMLLIElement[];
      expect(geoSuggestItems[0].style.borderColor).to.be.equal('#000');
    });

    it('should hide the suggestion box when there are no suggestions', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      const geoSuggestList = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__suggests'
      ) as HTMLUListElement;

      geoSuggestInput.value = 'There is no result for this. Really.';
      TestUtils.Simulate.change(geoSuggestInput);

      expect(geoSuggestList.classList.contains('geosuggest__suggests--hidden'))
        .to.be.true;
    });

    it('should call `onSuggestNoResults` when there are no suggestions', () => {
      const input = component.input;
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );

      input.value = 'There is no result for this. Really.';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      expect(onSuggestNoResults.called).to.be.true;
    });

    it('should call onSuggestSelect on enter', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should call onSuggestSelect on tab', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 9,
        which: 9
      });
      expect(onSuggestSelect.calledOnce).to.be.true;
    });
  });

  describe('with tab ignored', () => {
    beforeEach(() => render({ignoreTab: true}));

    it('should not call onSuggestSelect on tab', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 9,
        which: 9
      });
      expect(onSuggestSelect.calledOnce).to.be.false;
    });
  });

  describe('with enter ignored', () => {
    beforeEach(() => render({ignoreEnter: true}));

    it('should not call onSuggestSelect on enter', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.false;
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
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      expect(suggestItems.length).to.equal(fixtures.length);
    });

    it('should filter the fixtures depending on the user input', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;

      geoSuggestInput.value = 'Rio';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      expect(suggests.length).to.be.equal(1);
    });

    it('should fire `onSuggestSelect` when selecting a fixture', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;

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

      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should show the fixtures when pressing arrow up', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      const suggest = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__suggests'
      );

      expect(suggest.classList.contains('geosuggest__suggests--hidden')).to.be
        .true;

      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });

      expect(suggest.classList.contains('geosuggest__suggests--hidden')).to.be
        .false;
    });

    it('should show a maximum of `maxFixtures` fixtures', () => {
      render({maxFixtures: 2, fixtures});
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggestItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      expect(suggestItems.length).to.equal(2);
    });
  });

  describe('with autoActivateFirstSuggest enabled', () => {
    const props = {
      autoActivateFirstSuggest: true
    };

    beforeEach(() => render(props));

    it('should not activate a suggest before focus', () => {
      const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item--active'
      );
      expect(activeItems.length).to.be.equal(0);
      expect(onActivateSuggest.called).to.be.false;
    });

    it('should call `onActivateSuggest` when auto-activating the first suggest', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      expect(onActivateSuggest.calledOnce).to.be.true;
    });

    it('should not change the active suggest when it is set already', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      geoSuggestInput.value = 'New York';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      expect(onActivateSuggest.calledOnce).to.be.true;
    });

    it('should activate a suggest once there is some input', done => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'geosuggest__item--active'
        );
        expect(activeItems.length).to.be.equal(1);
        done();
      });
    });
  });

  describe('with autoActivateFirstSuggest and fixtures enabled', () => {
    const props = {
      autoActivateFirstSuggest: true,
      fixtures: [{label: 'New Yorrrrk'}]
    };

    beforeEach(() => render(props));

    it('should select the first suggest on `selectSuggest`', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);

      component.selectSuggest();

      expect(
        onSuggestSelect.calledWithMatch((value: any) => {
          return value.label === props.fixtures[0].label;
        })
      ).to.be.true;
    });
  });

  describe('with label and id props', () => {
    const props = {
      id: 'geosuggest-id',
      label: 'some label'
    };

    beforeEach(() => render(props));

    it('should render a <label> if the `label` and `id` props were supplied', () => {
      const label = TestUtils.findRenderedDOMComponentWithTag(
        component,
        'label'
      );
      expect(label).to.not.equal(null);
    });
  });

  describe('without label and id props', () => {
    beforeEach(() => render());

    it('should not render a <label> if no `label` and `id` props were supplied', () => {
      expect(() =>
        TestUtils.findRenderedDOMComponentWithTag(component, 'label')
      ).to.throw(Error);
    });
  });

  describe('with suggestsHiddenClassName and suggestItemActiveClassName', () => {
    const props = {
      autoActivateFirstSuggest: true,
      suggestItemActiveClassName: 'suggest-item-active',
      suggestsHiddenClassName: 'suggests-hidden-class'
    };

    beforeEach(() => render(props));

    it('should apply suggestsHiddenClassName when the list is hidden', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__suggests'
      );
      expect(suggests[0].classList.contains('suggests-hidden-class')).to.be
        .true;
      expect(suggests[0].classList.contains('geosuggest__suggests--hidden')).to
        .be.true;
    });

    it('should apply suggestItemActiveClassName when a list item is active', done => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const activeItems = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'suggest-item-active'
        );
        expect(activeItems.length).to.be.equal(1);
        expect(activeItems[0].classList.contains('geosuggest__item--active')).to
          .be.true;
        done();
      });
    });
  });

  describe('with suggestsClassName and suggestItemClassName', () => {
    const props = {
      suggestItemClassName: 'suggest-item',
      suggestsClassName: 'suggests-class'
    };

    beforeEach(() => render(props));

    it('should apply suggestsClassName to the list', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );
      TestUtils.Simulate.focus(geoSuggestInput);

      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__suggests'
      );
      expect(suggests[0].classList.contains('suggests-class')).to.be.true;
    });

    it('should apply suggestItemClassName to each list item', done => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      setImmediate(() => {
        const totalItems = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'suggest-item'
        );
        const itemsWithItemClass = TestUtils.scryRenderedDOMComponentsWithClass(
          component,
          'geosuggest__item'
        );

        expect(totalItems.length).to.be.equal(itemsWithItemClass.length);
        done();
      });
    });
  });

  describe('with onUpdateSuggests', () => {
    const props = {
      onUpdateSuggests: sinon.spy()
    };

    beforeEach(() => render(props));

    it('should call onUpdateSuggests when input onChange is triggered', done => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New York City';
      TestUtils.Simulate.change(geoSuggestInput);

      setImmediate(() => {
        expect(props.onUpdateSuggests.calledOnce).to.be.true;
        done();
      });
    });
  });

  describe('with updateSuggests', () => {
    const props = {
      fixtures: [
        {
          placeId: '123456789',
          label: 'Location1',
          isFixture: true,
          location: {lat: 46, lng: -71},
          locationId: 123456789,
          className: 'fixture'
        },
        {
          label: 'Location2',
          isFixture: true,
          location: {lat: 46, lng: -71},
          locationId: 123456789,
          className: 'fixture'
        }
      ]
    };

    beforeEach(() => {
      render(props);
      component.updateSuggests();
    });

    it('should set suggest.placeId to fixture.placeId if fixture.placeId is defined', () => {
      expect(component.state.suggests[0].placeId).to.equal(
        props.fixtures[0].placeId
      );
    });

    it('should set suggest.placeId to fixture.label if fixture.placeId is not defined', () => {
      expect(component.state.suggests[1].placeId).to.equal(
        props.fixtures[1].label
      );
    });

    it('should set suggest.locationId to fixture.locationId if fixture.locationId is defined', () => {
      expect(component.state.suggests[0].locationId).to.equal(
        props.fixtures[0].locationId
      );
    });
  });

  describe('with renderSuggestItem with custom fixture attributes', () => {
    const fixtures = [
      {
        firstName: 'John',
        label: 'New York',
        location: {lat: 40.7033127, lng: -73.979681}
      }
    ];
    const renderSuggestItem = (suggest: any) => {
      return (
        <span className="my-custom-suggest-item">
          <span className="my-custom-suggest-item__first-name">
            {suggest.firstName}
          </span>
          <span>{suggest.label}</span>
        </span>
      );
    };

    beforeEach(() => render({fixtures, renderSuggestItem}));

    it('should render result of renderSuggestItem into the SuggestItem', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      );

      TestUtils.Simulate.focus(geoSuggestInput);

      const wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'my-custom-suggest-item'
      );
      const innerContent = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'my-custom-suggest-item__first-name'
      );

      expect(wrapper).to.exist;
      expect(innerContent).to.exist;
    });
  });

  describe('with highLightMatch', () => {
    const props = {
      suggestsClassName: 'suggests-class'
    };

    beforeEach(() => render(props));

    it('should highlight matched text', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      const matchedText = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf.at.least(1);
    });

    it('should render a match with minial nodes', () => {
      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'Newa';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);

      const geoSuggestItems = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      expect(geoSuggestItems).to.have.lengthOf(1);
      expect(geoSuggestItems[0].childNodes).to.have.lengthOf(1);
      expect(geoSuggestItems[0].childNodes[0].childNodes).to.have.lengthOf(3);
    });
  });

  describe('with minLength', () => {
    it('should not search for predictions when the input value is less than the minLength', () => {
      const props = {
        minLength: 5
      };
      render(props);

      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      const matchedText = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf(0);
    });

    it('should search for predictions when the input value is one character and minLength prop was not specified', () => {
      render();

      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      const matchedText = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf.at.least(1);
    });

    it('should search for predictions when the input value is greater than the minLength prop specified', () => {
      const props = {
        minLength: 3
      };
      render(props);

      const geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New York';
      TestUtils.Simulate.change(geoSuggestInput);
      TestUtils.Simulate.focus(geoSuggestInput);
      const matchedText = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf.at.least(1);
    });
  });

  describe('accessibility', () => {
    let geoSuggestInput: HTMLInputElement;
    beforeEach(() => {
      render();

      geoSuggestInput = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.value = 'New';
      TestUtils.Simulate.change(geoSuggestInput);
    });

    it('should add aria-selected for the active suggestion', () => {
      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__item'
      );
      expect(suggests[0].getAttribute('aria-selected')).to.equal('false');

      TestUtils.Simulate.focus(geoSuggestInput);
      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      expect(suggests[0].getAttribute('aria-selected')).to.equal('true');
    });

    it('should set aria-expanded to false when suggestions are hidden', () => {
      expect(geoSuggestInput.getAttribute('aria-expanded')).to.equal('true');

      TestUtils.Simulate.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });

      expect(geoSuggestInput.getAttribute('aria-expanded')).to.equal('false');
    });

    it('should have aria-owns attribute set to the list id', () => {
      const suggests = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'geosuggest__suggests'
      );

      const listId = suggests[0].getAttribute('id');

      expect(geoSuggestInput.getAttribute('aria-owns')).to.equal(listId);
    });
  });
});
