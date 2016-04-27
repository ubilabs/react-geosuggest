'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */

exports.default = function (_ref) {
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

  var classes = (0, _classnames2.default)('geosuggest-item', className, { 'geosuggest-item--active': isActive });

  return _react2.default.createElement(
    'li',
    { className: classes,
      onMouseDown: onMouseDown,
      onMouseOut: onMouseOut,
      onClick: function onClick(event) {
        event.preventDefault();
        onSelect();
      } },
    suggest.label
  );
}; // eslint-disable-line no-unused-vars