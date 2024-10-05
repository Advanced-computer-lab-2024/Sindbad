/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import GenericFilter from "@/components/custom/GenericFilter";
import Card from "@/components/custom/Card";
import CardContainer from "@/components/CardContainer";

import { getAllProducts } from "@/services/ProductApiHandler";

function Sites() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]); // Fixed the destructuring here
	const [search, setSearch] = useState("");
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000); // Example default range

	// Function to fetch products based on filters
	const fetchProducts = async () => {
		setLoading(true); // Set loading to true before fetching
		const response = await getAllProducts(search, minPrice, maxPrice);
		if (!response.error) {
			setProducts(response); // If no error, set products
		} else {
			console.error(response.message); // Log any error
		}
		setLoading(false); // Set loading to false after fetching
	};

	// Fetch products on component mount and whenever filters change
	useEffect(() => {
		fetchProducts();
	}, [search, minPrice, maxPrice]);

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto bg-orange-300">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold">Activities</h1>
				<hr className="border-neutral-700 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<GenericFilter
					setSearch={setSearch}
					setMinPrice={setMinPrice}
					setMaxPrice={setMaxPrice}
				/>{" "}
				{!loading && (
					<CardContainer cardList={products} CardComponent={Card} />
				)}
			</div>
		</div>
	);
}

export default Sites;
