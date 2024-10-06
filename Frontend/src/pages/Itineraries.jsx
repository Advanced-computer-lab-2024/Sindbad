import { useState, useEffect } from "react";
import GenericFilter from "@/components/custom/GenericFilter";
import Card from "@/components/custom/Card";
import CardContainer from "@/components/CardContainer";
import { getAllActivities } from "@/services/ActivityApiHandler";

function Itineraries() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
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
		category: {
			selected: "",
		},
		rating: {
			min: 0,
			max: 5,
		},
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
		},
		date: {
			type: "date",
			label: "Date",
		},
		category: {
			type: "select",
			label: "Category",
			options: ["Adventure", "Relaxation", "Cultural"],
		},
		rating: {
			type: "range",
			label: "Ratings",
			min: 0,
			max: 5,
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
	const fetchActivities = async () => {
		setLoading(true);
		const response = await getAllActivities(
			activeFilters.name,
			activeFilters.budget.max, // Pass min and max separately
			activeFilters.date, // Pass start and end separately
			activeFilters.category.selected,
			activeFilters.rating.min,
			activeFilters.sortBy.selected,
			activeFilters.sortOrder.selected
		);
		if (!response.error) {
			setProducts(response);
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
			fetchActivities();
		}, 500); // Adjust debounce time as needed (e.g., 500ms, 1000ms)

		// Clear the timeout if activeFilters changes before the timeout is complete
		// console.log("activeFilters changed", activeFilters);
		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]); // Dependency on activeFilters

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
					<CardContainer cardList={products} CardComponent={Card} />
				)}
			</div>
		</div>
	);
}

export default Itineraries;
