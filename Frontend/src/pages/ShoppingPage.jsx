import ProductCard from "@/components/custom/ProductCard";
import { PriceFilter } from "@/components/ui/price-filter";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getAllProducts, getPriceMinMax } from "@/services/ProductApiHandler";
import { useUser } from "@/state management/userInfo";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import GenericForm from "@/components/custom/genericForm";
import { CirclePlus } from "lucide-react";

function ShoppingPage() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [loading, setLoading] = useState(false);
	const { type, id } = useUser();
	const [priceRange, setPriceRange] = useState({
		minPrice: 0,
		maxPrice: 1000,
	});

	const [sortOrder, setSortOrder] = useState("none"); // Default value is 'none' for no sorting

	// Function to fetch products based on filters and sorting order
	const fetchProducts = async () => {
		setLoading(true);
		const response = await getAllProducts(
			search,
			minPrice,
			maxPrice,
			sortOrder
		);
		if (!response.error) {
			setProducts(response);
		} else {
			console.error(response.message);
		}
		setLoading(false);
	};

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
				{type === "admin" && (
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
					<div>
						<h2 className="text-md font-semibold mb-2">Search</h2>
						<Input
							type="text"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<PriceFilter
						minPrice={minPrice}
						maxPrice={maxPrice}
						setMinPrice={setMinPrice}
						setMaxPrice={setMaxPrice}
						priceRange={priceRange}
						step={10}
					/>
					<div>
						<h2 className="text-md font-semibold mb-2">Sort by</h2>
						{/* Select dropdown for sorting */}
						<Select value={sortOrder} onValueChange={setSortOrder}>
							<SelectTrigger>
								<SelectValue placeholder="Select sorting" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">Default</SelectItem>
								<SelectItem value="asc">
									Rating: Low to High
								</SelectItem>
								<SelectItem value="desc">
									Rating: High to Low
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="grid gap-6 grid-cols-4 w-full">
					{loading ? (
						<p>Loading products...</p>
					) : products.length > 0 ? (
						products.map((item, index) => (
							<ProductCard
								key={index}
								data={item}
								type={type}
								id={id}
								userId={item.seller}
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
