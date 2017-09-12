import PropTypes from 'prop-types';

/**
 * Prop Types
 */
export default {
  fixtures: PropTypes.array,
  maxFixtures: PropTypes.number,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  suggestsClassName: PropTypes.string,
  suggestsHiddenClassName: PropTypes.string,
  suggestItemClassName: PropTypes.string,
  suggestItemActiveClassName: PropTypes.string,
  location: PropTypes.object,
  radius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  bounds: PropTypes.object,
  country: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  types: PropTypes.array,
  queryDelay: PropTypes.number,
  googleMaps: PropTypes.object,
  highlightMatch: PropTypes.bool,
  onSuggestSelect: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onUpdateSuggests: PropTypes.func,
  skipSuggest: PropTypes.func,
  getSuggestLabel: PropTypes.func,
  renderSuggestItem: PropTypes.func,
  autoActivateFirstSuggest: PropTypes.bool,
  style: PropTypes.shape({
    input: PropTypes.object,
    suggests: PropTypes.object,
    suggestItem: PropTypes.object
  }),
  ignoreTab: PropTypes.bool,
  label: PropTypes.string,
  autoComplete: PropTypes.string,
  minLength: PropTypes.number
};
