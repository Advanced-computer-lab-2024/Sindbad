import { useEffect, useState } from "react";
import CardContainer from "@/components/custom/cards/CardContainer";
import { getFlights } from "@/services/FlightApiHandler";
import { useUser } from "@/state management/userInfo";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
function FlightBooking() {
	const [loading, setLoading] = useState(true);
	const [flights, setFlights] = useState([]);
	const {id} = useUser();

	const flightSearchSchema = z.object({
		origin: z.string(),
		destination: z.string(),
		date: z.string(),
		adults: z.string(),
	})

	const form = useForm({
		resolver: zodResolver(flightSearchSchema),
		defaultValues: {
			origin: "JFK",
			destination: "LAX",
			date: "2024-12-01",
			adults: "1",
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
			<div className="flex items-center gap-6 mb-6">
				<h1 className="text-3xl font-extrabold shrink-0">Featured Flights</h1>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
			<div className="flex gap-10">
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