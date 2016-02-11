(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Geosuggest = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
/* global window */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _suggestList = require('./suggest-list');

var _suggestList2 = _interopRequireDefault(_suggestList);

// Escapes special characters in user input for regex
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Entry point for the Geosuggest component
 */

var Geosuggest = (function (_React$Component) {
  _inherits(Geosuggest, _React$Component);

  /**
   * The constructor. Sets the initial state.
   * @param  {Object} props The properties object.
   */

  function Geosuggest(props) {
    _classCallCheck(this, Geosuggest);

    _get(Object.getPrototypeOf(Geosuggest.prototype), 'constructor', this).call(this, props);
    this.state = {
      isMounted: false,
      isSuggestsHidden: true,
      userInput: this.props.initialValue,
      activeSuggest: null,
      suggests: []
    };
  }

  /**
   * Default values for the properties
   * @type {Object}
   */

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ userInput: this.props.initialValue });

      var googleMaps = this.props.googleMaps || window.google && // eslint-disable-line no-extra-parens
      window.google.maps || this.googleMaps;

      if (!googleMaps) {
        console.error( // eslint-disable-line no-console
        'Google map api was not found in the page.');
        return;
      }
      this.googleMaps = googleMaps;

      this.autocompleteService = new googleMaps.places.AutocompleteService();
      this.geocoder = new googleMaps.Geocoder();

      this.setState({ isMounted: true });
    }

    /**
     * When the component will unmount
     */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ isMounted: false });
    }

    /**
     * When the input got changed
     * @param {String} userInput The input value of the user
     */
  }, {
    key: 'onInputChange',
    value: function onInputChange(userInput) {
      var _this = this;

      this.setState({ userInput: userInput }, function () {
        _this.showSuggests();
        _this.props.onChange(userInput);
      });
    }

    /**
     * When the input gets focused
     */
  }, {
    key: 'onInputFocus',
    value: function onInputFocus() {
      this.props.onFocus();
      this.showSuggests();
    }

    /**
     * When the input gets blurred
     */
  }, {
    key: 'onInputBlur',
    value: function onInputBlur() {
      if (!this.state.ignoreBlur) {
        this.hideSuggests();
      }
    }

    /**
     * Focus the input
     */
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
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
      var _this2 = this;

      this.setState({ userInput: '' }, function () {
        return _this2.hideSuggests();
      });
    }

    /**
     * Search for new suggests
     */
  }, {
    key: 'searchSuggests',
    value: function searchSuggests() {
      var _this3 = this;

      if (!this.state.userInput) {
        this.updateSuggests();
        return;
      }

      var options = {
        input: this.state.userInput
      };

      ['location', 'radius', 'bounds', 'types'].forEach(function (option) {
        if (_this3.props[option]) {
          options[option] = _this3.props[option];
        }
      });

      if (this.props.country) {
        options.componentRestrictions = {
          country: this.props.country
        };
      }

      this.autocompleteService.getPlacePredictions(options, function (suggestsGoogle) {
        _this3.updateSuggests(suggestsGoogle || []); // can be null

        if (_this3.props.autoActivateFirstSuggest) {
          _this3.activateSuggest('next');
        }
      });
    }

    /**
     * Update the suggests
     * @param  {Array} suggestsGoogle The new google suggests
     */
  }, {
    key: 'updateSuggests',
    value: function updateSuggests() {
      var _this4 = this;

      var suggestsGoogle = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      var suggests = [],
          regex = new RegExp(escapeRegExp(this.state.userInput), 'gim'),
          skipSuggest = this.props.skipSuggest;

      this.props.fixtures.forEach(function (suggest) {
        if (!skipSuggest(suggest) && suggest.label.match(regex)) {
          suggest.placeId = suggest.label;
          suggests.push(suggest);
        }
      });

      suggestsGoogle.forEach(function (suggest) {
        if (!skipSuggest(suggest)) {
          suggests.push({
            label: _this4.props.getSuggestLabel(suggest),
            placeId: suggest.place_id
          });
        }
      });

      this.setState({ suggests: suggests });
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
    key: 'hideSuggests',
    value: function hideSuggests() {
      var _this5 = this;

      this.props.onBlur();
      setTimeout(function () {
        if (_this5.state && _this5.state.isMounted) {
          _this5.setState({ isSuggestsHidden: true });
        }
      }, 100);
    }

    /**
     * Activate a new suggest
     * @param {String} direction The direction in which to activate new suggest
     */
  }, {
    key: 'activateSuggest',
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

      this.setState({ activeSuggest: newActiveSuggest });
    }

    /**
     * When an item got selected
     * @param {GeosuggestItem} suggest The selected suggest item
     */
  }, {
    key: 'selectSuggest',
    value: function selectSuggest(suggest) {
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
        this.setState({ ignoreBlur: false });
        this.props.onSuggestSelect(suggest);
        return;
      }

      this.geocodeSuggest(suggest);
    }

    /**
     * Geocode a suggest
     * @param  {Object} suggest The suggest
     */
  }, {
    key: 'geocodeSuggest',
    value: function geocodeSuggest(suggest) {
      var _this6 = this;

      this.geocoder.geocode(suggest.placeId ? { placeId: suggest.placeId } : { address: suggest.label }, function (results, status) {
        if (status !== _this6.googleMaps.GeocoderStatus.OK) {
          return;
        }

        var gmaps = results[0],
            location = gmaps.geometry.location;

        suggest.gmaps = gmaps;
        suggest.location = {
          lat: location.lat(),
          lng: location.lng()
        };

        _this6.props.onSuggestSelect(suggest);
      });
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var attributes = (0, _filterInputAttributes2['default'])(this.props),
          classes = (0, _classnames2['default'])('geosuggest', this.props.className);

      return _react2['default'].createElement(
        'div',
        { className: classes },
        _react2['default'].createElement(_input2['default'], _extends({ className: this.props.inputClassName,
          ref: 'input',
          value: this.state.userInput,
          onChange: this.onInputChange.bind(this),
          onFocus: this.onInputFocus.bind(this),
          onBlur: this.onInputBlur.bind(this),
          onNext: function () {
            return _this7.activateSuggest('next');
          },
          onPrev: function () {
            return _this7.activateSuggest('prev');
          },
          onSelect: function () {
            return _this7.selectSuggest(_this7.state.activeSuggest);
          },
          onEscape: this.hideSuggests.bind(this)
        }, attributes)),
        _react2['default'].createElement(_suggestList2['default'], {
          isHidden: this.state.isSuggestsHidden,
          suggests: this.state.suggests,
          activeSuggest: this.state.activeSuggest,
          onSuggestMouseDown: function () {
            return _this7.setState({ ignoreBlur: true });
          },
          onSuggestMouseOut: function () {
            return _this7.setState({ ignoreBlur: false });
          },
          onSuggestSelect: this.selectSuggest.bind(this) })
      );
    }
  }]);

  return Geosuggest;
})(_react2['default'].Component);

