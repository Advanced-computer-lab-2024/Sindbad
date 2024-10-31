export const site = {
    fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Site Name',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'imageUris',
          type: 'array',
          label: 'Image URLs',
          itemType: 'url',
          required: true,
        },
        {
          name: 'location',
          type: 'location',
          label: 'Location',
          required: true,
          fields: [
            {
              name: 'location.address',
              type: 'text',
              label: 'Address',
              required: true,
            },
            {
              name: 'location.coordinates',
              type: 'coordinates',
              label: 'Coordinates',
              required: true,
            }
          ]
        },
        {
          name: 'openingHours',
          type: 'opening-hours',
          label: 'Opening Hours',
          required: true,
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          fields: [
            {
              name: 'start',
              type: 'time',
              label: 'Opening Time',
            },
            {
              name: 'end',
              type: 'time',
              label: 'Closing Time',
            }
          ]
        },
        {
          name: 'ticketPrices',
          type: 'ticket-prices',
          label: 'Ticket Prices',
          required: true,
          fields: [
            {
              name: 'ticketPrices.child',
              type: 'number',
              label: 'Child Ticket',
              min: 0,
            },
            {
              name: 'ticketPrices.student',
              type: 'number',
              label: 'Student Ticket',
              min: 0,
            },
            {
              name: 'ticketPrices.adult',
              type: 'number',
              label: 'Adult Ticket',
              min: 0,
            },
            {
              name: 'ticketPrices.foreigner',
              type: 'number',
              label: 'Foreigner Ticket',
              min: 0,
            }
          ]
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          itemType: 'text',
        }
      ],
    defaultValues: {
        name: '',
        description: '',
        imageUris: [],
        location: {
          address: '',
          coordinates: {
            lat: 0,
            lng: 0
          }
        },
        openingHours: {
          monday: { start: 540, end: 1020 },    // 9:00 AM to 5:00 PM
          tuesday: { start: 540, end: 1020 },
          wednesday: { start: 540, end: 1020 },
          thursday: { start: 540, end: 1020 },
          friday: { start: 540, end: 1020 },
          saturday: { start: 540, end: 1020 },
          sunday: { start: 540, end: 1020 }
        },
        ticketPrices: {
          child: 0,
          student: 0,
          adult: 0,
          foreigner: 0
        },
        tags: []
      }
}