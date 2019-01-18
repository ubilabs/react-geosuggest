import IFixture from './fixture';
import ISuggest from './suggest';
import ILocation from './location';

/**
 * Prop Types
 */
export default interface IProps {
  readonly fixtures?: IFixture[];
  readonly maxFixtures?: number;
  readonly initialValue?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly inputClassName?: string;
  readonly suggestsClassName?: string;
  readonly suggestsHiddenClassName?: string;
  readonly suggestItemClassName?: string;
  readonly suggestItemActiveClassName?: string;
  readonly location?: google.maps.LatLng;
  readonly radius?: string | number;
  readonly bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  readonly country?: string | string[];
  readonly types?: string[] | null;
  readonly queryDelay?: number;
  readonly googleMaps?: any;
  readonly highlightMatch?: boolean;
  readonly onSuggestSelect?: (suggest?: ILocation) => void;
  readonly onFocus?: () => void;
  readonly onBlur?: (userInput?: string) => void;
  readonly onChange?: (value: string) => void;
  readonly onKeyDown?: (event: React.KeyboardEvent) => void;
  readonly onKeyPress?: (event: React.KeyboardEvent) => void;
  readonly onUpdateSuggests?: (suggests: ISuggest[], activeSuggest: ISuggest | null) => void;
  readonly onActivateSuggest?: (suggest: ISuggest | null) => void;
  readonly onSuggestNoResults?: (userInput: string) => void;
  readonly skipSuggest?: (suggest: IFixture | google.maps.places.AutocompletePrediction) => boolean;
  readonly getSuggestLabel?: (suggest: google.maps.places.AutocompletePrediction) => string;
  readonly renderSuggestItem?: (suggest: ISuggest) => string | JSX.Element;
  readonly autoActivateFirstSuggest?: boolean;
  readonly style?: {
    input?: any;
    suggests?: any;
    suggestItem?: any
  };
  readonly ignoreTab?: boolean;
  readonly ignoreEnter?: boolean;
  readonly label?: string;
  readonly autoComplete?: string;
  readonly minLength?: number;
  readonly placeDetailFields?: string[] | null;
}
