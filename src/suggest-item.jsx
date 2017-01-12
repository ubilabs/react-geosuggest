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
     * Makes a text bold
     * @param {String} el element
     * @return {JSX} Bolder text
     */
  makeBold(el) {
    return <b className="matched-text">
        {el}</b>;
  }

  /**
   * Replace matched text with the same bold
   * @param {Object} userInput Value from input
   * @param {Object} suggest Data from google
   * @return {String} Formatted string with highlighted matched text
   */
  formatMatchedText(userInput, suggest) {
    if (!userInput || !suggest.matchedSubstrings) {
      return suggest.label;
    }

    let start = suggest.matchedSubstrings.offset,
      end = suggest.matchedSubstrings.length,
      split = suggest.label.split('');
    split.splice(start, end,
      this.makeBold(suggest.label.substring(start, end)));

    return <span>{split}</span>;
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
      this.props.suggestItemClassName,
      {'geosuggest__item--active': this.props.isActive},
      {[this.props.activeClassname]: this.props.activeClassname ?
        this.props.isActive : null}
    );

    return <li className={classes}
      style={this.props.style}
      onMouseDown={this.props.onMouseDown}
      onMouseOut={this.props.onMouseOut}
      onClick={this.onClick}>
        { this.props.isHighlightMatch
          ? this.formatMatchedText(
            this.props.userInput, this.props.suggest)
          : this.props.suggest.label }
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
