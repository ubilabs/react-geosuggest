'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowCompare = require('react-addons-shallow-compare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var SuggestItem = function (_React$Component) {
  _inherits(SuggestItem, _React$Component);

  function SuggestItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SuggestItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SuggestItem.__proto__ || Object.getPrototypeOf(SuggestItem)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      event.preventDefault();
      _this.props.onSelect(_this.props.suggest);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SuggestItem, [{
    key: 'shouldComponentUpdate',

    /**
     * Whether or not the component should update
     * @param {Object} nextProps The new properties
     * @param {Object} nextState The new state
     * @return {Boolean} Update or not?
     */
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _shallowCompare2.default)(this, nextProps, nextState);
    }

    /**
     * When the suggest item got clicked
     * @param {Event} event The click event
     */

  }, {
    key: 'render',


    /**
     * Render the view
     * @return {Function} The React element to render
     */
    value: function render() {
      var classes = (0, _classnames3.default)('geosuggest__item', this.props.className, this.props.suggestItemClassName, { 'geosuggest__item--active': this.props.isActive }, _defineProperty({}, this.props.activeClassname, this.props.activeClassname ? this.props.isActive : null));

      return _react2.default.createElement(
        'li',
        { className: classes,
          style: this.props.style,
          onMouseDown: this.props.onMouseDown,
          onMouseOut: this.props.onMouseOut,
          onClick: this.onClick },
        this.props.suggest.label
      );
    }
  }]);

  return SuggestItem;
}(_react2.default.Component);

/**
 * Default values for the properties
 * @type {Object}
 */


exports.default = SuggestItem;
SuggestItem.defaultProps = {
  isActive: false,
  className: '',
  suggest: {}
};