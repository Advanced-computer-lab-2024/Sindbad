import { Input } from "@/components/ui/input";
import { SliderFilter } from "@/components/ui/slider-filter";
import { useEffect, useState } from "react";
import ReactSelect from "../ui/react-select";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const GenericFilter = ({ formFields, setActiveFilters, activeFilters }) => {
	// Function to handle changes and update the filter object
	const handleChange = (key, value) => {
		console.log("KEY: ", key, "VALUE: ", value);
		// Check if value is an object or a direct value
		if (typeof value === "object" && value !== null) {
			setActiveFilters((prev) => ({
				...prev,
				[key]: {
					...prev[key],
					...value, // Merge the existing filter values with the new ones
				},
			}));
		} else {
			setActiveFilters((prev) => ({
				...prev,
				[key]: value, // Directly set the filter value for the given key
			}));
		}
	};

	// useEffect(() => {
	// 	console.log(activeFilters);
	// 	console.log(formFields);
	// }
	// , [activeFilters]);

	const Select = ({ options, value, onChange }) => {
		return (
			// <select
			// 	style={{ backgroundColor: "rgb(17, 17, 17)" }} // Added this line because idk the color of the background
			// 	className="border rounded p-2 text-white"
			// 	value={value}
			// 	onChange={onChange}
			// >
			// 	<option value="">Select...</option>
			// 	{options.map((option, index) => (
			// 		<option key={index} value={option}>
			// 			{option}
			// 		</option>
			// 	))}
			// </select>
			<ReactSelect
				options={options.map((option) => ({
					value: option,
					label: option,
				}))}
				onChange={onChange}
				value={{
					value: value,
					label: value,
				}}
			/>
		);
	};

	const DateRange = ({
		startDate,
		endDate,
		setDate
	}) => {
		const [isPopoverOpen, setIsPopoverOpen] = useState(false);
		const [selected, setSelected] = useState({ from: startDate, to: endDate });

		const handleClearSelection = () => {
			setSelected({ from: null, to: null });
			setDate(null, null);
			setIsPopoverOpen(false);
		};

		return (
			<div className="grid gap-2">
				<Popover
					open={isPopoverOpen}
					onOpenChange={(isOpen) => {
						if (!isOpen) {
							setDate(selected?.from, selected?.to || null); // Apply selection when popover closes
						}
						setIsPopoverOpen(isOpen);
					}} // Manages the open state
				>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant="outline"
							className={`w-full justify-start text-left font-normal ${!selected?.from && !selected?.to && "text-muted-foreground"
								}`}
						>
							<CalendarIcon />
							{selected?.from ? (
								selected?.to ? (
									<>
										{format(selected.from, "LLL dd, y")} -{" "}
										{format(selected.to, "LLL dd, y")}
									</>
								) : (
									format(selected.from, "LLL dd, y")
								)
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={selected?.from || new Date()}
							selected={selected}
							onSelect={(selected) => {
								// Update the selection; allow only start date to be set
								setSelected(selected);
							}}
							numberOfMonths={2}
						/>
						<div className="flex justify-end p-2 gap-2">
							<Button
								size="sm"
								variant="outline"
								onClick={handleClearSelection} // Clear selection and reset dates
							>
								Clear
							</Button>
							<Button
								size="sm"
								onClick={() => {
									setDate(selected?.from, selected?.to || null);
									setIsPopoverOpen(false);
								}}
							>
								Apply
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		);
	};


	return (
		<div className="flex flex-col gap-7">
			{Object.keys(formFields).map((key) => {
				const field = formFields[key];

				// Render the search input field
				if (field.type === "search") {
					return (
						<div key={key}>
							<h2 className="text-md font-semibold mb-2">
								{field.label}
							</h2>
							<Input
								type="text"
								placeholder="Search..."
								onChange={(e) =>
									handleChange(key, e.target.value)
								}
							/>
						</div>
					);
				}

				// Render number range using SliderFilter component
				if (field.type === "range") {
					// const defaultFilterValues = activeFilters[key];
					const { range } = field;

					return (
						<div key={key}>
							<SliderFilter
								setMin={
									(min) => handleChange(key, { min }) // Update only the min price here
								}
								setMax={
									(max) => handleChange(key, { max }) // Update only the max price here
								}
								min={activeFilters[key].min} // Ensure it pulls from activeFilters
								max={activeFilters[key].max} // Ensure it pulls from activeFilters
								range={range}
								step={field.step}
								label={field.label}
							/>
						</div>
					);
				}
				// Render the date range input
				if (field.type === "date") {
					const defaultFilterValues = activeFilters[key];

					return (
						<div key={key}>
							<h2 className="text-md font-semibold mb-2">
								{field.label}
							</h2>
							<DateRange
								startDate={defaultFilterValues.start}
								endDate={defaultFilterValues.end}
								setDate={(start, end) =>
									handleChange(key, {
										start,
										end,
									})
								}
							/>
						</div>
					);
				}

				// Render the select inputs
				if (field.type === "select") {
					return (
						<div key={key}>
							<h2 className="text-md font-semibold mb-2">
								{field.label}
							</h2>
							<Select
								options={field.options}
								value={activeFilters[key].selected}
								onChange={(e) =>
									handleChange(key, {
										...activeFilters[key],
										selected: e.value, // Spread the existing values
									})
								}
							/>
						</div>
					);
				}

				return null; // Return null for unsupported types
			})}
		</div>
	);
};

export default GenericFilter;