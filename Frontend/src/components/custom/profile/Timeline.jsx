import Card from "@/components/custom/Card";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from 'react';
import { getMyActivities } from "@/services/ActivityApiHandler";

function Timeline({ userData, userId, id, userType }) {
    const [cardData, setCardData] = useState([]);

    const getCardData = async (userId) => {
        let response;
        if (userType === "advertiser" && userData?.createdActivities && userData?.createdActivities.length !== 0) {
            response = await getMyActivities(userId);
            if (response.error) {
                console.error(response.message);
            } else {
                setCardData(response);
            }
        }
    };

    useEffect(() => {
        if (userId) {
            getCardData(userId);
        }
    }, [userId]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold">
                    {userType === "tourist" ? "Bookmarks" : userType === "seller" ? "Products" : userType === "advertiser" ? "Activities" : "Itineraries"}
                </h1>
                <hr className="border-neutral-700 border w-full mt-1.5" />
                {userType !== "tourist" && userId === id &&
                    <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                        <CirclePlus size={24} />
                    </button>
                }
            </div>
            <div>
                <div className="grid grid-cols-3 gap-6">
                    {userType === "tourist" && userData?.bookmarks?.map((bookmark, index) => (<Card key={index} data={bookmark} />))}

                    {/* CHANGE THIS TO APPROPRIATE API CALL ONCE ITINERARIES ARE IMPLEMENTED */}
                    {userType === "tourGuide" && userData?.itineraries?.map((itinerary, index) => (<Card key={index} data={itinerary} />))}

                    {/* THIS TOO ONCE YOU FIGURE OUT HOW TO DEAL WITH IT */}
                    {userType === "seller" && userData?.products?.map((product, index) => (<Card key={index} data={product} />))}

                    {userType === "advertiser" && cardData?.map((activity, index) => (<Card key={index} data={activity} />))}
                </div>
                <div>
                    {(userType === "tourist" && (userData?.bookmarks?.length === 0 || !userData?.bookmarks)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {"You have not bookmarked any events yet."}
                        </p>
                    }

                    {(userType === "tourGuide" && (userData?.itineraries?.length === 0 || !userData?.itineraries)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {userId !== id ? "No itineraries to show." : "You have not created any itineraries yet. Click the + button to get started!"}
                        </p>
                    }

                    {(userType === "seller" && (userData?.products?.length === 0 || !userData?.products)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {userId !== id ? "No products to show." : "You have not added any products yet. Click the + button to get started!"}
                        </p>
                    }

                    {(userType === "advertiser" && (userData?.createdActivities?.length === 0 || !userData?.createdActivities)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {userId !== id ? "No activities to show." : "You have not created any activities yet. Click the + button to get started!"}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Timeline;