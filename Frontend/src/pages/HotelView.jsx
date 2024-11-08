import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GenericForm from "@/components/custom/genericForm/genericForm";

import { getHotelOffers } from "@/services/HotelApiHandler";

function HotelView() {
	const { hotelId } = useParams();
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
						{error === true ? "Hotel does not exist." : "Loading..."}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="py-8 px-24 max-w-[1200px] mx-auto">
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">
					{data?.hotel?.name} + Offers
				</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>

			<div className="flex justify-between gap-24 py-6">
				<div className="flex flex-col gap-3 ">
					<h2 className="text-lg mb-1">
						{data.offers[0].room.description.text}
					</h2>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<Dialog>
						<DialogTrigger asChild>
							<Button>Book now</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Confirm your booking</DialogTitle>
								<DialogDescription>
									Please enter your details to confirm your booking.
								</DialogDescription>
							</DialogHeader>
							<GenericForm
								type="hotelBooking"
								id={data.offers[0].id}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<hr className="border-neutral-300 border w-full mt-1.5" />
		</div>
	);
}

export default HotelView;
