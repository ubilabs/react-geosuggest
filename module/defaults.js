'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* istanbul ignore next */
/**
 * Default values
 */
exports.default = {
  fixtures: [],
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
  onActivateSuggest: function onActivateSuggest() {},
  onSuggestSelect: function onSuggestSelect() {},
  onSuggestNoResults: function onSuggestNoResults() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  skipSuggest: function skipSuggest() {},
  getSuggestLabel: function getSuggestLabel(suggest) {
    return suggest.description;
  },
  autoActivateFirstSuggest: false,
  style: {
    'input': {},
    'suggests': {},
    'suggestItem': {}
  },
  ignoreTab: false
};