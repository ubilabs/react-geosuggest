import Suggest from './suggest';

/**
 * The suggest interface
 */
export default interface Location extends Suggest {
  readonly location: {
    lat: number;
    lng: number;
  };
  readonly gmaps?: google.maps.GeocoderResult | google.maps.places.PlaceResult;
}
