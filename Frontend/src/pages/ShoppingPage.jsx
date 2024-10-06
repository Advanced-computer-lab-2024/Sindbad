import ProductCard from "@/components/custom/ProductCard";
import { PriceFilter } from "@/components/ui/price-filter";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getAllProducts } from "@/services/ProductApiHandler";
import { useUser } from "@/state management/userInfo";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"; // Import Select components

function ShoppingPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [loading, setLoading] = useState(false);
    const { type, id } = useUser();

    const [sortOrder, setSortOrder] = useState("none"); // Default value is 'none' for no sorting

    // Function to fetch products based on filters and sorting order
    const fetchProducts = async () => {
        setLoading(true);
        const response = await getAllProducts(search, minPrice, maxPrice, sortOrder);
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

    return (
        <div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
            <div className="flex items-center gap-6 mb-6">
                <h1 className="text-3xl font-extrabold">Products</h1>
                <hr className="border-neutral-700 border w-full mt-1.5" />
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
                                <SelectItem value="asc">Rating: Low to High</SelectItem>
                                <SelectItem value="desc">Rating: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-6 grid-cols-4 w-full">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : products.length > 0 ? (
                        products.map((item, index) => (
                            <ProductCard key={index} data={item} type={type} id={id} userId={item.seller} />
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
