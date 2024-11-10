export const admin = {
    fields: [
        {
            name: 'email',
            type: 'text',
            label: 'Email'
        },
        {
            name: "profileImageUri",
            type: "text",
            label: "Profile Image",
            required: true,
        },
        {
            name: "bannerImageUri",
            type: "text",
            label: "Banner Image",
            required: true,
        },
    ],
    defaultValues: {
        email: '',
        profileImageUri: '',
        bannerImageUri: '',
    }
};