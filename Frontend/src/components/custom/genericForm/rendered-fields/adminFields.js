export const admin = {
    fields: [
        {
            name: 'email',
            type: 'text',
            label: 'Email'
        },
        {
            name: "profileImageUri",
            type: "file",
            label: "Profile Image",
        },
        {
            name: "bannerImageUri",
            type: "file",
            label: "Banner Image",
        },
    ],
    defaultValues: {
        email: '',
        profileImageUri: undefined,
        bannerImageUri: undefined,
    }
};