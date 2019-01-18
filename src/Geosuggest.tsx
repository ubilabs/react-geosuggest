/* global window */

import * as React from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

import defaults from './defaults';
import filterInputAttributes from './filter-input-attributes';

import Input from './input';
import SuggestList from './suggest-list';
import ISuggest from './types/suggest';
import IProps from './types/props';
import ILocation from './types/location';

// Escapes special characters in user input for regex
function escapeRegExp(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

interface IState {
  readonly isSuggestsHidden: boolean;
  readonly isLoading: boolean;
  readonly ignoreBlur: boolean;
  readonly userInput: string;
  readonly activeSuggest: null | ISuggest;
  readonly suggests: ISuggest[];
}

/**
 * Entry point for the Geosuggest component
 */
export default class extends React.Component<IProps, IState> {
  /**
   * Default values for the properties
   */
  static defaultProps: IProps = defaults;

  /**
   * The Google Map instance
   */
  googleMaps: any | null = null;

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
  sessionToken: google.maps.places.AutocompleteSessionToken | undefined = undefined;

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
   * The constructor. Sets the initial state.
   */
  constructor(props: IProps) {
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
  componentWillReceiveProps(props: IProps) {
    if (this.props.initialValue !== props.initialValue) {
      this.setState({userInput: props.initialValue || ''});
    }
  }

  /**
   * Called on the client side after component is mounted.
   * Google api sdk object will be obtained and cached as a instance property.
   * Necessary objects of google api will also be determined and saved.
   */
  componentWillMount() {
    if (typeof window === 'undefined') {
      return;
    }

    const googleMaps =
      this.props.googleMaps ||
      ((window as any).google &&
        (window as any).google.maps) ||
      this.googleMaps;

    /* istanbul ignore next */
    if (!googleMaps) {
      if (console) {
        // tslint:disable-next-line:no-console
        console.error(
          'Google maps API was not found in the page.'
        );
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
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * When the input changed
   */
  onInputChange(userInput: string) {
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
  onAfterInputChange() {
    this.showSuggests();
    if (this.props.onChange) {
      this.props.onChange(this.state.userInput);
    }
  }

  /**
   * When the input gets focused
   */
  onInputFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.showSuggests();
  }

  /**
   * When the input gets blurred
   */
  onInputBlur() {
    if (!this.state.ignoreBlur) {
      this.hideSuggests();
    }
  }

  onNext() {
    this.activateSuggest('next');
  }

  onPrev() {
    this.activateSuggest('prev');
  }

  onSelect() {
    this.selectSuggest(this.state.activeSuggest);
  }

  onSuggestMouseDown() {
    this.setState({ignoreBlur: true});
  }

  onSuggestMouseOut() {
    this.setState({ignoreBlur: false});
  }

  onSuggestNoResults() {
    if (this.props.onSuggestNoResults) {
      this.props.onSuggestNoResults(this.state.userInput);
    }
  }

  /**
   * Focus the input
   */
  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * Blur the input
   */
  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  /**
   * Update the value of the user input
   */
  update(userInput: string) {
    this.setState({userInput});
    if (this.props.onChange) {
      this.props.onChange(userInput);
    }
  }

  /*
   * Clear the input and close the suggestion pane
   */
  clear() {
    this.setState({userInput: ''}, this.hideSuggests);
  }

  /**
   * Search for new suggests
   */
  searchSuggests() {
    if (!this.state.userInput) {
      this.updateSuggests();
      return;
    }

    const options: google.maps.places.AutocompletionRequest = {
      input: this.state.userInput,
      sessionToken: this.sessionToken
    };
    const inputLength = this.state.userInput.length;
    const isShorterThanMinLength = this.props.minLength && inputLength < this.props.minLength;

    if (isShorterThanMinLength) {
      return;
    }

    const {location, radius, bounds, types, country} = this.props;

    /* tslint:disable:curly */
    if (location) options.location = location;
    if (radius) options.radius = Number(this.props.radius);
    if (bounds) options.bounds = bounds;
    if (types) options.types = types;
    if (country) options.componentRestrictions = {country};
    /* tslint:enable:curly */

    this.setState({isLoading: true}, () => {
      if (!this.autocompleteService) {
        this.setState({isLoading: false});
        return;
      }

      this.autocompleteService.getPlacePredictions(options, suggestsGoogle => {
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
      });
    });
  }

  /**
   * Update the suggests
   */
  updateSuggests(
    suggestsGoogle: google.maps.places.AutocompletePrediction[] = [],
    // tslint:disable-next-line:no-empty
    callback: () => void = () => {}
  ) {
    const suggests: ISuggest[] = [];
    const {userInput} = this.state;
    const {skipSuggest, maxFixtures, fixtures} = this.props;
    const regex = new RegExp(escapeRegExp(userInput), 'gim');
    let fixturesSearched = 0;
    let activeSuggest = null;

    if (fixtures) {
      fixtures.forEach(fixture => {
        if (maxFixtures && fixturesSearched >= maxFixtures) {
          return;
        }

        if ((skipSuggest && !skipSuggest(fixture)) && fixture.label.match(regex)) {
          fixturesSearched++;

          suggests.push({
            className: fixture.className,
            isFixture: true,
            label: fixture.label,
            location: fixture.location,
            matchedSubstrings: {
              length: userInput.length,
              offset: fixture.label.indexOf(userInput)
            },
            placeId: fixture.label
          });
        }
      });
    }

    suggestsGoogle.forEach(suggest => {
      if (skipSuggest && !skipSuggest(suggest)) {
        suggests.push({
          description: suggest.description,
          isFixture: false,
          label: this.props.getSuggestLabel ? this.props.getSuggestLabel(suggest) : '',
          matchedSubstrings: suggest.matched_substrings[0],
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
  updateActiveSuggest(suggests: ISuggest[] = []): ISuggest | null {
    let activeSuggest = this.state.activeSuggest;

    if (activeSuggest) {
      const newSuggest = suggests.filter(
        listedSuggest => activeSuggest &&
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
    if (this.props.onBlur) {
      this.props.onBlur(this.state.userInput);
    }
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
  activateSuggest(direction: 'next' | 'prev') {
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
  selectSuggest(suggestToSelect: ISuggest | null) {
    const suggest: ISuggest = suggestToSelect || {
      isFixture: false,
      label: this.state.userInput,
      placeId: this.state.userInput
    };

    this.setState({
      isSuggestsHidden: true,
      userInput:
        typeof suggest.label !== 'object' ? suggest.label : (suggest.description || '')
    });

    if (suggest.location) {
      this.setState({ignoreBlur: false});
      if (this.props.onSuggestSelect) {
        this.props.onSuggestSelect(suggest as ILocation);
      }
      return;
    }

    this.geocodeSuggest(suggest);
  }

  /**
   * Geocode a suggest
   */
  geocodeSuggest(suggestToGeocode: ISuggest): void {
    if (!this.geocoder) {
      return;
    }

    if (suggestToGeocode.placeId && !suggestToGeocode.isFixture && this.placesService) {
      const options: any = {
        placeId: suggestToGeocode.placeId,
        sessionToken: this.sessionToken
      };

      if (this.props.placeDetailFields) {
        options.fields = this.props.placeDetailFields;
      }

      this.placesService.getDetails(options, (results, status) => {
        if (status === this.googleMaps.places.PlacesServiceStatus.OK) {
          const gmaps = results;
          const location = gmaps.geometry.location;
          const suggest = {...suggestToGeocode, gmaps, location: {
            lat: location.lat(),
            lng: location.lng()
          }};

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
          : undefined,
        location: this.props.location
      };

      this.geocoder.geocode(options, (results, status) => {
        if (status === this.googleMaps.GeocoderStatus.OK) {
          const gmaps = results[0];
          const location = gmaps.geometry.location;
          const suggest = {...suggestToGeocode, gmaps, location: {
            lat: location.lat(),
            lng: location.lng()
          }};

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
    const shouldRenderLabel = this.props.label && attributes.id;
    const input = (
      <Input
        className={this.props.inputClassName}
        ref={i => (this.input = i)}
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
        onNext={this.onNext}
        onPrev={this.onPrev}
        onSelect={this.onSelect}
        onEscape={this.hideSuggests}
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
      />
    );

    return (
      <div className={classes}>
        <div className="geosuggest__input-wrapper">
          {shouldRenderLabel && (
            <label className="geosuggest__label" htmlFor={attributes.id}>
              {this.props.label}
            </label>
          )}
          {input}
        </div>
        <div className="geosuggest__suggests-wrapper">{suggestionsList}</div>
      </div>
    );
  }
}
