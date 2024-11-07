import { useEffect, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import StarRating from "./StarRating";
import { getTouristByUsername } from "@/services/TouristApiHandler";

function Review({ key, review }) {
    const [user, setUser] = useState({});
    const fetchTourist = async (username) => {
        const response = await getTouristByUsername(username);
        if (response.error) {
            console.error(response.message);
        } else {
            setUser(response);
        }
    }

    useEffect(() => {
        fetchTourist(review.username);
    }, [review.username]);

    return (
        <div key={key} className="flex flex-col gap-2">
            <div className="flex gap-2">
                <div className="h-11 w-11 rounded-full">
                    <ImagePlaceholder type="profile" />
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