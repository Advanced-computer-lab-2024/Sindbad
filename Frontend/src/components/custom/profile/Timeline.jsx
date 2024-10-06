import Card from "@/components/custom/Card";
import ProductCard from "@/components/custom/ProductCard";
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
import TagManagement from "../admin/TagManagement";

function Timeline({ userData, userId, id, userType, cardData }) {
    const { type } = useUser();
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold shrink-0">
                    {userType === "tourist" ? "Bookmarks"
                        : userType === "seller" ? "Products"
                            : userType === "advertiser" ? "Activities"
                                : userType === "tourismGovernor" ? "Historical Places & Museums"
                                    : "Itineraries"}
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
                <div className={`grid gap-6 ${userType === "tourismGovernor" ? "grid-cols-5" : "grid-cols-3"}`}>
                    {/* hook up to API in later sprint*/}
                    {userType === "tourist" && userData?.bookmarks?.map((bookmark, index) => (<Card key={index} data={bookmark} id={id} userId={userId} type={type} />))}

                    {userType === "tourGuide" && cardData.length !== 0 && cardData.map((itinerary, index) => (<Card key={index} data={itinerary} id={id} userId={userId} type={type} />))}

                    {userType === "seller" && cardData?.map((product, index) => (<ProductCard key={index} data={product} id={id} userId={userId} type={type} />))}

                    {userType === "advertiser" && cardData?.map((activity, index) => (<Card key={index} data={activity} id={id} userId={userId} type={type} />))}

                    {userType === "tourismGovernor" && cardData?.map((site, index) => (<Card key={index} data={site} id={id} userId={userId} type={type} />))}
                    
                </div>
                <div>
                    {(userType === "tourist" && (userData?.bookmarks?.length === 0 || !userData?.bookmarks)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {"You have not bookmarked any events yet."}
                        </p>
                    }

                    {(userType === "tourGuide" && cardData.length === 0) &&
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

                    {(userType === "tourismGovernor" && (userData?.createdHistoricalPlaces?.length === 0 || !userData?.createdHistoricalPlaces)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {userId !== id ? "No historical places or museums to show." : "You have not added any historical places or museums yet. Click the + button to get started!"}
                        </p>
                    }
                </div>
                <div>
                    {userType === "tourismGovernor" && userId === id && <TagManagement />}
                </div>
            </div>
        </div>
    );
}

export default Timeline;