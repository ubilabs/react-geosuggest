import predictions from './fixtures/predictions';

export default function googleStub() {
  const predictionStub = (options, callback) => {
      const suggestsGoogle = predictions().filter(prediction =>
        prediction.terms.find(term => term.value.startsWith(options.input)
      ));

      callback(suggestsGoogle.length > 0 ? suggestsGoogle : null);
    },
    geocodeStub = (query, callback) => {
      if (query.address === '' || query.placeId === '') {
        callback([], 'ZERO_RESULTS');
        return;
      }

      callback([{
        geometry: {
          location: {
            lat: () => 0,
            lng: () => 0
          }
        }
      }], 'OK');
    },
    google = {
      maps: {
        LatLng: () => true,
        places: {
          AutocompleteService() {
            return {
              getPlacePredictions: predictionStub
            };
          }
        },
        Geocoder() {
          return {
            geocode: geocodeStub
          };
        },
        GeocoderStatus: {
          'OK': 'OK'
        }
      }
    };

  return google;
}
