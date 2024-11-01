import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GoogleMapRead from "@/components/custom/maps/GoogleMapRead";
import StarRating from "@/components/custom/StarRating";
import ImagePlaceholder from "@/components/custom/ImagePlaceholder";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { MapPin, CalendarDays, AlarmClock, ArrowRight } from "lucide-react";

import { getActivityById } from "@/services/ActivityApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";

function getRandomRating() {
	return (Math.round(Math.random() * 10) / 2).toFixed(1);
}

function getRandomReviews() {
	return Math.floor(Math.random() * 1000) + 1;
}

function handleActivityValues(activity) {
	if (!activity.rating) {
		activity.rating = getRandomRating();
	}
	if (!activity.reviews) {
		activity.reviews = getRandomReviews();
	}
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
		console.log("Location is a string");
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
	const [error, setError] = useState(false);

	const getActivity = async () => {
		let response = await getActivityById(activityId);

		if (response.error) {
			console.error(response.message);
			setError(true);
		} else {
			handleActivityValues(response);
			setActivity(response);
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

	if (!activity) {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">
						{error === true ?
							"Activity does not exist."
							:
							"Loading..."
						}
					</p>
				</div>
			</div>
		);
	}

	const fullStars = activity.rating;
	const emptyStar = 5 - fullStars;

	console.log(activity);

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
								href={`/app/profile/${creator?._id}`}
							>
								{creator?.username}
							</a>
						</p>

						{/*Star Section */}
						<div className="mt-1">
							<StarRating rating={activity.rating} size={20} />
						</div>
					</div>

					{/*description*/}
					<p className="text-sm">{activity.description}</p>

					{/*Tags*/}
					<div>
						<h2 className="text-lg font-semibold mb-1">
							Tagged As
						</h2>
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
						<h2 className="text-lg font-semibold mb-1">
							Location
						</h2>
						<div className="flex flex-col gap-2">
							<div className="bg-light h-[250px] rounded-md overflow-clip">
								<GoogleMapRead
									lat={activity.location.coordinates.lat}
									lng={activity.location.coordinates.lng}
								/>
							</div>
							<div className="flex items-start gap-1">
								<MapPin size={16} className="shrink-0" />
								<span className="text-sm">
									{activity.location.address}
								</span>
							</div>
						</div>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-1">
							Date & Time
						</h2>
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
								<CarouselItem className="h-[400px]"><ImagePlaceholder /></CarouselItem>
								<CarouselItem className="h-[400px]"><ImagePlaceholder /></CarouselItem>
								<CarouselItem className="h-[400px]"><ImagePlaceholder /></CarouselItem>
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>

					<div className="text-end">
						{typeof activity.price === "object" ? (
							<p className="text-3xl font-semibold ">
								{activity.price.min}
								<span className="text-xl font-medium">{" "}EGP</span>
								<span className=" p-2">-</span>
								{activity.price.max}
								<span className="text-xl font-medium">{" "}EGP</span>
							</p>
						) : (
							// If it's a single price (number)
							<p className="text-3xl font-semibold">
								{activity.price}
								<span className="text-xl font-medium">{" "}EGP</span>
							</p>
						)}

						{activity.discounts && activity.discounts > 0 &&
							<p className="text-sm">
								<span className="text-primary-950 font-semibold">
									{activity.discounts}%
								</span>
								{" "}discount available only on Sindbad
							</p>
						}

						<hr className="border-neutral-300 border w-full my-4" />
						<div className="">
							{activity.isBookingOpen ? (
								<div className="items-center flex flex-col gap-1">
									<Button>
										Book activity
										<ArrowRight className="inline-block ml-1" size={12} />
									</Button>
									{activity.headCount > 0 &&
										<p className="text-sm text-neutral-400">
											{activity.headCount} Sindbad users have already registerd!
										</p>
									}
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
		</div>
	);
}
export default Activity;
