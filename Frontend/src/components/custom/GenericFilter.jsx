/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { PriceFilter } from "@/components/ui/price-filter";

const GenericFilter = ({ formFields, setActiveFilters, activeFilters }) => {
	// Function to handle changes and update the filter object
	const handleChange = (key, value) => {
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

	const Select = ({ options, value, onChange }) => {
		return (
			<select
				style={{ backgroundColor: "rgb(17, 17, 17)" }} // Added this line because idk the color of the background
				className="border rounded p-2 text-white"
				value={value}
				onChange={onChange}
			>
				<option value="">Select...</option>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	};

	const DateRange = ({
		startDate,
		endDate,
		onStartDateChange,
		onEndDateChange,
	}) => {
		return (
			<div className="flex gap-4">
				<Input
					type="date"
					value={startDate}
					onChange={(e) => onStartDateChange(e.target.value)}
				/>
				<Input
					type="date"
					value={endDate}
					onChange={(e) => onEndDateChange(e.target.value)}
				/>
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

				// Render number range using PriceFilter component
				if (field.type === "range") {
					// const defaultFilterValues = activeFilters[key];
					const priceRange = {
						minPrice: field.min,
						maxPrice: field.max,
					};

					return (
						<div key={key}>
							<PriceFilter
								setMinPrice={
									(min) => handleChange(key, { min }) // Update only the min price here
								}
								setMaxPrice={
									(max) => handleChange(key, { max }) // Update only the max price here
								}
								minPrice={activeFilters[key].min} // Ensure it pulls from activeFilters
								maxPrice={activeFilters[key].max} // Ensure it pulls from activeFilters
								priceRange={priceRange}
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
								onStartDateChange={(start) =>
									handleChange(key, {
										...defaultFilterValues,
										start: start, // Override the "start" value
									})
								}
								onEndDateChange={(end) =>
									handleChange(key, {
										...defaultFilterValues,
										end: end, // Override the "end" value
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
										selected: e.target.value, // Spread the existing values
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