Geosuggest.defaultProps = _defaults2['default'];

exports['default'] = Geosuggest;
module.exports = exports['default'];

},{"./defaults":3,"./filter-input-attributes":4,"./input":5,"./suggest-list":7,"classnames":1}],3:[function(require,module,exports){
/**
 * Default values
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  fixtures: [],
  initialValue: '',
  placeholder: 'Search places',
  disabled: false,
  className: '',
  inputClassName: '',
  location: null,
  radius: null,
  bounds: null,
  country: null,
  types: null,
  googleMaps: null,
  onSuggestSelect: function onSuggestSelect() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  skipSuggest: function skipSuggest() {},
  getSuggestLabel: function getSuggestLabel(suggest) {
    return suggest.description;
  },
  autoActivateFirstSuggest: false
};
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
/**
 * Attributes allowed on input elements
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var allowedAttributes = ['autoComplete', 'autoFocus', 'disabled', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'height', 'id', 'inputMode', 'maxLength', 'name', 'pattern', 'placeholder', 'readOnly', 'required', 'size', 'spellCheck', 'tabIndex'];

/**
 * Filter the properties for only allowed input properties
 * @param  {Object} props The properties to filter
 * @return {Object} The filtered, allowed properties
 */

exports['default'] = function (props) {
  var attributes = {};

  allowedAttributes.forEach(function (allowedAttribute) {
    if (props[allowedAttribute]) {
      attributes[allowedAttribute] = props[allowedAttribute];
    }
  });

  return attributes;
};

module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

// eslint-disable-line no-unused-vars

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */

var Input = (function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).apply(this, arguments);
  }

  /**
   * Default values for the properties
   * @type {Object}
   */

  _createClass(Input, [{
    key: 'onChange',

    /**
     * When the input got changed
     */
    value: function onChange() {
      this.props.onChange(this.refs.input.value);
    }

    /**
     * When a key gets pressed in the input
     * @param  {Event} event The keypress event
     */
  }, {
    key: 'onInputKeyDown',
    value: function onInputKeyDown(event) {
      switch (event.which) {
        case 40:
          // DOWN
          event.preventDefault();
          this.props.onNext();
          break;
        case 38:
          // UP
          event.preventDefault();
          this.props.onPrev();
          break;
        case 13:
          // ENTER
          event.preventDefault();
          this.props.onSelect();
          break;
        case 9:
          // TAB
          this.props.onSelect();
          break;
        case 27:
          // ESC
          this.props.onEscape();
          break;
        default:
          break;
      }
    }

    /**
     * Focus the input
     */
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */
  }, {
    key: 'render',
    value: function render() {
      var attributes = (0, _filterInputAttributes2['default'])(this.props),
          classes = (0, _classnames2['default'])('geosuggest__input', this.props.className);

      return _react2['default'].createElement('input', _extends({ className: classes,
        ref: 'input',
        type: 'text'
      }, attributes, {
        value: this.props.value,
        onKeyDown: this.onInputKeyDown.bind(this),
        onChange: this.onChange.bind(this),
        onFocus: this.props.onFocus.bind(this),
        onBlur: this.props.onBlur.bind(this) }));
    }
  }]);

  return Input;
})(_react2['default'].Component);

