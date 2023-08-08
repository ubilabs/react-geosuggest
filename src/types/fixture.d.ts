/**
 * The fixture interface
 */
export interface Fixture {
  readonly label: string;
  readonly placeId?: string;
  readonly location?: {
    lat: number;
    lng: number;
  };
  readonly className?: string;
}
