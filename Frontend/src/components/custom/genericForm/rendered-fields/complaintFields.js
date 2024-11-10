export const complaint = {
    fields: [
        { name: 'title', type: 'text', label: 'Issue experienced' },
        { name: 'body', type: 'textArea', label: 'Desription of issue experienced' }
    ],
    defaultValues: {
        title: "",
        body: "",
    }
};