Input.defaultProps = {
  className: '',
  value: '',
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onNext: function onNext() {},
  onPrev: function onPrev() {},
  onSelect: function onSelect() {},
  onEscape: function onEscape() {}
};

exports['default'] = Input;
module.exports = exports['default'];

},{"./filter-input-attributes":4,"classnames":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

// eslint-disable-line no-unused-vars

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */

exports['default'] = function (_ref) {
  var _ref$isActive = _ref.isActive;
  var isActive = _ref$isActive === undefined ? false : _ref$isActive;
  var _ref$className = _ref.className;
  var className = _ref$className === undefined ? '' : _ref$className;
  var _ref$suggest = _ref.suggest;
  var suggest = _ref$suggest === undefined ? {} : _ref$suggest;
  var _ref$onMouseDown = _ref.onMouseDown;
  var onMouseDown = _ref$onMouseDown === undefined ? function () {} : _ref$onMouseDown;
  var _ref$onMouseOut = _ref.onMouseOut;
  var onMouseOut = _ref$onMouseOut === undefined ? function () {} : _ref$onMouseOut;
  var _ref$onSelect = _ref.onSelect;
  var onSelect = _ref$onSelect === undefined ? function () {} : _ref$onSelect;

  var classes = (0, _classnames2['default'])('geosuggest-item', className, { 'geosuggest-item--active': isActive });

  return _react2['default'].createElement(
    'li',
    { className: classes,
      onMouseDown: onMouseDown,
      onMouseOut: onMouseOut,
      onClick: function (event) {
        event.preventDefault();
        onSelect();
      } },
    suggest.label
  );
};

module.exports = exports['default'];

},{"classnames":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

// eslint-disable-line no-unused-vars

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _suggestItem = require('./suggest-item');

var _suggestItem2 = _interopRequireDefault(_suggestItem);

/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */

exports['default'] = function (_ref) {
  var _ref$isHidden = _ref.isHidden;
  var isHidden = _ref$isHidden === undefined ? true : _ref$isHidden;
  var _ref$suggests = _ref.suggests;
  var suggests = _ref$suggests === undefined ? [] : _ref$suggests;
  var activeSuggest = _ref.activeSuggest;
  var _ref$onSuggestMouseDown = _ref.onSuggestMouseDown;
  var onSuggestMouseDown = _ref$onSuggestMouseDown === undefined ? function () {} : _ref$onSuggestMouseDown;
  var _ref$onSuggestMouseOut = _ref.onSuggestMouseOut;
  var onSuggestMouseOut = _ref$onSuggestMouseOut === undefined ? function () {} : _ref$onSuggestMouseOut;
  var _ref$onSuggestSelect = _ref.onSuggestSelect;
  var onSuggestSelect = _ref$onSuggestSelect === undefined ? function () {} : _ref$onSuggestSelect;

  var classes = (0, _classnames2['default'])('geosuggest__suggests', { 'geosuggest__suggests--hidden': isHidden });

  return _react2['default'].createElement(
    'ul',
    { className: classes },
    suggests.map(function (suggest) {
      var isActive = activeSuggest && suggest.placeId === activeSuggest.placeId;

      return _react2['default'].createElement(_suggestItem2['default'], { key: suggest.placeId,
        suggest: suggest,
        isActive: isActive,
        onMouseDown: onSuggestMouseDown,
        onMouseOut: onSuggestMouseOut,
        onSelect: function () {
          return onSuggestSelect(suggest);
        } });
    })
  );
};

module.exports = exports['default'];

},{"./suggest-item":6,"classnames":1}]},{},[2])(2)
});