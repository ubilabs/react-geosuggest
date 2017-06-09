import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
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
     * @param {String} element The element to wrap
     * @return {JSX} Bolder text
     */
  makeBold(element) {
    return <b className="matched-text">{element}</b>;
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
    const el = this.ref,
      parent = el.parentElement,
      overTop = el.offsetTop - parent.offsetTop < parent.scrollTop,
      overBottom = el.offsetTop - parent.offsetTop + el.clientHeight >
        parent.scrollTop + parent.clientHeight;

    if (overTop || overBottom) {
      parent.scrollTop = el.offsetTop - parent.offsetTop -
        parent.clientHeight / 2 + el.clientHeight / 2;
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
    const {suggest} = this.props;
    const classes = classnames(
      'geosuggest__item',
      this.props.className,
      this.props.suggestItemClassName,
      {'geosuggest__item--active': this.props.isActive},
      {[this.props.activeClassname]: this.props.activeClassname ?
        this.props.isActive : null}
    );
    let content = suggest.label;

    if (this.props.renderSuggestItem) {
      content = this.props.renderSuggestItem(suggest);
    } else if (this.props.isHighlightMatch) {
      content = this.formatMatchedText(this.props.userInput, suggest);
    }

    return <li className={classes}
      ref={li => this.ref = li}
      style={this.props.style}
      onMouseDown={this.props.onMouseDown}
      onMouseOut={this.props.onMouseOut}
      onClick={this.onClick}>
      {content}
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
