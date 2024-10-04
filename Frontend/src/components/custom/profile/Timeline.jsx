import Card from "@/components/custom/Card";
import { CirclePlus } from "lucide-react";
import { useUser } from '@/state management/userInfo';
import { useEffect, useState } from 'react';
import { getMyActivities } from "@/services/ActivityApiHandler";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GenericForm from "../genericForm";

function Timeline({ userData, userId, id }) {
    const { type } = useUser();
    const [cardData, setCardData] = useState([]);

    const getCardData = async (userId) => {
        let response;
        if (type === "advertiser")
            response = await getMyActivities(userId);

        if (response.error) {
            console.error(response.message);
        } else {
            setCardData(response);
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
                    {type === "tourist" ? "Bookmarks" : type === "seller" ? "Products" : type === "advertiser" ? "Activities" : "Itineraries"}
                </h1>
                <hr className="border-neutral-700 border w-full mt-1.5" />
                {type !== "tourist" && userId === id &&
                <Dialog>
                    <DialogTrigger>
                    <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                        <CirclePlus size={24} />
                    </button>
                    </DialogTrigger>
                    <DialogContent className="overflow-y-scroll max-h-[50%]">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <GenericForm type={type === "seller" ? "product" : type === "advertiser" ? "activity" : type === "tourGuide" ? "itinerary" : "site"} id={id} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                }
            </div>
            <div>
                <div className="grid grid-cols-3 gap-6">
                    {type === "tourist" && userData?.bookmarks?.map((bookmark, index) => (<Card key={index} data={bookmark} />))}

                    {/* CHANGE THIS TO APPROPRIATE API CALL ONCE ITINERARIES ARE IMPLEMENTED */}
                    {type === "tourGuide" && userData?.itineraries?.map((itinerary, index) => (<Card key={index} data={itinerary} />))}

                    {/* THIS TOO ONCE YOU FIGURE OUT HOW TO DEAL WITH IT */}
                    {type === "seller" && userData?.products?.map((product, index) => (<Card key={index} data={product} />))}

                    {type === "advertiser" && cardData?.map((activity, index) => (<Card key={index} data={activity} />))}
                </div>
                <div>
                    {(type === "tourist" && (userData?.bookmarks?.length === 0 || !userData?.bookmarks)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {"You have not bookmarked any events yet."}
                        </p>
                    }

                    {(type === "tourGuide" && (userData?.itineraries?.length === 0 || !userData?.itineraries)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {userId !== id ? "No itineraries to show." : "You have not created any itineraries yet. Click the + button to get started!"}
                        </p>
                    }

                    {(type === "seller" && (userData?.products?.length === 0 || !userData?.products)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {userId !== id ? "No products to show." : "You have not added any products yet. Click the + button to get started!"}
                        </p>
                    }

                    {(type === "advertiser" && (userData?.createdActivities?.length === 0 || !userData?.createdActivities)) &&
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