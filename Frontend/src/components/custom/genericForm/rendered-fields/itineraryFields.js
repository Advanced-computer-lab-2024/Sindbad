import { languages } from "@/utilities/getLanguages";
import { accessibilityOptions } from "@/utilities/getAccessibilityOptions";

export const itinerary = {
	fields: [
		{ name: "name", type: "text", label: "Itinerary Name" },
		{ name: "description", type: "textArea", label: "Description" },
		{ name: "cardImage", type: "file", label: "Photo" },
		{ name: "activities", type: "array", label: "Activities", description: "URLs of the activities included in the itinerary" },
		{ name: "locations", type: "array", label: "Locations", description: "List of locations to be visited in the itinerary" },
		{ name: "timeline", type: "array", label: "Timeline", description: "A timeline for all the locations and activities" },
		{ name: "duration", type: "number", label: "Duration", description: "Duration of the itinerary in days" },
		{ name: "languages", type: "multiSelect", label: "Supported Languages", options: languages.map((language) => (language.label)) },
		{ name: "price", type: "number", label: "Price" },
		{ name: "availableDatesTimes", type: "array", arrayType: "date", label: "Available Dates", },
		{ name: "accessibility", type: "multiSelect", label: "Accessibility Options", options: accessibilityOptions.map((option) => (option.label)) },
		{ name: "pickUpLocation", type: "text", label: "Pick-up Location" },
		{ name: "dropOffLocation", type: "text", label: "Drop-off Location" },
	],
	defaultValues: {
		name: "",
		description: "",
		cardImage: undefined,
		activities: [],
		locations: [],
		timeline: [],
		duration: 0,
		languages: [],
		price: 0,
		availableDatesTimes: [],
		accessibility: [],
		pickUpLocation: "",
		dropOffLocation: "",
	},
};