'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
    key: 'makeBold',

    /**
     * Makes a text bold
     * @param {String} element The element to wrap
     * @param {String} key The key to set on the element
     * @return {JSX} Bolder text
     */
    value: function makeBold(element, key) {
      return _react2.default.createElement(
        'b',
        { className: 'geosuggest__item__matched-text', key: key },
        element
      );
    }

    /**
     * Replace matched text with the same bold
     * @param {Object} userInput Value from input
     * @param {Object} suggest Data from google
     * @return {String} Formatted string with highlighted matched text
     */

  }, {
    key: 'formatMatchedText',
    value: function formatMatchedText(userInput, suggest) {
      if (!userInput || !suggest.matchedSubstrings) {
        return suggest.label;
      }

      var start = suggest.matchedSubstrings.offset,
          length = suggest.matchedSubstrings.length,
          end = start + length,
          boldPart = this.makeBold(suggest.label.substring(start, end), suggest.label);

      var pre = '',
          post = '';

      if (start > 0) {
        pre = suggest.label.slice(0, start);
      }
      if (end < suggest.label.length) {
        post = suggest.label.slice(end);
      }

      return _react2.default.createElement(
        'span',
        null,
        pre,
        boldPart,
        post
      );
    }

    /**
     * Checking if item just became active and scrolling if needed.
     * @param {Object} nextProps The new properties
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isActive && !this.props.isActive) {
        this.scrollIfNeeded();
      }
    }

    /**
     * Scrolling current item to the center of the list if item needs scrolling.
     * Item is scrolled to the center of the list.
     */

  }, {
    key: 'scrollIfNeeded',
    value: function scrollIfNeeded() {
      var el = this.ref,
          parent = el.parentElement,
          overTop = el.offsetTop - parent.offsetTop < parent.scrollTop,
          overBottom = el.offsetTop - parent.offsetTop + el.clientHeight > parent.scrollTop + parent.clientHeight;

      if (overTop || overBottom) {
        parent.scrollTop = el.offsetTop - parent.offsetTop - parent.clientHeight / 2 + el.clientHeight / 2;
      }
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
      var _this2 = this;

      var suggest = this.props.suggest,
          classes = (0, _classnames3.default)('geosuggest__item', this.props.className, this.props.suggestItemClassName, { 'geosuggest__item--active': this.props.isActive }, _defineProperty({}, this.props.activeClassname, this.props.activeClassname ? this.props.isActive : null));

      var content = suggest.label;

      if (this.props.renderSuggestItem) {
        content = this.props.renderSuggestItem(suggest);
      } else if (this.props.isHighlightMatch) {
        content = this.formatMatchedText(this.props.userInput, suggest);
      }

      return _react2.default.createElement(
        'li',
        { className: classes,
          ref: function ref(li) {
            return _this2.ref = li;
          },
          style: this.props.style,
          onMouseDown: this.props.onMouseDown,
          onMouseOut: this.props.onMouseOut,
          onClick: this.onClick },
        content
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