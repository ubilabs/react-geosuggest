'use strict';

import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    event.preventDefault();
    if (this.props.onSuggestSelect) {
      this.props.onSuggestSelect(this.props.suggest);
    }
  }

  render() {
    return (
      <li className={'geosuggest-item' + (this.props.isActive ? ' geosuggest-item--active' : '')} onClick={this.handleClick}>
        {this.props.suggest.label}
      </li>
    );
  }
}

export default Item;

