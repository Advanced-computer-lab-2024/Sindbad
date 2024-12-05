import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GoogleMapRead from "@/components/custom/maps/GoogleMapRead";
import ImagePlaceholder from "@/components/custom/ImagePlaceholder";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { getSiteById } from "@/services/SiteApiHandler";

import { Star, MapPin, Frown, CalendarDays, AlarmClock, ArrowRight } from "lucide-react";

import { useCurrency } from "@/state management/userInfo";
import { Convert } from "easy-currencies";

const convertMinutesToTime = (minutes) => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	const period = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedMins = mins < 10 ? `0${mins}` : mins;

	return `${formattedHours}:${formattedMins} ${period}`;
};

function Site() {
	const { siteId } = useParams();
	const [site, setSite] = useState(null);
	const [error, setError] = useState(false);
	const currency = useCurrency();
	const [convertedPrice, setConvertedPrice] = useState(null);

	const getSite = async () => {
		let response = await getSiteById(siteId);

		if (response.error) {
			console.error(response.message);
			setError(true);
		} else {
			setSite(response);
			setError(false);
		}
	};

	useEffect(() => {
		getSite();
	}, []);

	useEffect(() => {
		const fetchConversionRate = async () => {
			try {
				const convert = await Convert().from("USD").fetch();

				if (site.ticketPrices && site.ticketPrices.child && site.ticketPrices.adult && site.ticketPrices.student && site.ticketPrices.foreigner) {
					const rateChild = await convert.amount(site.ticketPrices.child).to(currency);
					const rateAdult = await convert.amount(site.ticketPrices.adult).to(currency);
					const rateStudent = await convert.amount(site.ticketPrices.student).to(currency);
					const rateForeigner = await convert.amount(site.ticketPrices.foreigner).to(currency);
					setConvertedPrice({
						child: rateChild,
						adult: rateAdult,
						student: rateStudent,
						foreigner: rateForeigner,
					});
				}
			} catch (error) {
				console.error("Error fetching conversion rate:", error);
				setConvertedPrice(null); // Reset on error
			}
		};

		if (site) {
			fetchConversionRate();
		}
	}, [currency, site]);

	if (!site) {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">
						{error === true ?
							"Site does not exist."
							:
							"Loading..."
						}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="py-8 px-24 max-w-[1200px] mx-auto">
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">{site.name}</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex justify-between gap-32 py-6">
				<div className="flex flex-col gap-6 w-full">
					<p className="text-sm">{site.description}</p>

					{/*Tags*/}
					<div>
						<h2 className="text-lg font-semibold mb-1">
							Tagged As
						</h2>
						<div className="flex flex-wrap gap-2 text-sm">
							{site.tags.map((tag) => (
								<div
									key={tag._id}
									className="flex gap-1 text-center text-xs items-center bg-gradient-to-br from-primary-700 to-primary-900 px-3 py-1.5 rounded-full"
								>
									{tag.name}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="h-[400px] w-[400px] shrink-0">
					<Carousel>
						<CarouselContent>
							{site.cardImage ? (
								<CarouselItem className="h-[400px] w-[400px]">
									<img
										src={site.cardImage.url}
										alt={`${site.name}`}
										className="h-full w-full object-cover rounded-md border border-neutral-300"
									/>
								</CarouselItem>
							) : (
								<CarouselItem className="h-[400px]">
									<ImagePlaceholder />
								</CarouselItem>
							)}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>

			<hr className="border-neutral-300 border w-full mt-1.5" />

			<div className="flex justify-between gap-24 py-6">
				<div className="flex flex-col gap-3 shrink-0">
					<h2 className="text-lg font-semibold mb-1">
						Opening Hours
					</h2>
					{Object.entries(site.openingHours).map(([day, hours]) => (
						<div key={day} className="flex gap-1">
							<span className="border-l-[3px] border-primary-950 m-1"></span>
							<div>
								<p className="text-sm font-semibold">{day}</p>
								<p className="text-sm">
									{`
                                ${convertMinutesToTime(hours.start)} 
                                to
                                ${convertMinutesToTime(hours.end)}`}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="w-full">
					<h2 className="text-lg font-semibold mb-1">
						Location
					</h2>
					<div className="flex flex-col gap-2">
						<div className="bg-light h-[250px] rounded-md overflow-clip">
							<GoogleMapRead
								lat={site.location.coordinates.lat}
								lng={site.location.coordinates.lng}
							/>
						</div>
						<div className="flex items-start gap-1">
							<MapPin size={16} className="shrink-0" />
							<span className="text-sm">
								{site.location.address}
							</span>
						</div>
					</div>
				</div>

				<div className="shrink-0 w-1/3">
					<h2 className="text-lg font-semibold mb-1">
						Ticket Prices
					</h2>
					{Object.keys(site.ticketPrices).length === 0 ? (
						<div className="flex flex-col justify-center items-center h-full w-ful rounded-lg">
							<Frown className="w-32 h-32 text-primary-900 m-4" />
							<p className=" text-2xl font-semibold self-center text-primary-950">
								No available bookings
							</p>
						</div>
					) : (
						<div className="w-full h-full">
							{convertedPrice &&
								<>
									{Object.entries(convertedPrice).map(([type, price]) => (
										<div
											key={type}
											className="relative p-6 bg-gradient-to-br from-neutral-200/60 to-light rounded-md mt-4 overflow-clip"
										>
											{/* border */}
											<div className="absolute top-0 left-0 rounded-md border border-neutral-500 h-full w-full"></div>
											{/* cutouts */}
											<div className="z-10 absolute left-[200px] -top-5 -bottom-5 flex flex-col justify-between">
												<div className="h-[32px] w-4 bg-light rounded-l-full border-l border-b border-neutral-500"></div>
												<div className="h-[32px] w-4 bg-light rounded-l-full border-l border-t border-neutral-500"></div>
											</div>
											<div className="z-10 absolute left-[216px] -top-5 -bottom-5 flex flex-col justify-between">
												<div className="h-[32px] w-2 bg-light rounded-r-full border-r border-b border-neutral-500"></div>
												<div className="h-[32px] w-2 bg-light rounded-r-full border-r border-t border-neutral-500"></div>
											</div>

											<div className="h-[100%] absolute left-[216px] top-0 w-0 border border-neutral-400 border-dashed"></div>

											<p className="text-base font-medium">{type} ticket</p>
											<div className="text-end">
												{price === 0 ? (
													<span className="text-xl font-semibold">Free</span>
												) : (
													<>
														<span className="text-xl font-semibold">
															{price.toFixed(2) + " "}
														</span>
														<span className="text-sm">{currency}</span>
													</>
												)}
											</div>
										</div>
									))}
								</>
							}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default Site;
