export const company = {
    fields: [
        { name: 'name', type: 'text', label: 'Company Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'location', type: 'text', label: 'Location' }
    ],
    defaultValues: {
        name: '',
        description: '',
        location: ''
    }
};