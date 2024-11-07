import StarRatingForm from "./StarRatingForm";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import Comment from "./Comment";

import { getTouristById, getTouristByUsername } from "@/services/TouristApiHandler";
import Review from "./Review";
import { addProductRating, addProductReview } from "@/services/ProductApiHandler";

function RatingReview({ data, totalRatings, type }) {
    // Helper function to calculate the percentage of each rating
    const getRatingPercentage = (count) => {
        return ((count / totalRatings) * 100).toFixed(1); // Rounded to 1 decimal place
    };

    const fetchTourist = async (identifier) => {
        const response = type === "review" ?
            await getTouristByUsername(identifier)
            : await getTouristById(identifier);
        if (response.error) {
            console.error(response.message);
        } else {
            return response.data;
        }
    }

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

            {/* Reviews/comments Section */}
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
                            <Review key={review.userId} review={review} />
                        ))}
                    </div>
                    : type === "comment" && data.comments?.length > 0 ?
                        <div className="space-y-8">
                            {data.comments?.map((comment) => (
                                <Comment key={comment.userId} comment={comment} />
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