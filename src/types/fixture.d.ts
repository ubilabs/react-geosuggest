/**
 * The fixture interface
 */
export default interface Fixture {
  readonly label: string;
  readonly placeId?: string;
  readonly location?: {
    lat: number;
    lng: number;
  };
  readonly className?: string;
}
