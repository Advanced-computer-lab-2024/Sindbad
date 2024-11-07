import { useEffect } from "react";
import {
	getHotelsByCity,
	getHotelsByGeocode,
} from "@/services/HotelApiHandler";
import { useState } from "react";
import CardContainer from "@/components/custom/CardContainer";

function HotelBooking() {
	const [loading, setLoading] = useState(true);
	const [hotels, setHotels] = useState([]);

	const fetchHotels = async () => {
		setLoading(true);
		try {
			const cityHotels = await getHotelsByCity("CAI", 10);
			console.log("City Hotels:", cityHotels);
			setHotels(cityHotels.data);
		} catch (error) {
			console.error("Error fetching hotels:", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchHotels();
	}, []);

	return (
		<div className="py-8 px-24 max-w-[1200px] flex flex-col gap-4 mx-auto">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold">Featured Hotels</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				{!loading ? (
					<CardContainer
						cardList={hotels}
						cardType={"activity"}
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
