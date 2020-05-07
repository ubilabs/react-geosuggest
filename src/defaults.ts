/* istanbul ignore next */
/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function */
/**
 * Default values
 */
export default {
  autoActivateFirstSuggest: false,
  disabled: false,
  fixtures: [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSuggestLabel: (suggest: any) => suggest.description,
  highlightMatch: true,
  ignoreEnter: false,
  ignoreTab: false,
  initialValue: '',
  maxFixtures: 10,
  minLength: 1,
  onKeyDown: () => {},
  onKeyPress: () => {},
  placeholder: 'Search places',
  queryDelay: 250,
  skipSuggest: () => false,
  style: {}
};
