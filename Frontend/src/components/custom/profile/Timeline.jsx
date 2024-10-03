import Card from "@/components/custom/Card";
import { CirclePlus } from "lucide-react";
import { useUser } from '@/state management/userInfo';

function Timeline({ userData, userId, id }) {
    const { type } = useUser();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold">
                    {type === "tourist" ? "Bookmarks" : "Itineraries"}
                </h1>
                <hr className="border-neutral-700 border w-full mt-1.5" />
                {type !== "tourist" && userId === id &&
                    <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                        <CirclePlus size={24} />
                    </button>
                }
            </div>
            <div>
                <div className="grid grid-cols-3 gap-6">
                    {type === "tourist" && userData?.bookmarks?.map((itinerary, index) => (<Card key={index} data={itinerary} />))}

                    {/* CHANGE THIS TO APPROPRIATE API CALL ONCE ITINERARIES ARE IMPLEMENTED */}
                    {type === "tourGuide" && userData?.itineraries?.map((itinerary, index) => (<Card key={index} data={itinerary} />))}
                </div>
                <div>
                    {(type === "tourist" && (userData?.bookmarks?.length === 0 || !userData?.bookmarks)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {"You have not bookmarked any itineraries yet."}
                        </p>
                    }
                    
                    {(type === "tourGuide" && (userData?.itineraries?.length === 0 || !userData?.itineraries)) &&
                        <p className="text-neutral-400 text-sm italic">
                            {userId !== id ? "No itineraries to show." : "You have not created any itineraries yet. Click the + button to get started!"}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Timeline;