import React from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import classnames from 'classnames';

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestItem extends React.Component {
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
   * Checking if item just became active and scrolling if needed.
   * @param {Object} nextProps The new properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive && !this.props.isActive) {
      this.scrollIfNeeded();
    }
  }

  /**
   * Scrolling current item to the center of the list if item needs scrolling.
   * Item is scrolled to the center of the list.
   */
  scrollIfNeeded() {
    const el = this.ref;
    const parent = el.parentElement;

    const overTop = el.offsetTop - parent.offsetTop < parent.scrollTop;
    const overBottom = el.offsetTop - parent.offsetTop + el.clientHeight > parent.scrollTop + parent.clientHeight;

    if (overTop || overBottom) {
      parent.scrollTop = el.offsetTop - parent.offsetTop - parent.clientHeight / 2 + el.clientHeight / 2;
    }
  }

  /**
   * When the suggest item got clicked
   * @param {Event} event The click event
   */
  onClick = event => {
    event.preventDefault();
    this.props.onSelect(this.props.suggest);
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const classes = classnames(
      'geosuggest__item',
      this.props.className,
      {'geosuggest__item--active': this.props.isActive}
    );

    return <li className={classes}
      ref={li => this.ref = li }
      style={this.props.style}
      onMouseDown={this.props.onMouseDown}
      onMouseOut={this.props.onMouseOut}
      onClick={this.onClick}>
        {this.props.suggest.label}
    </li>;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestItem.defaultProps = {
  isActive: false,
  className: '',
  suggest: {}
};
