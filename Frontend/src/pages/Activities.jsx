/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import GenericFilter from "@/components/custom/GenericFilter";
import CardContainer from "@/components/CardContainer";
import { getAllActivities } from "@/services/ActivityApiHandler";
import { getAllCategories } from "@/services/AdminApiHandler";
function Activities() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryNames, setCategoryNames] = useState([]);
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
			step: 10,
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
			min: 0,
			max: 5,
			step: 1,
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
		let categoryToSend = "";
		if (activeFilters.category.selected !== "") {
			categoryToSend = categories.find(
				(category) => category.name === activeFilters.category.selected
			);
		}
		const response = await getAllActivities(
			activeFilters.name,
			activeFilters.budget,
			activeFilters.date, // Pass start and end separately
			categoryToSend, // Send the category ID
			activeFilters.rating,
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

	const fetchCategories = async () => {
		try {
			const response = await getAllCategories();
			if (!response.error) {
				setCategories(response.data);
				const set = new Set(
					response.data.map((category) => category.name)
				);
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
	}, []);
	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold">Activities</h1>
				<hr className="border-neutral-700 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<GenericFilter
					formFields={formFields}
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
				/>
				{!loading && (
					<CardContainer cardList={products} type={"activity"} />
				)}
			</div>
		</div>
	);
}

export default Activities;
