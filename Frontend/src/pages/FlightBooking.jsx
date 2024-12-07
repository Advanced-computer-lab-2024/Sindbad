import { useState } from "react";
import CardContainer from "@/components/custom/cards/CardContainer";
import { getFlights } from "@/services/FlightApiHandler";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { iataCodes } from "@/utilities/iataCodes";
import ReactSelect from "@/components/ui/react-select";

function FlightBooking() {
	const [loading, setLoading] = useState(false);
	const [flights, setFlights] = useState([]);
	const [error, setError] = useState(false);
	const [dateSelected, setDateSelected] = useState(null);

	const flightSearchSchema = z.object({
		origin: z.string(),
		destination: z.string(),
		date: z.string(),
		adults: z.number(),
	})

	const form = useForm({
		resolver: zodResolver(flightSearchSchema),
		defaultValues: {
			origin: "",
			destination: "",
			date: "",
			adults: 1,
		},
	});

	const handleDateChange = (date) => {
		// Ensure the date is in the correct format (without time portion)
		const adjustedDate = new Date(date);
		adjustedDate.setHours(12, 0, 0, 0); // Set the time to midday to avoid timezone issues
		form.setValue("date", adjustedDate.toISOString().split("T")[0]);  // Update the form date value
		setDateSelected(adjustedDate);  // Manually update a separate state to force a re-render
	};


	const fetchFlights = async (origin, destination, date, adults) => {
		setLoading(true);
		setError(false);
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
			setError(true);
		} else {
			setFlights(response);
			setError(false);
		}
		setLoading(false);
	};

	const handleSubmit = async (data) => {
		fetchFlights(data.origin, data.destination, data.date, data.adults);
	}

	return (
		<div className="w-full">
			<div className="flex gap-10 flex-col">
				<div className="shrink-0">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)} className="gap-4 flex items-end justify-between">
							<FormItem className="w-36 shrink-0">
								<FormLabel htmlFor="origin">Origin</FormLabel>
								<FormControl>
									{/* <Input {...form.register("origin")} id="origin" /> */}
									<ReactSelect
										options={iataCodes}
										onChange={(selected) => { form.setValue("origin", selected.value); console.log(form.getValues()); }}
									/>
								</FormControl>
							</FormItem>
							<FormItem className="w-36 shrink-0">
								<FormLabel htmlFor="destination">Destination</FormLabel>
								<FormControl>
									{/* <Input {...form.register("destination")} id="destination" /> */}
									<ReactSelect
										options={iataCodes}
										onChange={(selected) => { form.setValue("destination", selected.value); console.log(form.getValues()); }}
									/>
								</FormControl>
							</FormItem>
							<FormItem className="flex flex-col shrink-0">
								<FormLabel htmlFor="date" className="mb-0.5">Date</FormLabel>
								{console.log("DATE: ", form.getValues("date"))}
								{console.log("FORMAT: ", new Date(form.getValues("date")))}
								<FormControl>
									{/* <Input {...form.register("date")} id="date" /> */}
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={`w-[220px] justify-start text-left font-normal ${!form.getValues("date") && "text-muted-foreground"}`}
											>
												<CalendarIcon />
												{form.getValues("date") ? format(new Date(form.getValues("date")), "PPP") : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={dateSelected || form.getValues("date") ? new Date(form.getValues("date")) : null}
												onSelect={handleDateChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
							</FormItem>
							<FormItem className="w-full">
								<FormLabel htmlFor="adults">Adults</FormLabel>
								<FormControl>
									<Input {...form.register("adults")} id="adults"
										onChange={(e) => { form.setValue("adults", parseInt(e.target.value)); console.log(form.getValues()); }}
									/>
								</FormControl>
							</FormItem>
							<FormItem>
								<Button
									type="submit"
									onClick={() => handleSubmit(form.getValues())}
								>
									Search
								</Button>
							</FormItem>
						</form>
					</Form>
				</div>
				{!loading && error ? (
					<div className="flex justify-center w-full">
						<p className="text-neutral-400 text-sm italic">No hotels found</p>
					</div>
				) : loading ? (
					<div className="flex justify-center w-full">
						<p className="text-neutral-400 text-sm italic">Loading...</p>
					</div>
				) : (
					<div className="w-[1000px] -ml-[240px]">
						<CardContainer
							cardList={flights}
							cardType={"flight"}
							fetchCardData={fetchFlights}
							columns={4}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default FlightBooking;