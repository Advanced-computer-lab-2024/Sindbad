import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { MapPin, Star, ArrowRight } from "lucide-react";

import { getItineraryById } from "@/services/ItineraryApiHandler";
import ImagePlaceholder from "@/components/custom/ImagePlaceholder";
import { getTourGuide } from "@/services/TourGuideApiHandler";
import StarRating from "@/components/custom/StarRating";

function getRandomRating() {
	return (Math.round(Math.random() * 10) / 2).toFixed(1);
}

function getRandomReviews() {
	return Math.floor(Math.random() * 1000) + 1;
}

function handleItineraryValues(itinerary) {
	if (!itinerary.rating) {
		itinerary.rating = getRandomRating();
	}

	if (!itinerary.description) {
		itinerary.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu placerat neque. Cras nibh lectus, fringilla pharetra elementum vitae, eleifend et lectus. Cras semper pretium dui, non aliquet ligula tristique sit amet. Vivamus faucibus, enim nec semper consequat, ante lacus venenatis magna, vitae cursus nisl quam quis enim. Nullam semper.";
	}

	if (
		itinerary.price !== null &&
		typeof itinerary.price === "object" &&
		typeof itinerary.price.min === "number" &&
		typeof itinerary.price.max === "number"
	) {
		itinerary.price = (itinerary.price.min + itinerary.price.max) / 2;
	}

	if (!itinerary.reviews) {
		itinerary.reviews = getRandomReviews();
	}
}

