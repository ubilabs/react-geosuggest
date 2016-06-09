import React from 'react';
import classnames from 'classnames';

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestItem extends React.Component {
  onClick = event => {
    event.preventDefault();
    this.props.onSelect(this.props.suggest);
  }

  render() {
    const classes = classnames(
      'geosuggest-item',
      this.props.className,
      {'geosuggest-item--active': this.props.isActive}
    );

    return <li className={classes}
      style={this.props.style}
      onMouseDown={this.props.onMouseDown}
      onMouseOut={this.props.onMouseOut}
      onClick={this.onClick}>
        {this.props.suggest.label}
    </li>;
  }
}

SuggestItem.defaultProps = {
  isActive: false,
  className: '',
  suggest: {}
};
