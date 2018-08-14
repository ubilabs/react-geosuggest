import ISuggest from "./suggest";

/**
 * The suggest interface
 */
type ILocation = ISuggest & {
  readonly location: {
    lat: number;
    lng: number;
  };
  readonly gmaps?: google.maps.GeocoderResult;
}
export default ILocation;
