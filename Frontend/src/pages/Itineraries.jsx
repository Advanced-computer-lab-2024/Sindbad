/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import GenericFilter from "@/components/custom/GenericFilter";
import CardContainer from "@/components/custom/CardContainer";
import { getAllItineraries } from "@/services/ItineraryApiHandler";
import { getAllTags } from "@/services/AdminApiHandler";

function Itineraries() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [tags, setTags] = useState([]);
	const [tagNames, setTagNames] = useState([]);
	const [activeFilters, setActiveFilters] = useState({
		name: "",
		budget: {
			min: 0,
			max: 1000,
		},
		date: {
			start: "",
			end: "",
		},
		tag: {
			selected: "",
		},
		rating: {
			min: 0,
			max: 5,
		},
		language: "",
		sortBy: "",
		sortOrder: "",
	});

	const formFields = {
		name: {
			type: "search",
			label: "Search",
		},
		budget: {
			type: "range",
			label: "Budget",
			min: 0,
			max: 1000,
			step: 10,
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
			min: 0,
			max: 5,
			step: 1,
		},
		language: {
			type: "search",
			label: "Language",
		},
		sortBy: {
			type: "select",
			label: "Sort By",
			options: ["price", "rating"],
		},
		sortOrder: {
			type: "select",
			label: "Sort Order",
			options: ["asc", "desc"],
		},
	};

	// Function to fetch products
	const fetchItineraries = async () => {
		setLoading(true);
		let tagToSend = "";
		if (activeFilters.tag.selected !== "") {
			tagToSend = tags.find(
				(tag) => tag.name === activeFilters.tag.selected
			);
		}
		const response = await getAllItineraries(
			activeFilters.name,
			activeFilters.budget,
			activeFilters.date,
			tagToSend,
			activeFilters.rating,
			activeFilters.language,
			activeFilters.sortBy.selected,
			activeFilters.sortOrder.selected
		);
		if (!response.error) {
			const updatedItineraries = response.map((itinerary) => ({
				...itinerary, // retain other properties of the itinerary
				activities: itinerary.activities.map((activity) => activity._id), // map activities to _id
			}));
			setProducts(updatedItineraries);
		} else {
			setProducts([]);
			console.error(response.message);
		}
		setLoading(false);
	};

	// Debouncing logic for the API call
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Only fetch products after a 1-second delay
			fetchItineraries();
		}, 500); // Adjust debounce time as needed (e.g., 500ms, 1000ms)

		// Clear the timeout if activeFilters changes before the timeout is complete
		// console.log("activeFilters changed", activeFilters);
		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]); // Dependency on activeFilters

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
	}, []);

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold">Itineraries</h1>
				<hr className="border-neutral-700 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<GenericFilter
					formFields={formFields}
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
				/>
				{!loading && (
					<CardContainer cardList={products} cardType={"itinerary"} />
				)}
			</div>
		</div>
	);
}

export default Itineraries;
