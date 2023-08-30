/* eslint-disable max-statements, no-unused-expressions */

import React = require('react');
import chai = require('chai');
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react';
import * as sinon from 'sinon';
import googleStub from './google_stub';
import Geosuggest from '../src/Geosuggest';

const expect = chai.expect;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).google = (global as any).google = googleStub();

describe('Component: Geosuggest', () => {
  // eslint-disable-next-line init-declarations
  let component: RenderResult;
  let geosuggestRef = React.createRef<Geosuggest>();
  let onSuggestSelect: sinon.SinonSpy = sinon.spy();
  let onActivateSuggest: sinon.SinonSpy = sinon.spy();
  let onSuggestNoResults: sinon.SinonSpy = sinon.spy();
  let onFocus: sinon.SinonSpy = sinon.spy();
  let onKeyDown: sinon.SinonSpy = sinon.spy();
  let onKeyPress: sinon.SinonSpy = sinon.spy();
  let onChange: sinon.SinonSpy = sinon.spy();
  let onBlur: sinon.SinonSpy = sinon.spy();

  const renderGeosuggest = (props = {}): void => {
    geosuggestRef = React.createRef<Geosuggest>();
    onSuggestSelect = sinon.spy();
    onActivateSuggest = sinon.spy();
    onSuggestNoResults = sinon.spy();
    onChange = sinon.spy();
    onFocus = sinon.spy();
    onKeyDown = sinon.spy();
    onKeyPress = sinon.spy();
    onBlur = sinon.spy();

    component = render(
      <Geosuggest
        ref={geosuggestRef}
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
    beforeEach(() => renderGeosuggest());

    it('should have an input field', () => {
      const inputs =
        component.container.getElementsByClassName('geosuggest__input');
      expect(inputs).to.have.lengthOf(1);
    });

    it('should not show any suggestions when the input is empty', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.focus();

      const suggestItems =
        component.container.getElementsByClassName('geosuggest__item');
      const suggests = component.container.getElementsByClassName(
        'geosuggest__suggests'
      );

      expect(suggestItems.length).to.equal(0);
      expect(suggests[0].classList.contains('geosuggest__suggests--hidden')).to
        .be.true;
    });

    it('should call `onSuggestSelect` when we type a city name and choose some of the suggestions', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should call `onSuggestSelect` when we type a city name and click on one of the suggestions', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      const suggestItems =
        component.container.getElementsByClassName('geosuggest__item');
      fireEvent.click(suggestItems[0]);
      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should call `onSuggestSelect` when we clear out the selected city', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.true;

      fireEvent.change(geoSuggestInput, {target: {value: ''}});
      expect(onSuggestSelect.calledWithExactly()).to.be.true;
    });

    it('should call `onActivateSuggest` when we key down to a suggestion', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      expect(onActivateSuggest.calledOnce).to.be.true;
    });

    it('should call `onFocus` when we focus the input', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.focus();
      expect(onFocus.calledOnce).to.be.true;
    });

    it('should call `onBlur` when we remove the focus from the input', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.focus();
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.blur();
      expect(onBlur.withArgs('New').calledOnce).to.be.true;
    });

    it('should call `onChange` when we change the input value', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      expect(onChange.withArgs('New').calledOnce).to.be.true;
    });

    it('should call `onChange` when the update method is called', () => {
      geosuggestRef.current?.update('New');
      expect(onChange.withArgs('New').calledOnce).to.be.true;
    });

    it('should call `onKeyDown` when we key press in the input', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.keyDown(geoSuggestInput);
      expect(onKeyDown.calledOnce).to.be.true;
    });

    it('should call `onKeyPress` when we key press in the input', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.keyPress(geoSuggestInput, {charCode: 40});
      expect(onKeyPress.calledOnce).to.be.true;
    });

    it('should clear the input text when calling `clear`', async () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geosuggestRef.current?.clear();

      await waitFor(() => expect(geoSuggestInput.value).to.equal(''));
    });

    it('should not change the active suggest while it remains in the list', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'Ne'}});
      geoSuggestInput.focus();
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.args[0][0].placeId).to.equal(
        onActivateSuggest.args[0][0].placeId
      );
    });

    it('should reset the active suggest when it disappears from the list', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New York'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      fireEvent.change(geoSuggestInput, {target: {value: 'London'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.args[0][0].placeId).to.not.equal(
        onActivateSuggest.args[0][0].placeId
      );
    });

    it('should deactivate the active suggest when pressing arrow down on the last suggest', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'Ne'}});

      const geoSuggestItems =
        component.container.getElementsByClassName('geosuggest__item');
      for (let i = 0; i < geoSuggestItems.length + 1; i++) {
        fireEvent.keyDown(geoSuggestInput, {
          key: 'keyDown',
          keyCode: 40,
          which: 40
        });
      }

      const activeItems = component.container.getElementsByClassName(
        'geosuggest__item--active'
      );
      expect(activeItems.length).to.be.equal(0);
    });

    it('should activate the last suggest in the list when pressing arrow up', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;

      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });

      const allItems =
        component.container.getElementsByClassName('geosuggest__item');
      const activeItem = component.container.querySelector(
        '.geosuggest__item--active'
      );

      expect(activeItem).to.be.equal(allItems[allItems.length - 1]);
    });

    // @TODO activeElement is somehow not set in new jsdom, even when setting a tabIndex.
    it('should have the focus after calling `focus`', () => {
      geosuggestRef.current?.focus();
      expect(document.activeElement!.classList.contains('geosuggest__input')).to
        .be.true;
    });

    it('should not have the focus after calling `blur`', () => {
      geosuggestRef.current?.focus();
      expect(document.activeElement!.classList.contains('geosuggest__input')).to
        .be.true;
      geosuggestRef.current?.blur();
      expect(document.activeElement!.classList.contains('geosuggest__input')).to
        .be.false;
    });

    it('should add external inline `style` to input component', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      expect(geoSuggestInput.style.borderColor).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestList component', () => {
      const geoSuggestList = component.container.querySelector(
        '.geosuggest__suggests'
      ) as HTMLUListElement;
      expect(geoSuggestList.style.borderColor).to.be.equal('#000');
    });

    it('should add external inline `style` to suggestItem component', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      const geoSuggestItems = component.container.getElementsByClassName(
        'geosuggest__item'
      ) as HTMLCollectionOf<HTMLLIElement>;
      expect(geoSuggestItems[0].style.borderColor).to.be.equal('#000');
    });

    it('should hide the suggestion box when there are no suggestions', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      const geoSuggestList = component.container.querySelector(
        '.geosuggest__suggests'
      ) as HTMLUListElement;

      fireEvent.change(geoSuggestInput, {
        target: {value: 'There is no result for this. Really.'}
      });

      expect(geoSuggestList.classList.contains('geosuggest__suggests--hidden'))
        .to.be.true;
    });

    it('should call `onSuggestNoResults` when there are no suggestions', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;

      fireEvent.change(geoSuggestInput, {
        target: {value: 'There is no result for this. Really.'}
      });
      geoSuggestInput.focus();

      expect(onSuggestNoResults.called).to.be.true;
    });

    it('should call onSuggestSelect on enter', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should call onSuggestSelect on tab', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 9,
        which: 9
      });
      expect(onSuggestSelect.calledOnce).to.be.true;
    });
  });

  describe('with tab ignored', () => {
    beforeEach(() => renderGeosuggest({ignoreTab: true}));

    it('should not call onSuggestSelect on tab', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 9,
        which: 9
      });
      expect(onSuggestSelect.calledOnce).to.be.false;
    });
  });

  describe('with enter ignored', () => {
    beforeEach(() => renderGeosuggest({ignoreEnter: true}));

    it('should not call onSuggestSelect on enter', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Tab',
        keyCode: 13,
        which: 13
      });
      expect(onSuggestSelect.calledOnce).to.be.false;
    });
  });

  describe('with data attribute', () => {
    const myId = 'my ID';
    beforeEach(() => renderGeosuggest({'data-id': myId}));

    it('should add any data attribute to the input', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      expect(geoSuggestInput.dataset.id).to.equal(myId);
    });
  });

  describe('with fixtures', () => {
    const fixtures = [
      {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
      {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
      {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
    ];

    beforeEach(() => renderGeosuggest({fixtures}));

    it('should show the fixtures on focus when the input is empty', async () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;

      geoSuggestInput.focus();

      await waitFor(() => {
        const suggestItems =
          component.container.getElementsByClassName('geosuggest__item');
        expect(suggestItems.length).to.equal(fixtures.length);
      });
    });

    it('should filter the fixtures depending on the user input', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;

      fireEvent.change(geoSuggestInput, {target: {value: 'Rio'}});
      geoSuggestInput.focus();

      const suggests =
        component.container.getElementsByClassName('geosuggest__item');
      expect(suggests.length).to.be.equal(1);
    });

    it('should fire `onSuggestSelect` when selecting a fixture', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;

      fireEvent.change(geoSuggestInput, {target: {value: 'Rio'}});
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      fireEvent.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });

      expect(onSuggestSelect.calledOnce).to.be.true;
    });

    it('should show the fixtures when pressing arrow up', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      const suggest = component.container.querySelector(
        '.geosuggest__suggests'
      ) as HTMLUListElement;

      expect(suggest.classList.contains('geosuggest__suggests--hidden')).to.be
        .true;

      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyUp',
        keyCode: 38,
        which: 38
      });

      expect(suggest.classList.contains('geosuggest__suggests--hidden')).to.be
        .false;
    });

    it('should show a maximum of `maxFixtures` fixtures', async () => {
      renderGeosuggest({maxFixtures: 2, fixtures});

      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.focus();

      await waitFor(() => {
        const suggestItems =
          component.container.getElementsByClassName('geosuggest__item');
        expect(suggestItems.length).to.equal(2);
      });
    });
  });

  describe('with autoActivateFirstSuggest enabled', () => {
    const props = {
      autoActivateFirstSuggest: true
    };

    beforeEach(() => renderGeosuggest(props));

    it('should not activate a suggest before focus', () => {
      const activeItems = component.container.getElementsByClassName(
        'geosuggest__item--active'
      );
      expect(activeItems.length).to.be.equal(0);
      expect(onActivateSuggest.called).to.be.false;
    });

    it('should call `onActivateSuggest` when auto-activating the first suggest', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      expect(onActivateSuggest.calledOnce).to.be.true;
    });

    it('should not change the active suggest when it is set already', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      fireEvent.change(geoSuggestInput, {target: {value: 'New York'}});
      geoSuggestInput.focus();

      expect(onActivateSuggest.calledOnce).to.be.true;
    });

    it('should activate a suggest once there is some input', (done) => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      setImmediate(() => {
        const activeItems = component.container.getElementsByClassName(
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

    beforeEach(() => renderGeosuggest(props));

    it('should select the first suggest on `selectSuggest`', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});

      geosuggestRef.current?.selectSuggest(null);

      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuggestSelect.calledWithMatch((value: any) => {
          return value.label === props.fixtures[0].label;
        })
      ).to.be.true;
    });
  });

  describe('with label and id props', () => {
    it('should render a <label> if the `label` and `id` props were supplied', () => {
      const props = {
        id: 'geosuggest-id',
        label: 'some label'
      };

      renderGeosuggest(props);

      const label = component.container.querySelector('label');

      expect(label).to.not.be.null;
    });

    it('should render a <label> pointing to the input if `label` and `id` props were supplied', () => {
      const props = {
        id: 'geosuggest-id',
        label: 'some label'
      };

      render(props);

      const label = TestUtils.findRenderedDOMComponentWithTag(
        component,
        'label'
      ).attributes.getNamedItem('for')?.value;

      const input = TestUtils.findRenderedDOMComponentWithTag(
        component,
        'input'
      ).id;

      expect(label).to.be.equal(input);
    });
  });

  describe('without label and id props', () => {
    beforeEach(() => renderGeosuggest());

    it('should not render a <label> if no `label` and `id` props were supplied', () => {
      const label = component.container.querySelector('label');
      expect(label).to.be.null;
    });
  });

  describe('with suggestsHiddenClassName and suggestItemActiveClassName', () => {
    const props = {
      autoActivateFirstSuggest: true,
      suggestItemActiveClassName: 'suggest-item-active',
      suggestsHiddenClassName: 'suggests-hidden-class'
    };

    beforeEach(() => renderGeosuggest(props));

    it('should apply suggestsHiddenClassName when the list is hidden', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.focus();

      const suggests = component.container.getElementsByClassName(
        'geosuggest__suggests'
      );
      expect(suggests[0].classList.contains('suggests-hidden-class')).to.be
        .true;
      expect(suggests[0].classList.contains('geosuggest__suggests--hidden')).to
        .be.true;
    });

    it('should apply suggestItemActiveClassName when a list item is active', (done) => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      setImmediate(() => {
        const activeItems = component.container.getElementsByClassName(
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

    beforeEach(() => renderGeosuggest(props));

    it('should apply suggestsClassName to the list', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.focus();

      const suggests = component.container.getElementsByClassName(
        'geosuggest__suggests'
      );
      expect(suggests[0].classList.contains('suggests-class')).to.be.true;
    });

    it('should apply suggestItemClassName to each list item', (done) => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      setImmediate(() => {
        const totalItems =
          component.container.getElementsByClassName('suggest-item');
        const itemsWithItemClass =
          component.container.getElementsByClassName('geosuggest__item');

        expect(totalItems.length).to.be.equal(itemsWithItemClass.length);
        done();
      });
    });
  });

  describe('with onUpdateSuggests', () => {
    const props = {
      onUpdateSuggests: sinon.spy()
    };

    beforeEach(() => renderGeosuggest(props));

    it('should call onUpdateSuggests when input onChange is triggered', (done) => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New York City'}});

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
          className: 'fixture',
          isFixture: true,
          label: 'Location1',
          location: {lat: 46, lng: -71},
          placeId: '123456789'
        },
        {
          className: 'fixture',
          isFixture: true,
          label: 'Location2',
          location: {lat: 46, lng: -71}
        }
      ]
    };
    beforeEach(() => {
      renderGeosuggest(props);
    });

    it('should set suggest.placeId to fixture.placeId if fixture.placeId is defined', async () => {
      geosuggestRef.current?.updateSuggests();

      await waitFor(() =>
        expect(geosuggestRef.current?.state.suggests[0].placeId).to.equal(
          props.fixtures[0].placeId
        )
      );
    });

    it('should set suggest.placeId to fixture.label if fixture.placeId is not defined', async () => {
      geosuggestRef.current?.updateSuggests();

      await waitFor(() =>
        expect(geosuggestRef.current?.state.suggests[1].placeId).to.equal(
          props.fixtures[1].label
        )
      );
    });

    it('should set suggest.locationId to fixture.locationId if fixture.locationId is defined', async () => {
      geosuggestRef.current?.updateSuggests();

      await waitFor(() =>
        expect(geosuggestRef.current?.state.suggests[0].location).to.equal(
          props.fixtures[0].location
        )
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderSuggestItem = (suggest: any): JSX.Element => {
      return (
        <span className="my-custom-suggest-item">
          <span className="my-custom-suggest-item__first-name">
            {suggest.firstName}
          </span>
          <span>{suggest.label}</span>
        </span>
      );
    };

    beforeEach(() => renderGeosuggest({fixtures, renderSuggestItem}));

    it('should render result of renderSuggestItem into the SuggestItem', async () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      geoSuggestInput.focus();

      await waitFor(() => {
        const wrapper = component.container.querySelector(
          '.my-custom-suggest-item'
        );
        const innerContent = component.container.querySelector(
          '.my-custom-suggest-item__first-name'
        );

        expect(wrapper).to.exist;
        expect(innerContent).to.exist;
      });
    });
  });

  describe('with highLightMatch', () => {
    const props = {
      suggestsClassName: 'suggests-class'
    };

    beforeEach(() => renderGeosuggest(props));

    it('should highlight matched text', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      const matchedText = component.container.getElementsByClassName(
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf.at.least(1);
    });

    it('should render a match with minial nodes', () => {
      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'Newa'}});
      geoSuggestInput.focus();

      const geoSuggestItems =
        component.container.getElementsByClassName('geosuggest__item');
      expect(geoSuggestItems).to.have.lengthOf(1);
      expect(geoSuggestItems[0].childNodes).to.have.lengthOf(1);
      expect(geoSuggestItems[0].childNodes[0].childNodes).to.have.lengthOf(2);
    });
  });

  describe('with minLength', () => {
    it('should not search for predictions when the input value is less than the minLength', () => {
      const props = {
        minLength: 5
      };
      renderGeosuggest(props);

      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      const matchedText = component.container.getElementsByClassName(
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf(0);
    });

    it('should search for predictions when the input value is one character and minLength prop was not specified', () => {
      renderGeosuggest();

      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
      geoSuggestInput.focus();

      const matchedText = component.container.getElementsByClassName(
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf.at.least(1);
    });

    it('should search for predictions when the input value is greater than the minLength prop specified', () => {
      const props = {
        minLength: 3
      };
      renderGeosuggest(props);

      const geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New York'}});
      geoSuggestInput.focus();

      const matchedText = component.container.getElementsByClassName(
        'geosuggest__item__matched-text'
      );
      expect(matchedText).to.have.lengthOf.at.least(1);
    });
  });

  describe('accessibility', () => {
    // eslint-disable-next-line init-declarations
    let geoSuggestInput: HTMLInputElement;

    beforeEach(() => {
      renderGeosuggest();

      geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});
    });

    it('should add aria-selected for the active suggestion', () => {
      const suggests =
        component.container.getElementsByClassName('geosuggest__item');
      expect(suggests[0].getAttribute('aria-selected')).to.equal('false');

      geoSuggestInput.focus();
      fireEvent.keyDown(geoSuggestInput, {
        key: 'keyDown',
        keyCode: 40,
        which: 40
      });
      expect(suggests[0].getAttribute('aria-selected')).to.equal('true');
    });

    it('should set aria-expanded to false when suggestions are hidden', () => {
      expect(geoSuggestInput.getAttribute('aria-expanded')).to.equal('true');

      fireEvent.keyDown(geoSuggestInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });

      expect(geoSuggestInput.getAttribute('aria-expanded')).to.equal('false');
    });

    it('should have aria-owns attribute set to the list id', () => {
      const suggests = component.container.getElementsByClassName(
        'geosuggest__suggests'
      );

      const listId = suggests[0].getAttribute('id');

      expect(geoSuggestInput.getAttribute('aria-owns')).to.equal(listId);
    });

    it('should have aria-label attribute set', () => {
      const suggests = component.container.getElementsByClassName(
        'geosuggest__suggests'
      );
      expect(suggests[0].getAttribute('aria-label')).to.exist;
    });

    it('should have aria-owns attribute set to the list id with the passed in ID', () => {
      const props = {
        id: 'test-id'
      };
      renderGeosuggest(props);
      geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});

      const suggests = component.container.getElementsByClassName(
        'geosuggest__suggests'
      );
      const listId = suggests[0].getAttribute('id');

      expect(geoSuggestInput.getAttribute('aria-owns')).to.equal(listId);
      expect(listId?.endsWith(props.id)).to.be.true;
    });

    it('should have id set to the input according to the passed in ID', () => {
      const props = {
        id: 'test-id'
      };
      renderGeosuggest(props);
      geoSuggestInput = component.container.querySelector(
        '.geosuggest__input'
      ) as HTMLInputElement;
      fireEvent.change(geoSuggestInput, {target: {value: 'New'}});

      expect(input.getAttribute('id')).to.equal(props.id);
    });

    it('should have autoComplete attribute set to "off" by default to input', () => {
      expect(geoSuggestInput.getAttribute('autoComplete')).to.equal('off');
    });
  });
});
