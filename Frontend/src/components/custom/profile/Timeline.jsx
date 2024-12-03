import GenericForm from "../genericForm/genericForm";
import CardContainer from "@/components/custom/cards/CardContainer";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";

import { CirclePlus } from "lucide-react";

import { useUser } from "@/state management/userInfo";
import { getActivityById } from "@/services/ActivityApiHandler";
import { getItineraryById } from "@/services/ItineraryApiHandler";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Timeline({ userData, profileId, id, profileRole, cardData, fetchCardData }) {
    const { role } = useUser();
    const navigate = useNavigate();
    const [bookmarkedActivities, setBookmarkedActivities] = useState([]);
    const [upcomingActivities, setUpcomingActivites] = useState([]);
    const [upcomingItineraries, setUpcomingItineraries] = useState([]);
    const [pastActivities, setPastActivities] = useState([]);
    const [pastItineraries, setPastItineraries] = useState([]);

    const rejectable = () => {
        return profileRole === "tourGuide" || profileRole === "seller" || profileRole === "advertiser";
    }
    const myProfile = () => {
        return profileId === id;
    }

    const getActivity = async (productID) => {
        const activity = await getActivityById(productID);
        return activity;
    };

    const getItinerary = async (productID) => {
        const itinerary = await getItineraryById(productID);
        return itinerary;
    };

    useEffect(() => {
        if (profileRole === "tourist" && userData?.bookmarks) {
            // Fetch all activities for the tourist user
            const fetchActivities = async () => {
                const activitiesData = await Promise.all(
                    userData?.bookmarks?.map((bookmark) =>
                        getActivity(bookmark.productID)
                    )
                );
                setBookmarkedActivities(activitiesData);
            };
            fetchActivities();
        }
    }, [profileRole, userData?.bookmarks]);

    const fetchData = async (type, filterCondition, setterFunction) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dataPromises = (userData?.bookedEvents?.[type] || []).map(
            async (item) => {
                const data =
                    type === "activities"
                        ? await getActivity(item.activityId)
                        : await getItinerary(item.itineraryId);

                if (data?.isInappropriate) return null;

                if (filterCondition(data)) return data;
                return null;
            }
        );

        const filteredData = (await Promise.all(dataPromises)).filter(Boolean);
        setterFunction(filteredData);
    };

    useEffect(() => {
        if (profileRole === "tourist") {
            // Fetch upcoming activities
            fetchData(
                "activities",
                (activity) => new Date(activity.dateTime) > new Date(),
                setUpcomingActivites
            );

            // Fetch past activities
            fetchData(
                "activities",
                (activity) => new Date(activity.dateTime) <= new Date(),
                setPastActivities
            );

            // Fetch upcoming itineraries
            fetchData(
                "itineraries",
                (itinerary) =>
                    itinerary?.availableDatesTimes?.some(
                        (dateEntry) => new Date(dateEntry.dateTime) > new Date()
                    ),
                setUpcomingItineraries
            );

            // Fetch past itineraries
            fetchData(
                "itineraries",
                (itinerary) =>
                    itinerary?.dateBooked && new Date(itinerary.dateBooked) < new Date(),
                setPastItineraries
            );
        }
    }, [profileRole, userData?.bookedEvents]);

    const getCardType = () => {
        if (profileRole === "tourGuide") {
            return "itinerary";
        }
        else if (profileRole === "seller" || profileRole === "admin") {
            return "product";
        }
        else if (profileRole === "tourismGovernor") {
            return "site";
        }
        else {
            return "activity";
        }
    }

    const filteredCardData = role === "admin" && profileRole === "tourGuide"
        ? cardData.filter((card) => card.isActive === true) // admins can see all tour guides' active itineraries
        : role === "admin" && profileRole === "advertiser"
            ? cardData // admins can see all advertisers' activities
            : profileRole === "tourGuide" && id !== profileId
                ? cardData.filter((card) => card.isActive === true && card.isInappropriate === false) // non-admins can only see active itineraries that are not inappropriate
                : profileRole === "advertiser" && id !== profileId
                    ? cardData.filter((card) => card.isInappropriate === false) // non-admins can only see activities that are not inappropriate
                    : profileRole === "seller" && id !== profileId
                        ? cardData.filter((card) => card.isArchived === false) // admins and non-admins can only see products that are not archived
                        : cardData; // otherwise, all cards are displayed

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold shrink-0">
                    {profileRole === "tourist"
                        ? "Bookmarks"
                        : profileRole === "seller" || profileRole === "admin"
                            ? "Products"
                            : profileRole === "advertiser"
                                ? "Activities"
                                : profileRole === "tourismGovernor"
                                    ? "Historical Places & Museums"
                                    : "Itineraries"}
                </h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
                {role !== "tourist" && myProfile() === true && (rejectable() === false || userData.isAccepted === true) &&
                    <button
                        className="shrink-0 mt-1.5 text-neutral-400 hover:text-neutral-600 transition-all"
                        onClick={() => navigate(`/app/create/${getCardType()}`)}>
                        <CirclePlus size={24} />
                    </button>
                }
            </div>
            <div>
                <CardContainer
                    cardList={
                        profileRole === "tourist" ? bookmarkedActivities : filteredCardData
                    }
                    cardType={
                        profileRole === "tourist"
                            ? "activity"
                            : profileRole === "tourGuide"
                                ? "itinerary"
                                : profileRole === "seller" || profileRole === "admin"
                                    ? "product"
                                    : profileRole === "advertiser"
                                        ? "activity"
                                        : "site"
                    }
                    fetchCardData={fetchCardData}
                />
                <div>
                    {profileRole === "tourist" &&
                        (userData?.bookmarks?.length === 0 || !userData?.bookmarks) && (
                            <p className="text-neutral-400 text-sm italic">
                                {"You have not bookmarked any events yet."}
                            </p>
                        )}

                    {profileRole === "tourGuide" && filteredCardData.length === 0 && (
                        <p className="text-neutral-400 text-sm italic">
                            {profileId !== id
                                ? "No itineraries to show."
                                : userData.isAccepted === null
                                    ? "Your account must be approved before you can add itineraries. It is currently being reviewed; please check back later."
                                    : userData.isAccepted === false
                                        ? "Your account has been rejected. Please contact the administrator for more information."
                                        : "You have not created any itineraries yet. Click the + button to get started!"}
                        </p>
                    )}

                    {(profileRole === "seller" || profileRole === "admin") &&
                        filteredCardData.length === 0 && (
                            <p className="text-neutral-400 text-sm italic">
                                {profileId !== id
                                    ? "No products to show."
                                    : userData.isAccepted === null
                                        ? "Your account must be approved before you can add products. It is currently being reviewed; please check back later."
                                        : userData.isAccepted === false
                                            ? "Your account has been rejected. Please contact the administrator for more information."
                                            : "You have not added any products yet. Click the + button to get started!"}
                            </p>
                        )}

                    {profileRole === "advertiser" && filteredCardData.length === 0 && (
                        <p className="text-neutral-400 text-sm italic">
                            {profileId !== id
                                ? "No activities to show."
                                : userData.isAccepted === null
                                    ? "Your account must be approved before you can add activities. It is currently being reviewed; please check back later."
                                    : userData.isAccepted === false
                                        ? "Your account has been rejected. Please contact the administrator for more information."
                                        : "You have not added any activities yet. Click the + button to get started!"}
                        </p>
                    )}

                    {profileRole === "tourismGovernor" &&
                        filteredCardData.length === 0 && (
                            <p className="text-neutral-400 text-sm italic">
                                {profileId !== id
                                    ? "No historical places or museums to show."
                                    : "You have not added any historical places or museums yet. Click the + button to get started!"}
                            </p>
                        )}
                </div>
            </div>

            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold shrink-0">
                    {profileRole === "tourist" ? "Upcoming Events" : ""}
                </h1>
                {profileRole === "tourist" ? (
                    <hr className="border-neutral-300 border w-full mt-1.5" />
                ) : null}
            </div>

            <div>
                <CardContainer
                    cardList={profileRole === "tourist" ? upcomingActivities : []}
                    cardType={"activity"}
                    fetchCardData={fetchCardData}
                />
            </div>
            <div>
                <CardContainer
                    cardList={profileRole === "tourist" ? upcomingItineraries : []}
                    cardType={"itinerary"}
                    fetchCardData={fetchCardData}
                />
            </div>

            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold shrink-0">
                    {profileRole === "tourist" ? "Event History" : ""}
                </h1>
                {profileRole === "tourist" ? (
                    <hr className="border-neutral-300 border w-full mt-1.5" />
                ) : null}
            </div>

            <div>
                <CardContainer
                    cardList={profileRole === "tourist" ? pastActivities : []}
                    cardType={"activity"}
                    fetchCardData={fetchCardData}
                />
            </div>
            <div>
                <CardContainer
                    cardList={profileRole === "tourist" ? pastItineraries : []}
                    cardType={"itinerary"}
                    fetchCardData={fetchCardData}
                />
            </div>
        </div>
    );
}

export default Timeline;
