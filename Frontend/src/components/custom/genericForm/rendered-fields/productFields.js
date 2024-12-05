export const product = {
	fields: [
		{
			name: "name",
			type: "text",
			label: "Product Name",
			required: true,
		},
		{
			name: "description",
			type: "textArea",
			label: "Description",
			required: true,
		},
		{
			name: "cardImage",
			type: "file",
			label: "Photo",
			required: true,
		},
		{
			name: "price",
			type: "number",
			label: "Price",
			required: true,
			min: 0,
		},
		{
			name: "quantity",
			type: "number",
			label: "Quantity",
			required: true,
			min: 0,
		},
	],
	defaultValues: {
		name: "",
		description: "",
		cardImage: undefined,
		price: 0,
		quantity: 0,
	},
};