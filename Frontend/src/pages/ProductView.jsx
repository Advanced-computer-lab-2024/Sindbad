import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { useParams } from 'react-router-dom';
import { getProductById } from "@/services/ProductApiHandler";
import { useState, useEffect } from "react";

function ProductView() {
    const { productId } = useParams();
    const [error, setError] = useState(false);
    const [productData, setProductData] = useState({});

    const getProductData = async (productId) => {
        const response = await getProductById(productId);

        if (response.error) {
            setError(true);
            console.error(response.message);
        } else {
            setError(false);
            setProductData(response);
        }
    };

    // Example data for the ratings distribution
    const totalReviews = 500;
    const ratingsDistribution = {
        5: 300, // 300 five-star reviews
        4: 100,
        3: 50,
        2: 30,
        1: 20,
    };

    // Helper function to calculate the percentage of each rating
    const getRatingPercentage = (count) => {
        return ((count / totalReviews) * 100).toFixed(1); // Rounded to 1 decimal place
    };

    useEffect(() => {
        if (productId) {
            getProductData(productId);
        }
    }, [productId]);

    return (
        <div className="py-8 px-24 max-w-[1200px] flex flex-col gap-9 mx-auto">
            {error === false ?
                <>
                    {/* Product Info */}
                    <div className="flex flex-row gap-8">
                        {/* Product Image */}
                        {productData.picture ? (
                            <div className="border w-1/2 rounded-md border-neutral-800">
                                <img
                                    src={productData.picture}
                                    alt={productData.name}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        ) : (
                            <div className="w-1/2 rounded-md h-96">
                                <ImagePlaceholder />
                            </div>
                        )}

                        {/* Product Details */}
                        <div className="w-1/2 p-6 flex flex-col justify-between">
                            <div>
                                {/* Product Title */}
                                <h1 className="text-2xl font-bold mb-4">{productData.name}</h1>

                                {/* Price */}
                                <p className="text-xl font-semibold mb-4">{productData.price} EGP</p>

                                {/* Description */}
                                <p className="mb-6">
                                    {productData.description}
                                </p>

                                {/* Seller */}
                                <div className="flex items-center mb-4">
                                    <span className="">Sold by:</span>
                                    <p className="ml-2 hover:underline">{productData.seller?.firstName} {productData.seller?.lastName}</p>
                                </div>

                                {/* Ratings */}
                                <div className="flex items-center mb-6">
                                    <p className="leading-[11px] font-medium">
                                        Rating: {productData.rating ? `${productData.rating} / 5` : "N/A"}
                                    </p>
                                    {/* <p className="ml-2 text-gray-600">(123 reviews)</p> */}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <button className="mt-auto bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Ratings and Reviews */}
                    <div className="mt-8 flex flex-col md:flex-row">
                        {/* Ratings Breakdown */}
                        <div className="w-1/3 pr-8">
                            <h2 className="text-2xl font-bold mb-4">Ratings</h2>

                            {/* Ratings Summary */}
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center">
                                        <span className="w-12">{star} star</span>
                                        <div className="flex-grow bg-neutral-200 rounded-lg h-3 mx-2">
                                            <div
                                                className="bg-yellow-400 h-3 rounded-lg"
                                                style={{
                                                    width: `${getRatingPercentage(ratingsDistribution[star])}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="ml-2">
                                            {getRatingPercentage(ratingsDistribution[star])}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="w-2/3 mt-0">
                            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                            <div className="space-y-6">
                                <div className="p-4 rounded-md shadow">
                                    <div className="flex items-center mb-2">
                                        <p className="font-semibold">User 1</p>
                                        <div className="flex items-center ml-2 text-yellow-400">
                                            <span>★★★★☆</span>
                                        </div>
                                    </div>
                                    <p className="">Great product! Highly recommend it.</p>
                                </div>

                                <div className="p-4 rounded-md shadow">
                                    <div className="flex items-center mb-2">
                                        <p className="font-semibold">User 2</p>
                                        <div className="flex items-center ml-2 text-yellow-400">
                                            <span>★★★☆☆</span>
                                        </div>
                                    </div>
                                    <p className="">
                                        Decent, but could have been better in some areas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="flex justify-center w-full">
                    <p className="text-neutral-400 text-sm italic">Product does not exist.</p>
                </div>
            }
        </div>
    );
}

export default ProductView;