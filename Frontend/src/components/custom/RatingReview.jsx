import { useEffect, useState } from "react";

import StarRatingForm from "./StarRatingForm";
import Review from "./Review";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

import { useUser } from "@/state management/userInfo";

import { addProductRating, addProductReview, productSalesDetails } from "@/services/ProductApiHandler";

function RatingReview({ data, totalRatings, fetchData }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [myReview, setMyReview] = useState(null);
    const [rated, setRated] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [error, setError] = useState("");

    console.log("myReview: ",myReview);
    console.log("rated: ",rated);
    console.log("purchased: ",purchased);

    const { id, role } = useUser();
    const { toast } = useToast();

    // Helper function to calculate the percentage of each rating
    const getRatingPercentage = (count) => {
        return ((count / totalRatings) * 100).toFixed(1); // Rounded to 1 decimal place
    };

    useEffect(() => {
        if (data.reviews) {
            const review = data.reviews.find((review) => review.userId === id);
            if (review) {
                setMyReview(review);
            }
        }
    }, [id, data.reviews]);

    useEffect(() => {
        if (data.userRatings) {
            setRated(data.userRatings.includes(id));
        }
    }, [id, data.userRatings]);

    const getPurchased = async () => {
        const response = await productSalesDetails(data._id);
        if (response.error) {
            console.error(response.error);
        } else {
            const sales = response.productSales;
            const hasPurchased = sales.some(sale => sale.buyerId === id && sale.itemId === data._id);
            setPurchased(hasPurchased);
        }
    }

    useEffect(() => {
        getPurchased();
    }, [data]);

    const handleSubmit = async () => {
        if (rating === 0) {
            setError("Please add a rating between 1 to 5 stars.");
            return;
        }

        const response = comment === ""
            ? await addProductRating(data._id, { rating: rating, userId: id })
            : await addProductReview(data._id, { rating: rating, comment: comment, userId: id });
        if (response.error) {
            console.error(response.error);
            toast({ description: "An error occurred, please try again later" });
        }
        else {
            setRating(0);
            setComment("");
            setError("");
            fetchData();
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

            {/* Reviews Section */}
            <div className="w-2/3 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">
                    Customer Reviews
                </h2>
                {role === "tourist" && myReview === null && purchased && !rated &&
                    <>
                        <div>
                            <label className="text-base font-medium">
                                Overall rating
                                <div className="mt-1">
                                    <StarRatingForm size={21} onRatingChange={setRating} rating={rating} />
                                </div>
                            </label>
                            {error && <p className="text-red-500 text-[13px] mt-1">{error}</p>}
                        </div>

                        <label className="text-base font-medium">
                            Write a review
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
                    </>
                }

                {data.reviews?.length > 0 ?
                    <div className="flex flex-col-reverse gap-7">
                        {data.reviews?.map((review) => (
                            <div key={review.username}>
                                <Review review={review} />
                            </div>
                        ))}
                    </div>
                    :
                    <p className="text-neutral-400 text-sm italic">
                        No reviews yet.
                    </p>
                }
            </div>
        </div>
    );
}

export default RatingReview;