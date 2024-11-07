import { useEffect, useState } from "react";

import StarRatingForm from "./StarRatingForm";
import Comment from "./Comment";
import Review from "./Review";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { useUser } from "@/state management/userInfo";

import { addProductRating, addProductReview } from "@/services/ProductApiHandler";
import { getTouristById } from "@/services/TouristApiHandler";

function RatingReview({ data, totalRatings, type, fetchData }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const { id } = useUser();

    // Helper function to calculate the percentage of each rating
    const getRatingPercentage = (count) => {
        return ((count / totalRatings) * 100).toFixed(1); // Rounded to 1 decimal place
    };

    const getTourist = async (touristId) => {
        const response = await getTouristById(touristId);
        if (response.error) {
            console.error(response.message);
        } else {
            setUser(response);
        }
    }

    useEffect(() => {
        getTourist(id);
    }, [id]);

    const handleSubmit = async () => {
        if (type === "review") {
            if (rating === 0) {
                setError("Please add a rating between 1 to 5 stars.");
                return;
            }
            
            const response = comment === ""
                ? await addProductRating(data._id, { rating: rating, userId: id })
                : await addProductReview(data._id, { rating: rating, review: comment, userId: id, username: user.username });
            if (response.error) {
                console.error(response.error);
            }
            else {
                setRating(0);
                setComment("");
                setError("");
                fetchData();
            }
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
                {type === "review" &&
                    <div>
                        <label className="text-base font-medium">
                            Overall rating
                            <div className="mt-1">
                                <StarRatingForm size={21} onRatingChange={setRating} />
                            </div>
                        </label>
                        {error && <p className="text-red-500 text-[13px] mt-1">{error}</p>}
                    </div>
                }
                <label className="text-base font-medium">
                    Write a {type}
                    <Textarea
                        placeholder="Type here..."
                        className="resize-none mt-1"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <Button className="w-max self-end" onClick={handleSubmit}>
                    Submit
                </Button>

                {type === "review" && data.reviews?.length > 0 ?
                    <div className="space-y-8">
                        {data.reviews?.map((review) => (
                            <div key={review.username}>
                                <Review review={review} />
                            </div>
                        ))}
                    </div>
                    : type === "comment" && data.comments?.length > 0 ?
                        <div className="space-y-8">
                            {data.comments?.map((comment) => (
                                <div key={comment.userId}>
                                    <Comment comment={comment} />
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