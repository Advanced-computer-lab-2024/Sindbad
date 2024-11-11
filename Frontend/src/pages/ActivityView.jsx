import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GoogleMapRead from "@/components/custom/maps/GoogleMapRead";
import StarRating from "@/components/custom/StarRating";
import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import RatingComment from "@/components/custom/RatingComment";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { MapPin, CalendarDays, AlarmClock, ArrowRight } from "lucide-react";

import {
    getActivityById,
    bookActivity,
    addActivityComment,
    addActivityRating,
    cancelBooking,
} from "@/services/ActivityApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";

import { useUser, useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";

import { useNavigate } from "react-router-dom";

function handleActivityValues(activity) {
    if (!activity.description) {
        activity.description =
            "With the history going back to 420 B.C., this tour includes sights throughout history. From the local alley drug dealer to the Queen's castle";
    }

    if (!activity.tags) {
        activity.tags = [{ name: "N/A" }];
    }

    if (!activity.category) {
        activity.category = { name: "N/A" };
    }

    if (typeof activity.location === "string") {
        activity.location = {
            address: activity.location,
            coordinates: { lat: 0, lng: 0 },
        };
    }
}

function Activity() {
    const { activityId } = useParams();
    const [activity, setActivity] = useState(null);
    const [creator, setCreator] = useState(null);
    const [totalRatings, setTotalRatings] = useState(0);
    const [error, setError] = useState(false);
    const { id } = useUser();
    const { toast } = useToast();
    const currency = useCurrency();
    const [convertedPrice, setConvertedPrice] = useState(null);
    const navigate = useNavigate();

    const getActivity = async () => {
        let response = await getActivityById(activityId);

        if (response.error) {
            console.error(response.message);
            setError(true);
        } else {
            handleActivityValues(response);
            setActivity(response);
            setTotalRatings(
                Object.values(response.rating).reduce((acc, cur) => acc + cur, 0)
            );
            setError(false);
        }
    };

    const getCreator = async () => {
        let response = await getAdvertiser(activity.creatorId);

        if (response.error) {
            console.error(response.message);
        } else {
            setCreator(response);
        }
    };

    useEffect(() => {
        getActivity();
    }, []);

    useEffect(() => {
        if (activity) {
            getCreator();
        }
    }, [activity]);

    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const convert = await Convert().from("USD").fetch();

                if (activity.price && activity.price.min && activity.price.max) {
                    const rateMin = await convert.amount(activity.price.min).to(currency);
                    const rateMax = await convert.amount(activity.price.max).to(currency);
                    setConvertedPrice({ min: rateMin, max: rateMax });
                }
            } catch (error) {
                console.error("Error fetching conversion rate:", error);
                setConvertedPrice(null); // Reset on error
            }
        };

        if (activity) {
            fetchConversionRate();
        }
    }, [currency, activity]);

    if (!activity) {
        return (
            <div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
                <div className="flex justify-center w-full">
                    <p className="text-neutral-400 text-sm italic">
                        {error === true ? "Activity does not exist." : "Loading..."}
                    </p>
                </div>
            </div>
        );
    }

    const handleBooking = async () => {
        const response = await bookActivity(activityId, id);
        if (response.error) {
            console.error(response.error);
            toast({ description: "An error occurred, please try again later" });
        } else {
            toast({ description: "Successfully booked activity" });
        }
    };

    const handleCancelBooking = async () => {
        const response = await cancelBooking(activityId, id);
        if (response.error) {
            console.error(response.error);
            toast({ description: "An error occurred, please try again later" });
        } else {
            toast({ description: "Successfully cancelled booking" });
        }
    };

    return (
        <div className="py-8 px-24 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold shrink-0">{activity.name}</h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            <div className="flex justify-between gap-32 py-6">
                <div className="flex flex-col gap-6 w-full">
                    <div>
                        <p className="text-base font-medium">
                            Offered by{" "}
                            <a
                                className="hover:underline cursor-pointer"
                                onClick={() => navigate(`/app/profile/${creator?._id}`)}
                            >
                                {creator?.username}
                            </a>
                        </p>

                        {/*Star Section */}
                        <div className="mt-1">
                            <StarRating rating={activity.averageRating} size={20} />
                        </div>
                    </div>

                    {/*description*/}
                    <p className="text-sm">{activity.description}</p>

                    {/*Tags*/}
                    <div>
                        <h2 className="text-lg font-semibold mb-1">Tagged As</h2>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {activity.tags.map((tag) => (
                                <div
                                    key={tag._id}
                                    className="flex gap-1 text-xs text-center items-center bg-gradient-to-br from-primary-700 to-primary-900 px-3 py-1.5 rounded-full"
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-1">Location</h2>
                        <div className="flex flex-col gap-2">
                            <div className="bg-light h-[250px] rounded-md overflow-clip">
                                <GoogleMapRead
                                    lat={activity.location.coordinates.lat}
                                    lng={activity.location.coordinates.lng}
                                />
                            </div>
                            <div className="flex items-start gap-1">
                                <MapPin size={16} className="shrink-0" />
                                <span className="text-sm">{activity.location.address}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-1">Date & Time</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-1">
                                <CalendarDays size={16} className="shrink-0" />
                                <span className="text-sm">
                                    {new Date(activity.dateTime).toDateString()}
                                </span>
                            </div>
                            <div className="flex items-start gap-1">
                                <AlarmClock size={16} className="shrink-0" />
                                <span className="text-sm">
                                    {new Date(activity.dateTime).toTimeString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/*right section*/}
                <div className="flex flex-col gap-6">
                    <div className="h-[400px] w-[400px] shrink-0">
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem className="h-[400px]">
                                    <ImagePlaceholder />
                                </CarouselItem>
                                <CarouselItem className="h-[400px]">
                                    <ImagePlaceholder />
                                </CarouselItem>
                                <CarouselItem className="h-[400px]">
                                    <ImagePlaceholder />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>

                    <div className="text-end">
                        {typeof activity.price === "object" ? (
                            <p className="text-3xl font-semibold ">
                                {convertedPrice?.min ? (convertedPrice.min).toFixed(2) : activity.price.min}
                                <span className="text-xl font-medium"> {currency}</span>
                                <span className=" p-2">-</span>
                                {convertedPrice?.max ? (convertedPrice?.max).toFixed(2) : activity.price.max}
                                <span className="text-xl font-medium"> {currency}</span>
                            </p>
                        ) : (
                            // If it's a single price (number)
                            <p className="text-3xl font-semibold">
                                {(activity.price).toFixed(2)}
                                <span className="text-xl font-medium"> {currency}</span>
                            </p>
                        )}

                        {activity.discounts > 0 && (
                            <p className="text-sm">
                                <span className="text-primary-950 font-semibold">
                                    {activity.discounts}%
                                </span>{" "}
                                discount available only on Sindbad
                            </p>
                        )}

                        <hr className="border-neutral-300 border w-full my-4" />
                        <div className="">
                            {activity.isBookingOpen ? (
                                <div className="items-center flex flex-col gap-1">
                                    <div className="flex gap-2">
                                        <Button onClick={handleBooking}>
                                            Book activity
                                            <ArrowRight className="inline-block ml-1" size={12} />
                                        </Button>
                                        {/* Cancel Booking Button */}
                                        <Button variant="outline" onClick={handleCancelBooking}>
                                            Cancel booking
                                        </Button>
                                    </div>
                                    {activity.headCount > 0 && (
                                        <p className="text-sm text-neutral-400">
                                            {activity.headCount} Sindbad users have already registerd!
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-neutral-400 text-center text-sm italic">
                                    Bookings are closed
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-neutral-300 border w-full mt-1.5" />
            <RatingComment
                data={activity}
                totalRatings={totalRatings}
                fetchData={getActivity}
                addComment={addActivityComment}
                addRating={addActivityRating}
                type="activity"
            />
        </div>
    );
}
export default Activity;
