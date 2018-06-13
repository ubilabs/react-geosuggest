'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prop Types
 */
exports.default = {
  fixtures: _propTypes2.default.array,
  maxFixtures: _propTypes2.default.number,
  initialValue: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  inputClassName: _propTypes2.default.string,
  suggestsClassName: _propTypes2.default.string,
  suggestsHiddenClassName: _propTypes2.default.string,
  suggestItemClassName: _propTypes2.default.string,
  suggestItemActiveClassName: _propTypes2.default.string,
  location: _propTypes2.default.object,
  radius: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  bounds: _propTypes2.default.object,
  country: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  types: _propTypes2.default.array,
  queryDelay: _propTypes2.default.number,
  googleMaps: _propTypes2.default.object,
  highlightMatch: _propTypes2.default.bool,
  onSuggestSelect: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,
  onUpdateSuggests: _propTypes2.default.func,
  skipSuggest: _propTypes2.default.func,
  getSuggestLabel: _propTypes2.default.func,
  renderSuggestItem: _propTypes2.default.func,
  autoActivateFirstSuggest: _propTypes2.default.bool,
  style: _propTypes2.default.shape({
    input: _propTypes2.default.object,
    suggests: _propTypes2.default.object,
    suggestItem: _propTypes2.default.object
  }),
  ignoreTab: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  autoComplete: _propTypes2.default.string,
  minLength: _propTypes2.default.number
};