const Itinerary = () => {
	// State to store the current count
	const [adult, setAdult] = useState(0);
	const [child, setChild] = useState(0);
	const { itineraryId } = useParams();
	const [itinerary, setItinerary] = useState(null); // Initialize as null
	const [selectedDate, setSelectedDate] = useState(0);
	const [selectedTime, setSelectedTime] = useState(0);
	const [creator, setCreator] = useState(null);

	const getItinerary = async () => {
		let response = await getItineraryById(itineraryId);
		console.log(response);

		if (response.error) {
			console.error(response.message);
		} else {
			handleItineraryValues(response);
			setItinerary(response);
		}
	};

	const getCreator = async () => {
		let response = await getTourGuide(itinerary.creatorId);
		console.log(response);

		if (response.error) {
			console.error(response.message);
		} else {
			setCreator(response);
		}
	};

	useEffect(() => {
		getItinerary();
	}, []);

	useEffect(() => {
		if (itinerary) {
			getCreator();
		}
	}, [itinerary]);

	// Ensure itinerary is not null or undefined before rendering
	if (!itinerary) {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">Loading...</p>
				</div>
			</div>
		);
	}

	// Ensure availableDatesTimes exists before accessing it
	if (!itinerary.availableDatesTimes) return null;

	const fullStars = itinerary.rating;
	const emptyStar = 5 - fullStars;

	const dates = itinerary.availableDatesTimes.map((date) => {
		const d = new Date(date);
		const weekday = d.toLocaleString("en-US", { weekday: "short" });
		const day = d.toLocaleString("en-US", { day: "numeric" });
		const month = d.toLocaleString("en-US", { month: "short" });
		return `${weekday} ${day} ${month}`;
	});

	const times = itinerary.availableDatesTimes.map((date) => {
		const d = new Date(date);
		return d.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	});

	const handleAdultIncrement = () => setAdult(adult + 1);
	const handleAdultDecrement = () => adult > 0 && setAdult(adult - 1);
	const handleChildIncrement = () => setChild(child + 1);
	const handleChildDecrement = () => child > 0 && setChild(child - 1);

	return (
		<div className="py-8 px-24 max-w-[1200px] mx-auto">
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">{itinerary.name}</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex justify-between gap-32 py-6">
				<div className="flex flex-col gap-6">
					<div>
						<p className="text-base font-medium">
							{itinerary.duration} day trip offered by{" "}
							<a
								className="hover:underline cursor-pointer"
								href={`/app/profile/${creator?._id}`}
							>
								{creator?.username}
							</a>
						</p>

						{/*Star Section */}
						<div className="mt-1">
							<StarRating rating={itinerary.rating} size={20} />
						</div>
					</div>

					<p className="text-sm">{itinerary.description}</p>

					{/* Supported Languages */}
					<div>
						<h2 className="text-lg font-semibold mb-1">
							Supported Languages
						</h2>
						<div className="flex flex-wrap gap-2 text-sm">
							{itinerary.languages.map((lang) => (
								<div
									key={lang}
									className="flex gap-1 text-xs items-center bg-gradient-to-br from-primary-700 to-primary-900 px-3 py-1.5 rounded-full"
								>
									{lang}
								</div>
							))}
						</div>
					</div>

					{/* Accessibility Features */}
					<div>
						<h2 className="text-lg font-semibold mb-1">
							Accessibility
						</h2>
						<div className="flex flex-col text-sm">
							{itinerary.accessibility.map((feature) => (
								<p key={feature} className="flex items-center gap-2">
									<Star size={16} />
									{feature}
								</p>
							))}
						</div>
					</div>
				</div>

				<div className="h-full w-[400px] shrink-0">
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
			</div>

			<hr className="border-neutral-300 border w-full mt-1.5" />

			{/*Itinerary + Availbility*/}
			<div className="grid grid-cols-9 grid-rows gap-8 mt-8">
				<div className="col-span-3">
					<h2 className="text-2xl font-semibold mb-4">Timeline</h2>
					<ul className="flex flex-col justify-center">
						<li className="flex items-start gap-3">
							<MapPin size={36} className="border-2 rounded-full p-1 mt-0.5 border-neutral-300 bg-neutral-200 text-indigo-950" />
							<div>
								<p className="text-sm text-neutral-500">Starting at</p>
								<p className="text-sm font-medium">{itinerary.pickUpLocation}</p>
							</div>
						</li>
						<li className="text-neutral-400 text-[10px] ml-4 -my-1">•</li>
						<li className="text-neutral-400 text-[10px] ml-4 -my-1">•</li>
						<li className="text-neutral-400 text-[10px] ml-4 -mt-1 -mb-0.5">•</li>
						{itinerary.timeline.map((stop, index) => (
							<>
								<li key={index} className="flex items-start gap-3">
									<div className="shrink-0 border-2 border-neutral-300 rounded-full bg-neutral-200 text-indigo-950 font-semibold w-9 h-9 flex items-center justify-center">
										{index + 1}
									</div>
									<p className="mt-2 text-sm font-medium">{stop}</p>
								</li>
								<li className="text-neutral-400 text-[10px] ml-4 -mb-1 -mt-0.5">•</li>
								<li className="text-neutral-400 text-[10px] ml-4 -my-1">•</li>
								<li className="text-neutral-400 text-[10px] ml-4 -mt-1 -mb-0.5">•</li>
							</>
						))}
						<li className="flex items-start gap-3">
							<MapPin size={36} className="border-2 rounded-full p-1 mt-0.5 border-neutral-300 bg-neutral-200 text-indigo-900" />
							<div>
								<p className="text-sm text-neutral-500">Finishing at</p>
								<p className="text-sm font-medium">{itinerary.dropOffLocation}</p>
							</div>
						</li>
					</ul>
				</div>

				<div className="col-span-3">
					<h2 className="text-2xl font-semibold mb-4">Activities</h2>
					<ul className="flex flex-col gap-6">
						{itinerary.activities.map((activity, index) => (
							<li key={index} className="flex items-start gap-3">
								<div className="shrink-0 border-2 border-neutral-300 rounded-full bg-neutral-200 text-indigo-950 font-semibold w-9 h-9 flex items-center justify-center">
									{index + 1}
								</div>
								<div>
									<p className="text-sm font-medium -mb-1">{activity.name}</p>
									<Link
										to={`/app/activity/${activity._id}`}
										className="text-xs text-neutral-500 hover:text-amber-500 hover:underline"
									>
										See details
										<ArrowRight className="inline-block ml-1" size={12} />
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className="col-span-3">
					<h2 className="text-2xl font-semibold mb-4">Search Availability</h2>
					<Carousel>
						<CarouselContent className="px-0.5 -ml-4 mr-3">
							{dates.map((date, idx) => (
								<CarouselItem className="basis-1/3 py-0.5 pl-4">
									<button
										key={idx}
										onClick={() => { setSelectedDate(idx); setSelectedTime(idx) }}
										className={`border py-2 px-3 min-h-20 w-24 rounded-md bg-gradient-to-br from-primary-700/80 to-primary-900/80 text-center ${selectedDate === idx
											? "ring-secondary ring-2"
											: "ring-transparent"
											}`}
									>
										<div className="flex flex-col">
											{/* Weekday */}
											<span className="text-sm">
												{date.split(" ")[0]}
											</span>
											{/* Day */}
											<span className="text-lg font-bold">
												{date.split(" ")[1]}
											</span>
											{/* Month */}
											<span className="text-sm">
												{date.split(" ")[2]}
											</span>{" "}
										</div>
										<hr className="border-primary-900 border-1 w-full my-1.5" />
										<p className="text-xs">{times[idx]}</p>
									</button>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="-left-5" />
						<CarouselNext />
					</Carousel>

					<div className="relative p-6 bg-gradient-to-b from-neutral-200/60 to-light rounded-md mt-4 overflow-clip">
						{/* border */}
						<div className="absolute top-0 left-0 rounded-md border border-neutral-500 h-full w-full"></div>
						{/* Top cutout */}
						<div className="absolute top-[248px] -left-5 -right-5 flex justify-between">
							<div className="w-[36px] h-6 bg-light rounded-t-full border-t border-r border-neutral-500"></div>
							<div className="w-[36px] h-6 bg-light rounded-t-full border-t border-l border-neutral-500"></div>
						</div>
						<div className="absolute top-[270px] -left-5 -right-5 flex justify-between">
							<div className="w-[36px] h-3 bg-light rounded-b-full border-b border-r border-neutral-500"></div>
							<div className="w-[36px] h-3 bg-light rounded-b-full border-b border-l border-neutral-500"></div>
						</div>

						<div className="space-y-4 my-5">
							<div className="flex items-center justify-around">
								<div className="flex gap-2 items-center">
									<p className="text-base font-semibold">Adult</p>
									<span className="text-neutral-500 text-xs mt-1 font-medium">(18+)</span>
								</div>
								<div className="flex items-center justify-center gap-4 ">
									{/* Decrement Button */}
									<Button
										onClick={handleAdultDecrement}
										className="z-10 flex items-center justify-center text-xl bg-transparent border border-neutral-300 hover:border-secondary w-5"
										disabled={adult === 0}
									>
										-
									</Button>

									{/* Count Display */}
									<div className="w-10 flex items-center justify-center text-base">
										{adult}
									</div>

									{/* Increment Button */}
									<Button
										onClick={handleAdultIncrement}
										className="z-10 flex items-center justify-center text-xl bg-transparent border border-neutral-300 hover:border-secondary w-5"
									>
										+
									</Button>
								</div>
							</div>
							<div className="flex items-center justify-around">
								<div className="flex gap-2 items-center">
									<p className="text-base font-semibold">Child</p>
									<span className="text-neutral-500 text-xs mt-1 font-medium">(5-17)</span>
								</div>
								<div className="flex items-center justify-center gap-4">
									{/* Decrement Button */}
									<Button
										onClick={handleChildDecrement}
										className="z-10 flex items-center justify-center text-xl bg-transparent border border-neutral-300 hover:border-secondary w-5"
										disabled={child === 0}
									>
										-
									</Button>

									{/* Count Display */}
									<div className="w-10 flex items-center justify-center text-base">
										{child}
									</div>

									{/* Increment Button */}
									<Button
										onClick={handleChildIncrement}
										className="z-10 flex items-center justify-center text-xl bg-transparent border border-neutral-300 hover:border-secondary w-5"
									>
										+
									</Button>
								</div>
							</div>
						</div>

						{/* Total Cost Section */}
						<div className="bg-primary-700/60 -mx-6 px-8 py-4 text-sm flex flex-col gap-2">
							<div className="flex justify-between">
								<p>
									Item count:{" "}
								</p>
								<p className="font-medium">
									{adult + child}
								</p>
							</div>
							<div>
								<div className="flex justify-between">
									<p>
										Total:
									</p>
									<p className="font-medium">
										{adult * itinerary.price + child * itinerary.price}{" "}EGP
									</p>
								</div>
								<p className="text-xs text-neutral-500 italic mt-0.5">
									*Includes taxes and charges
								</p>
							</div>
						</div>

						<div className="border border-neutral-400 border-dashed -mx-6 mt-4 mb-6"></div>

						{/* Book Now Button */}
						<Button className="text-center w-full py-3 relative">
							<p>Book itinerary</p>
							<ArrowRight />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Itinerary;
