export const complaint = {
    fields: [
        { name: 'title', type: 'text', label: 'Issue experinced' },
        { name: 'body', type: 'textArea', label: 'Desription of issue experinced' }
    ],
    defaultValues: {
        title: "",
        isResolved: false,
        createdAt: new Date().toISOString(),
        body: "",
    }
};