import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import SuggestItem from './suggest-item';

/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default ({
  isHidden = true,
  suggests = [],
  activeSuggest,
  onSuggestMouseDown = () => {},
  onSuggestMouseOut = () => {},
  onSuggestSelect = () => {}
}) => {
  const classes = classnames(
    'geosuggest__suggests',
    {'geosuggest__suggests--hidden': isHidden}
  );

  return <ul className={classes}>
    {suggests.map(suggest => {
      const isActive = activeSuggest &&
        suggest.placeId === activeSuggest.placeId;

      return <SuggestItem key={suggest.placeId}
        className={suggest.className}
        suggest={suggest}
        isActive={isActive}
        onMouseDown={onSuggestMouseDown}
        onMouseOut={onSuggestMouseOut}
        onSelect={() => onSuggestSelect(suggest)} />;
    })}
  </ul>;
};
