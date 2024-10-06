import { Star, MapPin, Frown } from "lucide-react";

function getRandomRating() {
	{
		/*return (Math.floor(Math.random() * 6));*/
	}
	return (Math.round(Math.random() * 10) / 2).toFixed(1);
}

function getRandomReviews() {
	return Math.floor(Math.random() * 1000) + 1;
}

const reviews = getRandomReviews();
const rating = Math.floor(getRandomRating());
const fullStars = rating;
const emptyStar = 5 - fullStars;
//const isAccessible = true; //open to public

const convertMinutesToTime = (minutes) => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	const period = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedMins = mins < 10 ? `0${mins}` : mins;

	return `${formattedHours}:${formattedMins} ${period}`;
};

const site = {
	name: "Ancient Ruins",
	category: "Historic Site",
	description:
		"Nestled atop a rugged hill, this ancient fortress once guarded a thriving medieval town.Its crumbling stone walls and towering arches whisper stories of battles fought and lives lived centuries ago. Today, the site offers breathtaking views of the surrounding valley, transporting visitors back in time.",
	imageUris: [
		"https://example.com/images/ruins1.jpg",
		"https://example.com/images/ruins2.jpg",
		"https://example.com/images/ruins3.jpg",
	],
	location: {
		address: "1234 History Lane, Old Town, Country",
		coordinates: {
			lat: 34.0522,
			lng: -118.2437,
		},
	},
	openingHours: {
		Monday: { start: 480, end: 1020 },
		Tuesday: { start: 480, end: 1020 },
		Wednesday: { start: 480, end: 1020 },
		Thursday: { start: 600, end: 1020 },
		Friday: { start: 600, end: 1020 },
	},
	ticketPrices: {
		Adult: 120,
		Child: 60,
		Senior: 0,
	},
	tags: [
		"Shopping", // Example ObjectIds referencing Tag objects
		"Family-friendly",
		"Pets allowed",
	],
};

function Site() {
	return (
		<div className="min-h-screen h-full flex justify-center items-center bg-primary-950">
			<div className="w-full max-w-7xl px-8 py-8 bg-primary-900 shadow-lg rounded-md">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
					<div>
						{/*Title Section*/}
						<div className="my-4">
							<h1 className="text-4xl font-bol">{site.name}</h1>

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

									{/*hasHalfStar && <StarHalf fill="yellow" strokeWidth={0} />*/}

									{Array.from({ length: emptyStar }, (_, index) => (
										<Star
											key={fullStars + index}
											className="fill-dark"
											strokeWidth={0}
										/>
									))}
								</div>
								<p className="text-light">
									{rating}/5 ({reviews})
								</p>
								<div className="border-2 h-0 w-0 rounded-full self-center"></div>
								{/*CHANGE THIS WITH THE CATEGORY OF PLACE*/}
								<p className="text-light text-lg">{site.category}</p>
							</div>
						</div>

						<p className="text-light">{site.description}</p>

						{/*preference tags*/}
						<div className="my-6">
							<div className="flex flex-wrap gap-2">
								{site.tags.map((tag) => (
									<div
										key={tag}
										className="px-3 py-1 bg-primary-950 rounded-full border cursor-default"
									>
										{tag}
									</div>
								))}
							</div>
						</div>
					</div>

					{/*Picture placeholders*/}
					<div className="grid grid-cols-2 col-span-2 gap-1">
						<div className="bg-light h-full rounded-lg "></div>
						<div className="">
							<div className="bg-light h-1/2 rounded-lg mb-px "></div>
							<div className="bg-light h-1/2 rounded-lg "></div>
						</div>
					</div>
				</div>
				<div className=" border-y mt-8 mx-8"></div>

				<div className="grid grid-cols-3 grid-rows gap-8 p-8">
					<div className=" col-span-1">
						<div className="  bg-light h-64 w-full rounded-lg m-4"></div>
						<div className="flex flex-rows">
							<MapPin className="border-2 rounded-full p-1 w-10 h-10 m-1 mx-3 fill-secondary text-primary-900" />
							<p className=" text-lg m-2">{site.location.address}</p>
						</div>
					</div>
					<div className="col-span-1 h-full align-middle">
						{Object.entries(site.openingHours).map(([day, hours]) => (
							<div key={day} className="m-4 self-center">
								<span className="w-0 h-10 border-2 border-secondary rounded-full m-2"></span>
								<span className="text-xl p-2">{day}:</span>
								<span className="">
									{`
                                ${convertMinutesToTime(hours.start)} 
                                to 
                                ${convertMinutesToTime(hours.end)}`}
								</span>
							</div>
						))}
					</div>
					<div className=" bg-primary-700 rounded-lg col-span-1">
						{Object.keys(site.ticketPrices).length === 0 ? (
							<div className=" flex flex-col justify-center items-center h-full w-ful rounded-lg">
								<Frown className="w-32 h-32 text-primary-900 m-4" />
								<p className=" text-2xl font-semibold self-center text-primary-950">
									No available bookings
								</p>
							</div>
						) : (
							<div className="w-full h-full justify-around">
								{Object.entries(site.ticketPrices).map(([type, price]) => (
									<div
										key={type}
										className="flex flex-col justify-between bg-primary-900 border rounded-lg p-4 m-4"
									>
										<p className="text-xl font-semibold">{type} ticket</p>
										<div className="text-end">
											{price === 0 ? (
												<span className="text-xl px-1 font-semibold">Free</span>
											) : (
												<>
													<span className="text-xl px-1 font-semibold">
														{price}
													</span>
													<span className="text-sm">LE</span>
												</>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Site;
