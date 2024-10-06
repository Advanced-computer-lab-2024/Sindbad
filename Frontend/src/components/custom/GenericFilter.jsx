/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Input } from "@/components/ui/input";
import { PriceFilter } from "@/components/ui/price-filter";

const GenericFilter = ({ formFields, setActiveFilters, activeFilters }) => {
	// Function to handle changes and update the filter object
	const handleChange = (key, value) => {
		setActiveFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const Select = ({ options, value, onChange }) => {
		return (
			<select value={value} onChange={onChange} className="border rounded p-2">
				<option value="">Select...</option>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	};

	const DateRange = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
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

				// Render the budget range using PriceFilter
				if (field.type === "range") {
					const filterValues = activeFilters[key];

					return (
						<div key={key}>
							<PriceFilter
								setMinPrice={(min) =>
									handleChange(key, {
										...filterValues,
										min: min, // Override the "min" value
									})
								}
								setMaxPrice={(max) =>
									handleChange(key, {
										...filterValues,
										max: max, // Override the "max" value
									})
								}
								minPrice={filterValues.min} // Use current or default min
								maxPrice={filterValues.max} // Use current or default max
								label={field.label}
							/>
						</div>
					);
				}
				// Render the date range input
				if (field.type === "date") {
					const filterValues = activeFilters[key];

					return (
						<div key={key}>
							<h2 className="text-md font-semibold mb-2">
								{field.label}
							</h2>
							<DateRange
								startDate={filterValues.start}
								endDate={filterValues.end}
								onStartDateChange={(start) =>
									handleChange(key, {
										...filterValues,
										start: start, // Override the "start" value
									})
								}
								onEndDateChange={(end) =>
									handleChange(key, {
										...filterValues,
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
