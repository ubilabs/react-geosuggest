import React from 'react'; // eslint-disable-line no-unused-vars
import shallowCompare from 'react-addons-shallow-compare';
import classnames from 'classnames';

import filterInputAttributes from './filter-input-attributes';

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class Input extends React.Component {
  /**
   * The constructor. Sets the initial state.
   * @param  {Object} props The properties object.
   */
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  /**
   * Whether or not the component should update
   * @param {Object} nextProps The new properties
   * @param {Object} nextState The new state
   * @return {Boolean} Update or not?
   */
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /**
   * When the input got changed
   */
  onChange() {
    this.props.onChange(this.input.value);
  }

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keydown event
   */
  onInputKeyDown(event) {
    // eslint-disable-line complexity
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
  }

  /**
   * Focus the input
   */
  focus() {
    this.input.focus();
  }

  /**
   * Blur the input
   */
  blur() {
    this.input.blur();
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const attributes = filterInputAttributes(this.props),
      classes = classnames('geosuggest__input', this.props.className);

    return (
      <input
        className={classes}
        ref={i => (this.input = i)}
        type="text"
        {...attributes}
        value={this.props.value}
        style={this.props.style}
        onKeyDown={this.onInputKeyDown}
        onChange={this.onChange}
        onKeyPress={this.props.onKeyPress}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    );
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
  className: '',
  value: '',
  ignoreTab: false,
  onKeyDown: () => {},
  onKeyPress: () => {},
  autoComplete: 'nope'
};

export default Input;
