import {PLACES_API} from './Geosuggest';

/* istanbul ignore next */
/**
 * Default values
 */
export default {
  api: PLACES_API,
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
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  skipSuggest: () => {},
  getSuggestLabel: suggest => suggest.description,
  autoActivateFirstSuggest: false,
  style: {
    'input': {},
    'suggests': {},
    'suggestItem': {}
  },
  ignoreTab: false
};
