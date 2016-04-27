'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default values
 */
exports.default = {
  fixtures: _react2.default.PropTypes.array,
  initialValue: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  inputClassName: _react2.default.PropTypes.string,
  location: _react2.default.PropTypes.object,
  radius: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  bounds: _react2.default.PropTypes.object,
  country: _react2.default.PropTypes.string,
  types: _react2.default.PropTypes.array,
  googleMaps: _react2.default.PropTypes.object,
  onSuggestSelect: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  skipSuggest: _react2.default.PropTypes.func,
  getSuggestLabel: _react2.default.PropTypes.func,
  autoActivateFirstSuggest: _react2.default.PropTypes.bool
};