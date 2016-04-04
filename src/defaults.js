/**
 * Default values
 */
export default {
  fixtures: [],
  initialValue: '',
  placeholder: 'Search places',
  disabled: false,
  wrapInput: false,
  wrapSuggestionList: false,
  className: '',
  inputClassName: '',
  inputWrapperClassName: '',
  suggestionListWrapperClassName: '',
  location: null,
  radius: null,
  bounds: null,
  country: null,
  types: null,
  googleMaps: null,
  onSuggestSelect: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  skipSuggest: () => {},
  getSuggestLabel: suggest => suggest.description,
  autoActivateFirstSuggest: false
};