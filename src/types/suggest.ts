import Location from './location';

/**
 * The suggest interface
 */
export default interface Suggest {
  readonly description?: string;
  readonly gmaps?: google.maps.GeocoderResult;
  readonly label: string;
  readonly placeId: string;
  readonly isFixture: boolean;
  readonly location?: Location;
  readonly matchedSubstrings?: {
    offset: number;
    length: number;
  };
  readonly className?: string;
}
