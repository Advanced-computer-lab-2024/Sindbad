import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@/state management/userInfo";
import GenericForm from "@/components/custom/genericForm/genericForm";

import { getHotelOffers } from "@/services/HotelApiHandler";

function HotelView() {
	const { hotelId } = useParams();
	const { id } = useUser();
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	const fetchData = async () => {
		try {
			const response = await getHotelOffers(hotelId);
			if (response.error) {
				console.error(response.message);
				setError(true);
			} else {
				setData(response.data[0]);
				setError(false);
			}
		} catch (err) {
			console.error("Error fetching hotel data:", err);
			setError(true);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		console.log("Data: ", data);
		console.log("Hotel Name: ", data?.hotel?.name);
		console.log("Offers: ", data?.offers);
	}, [data]);

	if (!data) {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">
						{error === true ? "No offers currently available for this hotel." : "Loading..."}
					</p>
				</div>
			</div>
		);
	}

	function formatString(str) {
		// Step 1: Convert the whole string to lowercase except for the first letter
		str = str.toLowerCase();
		str = str.charAt(0).toUpperCase() + str.slice(1);

		// Step 2: Ensure exactly one space after each comma
		str = str.replace(/\s*,\s*/g, ', ');

		return str;
	}

	return (
		<div className="py-8 px-24 max-w-[1200px] mx-auto">
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">
					{data?.hotel?.name} Offers
				</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>

			<div className="w-2/3 mx-auto">
				<div className="flex flex-col mt-6">
					<h1 className="text-xl font-bold shrink-0">Book the following offer: </h1>
					<h2 className="text mb-8">
						{formatString(data.offers[0].room.description.text)}
					</h2>
					<GenericForm
						type="hotelBooking"
						data={data.offers[0].id}
						id={id}
					/>
				</div>
			</div>
		</div>
	);
}

export default HotelView;