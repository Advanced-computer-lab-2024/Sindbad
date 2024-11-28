import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import StarRating from "@/components/custom/StarRating";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

import { ShoppingCart } from "lucide-react";

import { getProductById, buyProduct } from "@/services/ProductApiHandler";
import RatingReview from "@/components/custom/RatingReview";
import { useUser, useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "@/services/TouristApiHandler";

function ProductView() {
	const { productId } = useParams();
	const [error, setError] = useState(false);
	const [product, setProduct] = useState(null);
	const [totalRatings, setTotalRatings] = useState(0);
	const { role, id } = useUser();
	const currency = useCurrency();
	const [convertedPrice, setConvertedPrice] = useState(null);
	const { toast } = useToast();
	const navigate = useNavigate();

	const getProduct = async (productId) => {
		const response = await getProductById(productId);

		if (response.error) {
			setError(true);
			console.error(response.message);
		} else {
			setError(false);
			setProduct(response);
			setTotalRatings(
				Object.values(response.rating).reduce((acc, cur) => acc + cur, 0)
			);
		}
	};

	const handleBuyProduct = async () => {
		const response = await addItemToCart(id, productId, 1);

		if (response.error) {
			console.error(response.message);
		} else {
			toast({
				description: "Product purchased successfully.",
			});
		}
	}

	useEffect(() => {
		if (productId) {
			getProduct(productId);
		}
	}, [productId]);

	useEffect(() => {
		const fetchConversionRate = async () => {
			try {
				const convert = await Convert().from("USD").fetch();

				if (product.price) {
					const rate = await convert.amount(product.price).to(currency);
					setConvertedPrice(rate);
				}
			} catch (error) {
				console.error("Error fetching conversion rate:", error);
				setConvertedPrice(null); // Reset on error
			}
		};

		if (product) {
			fetchConversionRate();
		}
	}, [currency, product]);

	if (!product) {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">
						{error === true ? "Product does not exist." : "Loading..."}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="py-8 px-24 max-w-[1200px] mx-auto">
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">{product.name}</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			{/* Product Info */}
			<div className="flex justify-between gap-32 py-6">
				<div className="flex flex-col w-full justify-between">
					<div className="flex flex-col gap-6 w-full">
						<div>
							<div className="flex items-center text-base font-medium">
								{product.creatorId && product.creatorId !== null ? (
									<>
										<span>Sold by{" "}
											<a
												className="hover:underline cursor-pointer"
												onClick={() => navigate(`/app/profile/${product.creatorId?._id}`)}
											>
												{product.creatorId?.firstName}{" "}
												{product.creatorId?.lastName}
											</a>
										</span>
									</>
								) : (
									<span>Sold by Sindbad</span>
								)}
							</div>

							{/*Star Section */}
							<div className="mt-1 flex gap-1 items-end">
								<StarRating rating={product.averageRating} size={20} />
								<p className="text-xs text-neutral-400">{"(" + totalRatings + " ratings)"}</p>
							</div>
						</div>

						{/* Price */}
						{convertedPrice &&
							<p className="text-lg font-semibold mb-1">
								{convertedPrice.toFixed(2)} {currency}
							</p>
						}

						{/* Description */}
						<p className="text-sm">{product.description}</p>

						{(product.creatorId?._id === id || (role === "admin" && product.creatorId === null)) &&
							<div className="flex flex-col gap-2">
								<h2 className="text-base font-semibold">
									Quantity: <span className="text-sm font-normal">{product.quantity}</span>
								</h2>
								<h2 className="text-base font-semibold">
									Sales: <span className="text-sm font-normal">{product.numSales}</span>
								</h2>
							</div>
						}
					</div>

					<div>
						<Button onClick={() => handleBuyProduct()}>
							<p>
								Add Product to Cart
							</p>
							<ShoppingCart size={24} className="shrink-0" />
						</Button>
					</div>
				</div>
				{/* Product Image */}
				<div className="h-[400px] w-[400px] shrink-0">
					<Carousel>
						<CarouselContent>
							{product.imageUris.length !== 0 ? (
								product.imageUris.map((image, index) => (
									<CarouselItem key={index} className="h-[400px] w-[400px]">
										<img
											src={image}
											alt={`Image ${index + 1}`}
											className="h-full w-full object-cover rounded-md border border-neutral-300"
										/>
									</CarouselItem>
								))
							) : (
								<CarouselItem className="h-[400px]">
									<ImagePlaceholder />
								</CarouselItem>
							)}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
			<hr className="border-neutral-300 border w-full mt-1.5" />
			<RatingReview data={product} totalRatings={totalRatings} fetchData={() => getProduct(productId)} />
		</div>
	);
}

export default ProductView;
