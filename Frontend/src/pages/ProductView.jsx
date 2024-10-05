import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { useParams } from 'react-router-dom';

function ProductView() {
    const { userId } = useParams();
    
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

    return (
        <div className="py-8 px-24 max-w-[1200px] flex flex-col gap-9 mx-auto">
            {/* Product Info */}
            <div className="flex flex-row gap-8">
                {/* Product Image */}
                <div className="w-1/2 rounded-md">
                    <ImagePlaceholder />
                </div>

                {/* Product Details */}
                <div className="w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        {/* Product Title */}
                        <h1 className="text-2xl font-bold mb-4">Product Name</h1>

                        {/* Price */}
                        <p className="text-xl font-semibold mb-4">$99.99</p>

                        {/* Description */}
                        <p className="mb-6">
                            This is a sample description of the product. It provides an
                            overview of the key features and benefits of the product.
                        </p>

                        {/* Seller */}
                        <div className="flex items-center mb-4">
                            <span className="">Sold by:</span>
                            <p className="ml-2 hover:underline">Seller Name</p>
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center mb-6">
                            <div className="flex items-center text-yellow-400">
                                <span>★★★★☆</span>
                            </div>
                            <p className="ml-2 text-gray-600">(123 reviews)</p>
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
        </div>
    );
}

export default ProductView;