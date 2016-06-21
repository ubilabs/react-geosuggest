import React from 'react'; // eslint-disable-line no-unused-vars
import shallowCompare from 'react-addons-shallow-compare';
import classnames from 'classnames';
import SuggestItem from './suggest-item';

/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  isHidden() {
    return this.props.isHidden || this.props.suggests.length === 0;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.suggests !== this.props.suggests) {
      if (newProps.suggests.length === 0) {
        this.props.onSuggestNoResults();
      }
    }
  }

  render() {
    const classes = classnames(
      'geosuggest__suggests',
      {'geosuggest__suggests--hidden': this.isHidden()}
    );

    return <ul className={classes} style={this.props.style}>
      {this.props.suggests.map(suggest => {
        const isActive = this.props.activeSuggest &&
          suggest.placeId === this.props.activeSuggest.placeId;

        return <SuggestItem key={suggest.placeId}
          className={suggest.className}
          suggest={suggest}
          style={this.props.suggestItemStyle}
          isActive={isActive}
          onMouseDown={this.props.onSuggestMouseDown}
          onMouseOut={this.props.onSuggestMouseOut}
          onSelect={this.props.onSuggestSelect} />;
      })}
    </ul>;
  }
}

SuggestList.defaultProps = {
  isHidden: true,
  suggests: []
};
