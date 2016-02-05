import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default ({
  isActive = false,
  className = '',
  suggest = {},
  onMouseDown = () => {},
  onMouseOut = () => {},
  onSelect = () => {}
}) => {
  const classes = classnames(
    'geosuggest-item',
    className,
    {'geosuggest-item--active': isActive}
  );

  return <li className={classes}
    onMouseDown={onMouseDown}
    onMouseOut={onMouseOut}
    onClick={event => {
      event.preventDefault();
      onSelect();
    }}>
      {suggest.label}
  </li>;
};
