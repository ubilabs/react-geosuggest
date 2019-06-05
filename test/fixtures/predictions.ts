export default function predictions(): google.maps.places.AutocompletePrediction[] {
  return [
    {
      description: 'New York, NY, United States',
      matched_substrings: [
        {
          length: 2,
          offset: 0
        }
      ],
      place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
      reference: '...',
      structured_formatting: {
        main_text: 'New York, NY, United States',
        main_text_matched_substrings: [
          {
            length: 2,
            offset: 0
          }
        ],
        secondary_text: ''
      },
      terms: [
        {
          offset: 0,
          value: 'New York'
        },
        {
          offset: 10,
          value: 'NY'
        },
        {
          offset: 14,
          value: 'United States'
        }
      ],
      types: ['locality', 'political', 'geocode']
    },
    {
      description: 'New York, IA, United States',
      matched_substrings: [
        {
          length: 2,
          offset: 0
        }
      ],
      place_id: 'ChIJD_qB3F8X6YcRDraFbXmLUD4',
      reference: '...',
      structured_formatting: {
        main_text: 'New York, IA, United States',
        main_text_matched_substrings: [
          {
            length: 2,
            offset: 0
          }
        ],
        secondary_text: ''
      },
      terms: [
        {
          offset: 0,
          value: 'New York'
        },
        {
          offset: 10,
          value: 'IA'
        },
        {
          offset: 14,
          value: 'United States'
        }
      ],
      types: ['locality', 'political', 'geocode']
    },
    {
      description: 'New York, United States',
      matched_substrings: [
        {
          length: 2,
          offset: 0
        }
      ],
      place_id: 'ChIJqaUj8fBLzEwRZ5UY3sHGz90',
      reference: '...',
      structured_formatting: {
        main_text: 'New York, United States',
        main_text_matched_substrings: [
          {
            length: 2,
            offset: 0
          }
        ],
        secondary_text: ''
      },
      terms: [
        {
          offset: 0,
          value: 'New York'
        },
        {
          offset: 10,
          value: 'United States'
        }
      ],
      types: ['administrative_area_level_1', 'political', 'geocode']
    },
    {
      description: 'New Jersey, United States',
      matched_substrings: [
        {
          length: 2,
          offset: 0
        }
      ],
      place_id: 'ChIJn0AAnpX7wIkRjW0_-Ad70iw',
      reference: '...',
      structured_formatting: {
        main_text: 'New Jersey, United States',
        main_text_matched_substrings: [
          {
            length: 2,
            offset: 0
          }
        ],
        secondary_text: ''
      },
      terms: [
        {
          offset: 0,
          value: 'New Jersey'
        },
        {
          offset: 12,
          value: 'United States'
        }
      ],
      types: ['administrative_area_level_1', 'political', 'geocode']
    },
    {
      description: 'Newark, NJ, United States',
      matched_substrings: [
        {
          length: 2,
          offset: 0
        }
      ],
      place_id: 'ChIJHQ6aMnBTwokRc-T-3CrcvOE',
      reference: '...',
      structured_formatting: {
        main_text: 'Newark, NJ, United States',
        main_text_matched_substrings: [
          {
            length: 2,
            offset: 0
          }
        ],
        secondary_text: ''
      },
      terms: [
        {
          offset: 0,
          value: 'Newark'
        },
        {
          offset: 8,
          value: 'NJ'
        },
        {
          offset: 12,
          value: 'United States'
        }
      ],
      types: ['locality', 'political', 'geocode']
    },
    {
      description: 'Transformed New York, NY, United States',
      matched_substrings: [
        {
          length: 2,
          offset: 0
        }
      ],
      place_id: 'ChIJHQ6aMnBTwokRc-T-3CrcvOF',
      reference: '...',
      structured_formatting: {
        main_text: 'Transformed: Exact Match With Transform',
        main_text_matched_substrings: [
          {
            length: 2,
            offset: 0
          }
        ],
        secondary_text: ''
      },
      terms: [
        {
          offset: 0,
          value: 'Transformed: Exact Match With Transform'
        }
      ],
      types: ['locality']
    },
    {
      description: 'Exact Match Without Transformation',
      matched_substrings: [
        {
          length: 2,
          offset: 0
        }
      ],
      place_id: 'ChIJHQ6aMnBTwokRc-T-3CrcvOF',
      reference: '...',
      structured_formatting: {
        main_text: 'Exact Match Without Transformation',
        main_text_matched_substrings: [
          {
            length: 2,
            offset: 0
          }
        ],
        secondary_text: ''
      },
      terms: [
        {
          offset: 0,
          value: 'Exact Match Without Transformation'
        }
      ],
      types: ['locality']
    }
  ];
}
