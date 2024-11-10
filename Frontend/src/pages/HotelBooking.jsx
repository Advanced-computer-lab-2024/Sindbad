import { useEffect, useState } from "react";
import {
	getHotelsByCity,
	getHotelsByGeocode,
} from "@/services/HotelApiHandler";
import CardContainer from "@/components/custom/cards/CardContainer";
import GenericFilter from "@/components/custom/GenericFilter";
import { set } from "date-fns";

function HotelBooking() {
	const [loading, setLoading] = useState(true);
	const [hotels, setHotels] = useState([]);

	const [activeFilters, setActiveFilters] = useState({
		cityCode: "CAI",
		radius: 10,
	});

	const toTitleCase = (str) => {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	const formFields = {
		cityCode: {
			type: "search",
			label: "City Code",
		},
		radius: {
			type: "search",
			label: "Search Radius",
			min: 1,
			max: 100,
		},
	};

	const fetchHotels = async () => {
		setLoading(true);
		console.log(activeFilters.cityCode, activeFilters.radius);
		const response = await getHotelsByCity(
			activeFilters.cityCode,
			activeFilters.radius
		);
		if (!response.error && response) {
			response.data.forEach((hotel) => {
				hotel.name = toTitleCase(hotel.name);
			});
			setHotels(response.data);
			console.log(hotels);
		} else {
			setHotels([]);
			console.error(response.message);
		}
		setLoading(false);
	};

	// Debouncing logic for the API call
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Only fetch itineraries after a 1-second delay
			fetchHotels();
		}, 1000); // Adjust debounce time as needed (e.g., 500ms, 1000ms)

		// Clear the timeout if activeFilters changes before the timeout is complete
		// console.log("activeFilters changed", activeFilters);
		return () => clearTimeout(delayDebounceFn);
	}, [activeFilters]); // Dependency on activeFilters




	return (
		<div className="">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold shrink-0">Featured Hotels</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<div className="w-[280px] shrink-0">
					<GenericFilter
						formFields={formFields}
						activeFilters={activeFilters}
						setActiveFilters={setActiveFilters}
					/>
				</div>
				{!loading ? (
					<CardContainer
						cardList={hotels}
						cardType={"hotel"}
						fetchCardData={fetchHotels}
					/>
				) : (
					<div className="flex col-span-3 mx-auto">
						<div className="flex justify-center w-full">
							<p className="text-neutral-400 text-sm italic">Loading...</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default HotelBooking;
