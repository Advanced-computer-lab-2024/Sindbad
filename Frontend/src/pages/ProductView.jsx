import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import StarRating from "@/components/custom/StarRating";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { ShoppingCart } from "lucide-react";

import { getProductById } from "@/services/ProductApiHandler";

function ProductView() {
	const { productId } = useParams();
	const [error, setError] = useState(false);
	const [product, setProduct] = useState(null);
	const [totalRatings, setTotalRatings] = useState(0);

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

	// Helper function to calculate the percentage of each rating
	const getRatingPercentage = (count) => {
		return ((count / totalRatings) * 100).toFixed(1); // Rounded to 1 decimal place
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
						<div className="mt-1">
							<StarRating rating={product.averageRating} size={20} />
						</div>
					</div>

					{/* Price */}
					<p className="text-xl font-semibold mb-4">
						{product.price} EGP
					</p>

					{/* Description */}
					<p className="mb-6">{product.description}</p>

					<Button>
						<p>
							Add to Cart
						</p>
						<ShoppingCart size={24} className="shrink-0" />
					</Button>
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

			{/* Ratings and Reviews */}
			<div className="mt-8 flex flex-col md:flex-row">
				{/* Ratings Breakdown */}
				<div className="w-1/3 pr-8">
					<h2 className="text-2xl font-bold mb-4">Ratings</h2>

					{/* Ratings Summary */}
					<div className="space-y-2">
						{[5, 4, 3, 2, 1, 0].map((star) => (
							<div key={star} className="flex items-center">
								<span className="w-12">{star} star</span>
								<div className="flex-grow bg-neutral-200 rounded-lg h-3 mx-2">
									<div
										className="bg-yellow-400 h-3 rounded-lg"
										style={{
											width: `${getRatingPercentage(
												product?.averageRating?.[star] || 0
											)}%`,
										}}
									></div>
								</div>
								<span className="ml-2">
									{getRatingPercentage(
										product?.averageRating?.[star] || 0
									)}
									%
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Reviews Section */}
				<div className="w-2/3 mt-0">
					<h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
					<div className="space-y-6">
						{product.reviews?.map((review) => (
							<div key={review._id} className="p-4 rounded-md shadow">
								<div className="flex items-center mb-2">
									<p className="font-semibold">{review.username}</p>
									<div className="flex items-center ml-2 text-yellow-400">
										<span>
											{"★".repeat(review.rating)}
											{"☆".repeat(5 - review.rating)}
										</span>
									</div>
								</div>
								<p className="">{review.comment}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductView;
