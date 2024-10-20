import { useState, useEffect } from "react";

import ProductCard from "@/components/custom/ProductCard";
import GenericForm from "@/components/custom/genericForm";
import GenericFilter from "@/components/custom/GenericFilter";

import { Input } from "@/components/ui/input";
import { PriceFilter } from "@/components/ui/price-filter";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { getAllProducts, getPriceMinMax } from "@/services/ProductApiHandler";

import { CirclePlus } from "lucide-react";

import { useUser } from "@/state management/userInfo";

function ShoppingPage() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [loading, setLoading] = useState(false);
	const { role, id } = useUser();
	const [priceRange, setPriceRange] = useState({
		minPrice: 0,
		maxPrice: 1000,
	});

	const [activeFilters, setActiveFilters] = useState({
		name: "",
		price: {
			min: 0,
			max: 1000,
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
			min: 0,
			max: 1000,
			step: 1,
		},
		sortBy: {
			type: "select",
			label: "Sort By",
			options: ["Rating: Low to High", "Rating: High to Low"],
		},
	};

	const [sortOrder, setSortOrder] = useState("none"); // Default value is 'none' for no sorting

	// Function to fetch products based on filters and sorting order
	const fetchProducts = async () => {
		setLoading(true);
		const response = await getAllProducts(
			activeFilters.name,
			activeFilters.price.min,
			activeFilters.price.max,
			activeFilters.sortBy,
		);
		if (!response.error) {
			setProducts(response);
		} else {
			console.error(response.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Only fetch products after a 1-second delay
			fetchProducts();
		}, 500); // Adjust debounce time as needed (e.g., 500ms, 1000ms)

		// Clear the timeout if activeFilters changes before the timeout is complete
		// console.log("activeFilters changed", activeFilters);
		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]);

	// Fetch products whenever the search, price range, or sortOrder changes
	useEffect(() => {
		fetchProducts();
	}, [search, minPrice, maxPrice, sortOrder]);

	// const getPriceRange = async () => {
	// 	const response = await getPriceMinMax();
	// 	if (!response.error) {
	// 		setPriceRange(response);
	// 		setMinPrice(response.minProductsPrice);
	// 		setMaxPrice(response.maxProductsPrice);
	// 		console.log(response);
	// 	} else {
	// 		console.error(response.message);
	// 	}
	// };

	// useEffect(() => {
	// 	getPriceRange();
	// }, []);

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">Products</h1>
				<hr className="border-neutral-700 border w-full mt-1.5" />
				{role === "admin" && (
					<Dialog>
						<DialogTrigger className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
							<CirclePlus size={24} />
						</DialogTrigger>
						<DialogContent className="overflow-y-scroll max-h-[50%]">
							<DialogHeader>
								<DialogTitle>Add Product</DialogTitle>
								<GenericForm type="product" id={id} />
							</DialogHeader>
						</DialogContent>
					</Dialog>
				)}
			</div>
			<div className="flex gap-10">
				<div className="flex flex-col gap-7">
					<GenericFilter
						formFields={formFields}
						activeFilters={activeFilters}
						setActiveFilters={setActiveFilters}
					/>
				</div>
				<div className="grid gap-6 grid-cols-4 w-full">
					{loading ? (
						<p>Loading products...</p>
					) : products.length > 0 ? (
						products.map((item, index) => (
							<ProductCard
								key={index}
								data={item}
								id={id}
								profilelId={item.seller}
							/>
						))
					) : (
						<p>No products found.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default ShoppingPage;
