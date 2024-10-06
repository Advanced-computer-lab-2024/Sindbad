import { Star, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getActivityById } from "@/services/ActivityApiHandler";
import { useParams } from "react-router-dom";
import GoogleMapRead from "@/components/custom/maps/GoogleMapRead";

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

	if (!activity.location || typeof activity.location === "object") {
		activity.location = { address: "N/A", coordinates: { lat: 0, lng: 0 } }; 
	} else if (typeof activity.location === "string") {
		activity.location = {
			address: activity.location,
			coordinates: { lat: 0, lng: 0 },
		};
	}

	if (!activity.location.address) {
		activity.location.address = "N/A";
	}

	if (!activity.location.coordinates) {
		activity.location.coordinates = { lat: 0, lng: 0 };
	}
}

function Activity() {
	const { activityId } = useParams();
	const [activity, setActivity] = useState(null);

	const getActivity = async () => {
		let response = await getActivityById(activityId);
		console.log(response);

		if (response.error) {
			console.error(response.message);
		} else {
			handleActivityValues(response);
			setActivity(response);
		}
	};

	useEffect(() => {
		getActivity();
	}, []);

	if (!activity) {
		return <div>Loading...</div>;
	}

	const fullStars = activity.rating;
	const emptyStar = 5 - fullStars;

	return (
		<div className="min-h-screen flex justify-center items-center bg-primary-950">
			<div className="w-full max-w-7xl px-8 py-8 bg-primary-900 shadow-lg rounded-md">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
					<div>
						{/*Title Section*/}
						<div className="my-4">
							<h1 className="text-4xl font-bol">{activity.name}</h1>
							<p className="text-light text-lg">{activity.category.name}</p>

							{/*Star Section */}
							<div className=" relative flex gap-4">
								<div className=" flex">
									{Array.from({ length: fullStars }, (_, index) => (
										<Star
											key={index}
											className=" fill-secondary"
											strokeWidth={0}
										/>
									))}

									{Array.from({ length: emptyStar }, (_, index) => (
										<Star
											key={fullStars + index}
											className="fill-dark"
											strokeWidth={0}
										/>
									))}
								</div>
								<p className="text-light">
									{activity.rating}/5 ({activity.reviews})
								</p>
							</div>
							<div className="border w-full my-4"></div>
						</div>
						{/*description*/}
						<div className="text-light">
							<p>{activity.description}</p>
						</div>
						{/*Tags*/}
						<div className="my-6">
							<div className="flex flex-wrap gap-2">
								{activity.tags.map((tag) => (
									<div
										key={tag._id}
										className="px-3 py-1 bg-primary-950 rounded-full border cursor-default text-light"
									>
										{tag.name}
									</div>
								))}
							</div>
						</div>
					</div>

					{/*right section*/}
					<div className="grid grid-cols-2 col-span-2 gap-1 bg-primary-700 rounded-md h-96 p-6">
						<div className=" m-2">
							<div className="bg-light h-2/3 rounded-lg m-2">
								<GoogleMapRead
									lat={activity.location.coordinates.lat}
									lng={activity.location.coordinates.lng}
								/>
							</div>
							<div className="flex flex-row my-4">
								<MapPin className=" w-6 h-6 mx-2 fill-primary-900 text-light stroke-1" />
								<span className="text-lg font-light">
									{activity.location.address}
								</span>
							</div>
							<div className="flex flex-row my-4">
								<CalendarDays className=" w-6 h-6 mx-2 fill-primary-900 text-light stroke-1" />
								<span className="text-lg font-light">
									{" "}
									{new Date(activity.dateTime).toLocaleString()}
								</span>
							</div>
						</div>

						<div className=" m-4 text-end">
							{typeof activity.price === "object" ? (
								<p className="text-3xl font-semibold ">
									{activity.price.min}
									<span className="text-xl font-medium p-2">L.E.</span>
									<span className=" p-2">-</span>
									{activity.price.max}
									<span className="text-xl font-medium p-2">L.E.</span>
								</p>
							) : (
								// If it's a single price (number)
								<p className="text-3xl font-semibold">
									~{activity.price}
									<span className="text-xl font-medium p-2">L.E.</span>
								</p>
							)}

							<p className="text-md">
								<span className="text-secondary p-1 font-semibold">
									{activity.discounts}%
								</span>
								discount available by Sindbad
							</p>

							<div className="border w-full m-4"></div>
							<div className="h-full">
								{activity.isBookingOpen ? (
									<div className="text-center items-center">
										<Button
											variant="rounded"
											className=" bg-primary-900  w-full p-6 my-8"
										>
											View Bookings
										</Button>
										<p>
											{activity.headCount} users of sindbad have already
											registerd!
										</p>
									</div>
								) : (
									<div className="text-center align-middle">
										<p className="self-center text-2xl font-light relative top-16">
											{" "}
											No available bookings
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Activity;
