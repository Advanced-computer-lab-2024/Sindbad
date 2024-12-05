import { useState, useEffect } from "react";

import GenericFilter from "@/components/custom/GenericFilter";
import CardContainer from "@/components/custom/cards/CardContainer";

import { getAllActivities } from "@/services/ActivityApiHandler";
import { getAllCategories } from "@/services/AdminApiHandler";

import { useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";

function Activities() {
	const [loading, setLoading] = useState(true);
	const [activities, setActivities] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryNames, setCategoryNames] = useState([]);
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
		category: {
			selected: "",
		},
		rating: {
			min: 0,
			max: 5,
		},
		sortBy: "",
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
		category: {
			type: "select",
			label: "Category",
			options: categoryNames,
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
		sortBy: {
			type: "select",
			label: "Sort By",
			options: ["Price: Low to High", "Price: High to Low", "Rating: Low to High", "Rating: High to Low"],
		},
	};

	// Function to fetch activities
	const fetchActivities = async () => {
		setLoading(true);
		let categoryToSend = "";
		if (activeFilters.category.selected !== "") {
			categoryToSend = categories.find(
				(category) => category.name === activeFilters.category.selected
			);
		}

		const converter = await Convert().from("USD").fetch();
		const convertedMin = activeFilters.price.min / converter.rates[currency];
		const convertedMax = activeFilters.price.max / converter.rates[currency];
		const convertedPrice = { min: convertedMin, max: convertedMax };

		const sortBy = activeFilters.sortBy.selected?.split(": ")[0].toLowerCase();
		const sortOrder = activeFilters.sortBy.selected?.split(": ")[1].toLowerCase() === "low to high" ? "asc" : "high to low" ? "desc" : null;

		const response = await getAllActivities(
			activeFilters.name,
			convertedPrice,
			activeFilters.date, // Pass start and end separately
			categoryToSend, // Send the category ID
			activeFilters.rating,
			sortBy,
			sortOrder
		);
		if (!response.error) {
			setActivities(response);
		} else {
			setActivities([]);
			console.error(response.message);
		}
		setLoading(false);
	};

	// Debouncing logic for the API call
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Only fetch activities after a 1-second delay
			fetchActivities();
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

	const fetchCategories = async () => {
		try {
			const response = await getAllCategories();
			if (!response.error) {
				setCategories(response.data);
				const set = new Set(response.data.map((category) => category.name));
				setCategoryNames(Array.from(set));
			} else {
				console.error(response.message);
			}
		} catch (error) {
			console.error("Error fetching categories: ", error);
		}
	};

	useEffect(() => {
		fetchCategories();
		getPriceRange();
	}, [currency]);

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold">Activities</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<div className="w-[220px] shrink-0">
					<GenericFilter
						formFields={formFields}
						activeFilters={activeFilters}
						setActiveFilters={setActiveFilters}
					/>
				</div>
				{!loading ? (
					<CardContainer
						cardList={activities}
						cardType={"activity"}
						fetchCardData={fetchActivities}
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

export default Activities;
