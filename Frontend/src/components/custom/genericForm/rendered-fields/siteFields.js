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
          type: 'object',
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
          type: 'object',
          label: 'Opening Hours',
          required: true,
          fields: [
            {
              name: 'monday',
              type: 'object',
              label: 'Monday',
              fields: [
                { name: 'start', type: 'number', label: 'Opening Time' },
                { name: 'end', type: 'number', label: 'Closing Time' },
              ],
            },
            {
              name: 'tuesday',
              type: 'object',
              label: 'Tuesday',
              fields: [
                { name: 'start', type: 'number', label: 'Opening Time' },
                { name: 'end', type: 'number', label: 'Closing Time' },
              ],
            },
            {
              name: 'wednesday',
              type: 'object',
              label: 'Wednesday',
              fields: [
                { name: 'start', type: 'number', label: 'Opening Time' },
                { name: 'end', type: 'number', label: 'Closing Time' },
              ],
            },
            {
              name: 'thursday',
              type: 'object',
              label: 'Thursday',
              fields: [
                { name: 'start', type: 'number', label: 'Opening Time' },
                { name: 'end', type: 'number', label: 'Closing Time' },
              ],
            },
            {
              name: 'friday',
              type: 'object',
              label: 'Friday',
              fields: [
                { name: 'start', type: 'number', label: 'Opening Time' },
                { name: 'end', type: 'number', label: 'Closing Time' },
              ],
            },
            {
              name: 'saturday',
              type: 'object',
              label: 'Saturday',
              fields: [
                { name: 'start', type: 'number', label: 'Opening Time' },
                { name: 'end', type: 'number', label: 'Closing Time' },
              ],
            },
            {
              name: 'sunday',
              type: 'object',
              label: 'Sunday',
              fields: [
                { name: 'start', type: 'number', label: 'Opening Time' },
                { name: 'end', type: 'number', label: 'Closing Time' },
              ],
            },
          ],
        },
        {
          name: 'ticketPrices',
          type: 'object',
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
          monday: { start: 540, end: 1020 },
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