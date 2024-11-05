function RatingReview({ data, totalRatings }) {
    // Helper function to calculate the percentage of each rating
    const getRatingPercentage = (count) => {
        console.log(count, totalRatings);
        return ((count / totalRatings) * 100).toFixed(1); // Rounded to 1 decimal place
    };

    return (
        <div className="mt-8 flex flex-col md:flex-row">
            {/* Ratings Breakdown */}
            <div className="w-1/3 pr-8">
                <h2 className="text-2xl font-semibold mb-4">Ratings</h2>

                {/* Ratings Summary */}
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center justify-between w-full gap-3">
                            <span className="text-sm w-[46px] shrink-0">{star} {star === 1 ? " star" : " stars"}</span>
                            {totalRatings > 0 ?
                                <div
                                    className="h-3 rounded-full w-full"
                                    style={{
                                        background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${getRatingPercentage(data?.rating?.[star] || 0)}%, #e5e5e5 ${getRatingPercentage(data?.rating?.[star] || 0)}%, #e5e5e5 100%)`,
                                    }}
                                >
                                </div>
                                :
                                <div className="h-3 rounded-full w-full bg-neutral-300"></div>
                            }
                            <span className="text-sm w-10 font-medium shrink-0">
                                {totalRatings > 0 ?
                                    getRatingPercentage(data?.rating?.[star] || 0)
                                    : 0
                                }
                                %
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="w-2/3 mt-0">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <div className="space-y-6">
                    {data.reviews?.map((review) => (
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
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RatingReview;