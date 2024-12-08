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
						<div className="flex flex-wrap gap-2 text-sm text-light">
							{site.tags.map((tag) => (
								<div
									key={tag._id}
									className="flex gap-1 text-xs items-center bg-gradient-to-br from-primary-600 to-primary-800 px-3 py-1.5 rounded-full"
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
							{site.cardImage && site.cardImage.url ? (
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
							<MapPin size={16} className="shrink-0 mt-[1px]" />
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
					<div className="relative p-6 bg-gradient-to-b from-neutral-200/60 to-light rounded-md mt-4 overflow-clip z-0">
						{/* border */}
						<div className="absolute top-0 left-0 rounded-md border border-neutral-500 h-full w-full z-0"></div>
						{/* Top cutout */}
						<div className="absolute top-[183px] -left-5 -right-5 flex justify-between z-0">
							<div className="w-[36px] h-6 bg-light rounded-t-full border-t border-r border-neutral-500"></div>
							<div className="w-[36px] h-6 bg-light rounded-t-full border-t border-l border-neutral-500"></div>
						</div>
						<div className="absolute top-[205px] -left-5 -right-5 flex justify-between z-0">
							<div className="w-[36px] h-3 bg-light rounded-b-full border-b border-r border-neutral-500"></div>
							<div className="w-[36px] h-3 bg-light rounded-b-full border-b border-l border-neutral-500"></div>
						</div>

						<div className="space-y-4 my-3 mx-1.5">
							<div className="flex items-center justify-between">
								<div className="flex gap-2 items-center">
									<p className="text-base font-semibold">Adult</p>
									<span className="text-neutral-500 text-xs mt-1 font-medium">
										(18+)
									</span>
								</div>
								<div className="flex items-center justify-center gap-4 ">
									{convertedPrice ?
										<p className="text-sm font-medium break-all">
											{(convertedPrice?.adult).toFixed(2)} {currency}
										</p>
										:
										<p className="text-sm font-medium break-all">
											{(site?.ticketPrices?.adult).toFixed(2)} USD
										</p>
									}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex gap-2 items-center">
									<p className="text-base font-semibold">Child</p>
									<span className="text-neutral-500 text-xs mt-1 font-medium">
										(5-17)
									</span>
								</div>
								<div className="flex items-center justify-center gap-4">
									{convertedPrice ?
										<p className="text-sm font-medium break-all">
											{(convertedPrice?.child).toFixed(2)} {currency}
										</p>
										:
										<p className="text-sm font-medium break-all">
											{(site?.ticketPrices?.child).toFixed(2)} USD
										</p>
									}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex gap-2 items-center">
									<p className="text-base font-semibold">Student</p>
								</div>
								<div className="flex items-center justify-center gap-4">
									{convertedPrice ?
										<p className="text-sm font-medium break-all">
											{(convertedPrice?.student).toFixed(2)} {currency}
										</p>
										:
										<p className="text-sm font-medium break-all">
											{(site?.ticketPrices?.student).toFixed(2)} USD
										</p>
									}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex gap-2 items-center">
									<p className="text-base font-semibold">Foreigner</p>
								</div>
								<div className="flex items-center justify-center gap-4">
									{convertedPrice ?
										<p className="text-sm font-medium break-all">
											{(convertedPrice?.foreigner).toFixed(2)} {currency}
										</p>
										:
										<p className="text-sm font-medium break-all">
											{(site?.ticketPrices?.foreigner).toFixed(2)} USD
										</p>
									}
								</div>
							</div>
						</div>

						<div className="border border-neutral-400 border-dashed -mx-6 my-6"></div>

						{/* Total Cost Section */}
						<div className="bg-primary-200 -mx-6 px-8 py-4 text-sm flex flex-col gap-2">
							<div className="flex justify-between">
								<p>Item count:</p>
								<p className="font-medium">
									{Object.keys(site.ticketPrices).length}
								</p>
							</div>
							<div>
								<div className="flex justify-between">
									<p>Total:</p>
									<p className="font-medium">
										{/* sum of all prices in site.ticketPrices */}
										{convertedPrice ?
											<p className="font-medium">
												{convertedPrice?.adult + convertedPrice?.child + convertedPrice?.student + convertedPrice?.foreigner} {currency}
											</p>
											:
											<p className="font-medium">
												{site?.ticketPrices
													? site.ticketPrices.adult + site.ticketPrices.child + site.ticketPrices.student + site.ticketPrices.foreigner
													: 0} USD
											</p>
										}
									</p>{" "}
								</div>
								<p className="text-xs text-neutral-500 italic mt-0.5">
									*Includes taxes and charges
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Site;
