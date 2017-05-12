import PropTypes from 'prop-types';

/**
 * Default values
 */
export default {
  fixtures: PropTypes.array,
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
  country: PropTypes.string,
  types: PropTypes.array,
  queryDelay: PropTypes.number,
  googleMaps: PropTypes.object,
  onSuggestSelect: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  skipSuggest: PropTypes.func,
  getSuggestLabel: PropTypes.func,
  autoActivateFirstSuggest: PropTypes.bool,
  style: PropTypes.shape({
    input: PropTypes.object,
    suggests: PropTypes.object,
    suggestItem: PropTypes.object
  }),
  ignoreTab: PropTypes.bool,
  label: PropTypes.string
};
