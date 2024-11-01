export const activity = {
    fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Activity Name',
          required: true,
        },
        {
          name: 'dateTime',
          type: 'date',
          label: 'Date and Time',
          required: true,
        },
        {
          name: 'location',
          type: 'object',
          label: 'Location',
          required: true,
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Address',
              required: true,
            },
            {
              name: 'coordinates',
              type: 'coordinates',
              label: 'Coordinates',
              required: true,
            }
          ]
        },
        {
          name: 'price',
          type: 'object',
          label: 'Price Range',
          required: true,
          fields: [
            {
              name: 'min',
              type: 'number',
              label: 'Minimum Price',
              required: true,
            },
            {
              name: 'max',
              type: 'number',
              label: 'Maximum Price',
              required: true,
            }
          ]
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
          required: true,
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          maxItems: 10,
          itemType: 'text',
        },
        {
          name: 'discounts',
          type: 'number',
          label: 'Discount Percentage',
          required: true,
          min: 0,
          max: 100,
        },
        {
          name: 'isBookingOpen',
          type: 'checkbox',
          label: 'Booking Status',
        }
      ],
    defaultValues: {
        name: '',
        dateTime: '',
        location: {
          address: '',
          coordinates: {
            lat: 0,
            lng: 0
          }
        },
        price: {
          min: 0,
          max: 0
        },
        category: '',
        tags: [],
        discounts: 0,
        isBookingOpen: false
      },
}