export const tourismGovernor = {
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
            required: true,
        },
        {
            name: "bannerImageUri",
            type: "file",
            label: "Banner Image",
            required: true,
        },
    ],
    defaultValues: {
        email: '',
        profileImageUri: undefined,
        bannerImageUri: undefined,
    }
};