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
  location: React.PropTypes.object,
  radius: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  bounds: React.PropTypes.object,
  country: React.PropTypes.string,
  types: React.PropTypes.array,
  googleMaps: React.PropTypes.object,
  onSuggestSelect: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  skipSuggest: React.PropTypes.func,
  getSuggestLabel: React.PropTypes.func,
  autoActivateFirstSuggest: React.PropTypes.bool
};
