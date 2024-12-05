import { getTags } from "@/utilities/getTagsAndCategories";

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
            type: 'textArea',
            label: 'Description',
            required: true,
        },
        {
            name: 'cardImage',
            type: 'file',
            label: 'Photo',
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
                        { name: 'start', type: 'time', label: 'From' },
                        { name: 'end', type: 'time', label: 'To' },
                    ],
                },
                {
                    name: 'tuesday',
                    type: 'object',
                    label: 'Tuesday',
                    fields: [
                        { name: 'start', type: 'time', label: 'From' },
                        { name: 'end', type: 'time', label: 'To' },
                    ],
                },
                {
                    name: 'wednesday',
                    type: 'object',
                    label: 'Wednesday',
                    fields: [
                        { name: 'start', type: 'time', label: 'From' },
                        { name: 'end', type: 'time', label: 'To' },
                    ],
                },
                {
                    name: 'thursday',
                    type: 'object',
                    label: 'Thursday',
                    fields: [
                        { name: 'start', type: 'time', label: 'From' },
                        { name: 'end', type: 'time', label: 'To' },
                    ],
                },
                {
                    name: 'friday',
                    type: 'object',
                    label: 'Friday',
                    fields: [
                        { name: 'start', type: 'time', label: 'From' },
                        { name: 'end', type: 'time', label: 'To' },
                    ],
                },
                {
                    name: 'saturday',
                    type: 'object',
                    label: 'Saturday',
                    fields: [
                        { name: 'start', type: 'time', label: 'From' },
                        { name: 'end', type: 'time', label: 'To' },
                    ],
                },
                {
                    name: 'sunday',
                    type: 'object',
                    label: 'Sunday',
                    fields: [
                        { name: 'start', type: 'time', label: 'From' },
                        { name: 'end', type: 'time', label: 'To' },
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
                    name: 'child',
                    type: 'number',
                    label: 'Child Ticket',
                    min: 0,
                },
                {
                    name: 'student',
                    type: 'number',
                    label: 'Student Ticket',
                    min: 0,
                },
                {
                    name: 'adult',
                    type: 'number',
                    label: 'Adult Ticket',
                    min: 0,
                },
                {
                    name: 'foreigner',
                    type: 'number',
                    label: 'Foreigner Ticket',
                    min: 0,
                }
            ]
        },
        {
            name: 'tags',
            type: 'multiSelect',
            label: 'Tags',
            options: await getTags(),
        }
    ],
    defaultValues: {
        name: '',
        description: '',
        cardImage: undefined,
        location: {
            address: '',
            coordinates: {
                lat: 0,
                lng: 0
            }
        },
        openingHours: {
            monday: { start: "", end: "" },
            tuesday: { start: "", end: "" },
            wednesday: { start: "", end: "" },
            thursday: { start: "", end: "" },
            friday: { start: "", end: "" },
            saturday: { start: "", end: "" },
            sunday: { start: "", end: "" },
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