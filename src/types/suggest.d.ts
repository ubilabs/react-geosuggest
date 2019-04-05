import IFixture from './fixture';

/**
 * The suggest interface
 */
export default interface ISuggest {
  readonly description?: string;
  readonly label: string;
  readonly placeId: string;
  readonly isFixture: boolean;
  readonly location?: {
    lat: number;
    lng: number;
  };
  readonly matchedSubstrings?: {
    offset: number;
    length: number;
  };
  readonly className?: string;
}
