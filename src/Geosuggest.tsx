/* global window */

import * as React from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

import defaults from './defaults';
import filterInputAttributes from './filter-input-attributes';

import Input from './input';
import SuggestList from './suggest-list';

import {Suggest} from './types/suggest';
import {Props} from './types/props';
import {Location} from './types/location';

// Escapes special characters in user input for regex
function escapeRegExp(str: string): string {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

interface State {
  readonly isSuggestsHidden: boolean;
  readonly isLoading: boolean;
  readonly ignoreBlur: boolean;
  readonly userInput: string;
  readonly activeSuggest: null | Suggest;
  readonly suggests: Suggest[];
}

/**
 * Entry point for the Geosuggest component
 */
export default class GeoSuggest extends React.Component<Props, State> {
  /**
   * Default values for the properties
   */
  static defaultProps: Props = defaults;

  /**
   * The Google Map instance
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  googleMaps: any | null = null;

  /**
   * The autocomple service to get suggests
   */
  autocompleteService: google.maps.places.AutocompleteService | null = null;

  /**
   * The places service to get place details
   */
  placesService: google.maps.places.PlacesService | null = null;

  /**
   * The sessionToken service to use session based monetization
   */
  sessionToken:
    | google.maps.places.AutocompleteSessionToken
    // eslint-disable-next-line no-undefined
    | undefined = undefined;

  /**
   * The geocoder to get geocoded results
   */
  geocoder: google.maps.Geocoder | null = null;

  /**
   * A timer
   */
  timer?: number;

  /**
   * The input component
   */
  input: Input | null = null;

  /**
   * Id for the suggestions list
   */
  listId: string;

  /**
   * Label for the suggestions list
   */
  listLabel: string;

  /**
   * The constructor. Sets the initial state.
   */
  // eslint-disable-next-line max-statements
  constructor(props: Props) {
    super(props);

    this.state = {
      activeSuggest: null,
      ignoreBlur: false,
      isLoading: false,
      isSuggestsHidden: true,
      suggests: [],
      userInput: props.initialValue || ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onAfterInputChange = this.onAfterInputChange.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSuggestMouseDown = this.onSuggestMouseDown.bind(this);
    this.onSuggestMouseOut = this.onSuggestMouseOut.bind(this);
    this.onSuggestNoResults = this.onSuggestNoResults.bind(this);
    this.hideSuggests = this.hideSuggests.bind(this);
    this.selectSuggest = this.selectSuggest.bind(this);
    this.listId = `geosuggest__list${props.id ? `--${props.id}` : ''}`;
    this.listLabel = props.label ? `${props.label} options` : 'options';

    if (props.queryDelay) {
      this.onAfterInputChange = debounce(
        this.onAfterInputChange,
        props.queryDelay
      );
    }
  }

  /**
   * Change inputValue if prop changes
   */
  componentDidUpdate(prevProps: Props): void {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({userInput: this.props.initialValue || ''});
    }
    if (
      JSON.stringify(prevProps.fixtures) !== JSON.stringify(this.props.fixtures)
    ) {
      this.searchSuggests();
    }
  }

  /**
   * Called on the client side after component is mounted.
   * Google api sdk object will be obtained and cached as a instance property.
   * Necessary objects of google api will also be determined and saved.
   */
  componentDidMount(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const googleMaps =
      this.props.googleMaps ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).google && (window as any).google.maps) ||
      this.googleMaps;

    /* istanbul ignore next */
    if (!googleMaps) {
      if (console) {
        // eslint-disable-next-line no-console
        console.error('Google maps API was not found in the page.');
      }
      return;
    }
    this.googleMaps = googleMaps;

    this.autocompleteService = new googleMaps.places.AutocompleteService();
    this.placesService = new googleMaps.places.PlacesService(
      document.createElement('div')
    );
    this.sessionToken = new googleMaps.places.AutocompleteSessionToken();
    this.geocoder = new googleMaps.Geocoder();
  }

  /**
   * When the component will unmount
   */
  componentWillUnmount(): void {
    clearTimeout(this.timer);
  }

  /**
   * When the input changed
   */
  onInputChange(userInput: string): void {
    if (!userInput) {
      if (this.props.onSuggestSelect) {
        this.props.onSuggestSelect();
      }
    }
    this.setState({userInput}, this.onAfterInputChange);
  }

  /**
   * On After the input got changed
   */
  onAfterInputChange(): void {
    this.showSuggests();
    if (this.props.onChange) {
      this.props.onChange(this.state.userInput);
    }
  }

  /**
   * When the input gets focused
   */
  onInputFocus(): void {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.showSuggests();
  }

  /**
   * When the input gets blurred
   */
  onInputBlur(): void {
    if (!this.state.ignoreBlur) {
      this.hideSuggests();
    }
    if (this.props.onBlur) {
      this.props.onBlur(this.state.userInput);
    }
  }

  onNext(): void {
    this.activateSuggest('next');
  }

  onPrev(): void {
    this.activateSuggest('prev');
  }

  onSelect(): void {
    this.selectSuggest(this.state.activeSuggest);
  }

  onSuggestMouseDown(): void {
    this.setState({ignoreBlur: true});
  }

  onSuggestMouseOut(): void {
    this.setState({ignoreBlur: false});
  }

  onSuggestNoResults(): void {
    if (this.props.onSuggestNoResults) {
      this.props.onSuggestNoResults(this.state.userInput);
    }
  }

  /**
   * Focus the input
   */
  focus(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * Blur the input
   */
  blur(): void {
    if (this.input) {
      this.input.blur();
    }
  }

  /**
   * Update the value of the user input
   */
  update(userInput: string): void {
    this.setState({userInput});
    if (this.props.onChange) {
      this.props.onChange(userInput);
    }
  }

  /*
   * Clear the input and close the suggestion pane
   */
  clear(): void {
    this.setState({userInput: ''}, this.hideSuggests);
  }

  /**
   * Search for new suggests
   */
  // eslint-disable-next-line complexity, max-statements
  searchSuggests(): void {
    if (!this.state.userInput) {
      this.updateSuggests();
      return;
    }

    const options: google.maps.places.AutocompletionRequest = {
      input: this.state.userInput,
      sessionToken: this.sessionToken
    };
    const inputLength = this.state.userInput.length;
    const isShorterThanMinLength =
      this.props.minLength && inputLength < this.props.minLength;

    if (isShorterThanMinLength) {
      this.updateSuggests();
      return;
    }

    const {location, radius, bounds, types, country} = this.props;

    /* eslint-disable curly */
    if (location) options.location = location;
    if (radius) options.radius = Number(this.props.radius);
    if (bounds) options.bounds = bounds;
    if (types) options.types = types;
    if (country) options.componentRestrictions = {country};
    /* eslint-enable curly */

    this.setState({isLoading: true}, () => {
      if (!this.autocompleteService) {
        this.setState({isLoading: false});
        return;
      }

      this.autocompleteService.getPlacePredictions(
        options,
        (suggestsGoogle) => {
          this.setState({isLoading: false});
          this.updateSuggests(
            suggestsGoogle || [], // can be null
            () => {
              if (
                this.props.autoActivateFirstSuggest &&
                !this.state.activeSuggest
              ) {
                this.activateSuggest('next');
              }
            }
          );
        }
      );
    });
  }

  /**
   * Update the suggests
   */
  updateSuggests(
    suggestsGoogle: google.maps.places.AutocompletePrediction[] = [],
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
    callback: () => void = () => {}
  ): void {
    const suggests: Suggest[] = [];
    const {userInput} = this.state;
    const {skipSuggest, maxFixtures, fixtures} = this.props;
    const regex = new RegExp(escapeRegExp(userInput), 'gim');
    let fixturesSearched = 0;
    let activeSuggest = null;

    if (fixtures) {
      fixtures.forEach((fixture) => {
        if (maxFixtures && fixturesSearched >= maxFixtures) {
          return;
        }

        if (
          skipSuggest &&
          !skipSuggest(fixture) &&
          fixture.label.match(regex)
        ) {
          fixturesSearched++;

          suggests.push({
            ...fixture,
            isFixture: true,
            matchedSubstrings: [
              {
                length: userInput.length,
                offset: fixture.label.search(regex)
              }
            ],
            placeId: fixture.placeId || fixture.label
          });
        }
      });
    }

    suggestsGoogle.forEach((suggest) => {
      if (skipSuggest && !skipSuggest(suggest)) {
        suggests.push({
          description: suggest.description,
          isFixture: false,
          label: this.props.getSuggestLabel
            ? this.props.getSuggestLabel(suggest)
            : '',
          matchedSubstrings: suggest.matched_substrings,
          placeId: suggest.place_id
        });
      }
    });

    activeSuggest = this.updateActiveSuggest(suggests);

    if (this.props.onUpdateSuggests) {
      this.props.onUpdateSuggests(suggests, activeSuggest);
    }
    this.setState({suggests, activeSuggest}, callback);
  }

  /**
   * Return the new activeSuggest object after suggests have been updated
   */
  updateActiveSuggest(suggests: Suggest[] = []): Suggest | null {
    let activeSuggest = this.state.activeSuggest;

    if (activeSuggest) {
      const newSuggest = suggests.filter(
        (listedSuggest) =>
          activeSuggest &&
          activeSuggest.placeId === listedSuggest.placeId &&
          activeSuggest.isFixture === listedSuggest.isFixture
      )[0];

      activeSuggest = newSuggest || null;
    }

    return activeSuggest;
  }

  /**
   * Show the suggestions
   */
  showSuggests(): void {
    this.searchSuggests();
    this.setState({isSuggestsHidden: false});
  }

  /**
   * Hide the suggestions
   */
  hideSuggests(): void {
    this.timer = window.setTimeout(() => {
      this.setState({
        activeSuggest: null,
        isSuggestsHidden: true
      });
    }, 100);
  }

  /**
   * Activate a new suggest
   */
  // eslint-disable-next-line complexity, max-statements
  activateSuggest(direction: 'next' | 'prev'): void {
    if (this.state.isSuggestsHidden) {
      this.showSuggests();
      return;
    }

    const suggestsCount = this.state.suggests.length - 1;
    const next = direction === 'next';
    let newActiveSuggest = null;
    let newIndex = 0;
    let i = 0;

    for (i; i <= suggestsCount; i++) {
      if (this.state.suggests[i] === this.state.activeSuggest) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!this.state.activeSuggest) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = this.state.suggests[newIndex];
    }

    if (this.props.onActivateSuggest) {
      this.props.onActivateSuggest(newActiveSuggest);
    }

    this.setState({activeSuggest: newActiveSuggest});
  }

  /**
   * When an item got selected
   */
  // eslint-disable-next-line complexity
  selectSuggest(suggestToSelect: Suggest | null): void {
    let suggest: Suggest = suggestToSelect || {
      isFixture: true,
      label: this.state.userInput,
      placeId: this.state.userInput
    };

    if (
      !suggestToSelect &&
      this.props.autoActivateFirstSuggest &&
      this.state.suggests.length > 0
    ) {
      suggest = this.state.suggests[0];
    }

    this.setState({
      isSuggestsHidden: true,
      userInput:
        typeof suggest.label !== 'object'
          ? suggest.label
          : suggest.description || ''
    });

    if (suggest.location) {
      this.setState({ignoreBlur: false});
      if (this.props.onSuggestSelect) {
        this.props.onSuggestSelect(suggest as Location);
      }
      return;
    }

    this.geocodeSuggest(suggest);
  }

  /**
   * Geocode a suggest
   */
  geocodeSuggest(suggestToGeocode: Suggest): void {
    if (!this.geocoder) {
      return;
    }

    if (
      suggestToGeocode.placeId &&
      !suggestToGeocode.isFixture &&
      this.placesService
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {
        placeId: suggestToGeocode.placeId,
        sessionToken: this.sessionToken
      };

      if (this.props.placeDetailFields) {
        options.fields = this.props.placeDetailFields;
        options.fields.unshift('geometry');
      }

      this.placesService.getDetails(options, (results, status) => {
        if (status === this.googleMaps.places.PlacesServiceStatus.OK) {
          const gmaps = results;
          const location = (gmaps.geometry &&
            gmaps.geometry.location) as google.maps.LatLng;
          const suggest = {
            ...suggestToGeocode,
            gmaps,
            location: {
              lat: location.lat(),
              lng: location.lng()
            }
          };

          this.sessionToken = new google.maps.places.AutocompleteSessionToken();
          if (this.props.onSuggestSelect) {
            this.props.onSuggestSelect(suggest);
          }
        }
      });
    } else {
      const options: google.maps.GeocoderRequest = {
        address: suggestToGeocode.label,
        bounds: this.props.bounds,
        componentRestrictions: this.props.country
          ? {country: this.props.country}
          : // eslint-disable-next-line no-undefined
            undefined,
        location: this.props.location
      };

      this.geocoder.geocode(options, (results, status) => {
        if (status === this.googleMaps.GeocoderStatus.OK) {
          const gmaps = results[0];
          const location = (gmaps.geometry &&
            gmaps.geometry.location) as google.maps.LatLng;
          const suggest = {
            ...suggestToGeocode,
            gmaps,
            location: {
              lat: location.lat(),
              lng: location.lng()
            }
          };

          if (this.props.onSuggestSelect) {
            this.props.onSuggestSelect(suggest);
          }
        }
      });
    }
  }

  /**
   * Render the view
   */
  render(): JSX.Element {
    const attributes = filterInputAttributes(this.props);
    const classes = classnames('geosuggest', this.props.className, {
      'geosuggest--loading': this.state.isLoading
    });
    const input = (
      <Input
        className={this.props.inputClassName}
        ref={(i): Input | null => (this.input = i)}
        value={this.state.userInput}
        doNotSubmitOnEnter={!this.state.isSuggestsHidden}
        ignoreTab={this.props.ignoreTab}
        ignoreEnter={this.props.ignoreEnter}
        style={this.props.style && this.props.style.input}
        onChange={this.onInputChange}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        onKeyDown={this.props.onKeyDown}
        onKeyPress={this.props.onKeyPress}
        inputType={this.props.inputType}
        onNext={this.onNext}
        onPrev={this.onPrev}
        onSelect={this.onSelect}
        onEscape={this.hideSuggests}
        isSuggestsHidden={this.state.isSuggestsHidden}
        activeSuggest={this.state.activeSuggest}
        label={this.props.label}
        id={this.props.id}
        listId={this.listId}
        {...attributes}
      />
    );
    const suggestionsList = (
      <SuggestList
        isHidden={this.state.isSuggestsHidden}
        style={this.props.style && this.props.style.suggests}
        suggestItemStyle={this.props.style && this.props.style.suggestItem}
        userInput={this.state.userInput}
        isHighlightMatch={Boolean(this.props.highlightMatch)}
        suggestsClassName={this.props.suggestsClassName}
        suggestItemClassName={this.props.suggestItemClassName}
        suggests={this.state.suggests}
        hiddenClassName={this.props.suggestsHiddenClassName}
        suggestItemActiveClassName={this.props.suggestItemActiveClassName}
        activeSuggest={this.state.activeSuggest}
        onSuggestNoResults={this.onSuggestNoResults}
        onSuggestMouseDown={this.onSuggestMouseDown}
        onSuggestMouseOut={this.onSuggestMouseOut}
        onSuggestSelect={this.selectSuggest}
        renderSuggestItem={this.props.renderSuggestItem}
        listId={this.listId}
        listLabel={this.listLabel}
      />
    );

    return (
      <div className={classes} id={this.props.id}>
        <div className="geosuggest__input-wrapper">{input}</div>
        <div className="geosuggest__suggests-wrapper">{suggestionsList}</div>
      </div>
    );
  }
}
