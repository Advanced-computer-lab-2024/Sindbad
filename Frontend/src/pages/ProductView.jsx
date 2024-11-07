import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import StarRating from "@/components/custom/StarRating";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { ShoppingCart } from "lucide-react";

import { getProductById } from "@/services/ProductApiHandler";
import RatingReview from "@/components/custom/RatingReview";
import { useUser } from "@/state management/userInfo";

function ProductView() {
	const { productId } = useParams();
	const [error, setError] = useState(false);
	const [product, setProduct] = useState(null);
	const [totalRatings, setTotalRatings] = useState(0);
	const { role, id } = useUser();

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

	useEffect(() => {
		if (productId) {
			getProduct(productId);
		}
	}, [productId]);

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
								{product.seller && product.seller !== null ? (
									<>
										<span>Sold by{" "}
											<a
												className="hover:underline cursor-pointer"
												href={`/app/profile/${product.seller?._id}`}
												rel="noreferrer"
											>
												{product.seller?.firstName}{" "}
												{product.seller?.lastName}
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
						<p className="text-lg font-semibold mb-1">
							{product.price} EGP
						</p>

						{/* Description */}
						<p className="text-sm">{product.description}</p>

						{(product.seller?._id === id || role === "admin" && product.seller === null) &&
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
						<Button>
							<p>
								Add to cart
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
			<RatingReview data={product} totalRatings={totalRatings} type="review" />
		</div>
	);
}

export default ProductView;
