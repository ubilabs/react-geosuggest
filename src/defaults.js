/* istanbul ignore next */
/**
 * Default values
 */
export default {
  fixtures: [],
  initialValue: '',
  placeholder: 'Search places',
  disabled: false,
  className: '',
  inputClassName: '',
  buttonClassName: 'geosuggest__button',
  buttonText: 'Search',
  location: null,
  radius: null,
  bounds: null,
  country: null,
  types: null,
  queryDelay: 250,
  googleMaps: null,
  geocodeProvider: null,
  disableAutoLookup: false,
  onActivateSuggest: () => {},
  onGeocodeSuggest: () => {},
  onSuggestsLookup: () => {},
  onSuggestSelect: () => {},
  onSuggestResults: () => {},
  onSuggestNoResults: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  skipSuggest: () => {},
  showSuggests: () => {},
  getSuggestLabel: suggest => suggest.description,
  autoActivateFirstSuggest: false,
  style: {
    'input': {},
    'suggests': {},
    'suggestItem': {}
  },
  ignoreTab: false
};
