import { useState } from "react";
import CardContainer from "@/components/custom/cards/CardContainer";
import { getFlights } from "@/services/FlightApiHandler";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";

function FlightBooking() {
	const [loading, setLoading] = useState(false);
	const [flights, setFlights] = useState([]);
	const [error, setError] = useState(false);

	const flightSearchSchema = z.object({
		origin: z.string(),
		destination: z.string(),
		date: z.string(),
		adults: z.string(),
	})

	const form = useForm({
		resolver: zodResolver(flightSearchSchema),
		defaultValues: {
			origin: "",
			destination: "",
			date: "",
			adults: "0",
		},
	});

	const fetchFlights = async (origin, destination, date, adults) => {
		setLoading(true);
		const response = await getFlights(
			{
				"origin": origin,
				"destination": destination,
				"date": date,
				"adults": adults
			}
		);
		if (response.error) {
			console.error("Error fetching flight offers:", response.error);
		} else {
			setFlights(response);
			console.log(response)
		}
		setLoading(false);
	};

	const handleSubmit = async (data) => {
		fetchFlights(data.origin, data.destination, data.date, data.adults);
	}

	return (
		<div className="">
			<div className="flex gap-10 flex-col">
				<div className="w-[280px] shrink-0">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)} className="gap-2 flex flex-col">
							<FormItem>
								<FormLabel htmlFor="origin">Origin</FormLabel>
								<FormControl>
									<Input {...form.register("origin")} id="origin" />
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel htmlFor="destination">Destination</FormLabel>
								<FormControl>
									<Input {...form.register("destination")} id="destination" />
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel htmlFor="date">Date</FormLabel>
								<FormControl>
									<Input {...form.register("date")} id="date" />
								</FormControl>
							</FormItem>
							<FormItem>
								<FormLabel htmlFor="adults">Adults</FormLabel>
								<FormControl>
									<Input {...form.register("adults")} id="adults" />
								</FormControl>
							</FormItem>
							<FormItem>
								<Button type="submit">Search</Button>
							</FormItem>
						</form>
					</Form>
				</div>
				{!loading ? (
					<CardContainer
						cardList={flights}
						cardType={"flight"}
						fetchCardData={fetchFlights}
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

export default FlightBooking;