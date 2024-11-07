import { useEffect, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import { getTouristById } from "@/services/TouristApiHandler";

function Comment({ comment }) {
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
        fetchTourist(comment.userId);
    }, [comment.userId]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <div className="h-11 w-11 rounded-full">
                    <ImagePlaceholder type="profile" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-semibold">{user?.username}</p>
                    <p className="text-sm">{comment.comment}</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;