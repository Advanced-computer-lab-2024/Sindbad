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

				return null; // Return null for unsupported types
			})}
		</div>
	);
};

export default GenericFilter;
