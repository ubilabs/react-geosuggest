/* istanbul ignore next */
/**
 * Default values
 */
export default {
  fixtures: [],
  maxFixtures: 10,
  initialValue: '',
  placeholder: 'Search places',
  disabled: false,
  className: '',
  inputClassName: '',
  location: null,
  radius: null,
  bounds: null,
  country: null,
  types: null,
  queryDelay: 250,
  googleMaps: null,
  highlightMatch: true,
  onActivateSuggest: () => {},
  onSuggestSelect: () => {},
  onSuggestNoResults: () => {},
  onUpdateSuggests: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  skipSuggest: () => {},
  getSuggestLabel: suggest => suggest.description,
  renderSuggestItem: null,
  autoActivateFirstSuggest: false,
  style: {
    'input': {},
    'suggests': {},
    'suggestItem': {}
  },
  ignoreTab: false,
  minLength: 1
};
