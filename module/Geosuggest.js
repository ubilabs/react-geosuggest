'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _propTypes = require('./prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _suggestList = require('./suggest-list');

var _suggestList2 = _interopRequireDefault(_suggestList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */

// Escapes special characters in user input for regex
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Entry point for the Geosuggest component
 */

var Geosuggest = function (_React$Component) {
  _inherits(Geosuggest, _React$Component);

  /**
   * The constructor. Sets the initial state.
   * @param  {Object} props The properties object.
   */
  function Geosuggest(props) {
    _classCallCheck(this, Geosuggest);

    var _this = _possibleConstructorReturn(this, (Geosuggest.__proto__ || Object.getPrototypeOf(Geosuggest)).call(this, props));

    _this.onInputChange = function (userInput) {
      _this.setState({ userInput: userInput }, _this.onAfterInputChange);
    };

    _this.onAfterInputChange = function () {
      if (!_this.state.isSuggestsHidden) {
        _this.showSuggests();
      }
      _this.props.onChange(_this.state.userInput);
    };

    _this.onInputFocus = function () {
      _this.props.onFocus();
      _this.showSuggests();
    };

    _this.onInputBlur = function () {
      if (!_this.state.ignoreBlur) {
        _this.hideSuggests();
      }
    };

    _this.onNext = function () {
      return _this.activateSuggest('next');
    };

    _this.onPrev = function () {
      return _this.activateSuggest('prev');
    };

    _this.onSelect = function () {
      return _this.selectSuggest(_this.state.activeSuggest);
    };

    _this.onSuggestMouseDown = function () {
      return _this.setState({ ignoreBlur: true });
    };

    _this.onSuggestMouseOut = function () {
      return _this.setState({ ignoreBlur: false });
    };

    _this.onSuggestNoResults = function () {
      _this.props.onSuggestNoResults(_this.state.userInput);
    };

    _this.hideSuggests = function () {
      _this.props.onBlur(_this.state.userInput);
      _this.timer = setTimeout(function () {
        _this.setState({
          isSuggestsHidden: true,
          activeSuggest: null
        });
      }, 100);
    };

    _this.selectSuggest = function (suggest) {
      if (!suggest) {
        suggest = {
          label: _this.state.userInput
        };
      }

      _this.setState({
        isSuggestsHidden: true,
        userInput: _typeof(suggest.label) !== 'object' ? suggest.label : suggest.description
      });

      if (suggest.location) {
        _this.setState({ ignoreBlur: false });
        _this.props.onSuggestSelect(suggest);
        return;
      }

      _this.geocodeSuggest(suggest);
    };

    _this.state = {
      isSuggestsHidden: true,
      isLoading: false,
      userInput: props.initialValue,
      activeSuggest: null,
      suggests: []
    };

    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.onAfterInputChange = _this.onAfterInputChange.bind(_this);

    if (props.queryDelay) {
      _this.onAfterInputChange = (0, _lodash2.default)(_this.onAfterInputChange, props.queryDelay);
    }
    return _this;
  }

  /**
   * Change inputValue if prop changes
   * @param {Object} props The new props
   */


  _createClass(Geosuggest, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.initialValue !== props.initialValue) {
        this.setState({ userInput: props.initialValue });
      }
    }

    /**
     * Called on the client side after component is mounted.
     * Google api sdk object will be obtained and cached as a instance property.
     * Necessary objects of google api will also be determined and saved.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof window === 'undefined') {
        return;
      }

      var googleMaps = this.props.googleMaps || window.google && // eslint-disable-line no-extra-parens
      window.google.maps || this.googleMaps;

      /* istanbul ignore next */
      if (!googleMaps) {
        if (console) {
          console.error( // eslint-disable-line no-console
          'Google map api was not found in the page.');
        }
        return;
      }
      this.googleMaps = googleMaps;

      this.autocompleteService = new googleMaps.places.AutocompleteService();
      this.geocoder = new googleMaps.Geocoder();
    }

    /**
     * When the component will unmount
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
    }

    /**
     * When the input changed
     * @param {String} userInput The input value of the user
     */


    /**
     * On After the input got changed
     */


    /**
     * When the input gets focused
     */


    /**
     * When the input gets blurred
     */

  }, {
    key: 'focus',


    /**
     * Focus the input
     */
    value: function focus() {
      this.input.focus();
    }

    /**
     * Blur the input
     */

  }, {
    key: 'blur',
    value: function blur() {
      this.input.blur();
    }

    /**
     * Update the value of the user input
     * @param {String} userInput the new value of the user input
     */

  }, {
    key: 'update',
    value: function update(userInput) {
      this.setState({ userInput: userInput });
      this.props.onChange(userInput);
    }

    /*
     * Clear the input and close the suggestion pane
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.setState({ userInput: '' }, this.hideSuggests);
    }

    /**
     * Search for new suggests
     */

  }, {
    key: 'searchSuggests',
    value: function searchSuggests() {
      var _this2 = this;

      if (!this.state.userInput) {
        this.updateSuggests();
        return;
      }

      var options = {
        input: this.state.userInput
      },
          inputLength = this.state.userInput.length,
          isShorterThanMinLength = inputLength < this.props.minLength;

      if (isShorterThanMinLength) {
        return;
      }

      ['location', 'radius', 'bounds', 'types'].forEach(function (option) {
        if (_this2.props[option]) {
          options[option] = _this2.props[option];
        }
      });

      if (this.props.country) {
        options.componentRestrictions = {
          country: this.props.country
        };
      }

      this.setState({ isLoading: true }, function () {
        _this2.autocompleteService.getPlacePredictions(options, function (suggestsGoogle) {
          _this2.setState({ isLoading: false });
          _this2.updateSuggests(suggestsGoogle || [], // can be null
          function () {
            if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
              _this2.activateSuggest('next');
            }
          });
        });
      });
    }

    /**
     * Update the suggests
     * @param {Array} suggestsGoogle The new google suggests
     * @param {Function} callback Called once the state has been updated
     */

  }, {
    key: 'updateSuggests',
    value: function updateSuggests() {
      var _this3 = this;

      var suggestsGoogle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var callback = arguments[1];

      var suggests = [],
          userInput = this.state.userInput,
          regex = new RegExp(escapeRegExp(userInput), 'gim'),
          skipSuggest = this.props.skipSuggest,
          maxFixtures = this.props.maxFixtures,
          fixturesSearched = 0,
          activeSuggest = null;

      this.props.fixtures.forEach(function (suggest) {
        if (fixturesSearched >= maxFixtures) {
          return;
        }

        if (!skipSuggest(suggest) && suggest.label.match(regex)) {
          fixturesSearched++;

          suggest.placeId = suggest.label;
          suggest.isFixture = true;
          suggest.matchedSubstrings = {
            offset: suggest.label.indexOf(userInput),
            length: userInput.length
          };
          suggests.push(suggest);
        }
      });

      suggestsGoogle.forEach(function (suggest) {
        if (!skipSuggest(suggest)) {
          suggests.push({
            description: suggest.description,
            label: _this3.props.getSuggestLabel(suggest),
            placeId: suggest.place_id,
            isFixture: false,
            matchedSubstrings: suggest.matched_substrings[0]
          });
        }
      });

      activeSuggest = this.updateActiveSuggest(suggests);
      this.setState({ suggests: suggests, activeSuggest: activeSuggest }, callback);
    }

    /**
     * Return the new activeSuggest object after suggests have been updated
     * @param {Array} suggests The new list of suggests
     * @return {Object} The new activeSuggest
     **/

  }, {
    key: 'updateActiveSuggest',
    value: function updateActiveSuggest() {
      var suggests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var activeSuggest = this.state.activeSuggest;

      if (activeSuggest) {
        var newSuggest = suggests.filter(function (listedSuggest) {
          return activeSuggest.placeId === listedSuggest.placeId && activeSuggest.isFixture === listedSuggest.isFixture;
        })[0];

        activeSuggest = newSuggest || null;
      }

      return activeSuggest;
    }

    /**
     * Show the suggestions
     */

  }, {
    key: 'showSuggests',
    value: function showSuggests() {
      this.searchSuggests();
      this.setState({ isSuggestsHidden: false });
    }

    /**
     * Hide the suggestions
     */

  }, {
    key: 'activateSuggest',


    /**
     * Activate a new suggest
     * @param {String} direction The direction in which to activate new suggest
     */
    value: function activateSuggest(direction) {
      // eslint-disable-line complexity
      if (this.state.isSuggestsHidden) {
        this.showSuggests();
        return;
      }

      var suggestsCount = this.state.suggests.length - 1,
          next = direction === 'next';
      var newActiveSuggest = null,
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

      this.props.onActivateSuggest(newActiveSuggest);

      this.setState({ activeSuggest: newActiveSuggest });
    }

    /**
     * When an item got selected
     * @param {GeosuggestItem} suggest The selected suggest item
     */

  }, {
    key: 'geocodeSuggest',


    /**
     * Geocode a suggest
     * @param  {Object} suggest The suggest
     */
    value: function geocodeSuggest(suggest) {
      var _this4 = this;

      var options = null;
      if (suggest.placeId && !suggest.isFixture) {
        options = {
          placeId: suggest.placeId
        };
      } else {
        options = {
          address: suggest.label,
          location: this.props.location,
          bounds: this.props.bounds,
          componentRestrictions: this.props.country ? { country: this.props.country } : null
        };
      }
      this.geocoder.geocode(options, function (results, status) {
        if (status === _this4.googleMaps.GeocoderStatus.OK) {
          var gmaps = results[0],
              location = gmaps.geometry.location;

          suggest.gmaps = gmaps;
          suggest.location = {
            lat: location.lat(),
            lng: location.lng()
          };
        }
        _this4.props.onSuggestSelect(suggest);
      });
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var attributes = (0, _filterInputAttributes2.default)(this.props),
          classes = (0, _classnames2.default)('geosuggest', this.props.className, { 'geosuggest--loading': this.state.isLoading }),
          shouldRenderLabel = this.props.label && attributes.id,
          input = _react2.default.createElement(_input2.default, _extends({ className: this.props.inputClassName,
        ref: function ref(i) {
          return _this5.input = i;
        },
        value: this.state.userInput,
        ignoreEnter: !this.state.isSuggestsHidden,
        ignoreTab: this.props.ignoreTab,
        style: this.props.style.input,
        onChange: this.onInputChange,
        onFocus: this.onInputFocus,
        onBlur: this.onInputBlur,
        onKeyDown: this.props.onKeyDown,
        onKeyPress: this.props.onKeyPress,
        onNext: this.onNext,
        onPrev: this.onPrev,
        onSelect: this.onSelect,
        onEscape: this.hideSuggests }, attributes)),
          suggestionsList = _react2.default.createElement(_suggestList2.default, { isHidden: this.state.isSuggestsHidden,
        style: this.props.style.suggests,
        suggestItemStyle: this.props.style.suggestItem,
        userInput: this.state.userInput,
        isHighlightMatch: this.props.highlightMatch,
        suggestsClassName: this.props.suggestsClassName,
        suggestItemClassName: this.props.suggestItemClassName,
        suggests: this.state.suggests,
        hiddenClassName: this.props.suggestsHiddenClassName,
        suggestItemActiveClassName: this.props.suggestItemActiveClassName,
        activeSuggest: this.state.activeSuggest,
        onSuggestNoResults: this.onSuggestNoResults,
        onSuggestMouseDown: this.onSuggestMouseDown,
        onSuggestMouseOut: this.onSuggestMouseOut,
        onSuggestSelect: this.selectSuggest,
        renderSuggestItem: this.props.renderSuggestItem,
        minLength: this.props.minLength });

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'geosuggest__input-wrapper' },
          shouldRenderLabel && _react2.default.createElement(
            'label',
            { className: 'geosuggest__label',
              htmlFor: attributes.id },
            this.props.label
          ),
          input
        ),
        _react2.default.createElement(
          'div',
          { className: 'geosuggest__suggests-wrapper' },
          suggestionsList
        )
      );
    }
  }]);

  return Geosuggest;
}(_react2.default.Component);

/**
 * Types for the properties
 * @type {Object}
 */


Geosuggest.propTypes = _propTypes2.default;

/**
 * Default values for the properties
 * @type {Object}
 */
Geosuggest.defaultProps = _defaults2.default;

exports.default = Geosuggest;