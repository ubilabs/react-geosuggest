import React from 'react';

/**
 * Default values
 */
export default {
  fixtures: React.PropTypes.array,
  initialValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  inputClassName: React.PropTypes.string,
  suggestsClassName: React.PropTypes.string,
  suggestsHiddenClassName: React.PropTypes.string,
  suggestItemClassName: React.PropTypes.string,
  suggestItemActiveClassName: React.PropTypes.string,
  location: React.PropTypes.object,
  radius: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  bounds: React.PropTypes.object,
  country: React.PropTypes.string,
  types: React.PropTypes.array,
  queryDelay: React.PropTypes.number,
  googleMaps: React.PropTypes.object,
  onSuggestSelect: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onKeyPress: React.PropTypes.func,
  skipSuggest: React.PropTypes.func,
  getSuggestLabel: React.PropTypes.func,
  renderSuggestItem: React.PropTypes.func,
  autoActivateFirstSuggest: React.PropTypes.bool,
  style: React.PropTypes.shape({
    input: React.PropTypes.object,
    suggests: React.PropTypes.object,
    suggestItem: React.PropTypes.object
  }),
  ignoreTab: React.PropTypes.bool,
  label: React.PropTypes.string
};
