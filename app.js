(function (React, ReactDOM) {
    'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var classnames$1 = {exports: {}};

    /*!
    	Copyright (c) 2018 Jed Watson.
    	Licensed under the MIT License (MIT), see
    	http://jedwatson.github.io/classnames
    */

    (function (module) {
    	/* global define */

    	(function () {

    		var hasOwn = {}.hasOwnProperty;

    		function classNames() {
    			var classes = [];

    			for (var i = 0; i < arguments.length; i++) {
    				var arg = arguments[i];
    				if (!arg) continue;

    				var argType = typeof arg;

    				if (argType === 'string' || argType === 'number') {
    					classes.push(arg);
    				} else if (Array.isArray(arg)) {
    					if (arg.length) {
    						var inner = classNames.apply(null, arg);
    						if (inner) {
    							classes.push(inner);
    						}
    					}
    				} else if (argType === 'object') {
    					if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
    						classes.push(arg.toString());
    						continue;
    					}

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
    } (classnames$1));

    var classnamesExports = classnames$1.exports;
    var classnames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

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
    var root$1 = freeGlobal || freeSelf || Function('return this')();

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
      return root$1.Date.now();
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

    var debounce$1 = /*@__PURE__*/getDefaultExportFromCjs(lodash_debounce);

    /* istanbul ignore next */
    /* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function */
    /**
     * Default values
     */
    var defaults = {
        autoActivateFirstSuggest: false,
        disabled: false,
        fixtures: [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        style: {},
        inputType: 'text'
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
        Object.keys(props).forEach(function (attribute) {
            var isDataAttribute = attribute.startsWith('data-');
            var isAllowedAttribute = allowedAttributes.includes(attribute);
            if (isAllowedAttribute || isDataAttribute) {
                attributes[attribute] = props[attribute];
            }
        });
        return attributes;
    }

    /**
     * The input field
     */
    var Input = /** @class */ (function (_super) {
        __extends(Input, _super);
        /**
         * The constructor.
         */
        function Input(props) {
            var _this = _super.call(this, props) || this;
            /* eslint-enable @typescript-eslint/no-empty-function */
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
        Input.prototype.onChange = function () {
            if (this.input) {
                this.props.onChange(this.input.value);
            }
        };
        /**
         * When a key gets pressed in the input
         */
        // eslint-disable-next-line complexity
        Input.prototype.onInputKeyDown = function (event) {
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
            }
        };
        /**
         * Focus the input
         */
        Input.prototype.focus = function () {
            if (this.input) {
                this.input.focus();
            }
        };
        /**
         * Blur the input
         */
        Input.prototype.blur = function () {
            if (this.input) {
                this.input.blur();
            }
        };
        /**
         * Render the view
         */
        Input.prototype.render = function () {
            var _this = this;
            var attributes = filterInputAttributes(this.props);
            var classes = classnames('geosuggest__input', this.props.className);
            var shouldRenderLabel = this.props.label && this.props.id;
            if (!attributes.tabIndex) {
                attributes.tabIndex = 0;
            }
            return (React__namespace.createElement(React__namespace.Fragment, null,
                shouldRenderLabel && (React__namespace.createElement("label", { className: "geosuggest__label", htmlFor: this.props.id }, this.props.label)),
                React__namespace.createElement("input", __assign({ className: classes, id: "geosuggest__input".concat(this.props.id ? "--".concat(this.props.id) : ''), ref: function (i) { return (_this.input = i); }, type: this.props.inputType }, attributes, { value: this.props.value, style: this.props.style, onKeyDown: this.onInputKeyDown, onChange: this.onChange, onKeyPress: this.props.onKeyPress, onFocus: this.props.onFocus, onBlur: this.props.onBlur, role: "combobox", "aria-expanded": !this.props.isSuggestsHidden, "aria-activedescendant": this.props.activeSuggest
                        ? this.props.activeSuggest.placeId
                        : // eslint-disable-next-line no-undefined
                            undefined, "aria-owns": this.props.listId }))));
        };
        /* eslint-disable @typescript-eslint/no-empty-function */
        /**
         * Default values for the properties
         */
        Input.defaultProps = {
            activeSuggest: null,
            autoComplete: 'off',
            className: '',
            isSuggestsHidden: true,
            listId: '',
            inputType: 'text',
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
        return Input;
    }(React__namespace.PureComponent));

    /**
     * A single Geosuggest item in the list
     */
    var SuggestItem = /** @class */ (function (_super) {
        __extends(SuggestItem, _super);
        /**
         * The constructor.
         */
        function SuggestItem(props) {
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
        SuggestItem.prototype.makeBold = function (element, key) {
            return (React__namespace.createElement("b", { className: "geosuggest__item__matched-text", key: key }, element));
        };
        /**
         * Replace matched text with the same in bold
         */
        SuggestItem.prototype.formatMatchedText = function (userInput, suggest) {
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
            return (React__namespace.createElement("span", null,
                pre,
                boldPart,
                post));
        };
        /**
         * Checking if item just became active and scrolling if needed.
         */
        SuggestItem.prototype.componentDidUpdate = function (prevProps) {
            if (!prevProps.isActive && this.props.isActive) {
                this.scrollIfNeeded();
            }
        };
        /**
         * Scrolling current item to the center of the list if item needs scrolling.
         * Item is scrolled to the center of the list.
         */
        SuggestItem.prototype.scrollIfNeeded = function () {
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
        SuggestItem.prototype.onClick = function (event) {
            event.preventDefault();
            this.props.onSelect(this.props.suggest);
        };
        /**
         * Render the view
         */
        SuggestItem.prototype.render = function () {
            var _a;
            var _this = this;
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
            return (React__namespace.createElement("li", { className: classes, ref: function (li) { return (_this.ref = li); }, style: this.props.style, onMouseDown: this.props.onMouseDown, onMouseOut: this.props.onMouseOut, onClick: this.onClick, role: "option", "aria-selected": this.props.isActive, id: suggest.placeId }, content));
        };
        return SuggestItem;
    }(React__namespace.PureComponent));

    /**
     * The list with suggestions.
     */
    var SuggestList = /** @class */ (function (_super) {
        __extends(SuggestList, _super);
        function SuggestList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Whether or not it is hidden
         */
        SuggestList.prototype.isHidden = function () {
            return this.props.isHidden || this.props.suggests.length === 0;
        };
        /**
         * There are new properties available for the list
         */
        SuggestList.prototype.componentDidUpdate = function (prevProps) {
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
        SuggestList.prototype.render = function () {
            var _a;
            var _this = this;
            var classes = classnames('geosuggest__suggests', this.props.suggestsClassName, { 'geosuggest__suggests--hidden': this.isHidden() }, (_a = {},
                _a[this.props.hiddenClassName || ''] = this.props.hiddenClassName
                    ? this.isHidden()
                    : null,
                _a));
            return (React__namespace.createElement("ul", { className: classes, style: this.props.style, role: "listbox", "aria-label": this.props.listLabel, id: this.props.listId }, this.props.suggests.map(function (suggest) {
                var isActive = (_this.props.activeSuggest &&
                    suggest.placeId === _this.props.activeSuggest.placeId) ||
                    false;
                return (React__namespace.createElement(SuggestItem, { key: suggest.placeId, className: suggest.className || '', userInput: _this.props.userInput, isHighlightMatch: _this.props.isHighlightMatch, suggest: suggest, style: _this.props.suggestItemStyle, suggestItemClassName: _this.props.suggestItemClassName, isActive: isActive, activeClassName: _this.props.suggestItemActiveClassName, onMouseDown: _this.props.onSuggestMouseDown, onMouseOut: _this.props.onSuggestMouseOut, onSelect: _this.props.onSuggestSelect, renderSuggestItem: _this.props.renderSuggestItem }));
            })));
        };
        return SuggestList;
    }(React__namespace.PureComponent));

    /* global window */
    // Escapes special characters in user input for regex
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
    /**
     * Entry point for the Geosuggest component
     */
    var GeoSuggest = /** @class */ (function (_super) {
        __extends(GeoSuggest, _super);
        /**
         * The constructor. Sets the initial state.
         */
        // eslint-disable-next-line max-statements
        function GeoSuggest(props) {
            var _this = _super.call(this, props) || this;
            /**
             * The Google Map instance
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            _this.listId = "geosuggest__list".concat(props.id ? "--".concat(props.id) : '');
            _this.listLabel = props.label ? "".concat(props.label, " options") : 'options';
            if (props.queryDelay) {
                _this.onAfterInputChange = debounce$1(_this.onAfterInputChange, props.queryDelay);
            }
            return _this;
        }
        /**
         * Change inputValue if prop changes
         */
        GeoSuggest.prototype.componentDidUpdate = function (prevProps) {
            if (prevProps.initialValue !== this.props.initialValue) {
                this.setState({ userInput: this.props.initialValue || '' });
            }
            if (JSON.stringify(prevProps.fixtures) !== JSON.stringify(this.props.fixtures)) {
                this.searchSuggests();
            }
        };
        /**
         * Called on the client side after component is mounted.
         * Google api sdk object will be obtained and cached as a instance property.
         * Necessary objects of google api will also be determined and saved.
         */
        GeoSuggest.prototype.componentDidMount = function () {
            if (typeof window === 'undefined') {
                return;
            }
            var googleMaps = this.props.googleMaps ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window.google && window.google.maps) ||
                this.googleMaps;
            /* istanbul ignore next */
            if (!googleMaps) {
                if (console) {
                    // eslint-disable-next-line no-console
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
        GeoSuggest.prototype.componentWillUnmount = function () {
            clearTimeout(this.timer);
        };
        /**
         * When the input changed
         */
        GeoSuggest.prototype.onInputChange = function (userInput) {
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
        GeoSuggest.prototype.onAfterInputChange = function () {
            this.showSuggests();
            if (this.props.onChange) {
                this.props.onChange(this.state.userInput);
            }
        };
        /**
         * When the input gets focused
         */
        GeoSuggest.prototype.onInputFocus = function () {
            if (this.props.onFocus) {
                this.props.onFocus();
            }
            this.showSuggests();
        };
        /**
         * When the input gets blurred
         */
        GeoSuggest.prototype.onInputBlur = function () {
            if (!this.state.ignoreBlur) {
                this.hideSuggests();
            }
        };
        GeoSuggest.prototype.onNext = function () {
            this.activateSuggest('next');
        };
        GeoSuggest.prototype.onPrev = function () {
            this.activateSuggest('prev');
        };
        GeoSuggest.prototype.onSelect = function () {
            this.selectSuggest(this.state.activeSuggest);
        };
        GeoSuggest.prototype.onSuggestMouseDown = function () {
            this.setState({ ignoreBlur: true });
        };
        GeoSuggest.prototype.onSuggestMouseOut = function () {
            this.setState({ ignoreBlur: false });
        };
        GeoSuggest.prototype.onSuggestNoResults = function () {
            if (this.props.onSuggestNoResults) {
                this.props.onSuggestNoResults(this.state.userInput);
            }
        };
        /**
         * Focus the input
         */
        GeoSuggest.prototype.focus = function () {
            if (this.input) {
                this.input.focus();
            }
        };
        /**
         * Blur the input
         */
        GeoSuggest.prototype.blur = function () {
            if (this.input) {
                this.input.blur();
            }
        };
        /**
         * Update the value of the user input
         */
        GeoSuggest.prototype.update = function (userInput) {
            this.setState({ userInput: userInput });
            if (this.props.onChange) {
                this.props.onChange(userInput);
            }
        };
        /*
         * Clear the input and close the suggestion pane
         */
        GeoSuggest.prototype.clear = function () {
            this.setState({ userInput: '' }, this.hideSuggests);
        };
        /**
         * Search for new suggests
         */
        // eslint-disable-next-line complexity, max-statements
        GeoSuggest.prototype.searchSuggests = function () {
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
                this.updateSuggests();
                return;
            }
            var _a = this.props, location = _a.location, radius = _a.radius, bounds = _a.bounds, types = _a.types, country = _a.country;
            /* eslint-disable curly */
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
            /* eslint-enable curly */
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
        GeoSuggest.prototype.updateSuggests = function (suggestsGoogle, 
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
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
                        suggests.push(__assign(__assign({}, fixture), { isFixture: true, matchedSubstrings: {
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
        GeoSuggest.prototype.updateActiveSuggest = function (suggests) {
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
        GeoSuggest.prototype.showSuggests = function () {
            this.searchSuggests();
            this.setState({ isSuggestsHidden: false });
        };
        /**
         * Hide the suggestions
         */
        GeoSuggest.prototype.hideSuggests = function () {
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
        // eslint-disable-next-line complexity, max-statements
        GeoSuggest.prototype.activateSuggest = function (direction) {
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
        // eslint-disable-next-line complexity
        GeoSuggest.prototype.selectSuggest = function (suggestToSelect) {
            var suggest = suggestToSelect || {
                isFixture: true,
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
        GeoSuggest.prototype.geocodeSuggest = function (suggestToGeocode) {
            var _this = this;
            if (!this.geocoder) {
                return;
            }
            if (suggestToGeocode.placeId &&
                !suggestToGeocode.isFixture &&
                this.placesService) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var options = {
                    placeId: suggestToGeocode.placeId,
                    sessionToken: this.sessionToken
                };
                if (this.props.placeDetailFields) {
                    options.fields = this.props.placeDetailFields;
                    options.fields.unshift('geometry');
                }
                this.placesService.getDetails(options, function (results, status) {
                    if (status === _this.googleMaps.places.PlacesServiceStatus.OK) {
                        var gmaps = results;
                        var location_1 = (gmaps.geometry &&
                            gmaps.geometry.location);
                        var suggest = __assign(__assign({}, suggestToGeocode), { gmaps: gmaps, location: {
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
                        : // eslint-disable-next-line no-undefined
                            undefined,
                    location: this.props.location
                };
                this.geocoder.geocode(options, function (results, status) {
                    if (status === _this.googleMaps.GeocoderStatus.OK) {
                        var gmaps = results[0];
                        var location_2 = (gmaps.geometry &&
                            gmaps.geometry.location);
                        var suggest = __assign(__assign({}, suggestToGeocode), { gmaps: gmaps, location: {
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
        GeoSuggest.prototype.render = function () {
            var _this = this;
            var attributes = filterInputAttributes(this.props);
            var classes = classnames('geosuggest', this.props.className, {
                'geosuggest--loading': this.state.isLoading
            });
            var input = (React__namespace.createElement(Input, __assign({ className: this.props.inputClassName, ref: function (i) { return (_this.input = i); }, value: this.state.userInput, doNotSubmitOnEnter: !this.state.isSuggestsHidden, ignoreTab: this.props.ignoreTab, ignoreEnter: this.props.ignoreEnter, style: this.props.style && this.props.style.input, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, onKeyDown: this.props.onKeyDown, onKeyPress: this.props.onKeyPress, inputType: this.props.inputType, onNext: this.onNext, onPrev: this.onPrev, onSelect: this.onSelect, onEscape: this.hideSuggests, isSuggestsHidden: this.state.isSuggestsHidden, activeSuggest: this.state.activeSuggest, label: this.props.label, id: this.props.id, listId: this.listId }, attributes)));
            var suggestionsList = (React__namespace.createElement(SuggestList, { isHidden: this.state.isSuggestsHidden, style: this.props.style && this.props.style.suggests, suggestItemStyle: this.props.style && this.props.style.suggestItem, userInput: this.state.userInput, isHighlightMatch: Boolean(this.props.highlightMatch), suggestsClassName: this.props.suggestsClassName, suggestItemClassName: this.props.suggestItemClassName, suggests: this.state.suggests, hiddenClassName: this.props.suggestsHiddenClassName, suggestItemActiveClassName: this.props.suggestItemActiveClassName, activeSuggest: this.state.activeSuggest, onSuggestNoResults: this.onSuggestNoResults, onSuggestMouseDown: this.onSuggestMouseDown, onSuggestMouseOut: this.onSuggestMouseOut, onSuggestSelect: this.selectSuggest, renderSuggestItem: this.props.renderSuggestItem, listId: this.listId, listLabel: this.listLabel }));
            return (React__namespace.createElement("div", { className: classes, id: this.props.id },
                React__namespace.createElement("div", { className: "geosuggest__input-wrapper" }, input),
                React__namespace.createElement("div", { className: "geosuggest__suggests-wrapper" }, suggestionsList)));
        };
        /**
         * Default values for the properties
         */
        GeoSuggest.defaultProps = defaults;
        return GeoSuggest;
    }(React__namespace.Component));

    /* global google */
    /* eslint-disable no-console */
    var App = function () {
        /**
         * When the input receives focus
         */
        var onFocus = function () { return console.log('onFocus'); };
        /**
         * When the input loses focus
         */
        var onBlur = function (value) { return console.log('onBlur', value); };
        /**
         * When the input got changed
         */
        var onChange = function (value) {
            return console.log("input changes to : ".concat(value));
        };
        /**
         * When a suggest got selected
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var onSuggestSelect = function (suggest) { return console.log(suggest); };
        /**
         * When there are no suggest results
         */
        var onSuggestNoResults = function (userInput) {
            return console.log("onSuggestNoResults for : ".concat(userInput));
        };
        var fixtures = [
            { label: 'New York', location: { lat: 40.7033127, lng: -73.979681 } },
            { label: 'Rio', location: { lat: -22.066452, lng: -42.9232368 } },
            { label: 'Tokyo', location: { lat: 35.673343, lng: 139.710388 } }
        ];
        return (React.createElement(GeoSuggest, { fixtures: fixtures, onFocus: onFocus, onBlur: onBlur, onChange: onChange, onSuggestSelect: onSuggestSelect, onSuggestNoResults: onSuggestNoResults, location: new google.maps.LatLng(53.558572, 9.9278215), radius: "20" }));
    };
    var container = document.getElementById('app');
    var root = ReactDOM.createRoot(container);
    root.render(React.createElement(App, null));

})(React, ReactDOM);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG5cdENvcHlyaWdodCAoYykgMjAxOCBKZWQgV2F0c29uLlxuXHRMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuXHRodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXHR2YXIgbmF0aXZlQ29kZVN0cmluZyA9ICdbbmF0aXZlIGNvZGVdJztcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRpZiAoYXJnLmxlbmd0aCkge1xuXHRcdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJyb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtBQUNBO0lBQ0EsQ0FBQSxDQUFDLFlBQVk7QUFFYjtJQUNBLEVBQUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztBQUVoQztNQUNDLFNBQVMsVUFBVSxHQUFHO0lBQ3ZCLEdBQUUsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ25CO0lBQ0EsR0FBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM3QyxJQUFHLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUztBQUN0QjtJQUNBLElBQUcsSUFBSSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUM7QUFDNUI7UUFDRyxJQUFJLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLFFBQVEsRUFBRTtJQUNyRCxLQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDbEMsS0FBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7VUFDZixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztVQUN4QyxJQUFJLEtBQUssRUFBRTtJQUNoQixPQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7V0FDcEI7VUFDRDtJQUNMLEtBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7U0FDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7VUFDckcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNsQyxNQUFLLFNBQVM7VUFDVDtBQUNMO0lBQ0EsS0FBSSxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtJQUN6QixNQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQzVDLE9BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztXQUNsQjtVQUNEO1NBQ0Q7UUFDRDtBQUNIO0lBQ0EsR0FBRSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDekI7QUFDRjtNQUNDLElBQXFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7SUFDdEQsR0FBRSxVQUFVLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztPQUNoQyxNQUFBLENBQUEsT0FBQSxHQUFpQixVQUFVLENBQUM7SUFDOUIsR0FBRSxNQUtNO0lBQ1IsR0FBRSxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztPQUMvQjtJQUNGLEVBQUMsRUFBRSxFQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNsREg7SUFDQSxJQUFJLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQztBQUM1QztJQUNBO0lBQ0EsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQjtJQUNBO0lBQ0EsSUFBSSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDbEM7SUFDQTtJQUNBLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQztBQUMxQjtJQUNBO0lBQ0EsSUFBSSxVQUFVLEdBQUcsb0JBQW9CLENBQUM7QUFDdEM7SUFDQTtJQUNBLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQztBQUM5QjtJQUNBO0lBQ0EsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBQzlCO0lBQ0E7SUFDQSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUM7QUFDNUI7SUFDQTtJQUNBLElBQUksVUFBVSxHQUFHLE9BQU9BLGNBQU0sSUFBSSxRQUFRLElBQUlBLGNBQU0sSUFBSUEsY0FBTSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUlBLGNBQU0sQ0FBQztBQUMzRjtJQUNBO0lBQ0EsSUFBSSxRQUFRLEdBQUcsT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUM7QUFDakY7SUFDQTtJQUNBLElBQUlDLE1BQUksR0FBRyxVQUFVLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0FBQy9EO0lBQ0E7SUFDQSxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLElBQUksY0FBYyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7QUFDMUM7SUFDQTtJQUNBLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHO0lBQ3hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDekI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLElBQUksR0FBRyxHQUFHLFdBQVc7SUFDckIsRUFBRSxPQUFPQSxNQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQztBQUNGO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7SUFDdkMsRUFBRSxJQUFJLFFBQVE7SUFDZCxNQUFNLFFBQVE7SUFDZCxNQUFNLE9BQU87SUFDYixNQUFNLE1BQU07SUFDWixNQUFNLE9BQU87SUFDYixNQUFNLFlBQVk7SUFDbEIsTUFBTSxjQUFjLEdBQUcsQ0FBQztJQUN4QixNQUFNLE9BQU8sR0FBRyxLQUFLO0lBQ3JCLE1BQU0sTUFBTSxHQUFHLEtBQUs7SUFDcEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3RCO0lBQ0EsRUFBRSxJQUFJLE9BQU8sSUFBSSxJQUFJLFVBQVUsRUFBRTtJQUNqQyxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekMsR0FBRztJQUNILEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsRUFBRSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN6QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNoQyxJQUFJLE1BQU0sR0FBRyxTQUFTLElBQUksT0FBTyxDQUFDO0lBQ2xDLElBQUksT0FBTyxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ2pGLElBQUksUUFBUSxHQUFHLFVBQVUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3JFLEdBQUc7QUFDSDtJQUNBLEVBQUUsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0lBQzVCLElBQUksSUFBSSxJQUFJLEdBQUcsUUFBUTtJQUN2QixRQUFRLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDM0I7SUFDQSxJQUFJLFFBQVEsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztJQUMxQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxJQUFJLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLEdBQUc7QUFDSDtJQUNBLEVBQUUsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0lBQzdCO0lBQ0EsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQzFCO0lBQ0EsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QztJQUNBLElBQUksT0FBTyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUMvQyxHQUFHO0FBQ0g7SUFDQSxFQUFFLFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRTtJQUMvQixJQUFJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxHQUFHLFlBQVk7SUFDL0MsUUFBUSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsY0FBYztJQUNuRCxRQUFRLE1BQU0sR0FBRyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7QUFDMUM7SUFDQSxJQUFJLE9BQU8sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxHQUFHLG1CQUFtQixDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzlFLEdBQUc7QUFDSDtJQUNBLEVBQUUsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFO0lBQzlCLElBQUksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsWUFBWTtJQUMvQyxRQUFRLG1CQUFtQixHQUFHLElBQUksR0FBRyxjQUFjLENBQUM7QUFDcEQ7SUFDQTtJQUNBO0lBQ0E7SUFDQSxJQUFJLFFBQVEsWUFBWSxLQUFLLFNBQVMsS0FBSyxpQkFBaUIsSUFBSSxJQUFJLENBQUM7SUFDckUsT0FBTyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsS0FBSyxNQUFNLElBQUksbUJBQW1CLElBQUksT0FBTyxDQUFDLEVBQUU7SUFDN0UsR0FBRztBQUNIO0lBQ0EsRUFBRSxTQUFTLFlBQVksR0FBRztJQUMxQixJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDNUIsTUFBTSxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxLQUFLO0lBQ0w7SUFDQSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVELEdBQUc7QUFDSDtJQUNBLEVBQUUsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFO0lBQzlCLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUN4QjtJQUNBO0lBQ0E7SUFDQSxJQUFJLElBQUksUUFBUSxJQUFJLFFBQVEsRUFBRTtJQUM5QixNQUFNLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLEtBQUs7SUFDTCxJQUFJLFFBQVEsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLElBQUksT0FBTyxNQUFNLENBQUM7SUFDbEIsR0FBRztBQUNIO0lBQ0EsRUFBRSxTQUFTLE1BQU0sR0FBRztJQUNwQixJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtJQUMvQixNQUFNLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixLQUFLO0lBQ0wsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksUUFBUSxHQUFHLFlBQVksR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztJQUM3RCxHQUFHO0FBQ0g7SUFDQSxFQUFFLFNBQVMsS0FBSyxHQUFHO0lBQ25CLElBQUksT0FBTyxPQUFPLEtBQUssU0FBUyxHQUFHLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoRSxHQUFHO0FBQ0g7SUFDQSxFQUFFLFNBQVMsU0FBUyxHQUFHO0lBQ3ZCLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO0lBQ3BCLFFBQVEsVUFBVSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QztJQUNBLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQztJQUN6QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDcEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3hCO0lBQ0EsSUFBSSxJQUFJLFVBQVUsRUFBRTtJQUNwQixNQUFNLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtJQUNqQyxRQUFRLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pDLE9BQU87SUFDUCxNQUFNLElBQUksTUFBTSxFQUFFO0lBQ2xCO0lBQ0EsUUFBUSxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxRQUFRLE9BQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLE9BQU87SUFDUCxLQUFLO0lBQ0wsSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7SUFDL0IsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxLQUFLO0lBQ0wsSUFBSSxPQUFPLE1BQU0sQ0FBQztJQUNsQixHQUFHO0lBQ0gsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUM1QixFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQzFCLEVBQUUsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztBQUNEO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDekIsRUFBRSxJQUFJLElBQUksR0FBRyxPQUFPLEtBQUssQ0FBQztJQUMxQixFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDO0FBQ0Q7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQSxTQUFTLFlBQVksQ0FBQyxLQUFLLEVBQUU7SUFDN0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDO0lBQzdDLENBQUM7QUFDRDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDekIsRUFBRSxPQUFPLE9BQU8sS0FBSyxJQUFJLFFBQVE7SUFDakMsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQztJQUNyRSxDQUFDO0FBQ0Q7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0lBQ3pCLEVBQUUsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7SUFDaEMsSUFBSSxPQUFPLEtBQUssQ0FBQztJQUNqQixHQUFHO0lBQ0gsRUFBRSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUN2QixJQUFJLE9BQU8sR0FBRyxDQUFDO0lBQ2YsR0FBRztJQUNILEVBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDdkIsSUFBSSxJQUFJLEtBQUssR0FBRyxPQUFPLEtBQUssQ0FBQyxPQUFPLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDN0UsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLElBQUksS0FBSyxDQUFDO0lBQ25ELEdBQUc7SUFDSCxFQUFFLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO0lBQ2hDLElBQUksT0FBTyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztJQUN4QyxHQUFHO0lBQ0gsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEMsRUFBRSxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLEVBQUUsT0FBTyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0FBQ0Q7SUFDQSxJQUFBLGVBQWMsR0FBRyxRQUFRLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxXX0=
