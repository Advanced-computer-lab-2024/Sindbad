export const seller = {
    fields: [
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'firstName', type: 'text', label: 'First Name' },
        { name: 'lastName', type: 'text', label: 'Last Name' },
        { name: 'description', type: 'textarea', label: 'Description' }
    ],
    defaultValues: {
        email: '',
        firstName: '',
        lastName: '',
        description: ''
    }
};