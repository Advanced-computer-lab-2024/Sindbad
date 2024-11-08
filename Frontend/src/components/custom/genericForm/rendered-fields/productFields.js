export const product = {
	fields: [
		{
			name: "name",
			type: "text",
			label: "Product Name",
			required: true,
		},
		{
			name: "imageUris",
			type: "array",
			label: "Image URLs",
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
			name: "description",
			type: "text",
			label: "Description",
			required: true,
		},
		{
			name: "quantity",
			type: "number",
			label: "Quantity",
			required: true,
			min: 0,
		},
		{
			name: "isArchived",
			type: "checkbox",
			label: "Archive Product",
		},
	],
	defaultValues: {
		name: "",
		imageUris: "",
		price: 0,
		description: "",
		quantity: 0,
		isArchived: false,
	},
};