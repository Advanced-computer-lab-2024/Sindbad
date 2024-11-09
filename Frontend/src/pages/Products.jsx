import { useState, useEffect } from "react";

import GenericForm from "@/components/custom/genericForm/genericForm";
import GenericFilter from "@/components/custom/GenericFilter";
import CardContainer from "@/components/custom/cards/CardContainer";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { getAllProducts, getPriceMinMax } from "@/services/ProductApiHandler";

import { CirclePlus } from "lucide-react";

import { useUser, useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";

function ShoppingPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { role, id } = useUser();
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
		sortBy: {
			type: "select",
			label: "Sort By",
			options: ["Rating: Low to High", "Rating: High to Low"],
		},
	};

	// Function to fetch products based on filters and sorting order
	const fetchProducts = async () => {
		setLoading(true);
		const converter = await Convert().from("USD").fetch();
		console.log("pre conversion", activeFilters.price.min, activeFilters.price.max);
		const convertedMin = activeFilters.price.min / converter.rates[currency];
		const convertedMax = activeFilters.price.max / converter.rates[currency];
		// console.log("post conversion", Math.floor(convertedMin), Math.ceil(convertedMax));
		const response = await getAllProducts(
			activeFilters.name,
			convertedMin,
			convertedMax,
			activeFilters.sortBy
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
			fetchProducts();
		}, 500);

		// Clear the timeout if activeFilters changes before the timeout is complete
		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]);

	const getPriceRange = async () => {
		const response = await getPriceMinMax();
		if (!response.error) {
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
			// console.log(response);
		} else {
			console.error(response.message);
		}
	};

	useEffect(() => {
		getPriceRange();
	}, []);

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold shrink-0">Products</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
				{/* {role === "admin" && (
					<Dialog>
						<DialogTrigger className="shrink-0 mt-1.5 text-neutral-400 hover:text-neutral-600 transition-all">
							<CirclePlus size={24} />
						</DialogTrigger>
						<DialogContent className="overflow-y-scroll max-h-[50%]">
							<DialogHeader>
								<DialogTitle>Add Product</DialogTitle>
								<GenericForm type="product" id={id} />
							</DialogHeader>
						</DialogContent>
					</Dialog>
				)} */}
			</div>
			<div className="flex gap-10">
				<div className="flex flex-col gap-7 w-[280px] shrink-0">
					<GenericFilter
						formFields={formFields}
						activeFilters={activeFilters}
						setActiveFilters={setActiveFilters}
					/>
				</div>

				{!loading ? (
					<CardContainer
						cardList={products}
						cardType={"product"}
						fetchCardData={fetchProducts}
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

export default ShoppingPage;
