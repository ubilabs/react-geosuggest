import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default props => {
  const classes = classnames(
    'geosuggest-item',
    props.suggest.className,
    {'geosuggest-item--active': props.isActive}
  );

  return <li className={classes}
    onMouseDown={props.onMouseDown}
    onMouseOut={props.onMouseOut}
    onClick={event => {
      event.preventDefault();
      props.onSuggestSelect(props.suggest);
    }}>
      {props.suggest.label}
  </li>;
};
