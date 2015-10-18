/* global google */

import React from 'react';
import GeosuggestItem from './GeosuggestItem'; // eslint-disable-line

const Geosuggest = React.createClass({
  /**
   * Get the default props
   * @return {Object} The state
   */
  getDefaultProps: function() {
    return {
      fixtures: [],
      initialValue: '',
      placeholder: 'Search places',
      disabled: false,
      className: '',
      location: null,
      radius: 0,
      bounds: null,
      country: null,
      types: null,
      onSuggestSelect: () => {},
      onFocus: () => {},
      onBlur: () => {},
      onChange: () => {},
      skipSuggest: () => {},
      getSuggestLabel: suggest => suggest.description,
      autoActivateFirstSuggest: false
    };
  },

  /**
   * Get the initial state
   * @return {Object} The state
   */
  getInitialState: function() {
    return {
      isSuggestsHidden: true,
      userInput: this.props.initialValue,
      activeSuggest: null,
      suggests: []
    };
  },

  /**
   * Change inputValue if prop changes
   * @param {Object} props The new props
   */
  componentWillReceiveProps(props) {
    if (this.props.initialValue !== props.initialValue) {
      this.setState({userInput: props.initialValue});
    }
  },

  componentDidMount: function() {
    this.setInputValue(this.props.initialValue);

    var googleMap = (google && google.maps) || this.googleMaps;

    if (!googleMap) {
      console.error('Google map api was not found in the page.');
    } else {
      this.googleMaps = googleMap;
    }

    this.autocompleteService = new googleMap.places.AutocompleteService();
    this.geocoder = new googleMap.Geocoder();
  },

  setInputValue: function(value) {
    this.setState({
      userInput: value
    });
  },

  /**
   * When the input got changed
   */
  onInputChange: function() {
    var userInput = this.refs.geosuggestInput.value;

    this.setState({userInput: userInput}, function() {
      this.showSuggests();
      this.props.onChange(userInput);
    }.bind(this));
  },

  /**
   * When the input gets focused
   */
  onFocus: function() {
    this.props.onFocus();
    this.showSuggests();
  },

  /**
   * Update the value of the user input
   * @param {String} value the new value of the user input
   */
  update: function(value) {
    this.setState({userInput: value});
    this.props.onChange(value);
  },

  /*
   * Clear the input and close the suggestion pane
   */
  clear: function() {
    this.setState({userInput: ''}, function() {
      this.hideSuggests();
    }.bind(this));
  },

  /**
   * Search for new suggests
   */
  searchSuggests: function() {
    if (!this.state.userInput) {
      this.updateSuggests();
      return;
    }

    var options = {
      input: this.state.userInput,
      location: this.props.location || new this.googleMaps.LatLng(0, 0),
      radius: this.props.radius
    };

    if (this.props.bounds) {
      options.bounds = this.props.bounds;
    }

    if (this.props.types) {
      options.types = this.props.types;
    }

    if (this.props.country) {
      options.componentRestrictions = {
        country: this.props.country
      };
    }

    this.autocompleteService.getPlacePredictions(
      options,
      function(suggestsGoogle) {
        this.updateSuggests(suggestsGoogle);

        if (this.props.autoActivateFirstSuggest) {
          this.activateSuggest('next');
        }
      }.bind(this)
    );
  },

  /**
   * Update the suggests
   * @param  {Object} suggestsGoogle The new google suggests
   */
  updateSuggests: function(suggestsGoogle) {
    if (!suggestsGoogle) {
      suggestsGoogle = [];
    }

    var suggests = [],
      regex = new RegExp(this.state.userInput, 'gim'),
      skipSuggest = this.props.skipSuggest;

    this.props.fixtures.forEach(function(suggest) {
      if (!skipSuggest(suggest) && suggest.label.match(regex)) {
        suggest.placeId = suggest.label;
        suggests.push(suggest);
      }
    });

    suggestsGoogle.forEach(suggest => {
      if (!skipSuggest(suggest)) {
        suggests.push({
          label: this.props.getSuggestLabel(suggest),
          placeId: suggest.place_id
        });
      }
    });

    this.setState({suggests: suggests});
  },

  /**
   * When the input gets focused
   */
  showSuggests: function() {
    this.searchSuggests();
    this.setState({isSuggestsHidden: false});
  },

  /**
   * When the input loses focused
   */
  hideSuggests: function() {
    this.props.onBlur();
    setTimeout(function() {
      this.setState({isSuggestsHidden: true});
    }.bind(this), 100);
  },

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
  onInputKeyDown: function(event) {
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        this.activateSuggest('next');
        break;
      case 38: // UP
        event.preventDefault();
        this.activateSuggest('prev');
        break;
      case 13: // ENTER
        event.preventDefault();
        this.selectSuggest(this.state.activeSuggest);
        break;
      case 9: // TAB
        this.selectSuggest(this.state.activeSuggest);
        break;
      case 27: // ESC
        this.hideSuggests();
        break;
      default:
        break;
    }
  },

  /**
   * Activate a new suggest
   * @param {String} direction The direction in which to activate new suggest
   */
  activateSuggest: function(direction) {
    if (this.state.isSuggestsHidden) {
      this.showSuggests();
      return;
    }

    var suggestsCount = this.state.suggests.length - 1,
      next = direction === 'next',
      newActiveSuggest = null,
      newIndex = 0,
      i = 0; // eslint-disable-line id-length

    for (i; i <= suggestsCount; i++) {
      if (this.state.suggests[i] === this.state.activeSuggest) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!this.state.activeSuggest) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = this.state.suggests[newIndex];
    }

    this.setState({activeSuggest: newActiveSuggest});
  },

  /**
   * When an item got selected
   * @param {GeosuggestItem} suggest The selected suggest item
   */
  selectSuggest: function(suggest) {
    if (!suggest) {
      suggest = {
        label: this.state.userInput
      };
    }

    this.setState({
      isSuggestsHidden: true,
      userInput: suggest.label
    });

    if (suggest.location) {
      this.props.onSuggestSelect(suggest);
      return;
    }

    this.geocodeSuggest(suggest);
  },

  /**
   * Geocode a suggest
   * @param  {Object} suggest The suggest
   */
  geocodeSuggest: function(suggest) {
    this.geocoder.geocode(
      {address: suggest.label},
      function(results, status) {
        if (status !== this.googleMaps.GeocoderStatus.OK) {
          return;
        }

        var gmaps = results[0],
          location = gmaps.geometry.location;

        suggest.gmaps = gmaps;
        suggest.location = {
          lat: location.lat(),
          lng: location.lng()
        };

        this.props.onSuggestSelect(suggest);
      }.bind(this)
    );
  },

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render: function() {
    return (// eslint-disable-line no-extra-parens
      <div className={'geosuggest ' + this.props.className}
          onClick={this.onClick}>
        <input
          className="geosuggest__input"
          ref="geosuggestInput"
          type="text"
          value={this.state.userInput}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onKeyDown={this.onInputKeyDown}
          onChange={this.onInputChange}
          onFocus={this.onFocus}
          onBlur={this.hideSuggests} />
        <ul className={this.getSuggestsClasses()}>
          {this.getSuggestItems()}
        </ul>
      </div>
    );
  },

  /**
   * Get the suggest items for the list
   * @return {Array} The suggestions
   */
  getSuggestItems: function() {
    return this.state.suggests.map(function(suggest) {
      var isActive = this.state.activeSuggest &&
        suggest.placeId === this.state.activeSuggest.placeId;

      return (// eslint-disable-line no-extra-parens
        <GeosuggestItem
          key={suggest.placeId}
          suggest={suggest}
          isActive={isActive}
          onSuggestSelect={this.selectSuggest} />
      );
    }.bind(this));
  },

  /**
   * The classes for the suggests list
   * @return {String} The classes
   */
  getSuggestsClasses: function() {
    var classes = 'geosuggest__suggests';

    classes += this.state.isSuggestsHidden ?
      ' geosuggest__suggests--hidden' : '';

    return classes;
  }
});

module.exports = Geosuggest;
