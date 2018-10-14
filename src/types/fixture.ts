import Location from './location';

/**
 * The fixture interface
 */
export default interface Fixture {
  readonly label: string;
  readonly location?: Location;
  readonly className?: string;
}
