require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react'),
  Geosuggest = require('../../src/Geosuggest.jsx');

var App = React.createClass({displayName: "App",
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
      React.createElement("div", null, 
        React.createElement(Geosuggest, {
          fixtures: fixtures, 
          onSuggestSelect: this.onSuggestSelect, 
          location: new google.maps.LatLng(53.558572, 9.9278215), 
          radius: "20"})
      )
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

React.render(React.createElement(App, null), document.getElementById('app'));

},{"../../src/Geosuggest.jsx":2,"react":undefined}],2:[function(require,module,exports){
var React = require('react'),
  GeosuggestItem = require('./GeosuggestItem.jsx');

var Geosuggest = React.createClass({displayName: "Geosuggest",
  /**
   * Get the default props
   * @return {Object} The state
   */
  getDefaultProps: function() {
    return {
      fixtures: [],
      placeholder: 'Search places',
      onSuggestSelect: function() {},
      location: null,
      radius: 0
    };
  },

  /**
   * Get the initial state
   * @return {Object} The state
   */
  getInitialState: function() {
    return {
      isSuggestsHidden: true,
      userInput: '',
      activeSuggest: null,
      suggests: [],
      geocoder: new google.maps.Geocoder(),
      autocompleteService: new google.maps.places.AutocompleteService()
    };
  },

  /**
   * When the input got changed
   */
  onInputChange: function() {
    var userInput = this.refs.geosuggestInput.getDOMNode().value;

    this.setState({userInput: userInput}, function() {
      if (!userInput) {
        this.updateSuggests();
      }
    }.bind(this));

    if (!userInput) {
      return;
    }

    this.state.autocompleteService.getPlacePredictions({
      input: userInput,
      location: this.props.location || new google.maps.LatLng(0, 0),
      radius: this.props.radius
    }, function(suggestsGoogle) {
      this.updateSuggests(suggestsGoogle);
    }.bind(this));
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
      suggestItems;

    this.props.fixtures.forEach(function(suggest) {
      if (suggest.label.match(regex)) {
        suggest.placeId = suggest.label;
        suggests.push(suggest);
      }
    }.bind(this));

    suggestsGoogle.forEach(function(suggest) {
      suggests.push({
        label: suggest.description,
        placeId: suggest.place_id
      });
    }.bind(this));

    this.setState({suggests: suggests});
  },

  /**
   * When the input gets focused
   * @param  {Event} event The focus event
   */
  showSuggests: function(event) {
    this.updateSuggests();

    this.setState({isSuggestsHidden: false});
  },

  /**
   * When the input loses focused
   * @param  {Event} event The focus event
   */
  hideSuggests: function(event) {
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
        this.selectSuggest(this.state.activeSuggest);
        break;
      case 9: // TAB
        this.selectSuggest(this.state.activeSuggest);
        break;
      case 27: // ESC
        this.hideSuggests();
        break;
    }
  },

  /**
   * Activate a new suggest
   * @param {String} direction The direction in which to activate new suggest
   */
  activateSuggest: function(direction) {
    var suggestsCount = this.state.suggests.length - 1,
      next = direction === ('next'),
      newActiveSuggest = null,
      newIndex = 0,
      i = 0;

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
    var location;

    this.state.geocoder.geocode(
      {address: suggest.label},
      function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          return;
        }

        location = results[0].geometry.location;

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
   */
  render: function() {
    return (
      React.createElement("div", {className: "geosuggest", onClick: this.onClick}, 
        React.createElement("input", {
          className: "geosuggest__input", 
          ref: "geosuggestInput", 
          type: "text", 
          value: this.state.userInput, 
          placeholder: this.props.placeholder, 
          onKeyDown: this.onInputKeyDown, 
          onChange: this.onInputChange, 
          onFocus: this.showSuggests, 
          onBlur: this.hideSuggests}), 
        React.createElement("ul", {className: this.getSuggestsClasses()}, 
          this.getSuggestItems()
        )
      )
    );
  },

  /**
   * Get the suggest items for the list
   * @return {Array} The suggestions
   */
  getSuggestItems: function() {
    return this.state.suggests.map(function(suggest) {
      var isActive = (this.state.activeSuggest &&
        suggest.placeId === this.state.activeSuggest.placeId);

      return (
        React.createElement(GeosuggestItem, {
          key: suggest.placeId, 
          suggest: suggest, 
          isActive: isActive, 
          onSuggestSelect: this.selectSuggest})
      );
    }.bind(this));
  },

  /**
   * The classes for the suggests list
   * @return {String} The classes
   */
  getSuggestsClasses: function() {
    var classes = 'geosuggest__suggests'

    classes += this.state.isSuggestsHidden ?
      ' geosuggest__suggests--hidden' : '';

    return classes;
  }
});

module.exports = Geosuggest;

},{"./GeosuggestItem.jsx":3,"react":undefined}],3:[function(require,module,exports){
var React = require('react');

var GeosuggestItem = React.createClass({displayName: "GeosuggestItem",
  /**
   * Get the default props
   * @return {Object} The props
   */
  getDefaultProps: function() {
    return {
      isActive: false,
      suggest: {
        label: ''
      },
      onSuggestSelect: function() {}
    };
  },

  /**
   * When the element gets clicked
   * @param  {Event} event The click event
   */
  onClick: function(event) {
    event.preventDefault();
    this.props.onSuggestSelect(this.props.suggest);
  },

  /**
   * Render the view
   */
  render: function() {
    return (
      React.createElement("li", {className: this.getSuggestClasses(), 
        onClick: this.onClick}, 
          this.props.suggest.label
      )
    );
  },

  /**
   * The classes for the suggest item
   * @return {String} The classes
   */
  getSuggestClasses: function() {
    var classes = 'geosuggest-item';

    classes += this.props.isActive ? ' geosuggest-item--active' : '';

    return classes;
  }
});

module.exports = GeosuggestItem;

},{"react":undefined}]},{},[1]);
