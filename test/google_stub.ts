import predictions from './fixtures/predictions';

export default function googleStub() {
  const predictionStub = (
    options: google.maps.places.AutocompletionRequest,
    callback: (predicctions: google.maps.places.AutocompletePrediction[] | null) => void
  ) => {
    const suggestsGoogle = predictions().filter(prediction =>
      prediction.terms.find(term => term.value.startsWith(options.input))
    );

    const result = suggestsGoogle.length > 0 ? suggestsGoogle : null;

    callback(result);
  };
  const geocodeStub = (
    query: google.maps.GeocoderRequest,
    callback: (results: google.maps.GeocoderResult[], status: string) => void
  ) => {
    if (query.address === '' || query.placeId === '') {
      callback([], 'ZERO_RESULTS');
      return;
    }

    callback(
      [
        {
          geometry: {
            location: {
              lat: () => 0,
              lng: () => 0
            }
          }
        } as any
      ],
      'OK'
    );
  };
  const placesStub = (
    query: google.maps.places.PlaceDetailsRequest,
    callback: (results: any, status: string) => void
  ) => {
    if (query.placeId === '') {
      callback({}, 'ZERO_RESULTS');
      return;
    }

    callback(
      {
        geometry: {
          location: {
            lat: () => 0,
            lng: () => 0
          }
        }
      } as any,
      'OK'
    );
  };
  const google = {
    maps: {
      Geocoder() {
        return {
          geocode: geocodeStub
        };
      },
      GeocoderStatus: {
        OK: 'OK'
      },
      LatLng: () => true,
      places: {
        AutocompleteService() {
          return {
            getPlacePredictions: predictionStub
          };
        },
        AutocompleteSessionToken() {
          return {
            token: 'token'
          };
        },
        PlacesService() {
          return {
            getDetails: placesStub
          };
        },
        PlacesServiceStatus: {
          OK: 'OK'
        }
      }
    }
  };

  return google;
}
