import { useState, useEffect } from "react";
import GenericFilter from "@/components/custom/GenericFilter";
import Card from "@/components/custom/Card";
import CardContainer from "@/components/CardContainer";
import { getAllProducts } from "@/services/ProductApiHandler";

function Activities() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [activeFilters, setActiveFilters] = useState({
		name: "",
		budget: {
			min: 0,
			max: 1000,
		},
		budget2: {
			min: 0,
			max: 1000,
		},
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
		budget2: {
			type: "range",
			label: "Budget2",
			min: 0,
			max: 1000,
		},
	};

	// Function to fetch products
	const fetchProducts = async () => {
		setLoading(true);
		const response = await getAllProducts(
			activeFilters.name,
			activeFilters.budget.min,
			activeFilters.budget.max
		);
		if (!response.error) {
			setProducts(response);
		} else {
			console.error(response.message);
		}
		setLoading(false);
	};

	// Debouncing logic for the API call
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Only fetch products after a 1-second delay
			fetchProducts();
		}, 500); // Adjust debounce time as needed (e.g., 500ms, 1000ms)

		// Clear the timeout if activeFilters changes before the timeout is complete
		// console.log("activeFilters changed", activeFilters);
		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]); // Dependency on activeFilters

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
					<CardContainer cardList={products} CardComponent={Card} />
				)}
			</div>
		</div>
	);
}

export default Activities;
