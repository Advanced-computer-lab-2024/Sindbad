import { useEffect, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import StarRating from "./StarRating";
import { getTouristById } from "@/services/TouristApiHandler";

function Review({ review }) {
    const [user, setUser] = useState({});
    const fetchTourist = async (touristId) => {
        const response = await getTouristById(touristId);
        if (response.error) {
            console.error(response.message);
        } else {
            setUser(response);
        }
    }

    useEffect(() => {
        fetchTourist(review.userId);
    }, [review.userId]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <div className="h-11 w-11 rounded-full">
                    {
                        user?.profileImageUri ?
                            <img
                                src={user.profileImageUri}
                                alt="profile"
                                className="rounded-full h-full w-full object-cover"
                            />
                            :
                            <ImagePlaceholder type="profile" />
                    }
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-semibold">{user?.username}</p>
                    <StarRating rating={review.rating} size={16} />
                    <p className="text-sm">{review.comment}</p>
                </div>
            </div>
        </div>
    );
}

export default Review;