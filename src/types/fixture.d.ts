/**
 * The fixture interface
 */
export default interface IFixture {
  readonly label: string;
  readonly location?: {
    lat: number;
    lng: number;
  };
  readonly className?: string;
}
