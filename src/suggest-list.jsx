import React from 'react'; // eslint-disable-line no-unused-vars
import shallowCompare from 'react/lib/shallowCompare';
import classnames from 'classnames';
import SuggestItem from './suggest-item';

/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestList extends React.Component {
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
   * Whether or not it is hidden
   * @return {Boolean} Hidden or not?
   */
  isHidden() {
    return this.props.isHidden || this.props.suggests.length === 0;
  }

  /**
   * There are new properties available for the list
   * @param {Object} nextProps The new properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.suggests !== this.props.suggests) {
      if (nextProps.suggests.length === 0) {
        this.props.onSuggestNoResults();
      }
    }
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const classes = classnames(
      'geosuggest__suggests',
      this.props.suggestsClassName,
      {'geosuggest__suggests--hidden': this.isHidden()},
      {[this.props.hiddenClassName]: this.props.hiddenClassName ?
        this.isHidden() : null}
    );

    return <ul className={classes} style={this.props.style}>
      {this.props.suggests.map(suggest => {
        const isActive = this.props.activeSuggest &&
          suggest.placeId === this.props.activeSuggest.placeId,
          key = suggest.key || suggest.placeId;

        return <SuggestItem key={key}
          className={suggest.className}
          suggest={suggest}
          style={this.props.suggestItemStyle}
          suggestItemClassName={this.props.suggestItemClassName}
          isActive={isActive}
          activeClassname={this.props.suggestItemActiveClassName}
          onMouseDown={this.props.onSuggestMouseDown}
          onMouseOut={this.props.onSuggestMouseOut}
          onSelect={this.props.onSuggestSelect}
          renderSuggestItem={ this.props.renderSuggestItem }/>;
      })}
    </ul>;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestList.defaultProps = {
  isHidden: true,
  suggests: []
};
