import predictions from './fixtures/predictions';

export default function googleStub() {
  const predictionStub = (options, callback) => {
      const suggestsGoogle = predictions().filter(prediction =>
        prediction.terms.find(term => term.value.startsWith(options.input))
      );

      callback(suggestsGoogle.length > 0 ? suggestsGoogle : null);
    },
    placesStub = (query, callback) => {
      if (query.address === '' || query.placeId === '') {
        callback([], 'ZERO_RESULTS');
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
        },
        'OK'
      );
    },
    google = {
      maps: {
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
