import { useState, useEffect } from "react";

import GenericFilter from "@/components/custom/GenericFilter";
import CardContainer from "@/components/custom/cards/CardContainer";

import { getAllItineraries } from "@/services/ItineraryApiHandler";
import { getAllTags } from "@/services/AdminApiHandler";

import { useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import { languages } from "@/utilities/getLanguages";

function Itineraries() {
	const [loading, setLoading] = useState(true);
	const [itineraries, setItineraries] = useState([]);
	const [tags, setTags] = useState([]);
	const [tagNames, setTagNames] = useState([]);
	const currency = useCurrency();
	const [priceRange, setPriceRange] = useState({
		minPrice: 0,
		maxPrice: 1000,
	});

	const [activeFilters, setActiveFilters] = useState({
		name: "",
		price: {
			min: priceRange.minPrice,
			max: priceRange.maxPrice,
		},
		date: {
			start: "",
			end: "",
		},
		tag: "",
		rating: {
			min: 0,
			max: 5,
		},
		language: "",
		sortBy: ""
	});

	const formFields = {
		name: {
			type: "search",
			label: "Search",
		},
		price: {
			type: "range",
			label: "Price",
			range: {
				min: priceRange.minPrice,
				max: priceRange.maxPrice,
			},
			step: 1,
		},
		date: {
			type: "date",
			label: "Date",
		},
		tag: {
			type: "select",
			label: "Tag",
			options: tagNames,
		},
		rating: {
			type: "range",
			label: "Rating",
			range: {
				min: 0,
				max: 5,
			},
			step: 1,
		},
		language: {
			type: "select",
			label: "Language",
			options: languages.map((language) => language.label),
		},
		sortBy: {
			type: "select",
			label: "Sort By",
			options: ["Price: Low to High", "Price: High to Low", "Rating: Low to High", "Rating: High to Low"],
		},
	};

	// Function to fetch itineraries
	const fetchItineraries = async () => {
		setLoading(true);
		let tagToSend = "";
		if (activeFilters.tag.selected !== "") {
			tagToSend = tags.find((tag) => tag.name === activeFilters.tag.selected);
		}

		const converter = await Convert().from("USD").fetch();
		const convertedMin = activeFilters.price.min / converter.rates[currency];
		const convertedMax = activeFilters.price.max / converter.rates[currency];
		const convertedPrice = { min: convertedMin, max: convertedMax };

		const sortBy = activeFilters.sortBy.selected?.split(": ")[0].toLowerCase();
		const sortOrder = activeFilters.sortBy.selected?.split(": ")[1].toLowerCase() === "low to high" ? "asc" : "desc";

		const response = await getAllItineraries(
			activeFilters.name,
			convertedPrice,
			activeFilters.date,
			tagToSend,
			activeFilters.rating,
			activeFilters.language.selected,
			sortBy,
			sortOrder
		);
		if (!response.error && response) {
			const updatedItineraries = response.map((itinerary) => ({
				...itinerary, // retain other properties of the itinerary
				activities: itinerary.activities.map((activity) => activity._id), // map activities to _id
			}));
			setItineraries(updatedItineraries);
		} else {
			setItineraries([]);
			console.error(response.message);
		}
		setLoading(false);
	};

	// Debouncing logic for the API call
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Only fetch itineraries after a 1-second delay
			fetchItineraries();
		}, 500); // Adjust debounce time as needed (e.g., 500ms, 1000ms)

		// Clear the timeout if activeFilters changes before the timeout is complete
		// console.log("activeFilters changed", activeFilters);
		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]); // Dependency on activeFilters

	const getPriceRange = async () => {
		const response = priceRange;
		const converter = await Convert().from("USD").fetch();
		let responseConverted = {
			minPrice: await converter.amount(response.minPrice).to(currency),
			maxPrice: await converter.amount(response.maxPrice).to(currency),
		}
		responseConverted = {
			minPrice: Math.floor(responseConverted.minPrice),
			maxPrice: Math.ceil(responseConverted.maxPrice),
		}
		setPriceRange(responseConverted);
		setActiveFilters({
			...activeFilters,
			price: {
				min: responseConverted.minPrice,
				max: responseConverted.maxPrice,
			},
		});
	};

	const fetchTags = async () => {
		const response = await getAllTags();
		if (!response.error) {
			setTags(response.data);
			const set = new Set(response.data.map((tag) => tag.name));
			setTagNames(Array.from(set));
		} else {
			console.error(response.message);
		}
	};

	useEffect(() => {
		fetchTags();
		getPriceRange();
	}, []);

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold">Itineraries</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<div className="w-[280px] shrink-0">
					<GenericFilter
						formFields={formFields}
						activeFilters={activeFilters}
						setActiveFilters={setActiveFilters}
					/>
				</div>
				{!loading ? (
					<CardContainer
						cardList={itineraries}
						cardType={"itinerary"}
						fetchCardData={fetchItineraries}
					/>
				) : (
					<div className="flex col-span-3 mx-auto">
						<div className="flex justify-center w-full">
							<p className="text-neutral-400 text-sm italic">Loading...</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Itineraries;