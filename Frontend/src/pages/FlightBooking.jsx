import { useEffect, useState } from "react";
import CardContainer from "@/components/custom/cards/CardContainer";
import { getFlights } from "@/services/FlightApiHandler";
import GenericForm from "@/components/custom/genericForm/genericForm";
import { useUser } from "@/state management/userInfo";

function FlightBooking() {
	const [loading, setLoading] = useState(true);
	const [flights, setFlights] = useState([]);
	const {id} = useUser();

	// const fetchFlights = async () => {
	// 	setLoading(true);
	// 	const response = await getFlights(
	// 		{
	// 			"origin": "JFK",
	// 			"destination": "LAX",
	// 			"date": "2024-12-01",
	// 			"adults": "1"
	// 		}
	// 	);
	// 	if (response.error) {
	// 		console.error("Error fetching flight offers:", response.error);
	// 	} else {
	// 		setFlights(response);
	// 		console.log(response)
	// 	}
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// 	// fetchFlights();
	// }, []);

	return (
		<div className="">
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold shrink-0">Featured Flights</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
				<div className="w-[280px] shrink-0">
					<GenericForm type="flightSearch" id={id} />
				</div>
				{!loading ? (
					<>
						{/* <CardContainer
						cardList={flights}
						cardType={"flight"}
						fetchCardData={fetchFlights}
					/> */}
					</>
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

export default FlightBooking;