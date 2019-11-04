(function (React, ReactDOM) {
    'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var classnames = createCommonjsModule(function (module) {
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    /* global define */

    (function () {

    	var hasOwn = {}.hasOwnProperty;

    	function classNames () {
    		var classes = [];

    		for (var i = 0; i < arguments.length; i++) {
    			var arg = arguments[i];
    			if (!arg) continue;

    			var argType = typeof arg;

    			if (argType === 'string' || argType === 'number') {
    				classes.push(arg);
    			} else if (Array.isArray(arg) && arg.length) {
    				var inner = classNames.apply(null, arg);
    				if (inner) {
    					classes.push(inner);
    				}
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

    	if (module.exports) {
    		classNames.default = classNames;
    		module.exports = classNames;
    	} else {
    		window.classNames = classNames;
    	}
    }());
    });

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max,
        nativeMin = Math.min;

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = function() {
      return root.Date.now();
    };

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var lodash_debounce = debounce;

    /* istanbul ignore next */
    /* tslint:disable:no-empty */
    /**
     * Default values
     */
    var defaults = {
        autoActivateFirstSuggest: false,
        disabled: false,
        fixtures: [],
        getSuggestLabel: function (suggest) { return suggest.description; },
        highlightMatch: true,
        ignoreEnter: false,
        ignoreTab: false,
        initialValue: '',
        maxFixtures: 10,
        minLength: 1,
        onKeyDown: function () { },
        onKeyPress: function () { },
        placeholder: 'Search places',
        queryDelay: 250,
        skipSuggest: function () { return false; },
        style: {}
    };

    /**
     * Attributes allowed on input elements
     */
    var allowedAttributes = [
        'autoCapitalize',
        'autoComplete',
        'autoCorrect',
        'autoFocus',
        'disabled',
        'form',
        'formAction',
        'formEncType',
        'formMethod',
        'formNoValidate',
        'formTarget',
        'height',
        'id',
        'inputMode',
        'maxLength',
        'name',
        'onClick',
        'onContextMenu',
        'onCopy',
        'onCut',
        'onDoubleClick',
        'onMouseDown',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'onMouseOut',
        'onMouseOver',
        'onMouseUp',
        'onPaste',
        'pattern',
        'placeholder',
        'readOnly',
        'required',
        'size',
        'spellCheck',
        'tabIndex',
        'title',
        'aria-atomic',
        'aria-busy',
        'aria-controls',
        'aria-current',
        'aria-describedby',
        'aria-details',
        'aria-disabled',
        'aria-dropeffect',
        'aria-errormessage',
        'aria-flowto',
        'aria-grabbed',
        'aria-haspopup',
        'aria-hidden',
        'aria-invalid',
        'aria-keyshortcuts',
        'aria-label',
        'aria-labelledby',
        'aria-live',
        'aria-owns',
        'aria-relevant',
        'aria-roledescription',
        'aria-activedescendant',
        'aria-autocomplete',
        'aria-multiline',
        'aria-placeholder',
        'aria-readonly',
        'aria-required'
    ];
    /**
     * Filter the properties for only allowed input properties
     */
    function filterInputAttributes (props) {
        var attributes = {};
        allowedAttributes.forEach(function (allowedAttribute) {
            if (props[allowedAttribute]) {
                attributes[allowedAttribute] = props[allowedAttribute];
            }
        });
        return attributes;
    }

    /**
     * The input field
     */
    var default_1 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        /**
         * The constructor.
         */
        function default_1(props) {
            var _this = _super.call(this, props) || this;
            /* tslint:enable:no-empty */
            /**
             * The reference to the input element
             */
            _this.input = null;
            _this.onChange = _this.onChange.bind(_this);
            _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
            return _this;
        }
        /**
         * When the input got changed
         */
        default_1.prototype.onChange = function () {
            if (this.input) {
                this.props.onChange(this.input.value);
            }
        };
        /**
         * When a key gets pressed in the input
         */
        default_1.prototype.onInputKeyDown = function (event) {
            // Call props.onKeyDown if defined
            // Gives the developer a little bit more control if needed
            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
            switch (event.which) {
                case 40: // DOWN
                    if (!event.shiftKey) {
                        event.preventDefault();
                        this.props.onNext();
                    }
                    break;
                case 38: // UP
                    if (!event.shiftKey) {
                        event.preventDefault();
                        this.props.onPrev();
                    }
                    break;
                case 13: // ENTER
                    if (this.props.doNotSubmitOnEnter) {
                        event.preventDefault();
                    }
                    if (!this.props.ignoreEnter) {
                        this.props.onSelect();
                    }
                    break;
                case 9: // TAB
                    if (!this.props.ignoreTab) {
                        this.props.onSelect();
                    }
                    break;
                case 27: // ESC
                    this.props.onEscape();
                    break;
                /* istanbul ignore next */
                default:
                    break;
            }
        };
        /**
         * Focus the input
         */
        default_1.prototype.focus = function () {
            if (this.input) {
                this.input.focus();
            }
        };
        /**
         * Blur the input
         */
        default_1.prototype.blur = function () {
            if (this.input) {
                this.input.blur();
            }
        };
        /**
         * Render the view
         */
        default_1.prototype.render = function () {
            var _this = this;
            var attributes = filterInputAttributes(this.props);
            var classes = classnames('geosuggest__input', this.props.className);
            return (React.createElement("input", __assign({ className: classes, ref: function (i) { return (_this.input = i); }, type: "text" }, attributes, { value: this.props.value, style: this.props.style, onKeyDown: this.onInputKeyDown, onChange: this.onChange, onKeyPress: this.props.onKeyPress, onFocus: this.props.onFocus, onBlur: this.props.onBlur, role: "combobox", "aria-expanded": !this.props.isSuggestsHidden, "aria-activedescendant": this.props.activeSuggest
                    ? this.props.activeSuggest.placeId
                    : undefined, "aria-owns": this.props.listId })));
        };
        /* tslint:disable:no-empty */
        /**
         * Default values for the properties
         */
        default_1.defaultProps = {
            activeSuggest: null,
            autoComplete: 'nope',
            className: '',
            isSuggestsHidden: true,
            listId: '',
            onBlur: function () { },
            onChange: function () { },
            onEscape: function () { },
            onFocus: function () { },
            onKeyDown: function () { },
            onKeyPress: function () { },
            onNext: function () { },
            onPrev: function () { },
            onSelect: function () { },
            value: ''
        };
        return default_1;
    }(React.PureComponent));

    /**
     * A single Geosuggest item in the list
     */
    var default_1$1 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        /**
         * The constructor.
         */
        function default_1(props) {
            var _this = _super.call(this, props) || this;
            /**
             * The reference to the suggest element
             */
            _this.ref = null;
            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }
        /**
         * Makes a text bold
         */
        default_1.prototype.makeBold = function (element, key) {
            return (React.createElement("b", { className: "geosuggest__item__matched-text", key: key }, element));
        };
        /**
         * Replace matched text with the same in bold
         */
        default_1.prototype.formatMatchedText = function (userInput, suggest) {
            if (!userInput || !suggest.matchedSubstrings) {
                return suggest.label;
            }
            var start = suggest.matchedSubstrings.offset;
            var length = suggest.matchedSubstrings.length;
            var end = start + length;
            var boldPart = this.makeBold(suggest.label.substring(start, end), suggest.label);
            var pre = '';
            var post = '';
            if (start > 0) {
                pre = suggest.label.slice(0, start);
            }
            if (end < suggest.label.length) {
                post = suggest.label.slice(end);
            }
            return (React.createElement("span", null,
                pre,
                boldPart,
                post));
        };
        /**
         * Checking if item just became active and scrolling if needed.
         */
        default_1.prototype.componentDidUpdate = function (prevProps) {
            if (!prevProps.isActive && this.props.isActive) {
                this.scrollIfNeeded();
            }
        };
        /**
         * Scrolling current item to the center of the list if item needs scrolling.
         * Item is scrolled to the center of the list.
         */
        default_1.prototype.scrollIfNeeded = function () {
            var element = this.ref;
            var parent = element && element.parentElement;
            if (!element || !parent) {
                return;
            }
            var overTop = element.offsetTop - parent.offsetTop < parent.scrollTop;
            var overBottom = element.offsetTop - parent.offsetTop + element.clientHeight >
                parent.scrollTop + parent.clientHeight;
            if (overTop || overBottom) {
                parent.scrollTop =
                    element.offsetTop -
                        parent.offsetTop -
                        parent.clientHeight / 2 +
                        element.clientHeight / 2;
            }
        };
        /**
         * When the suggest item got clicked
         */
        default_1.prototype.onClick = function (event) {
            event.preventDefault();
            this.props.onSelect(this.props.suggest);
        };
        /**
         * Render the view
         */
        default_1.prototype.render = function () {
            var _this = this;
            var _a;
            var suggest = this.props.suggest;
            var classes = classnames('geosuggest__item', this.props.className, this.props.suggestItemClassName, { 'geosuggest__item--active': this.props.isActive }, (_a = {},
                _a[this.props.activeClassName || ''] = this.props.activeClassName
                    ? this.props.isActive
                    : null,
                _a));
            var content = suggest.label;
            if (this.props.renderSuggestItem) {
                content = this.props.renderSuggestItem(suggest, this.props.userInput);
            }
            else if (this.props.isHighlightMatch) {
                content = this.formatMatchedText(this.props.userInput, suggest);
            }
            return (React.createElement("li", { className: classes, ref: function (li) { return (_this.ref = li); }, style: this.props.style, onMouseDown: this.props.onMouseDown, onMouseOut: this.props.onMouseOut, onClick: this.onClick, role: "option", "aria-selected": this.props.isActive, id: suggest.placeId }, content));
        };
        return default_1;
    }(React.PureComponent));

    /**
     * The list with suggestions.
     */
    var default_1$2 = /** @class */ (function (_super) {
        __extends(default_1, _super);
        function default_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Whether or not it is hidden
         */
        default_1.prototype.isHidden = function () {
            return this.props.isHidden || this.props.suggests.length === 0;
        };
        /**
         * There are new properties available for the list
         */
        default_1.prototype.componentDidUpdate = function (prevProps) {
            if (prevProps.suggests !== this.props.suggests) {
                if (this.props.suggests.length === 0) {
                    this.props.onSuggestNoResults();
                }
            }
        };
        /**
         * Render the view
         * @return {Function} The React element to render
         */
        default_1.prototype.render = function () {
            var _this = this;
            var _a;
            var classes = classnames('geosuggest__suggests', this.props.suggestsClassName, { 'geosuggest__suggests--hidden': this.isHidden() }, (_a = {},
                _a[this.props.hiddenClassName || ''] = this.props.hiddenClassName
                    ? this.isHidden()
                    : null,
                _a));
            return (React.createElement("ul", { className: classes, style: this.props.style, role: "listbox", id: this.props.listId }, this.props.suggests.map(function (suggest) {
                var isActive = (_this.props.activeSuggest &&
                    suggest.placeId === _this.props.activeSuggest.placeId) ||
                    false;
                return (React.createElement(default_1$1, { key: suggest.placeId, className: suggest.className || '', userInput: _this.props.userInput, isHighlightMatch: _this.props.isHighlightMatch, suggest: suggest, style: _this.props.suggestItemStyle, suggestItemClassName: _this.props.suggestItemClassName, isActive: isActive, activeClassName: _this.props.suggestItemActiveClassName, onMouseDown: _this.props.onSuggestMouseDown, onMouseOut: _this.props.onSuggestMouseOut, onSelect: _this.props.onSuggestSelect, renderSuggestItem: _this.props.renderSuggestItem }));
            })));
        };
        return default_1;
    }(React.PureComponent));

    /* global window */
    // Escapes special characters in user input for regex
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
    /**
     * Entry point for the Geosuggest component
     */
    var default_1$3 = /** @class */ (function (_super) {
        __extends(default_1$1, _super);
        /**
         * The constructor. Sets the initial state.
         */
        function default_1$1(props) {
            var _this = _super.call(this, props) || this;
            /**
             * The Google Map instance
             */
            _this.googleMaps = null;
            /**
             * The autocomple service to get suggests
             */
            _this.autocompleteService = null;
            /**
             * The places service to get place details
             */
            _this.placesService = null;
            /**
             * The sessionToken service to use session based monetization
             */
            _this.sessionToken = undefined;
            /**
             * The geocoder to get geocoded results
             */
            _this.geocoder = null;
            /**
             * The input component
             */
            _this.input = null;
            _this.state = {
                activeSuggest: null,
                ignoreBlur: false,
                isLoading: false,
                isSuggestsHidden: true,
                suggests: [],
                userInput: props.initialValue || ''
            };
            _this.onInputChange = _this.onInputChange.bind(_this);
            _this.onAfterInputChange = _this.onAfterInputChange.bind(_this);
            _this.onInputFocus = _this.onInputFocus.bind(_this);
            _this.onInputBlur = _this.onInputBlur.bind(_this);
            _this.onNext = _this.onNext.bind(_this);
            _this.onPrev = _this.onPrev.bind(_this);
            _this.onSelect = _this.onSelect.bind(_this);
            _this.onSuggestMouseDown = _this.onSuggestMouseDown.bind(_this);
            _this.onSuggestMouseOut = _this.onSuggestMouseOut.bind(_this);
            _this.onSuggestNoResults = _this.onSuggestNoResults.bind(_this);
            _this.hideSuggests = _this.hideSuggests.bind(_this);
            _this.selectSuggest = _this.selectSuggest.bind(_this);
            _this.listId = "geosuggest__list_" + Math.random()
                .toString(16)
                .slice(2);
            if (props.queryDelay) {
                _this.onAfterInputChange = lodash_debounce(_this.onAfterInputChange, props.queryDelay);
            }
            return _this;
        }
        /**
         * Change inputValue if prop changes
         */
        default_1$1.prototype.componentDidUpdate = function (prevProps) {
            if (prevProps.initialValue !== this.props.initialValue) {
                this.setState({ userInput: this.props.initialValue || '' });
            }
        };
        /**
         * Called on the client side after component is mounted.
         * Google api sdk object will be obtained and cached as a instance property.
         * Necessary objects of google api will also be determined and saved.
         */
        default_1$1.prototype.componentDidMount = function () {
            if (typeof window === 'undefined') {
                return;
            }
            var googleMaps = this.props.googleMaps ||
                (window.google && window.google.maps) ||
                this.googleMaps;
            /* istanbul ignore next */
            if (!googleMaps) {
                if (console) {
                    // tslint:disable-next-line:no-console
                    console.error('Google maps API was not found in the page.');
                }
                return;
            }
            this.googleMaps = googleMaps;
            this.autocompleteService = new googleMaps.places.AutocompleteService();
            this.placesService = new googleMaps.places.PlacesService(document.createElement('div'));
            this.sessionToken = new googleMaps.places.AutocompleteSessionToken();
            this.geocoder = new googleMaps.Geocoder();
        };
        /**
         * When the component will unmount
         */
        default_1$1.prototype.componentWillUnmount = function () {
            clearTimeout(this.timer);
        };
        /**
         * When the input changed
         */
        default_1$1.prototype.onInputChange = function (userInput) {
            if (!userInput) {
                if (this.props.onSuggestSelect) {
                    this.props.onSuggestSelect();
                }
            }
            this.setState({ userInput: userInput }, this.onAfterInputChange);
        };
        /**
         * On After the input got changed
         */
        default_1$1.prototype.onAfterInputChange = function () {
            this.showSuggests();
            if (this.props.onChange) {
                this.props.onChange(this.state.userInput);
            }
        };
        /**
         * When the input gets focused
         */
        default_1$1.prototype.onInputFocus = function () {
            if (this.props.onFocus) {
                this.props.onFocus();
            }
            this.showSuggests();
        };
        /**
         * When the input gets blurred
         */
        default_1$1.prototype.onInputBlur = function () {
            if (!this.state.ignoreBlur) {
                this.hideSuggests();
            }
        };
        default_1$1.prototype.onNext = function () {
            this.activateSuggest('next');
        };
        default_1$1.prototype.onPrev = function () {
            this.activateSuggest('prev');
        };
        default_1$1.prototype.onSelect = function () {
            this.selectSuggest(this.state.activeSuggest);
        };
        default_1$1.prototype.onSuggestMouseDown = function () {
            this.setState({ ignoreBlur: true });
        };
        default_1$1.prototype.onSuggestMouseOut = function () {
            this.setState({ ignoreBlur: false });
        };
        default_1$1.prototype.onSuggestNoResults = function () {
            if (this.props.onSuggestNoResults) {
                this.props.onSuggestNoResults(this.state.userInput);
            }
        };
        /**
         * Focus the input
         */
        default_1$1.prototype.focus = function () {
            if (this.input) {
                this.input.focus();
            }
        };
        /**
         * Blur the input
         */
        default_1$1.prototype.blur = function () {
            if (this.input) {
                this.input.blur();
            }
        };
        /**
         * Update the value of the user input
         */
        default_1$1.prototype.update = function (userInput) {
            this.setState({ userInput: userInput });
            if (this.props.onChange) {
                this.props.onChange(userInput);
            }
        };
        /*
         * Clear the input and close the suggestion pane
         */
        default_1$1.prototype.clear = function () {
            this.setState({ userInput: '' }, this.hideSuggests);
        };
        /**
         * Search for new suggests
         */
        default_1$1.prototype.searchSuggests = function () {
            var _this = this;
            if (!this.state.userInput) {
                this.updateSuggests();
                return;
            }
            var options = {
                input: this.state.userInput,
                sessionToken: this.sessionToken
            };
            var inputLength = this.state.userInput.length;
            var isShorterThanMinLength = this.props.minLength && inputLength < this.props.minLength;
            if (isShorterThanMinLength) {
                return;
            }
            var _a = this.props, location = _a.location, radius = _a.radius, bounds = _a.bounds, types = _a.types, country = _a.country;
            /* tslint:disable:curly */
            if (location)
                options.location = location;
            if (radius)
                options.radius = Number(this.props.radius);
            if (bounds)
                options.bounds = bounds;
            if (types)
                options.types = types;
            if (country)
                options.componentRestrictions = { country: country };
            /* tslint:enable:curly */
            this.setState({ isLoading: true }, function () {
                if (!_this.autocompleteService) {
                    _this.setState({ isLoading: false });
                    return;
                }
                _this.autocompleteService.getPlacePredictions(options, function (suggestsGoogle) {
                    _this.setState({ isLoading: false });
                    _this.updateSuggests(suggestsGoogle || [], // can be null
                    function () {
                        if (_this.props.autoActivateFirstSuggest &&
                            !_this.state.activeSuggest) {
                            _this.activateSuggest('next');
                        }
                    });
                });
            });
        };
        /**
         * Update the suggests
         */
        default_1$1.prototype.updateSuggests = function (suggestsGoogle, 
        // tslint:disable-next-line:no-empty
        callback) {
            var _this = this;
            if (suggestsGoogle === void 0) { suggestsGoogle = []; }
            if (callback === void 0) { callback = function () { }; }
            var suggests = [];
            var userInput = this.state.userInput;
            var _a = this.props, skipSuggest = _a.skipSuggest, maxFixtures = _a.maxFixtures, fixtures = _a.fixtures;
            var regex = new RegExp(escapeRegExp(userInput), 'gim');
            var fixturesSearched = 0;
            var activeSuggest = null;
            if (fixtures) {
                fixtures.forEach(function (fixture) {
                    if (maxFixtures && fixturesSearched >= maxFixtures) {
                        return;
                    }
                    if (skipSuggest &&
                        !skipSuggest(fixture) &&
                        fixture.label.match(regex)) {
                        fixturesSearched++;
                        suggests.push(__assign({}, fixture, { isFixture: true, matchedSubstrings: {
                                length: userInput.length,
                                offset: fixture.label.indexOf(userInput)
                            }, placeId: fixture.placeId || fixture.label }));
                    }
                });
            }
            suggestsGoogle.forEach(function (suggest) {
                if (skipSuggest && !skipSuggest(suggest)) {
                    suggests.push({
                        description: suggest.description,
                        isFixture: false,
                        label: _this.props.getSuggestLabel
                            ? _this.props.getSuggestLabel(suggest)
                            : '',
                        matchedSubstrings: suggest.matched_substrings[0],
                        placeId: suggest.place_id
                    });
                }
            });
            activeSuggest = this.updateActiveSuggest(suggests);
            if (this.props.onUpdateSuggests) {
                this.props.onUpdateSuggests(suggests, activeSuggest);
            }
            this.setState({ suggests: suggests, activeSuggest: activeSuggest }, callback);
        };
        /**
         * Return the new activeSuggest object after suggests have been updated
         */
        default_1$1.prototype.updateActiveSuggest = function (suggests) {
            if (suggests === void 0) { suggests = []; }
            var activeSuggest = this.state.activeSuggest;
            if (activeSuggest) {
                var newSuggest = suggests.filter(function (listedSuggest) {
                    return activeSuggest &&
                        activeSuggest.placeId === listedSuggest.placeId &&
                        activeSuggest.isFixture === listedSuggest.isFixture;
                })[0];
                activeSuggest = newSuggest || null;
            }
            return activeSuggest;
        };
        /**
         * Show the suggestions
         */
        default_1$1.prototype.showSuggests = function () {
            this.searchSuggests();
            this.setState({ isSuggestsHidden: false });
        };
        /**
         * Hide the suggestions
         */
        default_1$1.prototype.hideSuggests = function () {
            var _this = this;
            if (this.props.onBlur) {
                this.props.onBlur(this.state.userInput);
            }
            this.timer = window.setTimeout(function () {
                _this.setState({
                    activeSuggest: null,
                    isSuggestsHidden: true
                });
            }, 100);
        };
        /**
         * Activate a new suggest
         */
        default_1$1.prototype.activateSuggest = function (direction) {
            if (this.state.isSuggestsHidden) {
                this.showSuggests();
                return;
            }
            var suggestsCount = this.state.suggests.length - 1;
            var next = direction === 'next';
            var newActiveSuggest = null;
            var newIndex = 0;
            var i = 0;
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
            if (this.props.onActivateSuggest) {
                this.props.onActivateSuggest(newActiveSuggest);
            }
            this.setState({ activeSuggest: newActiveSuggest });
        };
        /**
         * When an item got selected
         */
        default_1$1.prototype.selectSuggest = function (suggestToSelect) {
            var suggest = suggestToSelect || {
                isFixture: false,
                label: this.state.userInput,
                placeId: this.state.userInput
            };
            if (!suggestToSelect &&
                this.props.autoActivateFirstSuggest &&
                this.state.suggests.length > 0) {
                suggest = this.state.suggests[0];
            }
            this.setState({
                isSuggestsHidden: true,
                userInput: typeof suggest.label !== 'object'
                    ? suggest.label
                    : suggest.description || ''
            });
            if (suggest.location) {
                this.setState({ ignoreBlur: false });
                if (this.props.onSuggestSelect) {
                    this.props.onSuggestSelect(suggest);
                }
                return;
            }
            this.geocodeSuggest(suggest);
        };
        /**
         * Geocode a suggest
         */
        default_1$1.prototype.geocodeSuggest = function (suggestToGeocode) {
            var _this = this;
            if (!this.geocoder) {
                return;
            }
            if (suggestToGeocode.placeId &&
                !suggestToGeocode.isFixture &&
                this.placesService) {
                var options = {
                    placeId: suggestToGeocode.placeId,
                    sessionToken: this.sessionToken
                };
                if (this.props.placeDetailFields) {
                    options.fields = ['geometry'].concat(this.props.placeDetailFields);
                }
                this.placesService.getDetails(options, function (results, status) {
                    if (status === _this.googleMaps.places.PlacesServiceStatus.OK) {
                        var gmaps = results;
                        var location_1 = (gmaps.geometry &&
                            gmaps.geometry.location);
                        var suggest = __assign({}, suggestToGeocode, { gmaps: gmaps, location: {
                                lat: location_1.lat(),
                                lng: location_1.lng()
                            } });
                        _this.sessionToken = new google.maps.places.AutocompleteSessionToken();
                        if (_this.props.onSuggestSelect) {
                            _this.props.onSuggestSelect(suggest);
                        }
                    }
                });
            }
            else {
                var options = {
                    address: suggestToGeocode.label,
                    bounds: this.props.bounds,
                    componentRestrictions: this.props.country
                        ? { country: this.props.country }
                        : undefined,
                    location: this.props.location
                };
                this.geocoder.geocode(options, function (results, status) {
                    if (status === _this.googleMaps.GeocoderStatus.OK) {
                        var gmaps = results[0];
                        var location_2 = (gmaps.geometry &&
                            gmaps.geometry.location);
                        var suggest = __assign({}, suggestToGeocode, { gmaps: gmaps, location: {
                                lat: location_2.lat(),
                                lng: location_2.lng()
                            } });
                        if (_this.props.onSuggestSelect) {
                            _this.props.onSuggestSelect(suggest);
                        }
                    }
                });
            }
        };
        /**
         * Render the view
         */
        default_1$1.prototype.render = function () {
            var _this = this;
            var attributes = filterInputAttributes(this.props);
            var classes = classnames('geosuggest', this.props.className, {
                'geosuggest--loading': this.state.isLoading
            });
            var shouldRenderLabel = this.props.label && attributes.id;
            var input = (React.createElement(default_1, __assign({ className: this.props.inputClassName, ref: function (i) { return (_this.input = i); }, value: this.state.userInput, doNotSubmitOnEnter: !this.state.isSuggestsHidden, ignoreTab: this.props.ignoreTab, ignoreEnter: this.props.ignoreEnter, style: this.props.style && this.props.style.input, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, onKeyDown: this.props.onKeyDown, onKeyPress: this.props.onKeyPress, onNext: this.onNext, onPrev: this.onPrev, onSelect: this.onSelect, onEscape: this.hideSuggests, isSuggestsHidden: this.state.isSuggestsHidden, activeSuggest: this.state.activeSuggest, listId: this.listId }, attributes)));
            var suggestionsList = (React.createElement(default_1$2, { isHidden: this.state.isSuggestsHidden, style: this.props.style && this.props.style.suggests, suggestItemStyle: this.props.style && this.props.style.suggestItem, userInput: this.state.userInput, isHighlightMatch: Boolean(this.props.highlightMatch), suggestsClassName: this.props.suggestsClassName, suggestItemClassName: this.props.suggestItemClassName, suggests: this.state.suggests, hiddenClassName: this.props.suggestsHiddenClassName, suggestItemActiveClassName: this.props.suggestItemActiveClassName, activeSuggest: this.state.activeSuggest, onSuggestNoResults: this.onSuggestNoResults, onSuggestMouseDown: this.onSuggestMouseDown, onSuggestMouseOut: this.onSuggestMouseOut, onSuggestSelect: this.selectSuggest, renderSuggestItem: this.props.renderSuggestItem, listId: this.listId }));
            return (React.createElement("div", { className: classes },
                React.createElement("div", { className: "geosuggest__input-wrapper" },
                    shouldRenderLabel && (React.createElement("label", { className: "geosuggest__label", htmlFor: attributes.id }, this.props.label)),
                    input),
                React.createElement("div", { className: "geosuggest__suggests-wrapper" }, suggestionsList)));
        };
        /**
         * Default values for the properties
         */
        default_1$1.defaultProps = defaults;
        return default_1$1;
    }(React.Component));

    /* global google */
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * When the input receives focus
         */
        App.prototype.onFocus = function () {
            console.log('onFocus');
        };
        /**
         * When the input loses focus
         */
        App.prototype.onBlur = function (value) {
            console.log('onBlur', value);
        };
        /**
         * When the input got changed
         */
        App.prototype.onChange = function (value) {
            console.log('input changes to :' + value);
        };
        /**
         * When a suggest got selected
         */
        App.prototype.onSuggestSelect = function (suggest) {
            console.log(suggest);
        };
        /**
         * When there are no suggest results
         */
        App.prototype.onSuggestNoResults = function (userInput) {
            console.log('onSuggestNoResults for :' + userInput);
        };
        /**
         * Render the example app
         * @return {Function} React render function
         */
        App.prototype.render = function () {
            var fixtures = [
                { label: 'New York', location: { lat: 40.7033127, lng: -73.979681 } },
                { label: 'Rio', location: { lat: -22.066452, lng: -42.9232368 } },
                { label: 'Tokyo', location: { lat: 35.673343, lng: 139.710388 } }
            ];
            return (React__default.createElement("div", null,
                React__default.createElement(default_1$3, { fixtures: fixtures, onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange, onSuggestSelect: this.onSuggestSelect, onSuggestNoResults: this.onSuggestNoResults, location: new google.maps.LatLng(53.558572, 9.9278215), radius: "20" })));
        };
        return App;
    }(React__default.Component));
    ReactDOM.render(React__default.createElement(App, null), document.getElementById('app'));

}(React, ReactDOM));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNyBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSAmJiBhcmcubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0aWYgKGlubmVyKSB7XG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGlubmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0Y2xhc3NOYW1lcy5kZWZhdWx0ID0gY2xhc3NOYW1lcztcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIl0sIm5hbWVzIjpbImdsb2JhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7OztJQU9BLENBQUMsWUFBWTs7S0FHWixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDOztLQUUvQixTQUFTLFVBQVUsSUFBSTtNQUN0QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O01BRWpCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO09BQzFDLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVM7O09BRW5CLElBQUksT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDOztPQUV6QixJQUFJLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDNUMsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxLQUFLLEVBQUU7U0FDVixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsTUFBTSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDaEMsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7U0FDcEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLENB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
