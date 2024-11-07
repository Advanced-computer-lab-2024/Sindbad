import ImagePlaceholder from "./ImagePlaceholder";
import StarRating from "./StarRating";
import StarRatingForm from "./StarRatingForm";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function RatingReview({ data, totalRatings, type }) {
    // Helper function to calculate the percentage of each rating
    const getRatingPercentage = (count) => {
        return ((count / totalRatings) * 100).toFixed(1); // Rounded to 1 decimal place
    };

    return (
        <div className="mt-8 flex gap-16">
            {/* Ratings Breakdown */}
            <div className="w-1/3 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">Ratings</h2>
                {/* Ratings Summary */}
                <p className="text-sm text-neutral-600">{totalRatings + " global ratings"}</p>
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
            <div className="w-2/3 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">
                    {type === "review" ? "Customer Reviews" : "Comments"}
                </h2>
                {type === "review" && <StarRatingForm size={21} />}
                <Textarea placeholder="Type here..." className="resize-none" />
                <Button className="w-max self-end">
                    Submit
                </Button>
                {type === "review" && data.reviews?.length > 0 ?
                    <div className="space-y-8">
                        {data.reviews?.map((review) => (
                            <div key={review.username} className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <div className="h-11 w-11 rounded-full">
                                        <ImagePlaceholder type="profile" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">{review.username}</p>
                                        <StarRating rating={review.rating} size={16} />
                                        <p className="text-sm">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    : type === "comment" && data.comments?.length > 0 ?
                        <div className="space-y-8">
                            {data.comments?.map((comment) => (
                                <div key={comment.userId} className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <div className="h-11 w-11 rounded-full">
                                            <ImagePlaceholder type="profile" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold">{comment.userId}</p>
                                            <p className="text-sm">{comment.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <p className="text-neutral-400 text-sm italic">
                            No {type}s yet.
                        </p>
                }
            </div>
        </div>
    );
}

export default RatingReview;