import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

import filterInputAttributes from './filter-input-attributes';

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class Input extends React.Component {
  /**
   * When the input got changed
   */
  onChange() {
    this.props.onChange(this.refs.input.value);
  }

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
  onInputKeyDown(event) {
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        this.props.onNext();
        break;
      case 38: // UP
        event.preventDefault();
        this.props.onPrev();
        break;
      case 13: // ENTER
        event.preventDefault();
        this.props.onSelect();
        break;
      case 9: // TAB
        this.props.onSelect();
        break;
      case 27: // ESC
        this.props.onEscape();
        break;
      default:
        break;
    }
  }

  /**
   * Focus the input
   */
  focus() {
    this.refs.input.focus();
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const attributes = filterInputAttributes(this.props),
      classes = classnames(
        'geosuggest__input',
        this.props.className
      );

    return <input className={classes}
      ref='input'
      type='text'
      {...attributes}
      value={this.props.value}
      onKeyDown={this.onInputKeyDown.bind(this)}
      onChange={this.onChange.bind(this)}
      onFocus={this.props.onFocus.bind(this)}
      onBlur={this.props.onBlur.bind(this)} />;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
  className: '',
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onNext: () => {},
  onPrev: () => {},
  onSelect: () => {},
  onEscape: () => {}
};

export default Input;
