export const advertiser = {
    fields: [
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'websiteLink', type: 'url', label: 'Website Link' },
        { name: 'hotline', type: 'tel', label: 'Hotline' }
    ],
    defaultValues: {
        email: '',
        websiteLink: '',
        hotline: ''
    }
};