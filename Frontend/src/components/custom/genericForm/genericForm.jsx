import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import GoogleMapWrite from "../maps/GoogleMapWrite";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateSeller } from "@/services/SellerApiHandler";
import { updateTourGuide } from "@/services/TourGuideApiHandler";
import { updateTourist } from "@/services/TouristApiHandler";
import { updateAdvertiser } from "@/services/AdvertiserApiHandler";
import { updateItinerary } from "@/services/ItineraryApiHandler";
import { createItinerary } from "@/services/ItineraryApiHandler";
import { updateProduct } from "@/services/ProductApiHandler";
import { createProduct } from "@/services/ProductApiHandler";
import { createActivity } from "@/services/ActivityApiHandler";
import { createSite } from "@/services/SiteApiHandler";
import { updateActivity } from "@/services/ActivityApiHandler";
import { updateSite } from "@/services/SiteApiHandler";

import { parseZodSchema } from "@/components/custom/genericForm/form-schemas/formMap";
import formMap from "@/components/custom/genericForm/form-schemas/formMap";

export function GenericForm({ type, data, id }) {

	/*
		To use generic form, you need to pass the type of form you want to use in formMap.js as shown below.
		If you want to create a new form:
		1. Create a new schema in form-schemas folder.
		2. Import the schema in formMap.js.
		3. Add the schema to the formMap object.
		Form Schemas are defined using zod. You can reference other schemas or zod documentation for more information.
	*/

	// Define the form schema using zod.
	const formSchema = z.object(formMap[type]);

	// Parse the form schema to get the fields.
	const fields = parseZodSchema(formSchema);

	if (data) {
		for (const key in fields) {
			if (data[key]) {
				fields[key] = data[key];
			}
		}
	}

	// Create the form using react-hook-form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: fields,
	});

	function onSubmit(values) {
		// Call the appropriate API function based on the type of the form.
		if (type === "tourist") {
			updateTourist(id, values);
		}
		if (type === "tourGuide") {
			updateTourGuide(id, values);
		}
		if (type === "seller") {
			updateSeller(id, values);
		}
		if (type === "advertiser") {
			updateAdvertiser(values, id);
		}
		if (type === "itinerary") {
			if (data) {
				updateItinerary(data._id, values);
			} else {
				const itineraryWithId = {
					...values,
					creatorId: id,
				};
				createItinerary(itineraryWithId);
			}
		}
		if (type === "product") {
			if (data) {
				updateProduct(data._id, values);
				console.log(values);
			} else {
				const productWithId = {
					...values,
					seller: id,
				};
				createProduct(productWithId);
			}
		}
		if (type === "activity") {
			if (data) {
				const activityId = data._id;
				updateActivity(activityId, values);
			} else {
				const activityWithId = {
					...values,
					creatorId: id,
				};
				createActivity(activityWithId);
			}
		}
		if (type === "site") {
			if (data) {
				updateSite(data._id, values);
			} else {
				const siteWithId = {
					...values,
					creatorId: id,
				};
				createSite(siteWithId);
			}
		}
		if (type === "experience") {
			const previousWork = {};
			for (const key in values) {
				if (key === "jobTitle") {
					previousWork.jobTitle = values[key];
				}
				if (key === "companyName") {
					previousWork.companyName = values[key];
				}
				if (key === "duration") {
					previousWork.duration = values[key];
				}
				if (key === "description") {
					previousWork.description = values[key];
				}
			}

			const body = {
				previousWork: {
					...previousWork,
				},
			};

			if (data) {
				body.previousWork._id = data._id;
			}

			updateTourGuide(id, body);
		}
		if (type === "company") {
			let companyProfile = {};
			for (const key in values) {
				if (key === "name") {
					companyProfile.name = values[key];
				}
				if (key === "description") {
					companyProfile.description = values[key];
				}
				if (key === "location") {
					companyProfile.location = values[key];
				}
			}
			const body = {
				id: id,
				companyProfile: companyProfile,
			};
			updateAdvertiser(body, id);
		}
	}

	function ArrayFieldRenderer({ name, control, initialValue }) {
		const {
			fields: arrayFields,
			append,
			remove,
		} = useFieldArray({
			control,
			name,
		});

		return (
			<div className="space-y-4">
				<FormLabel>{name}</FormLabel>

				{arrayFields.map((field, index) => (
					<div key={field.id} className="flex items-center space-x-4">
						<FormField
							control={control}
							name={`${name}.${index}`}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type={
												initialValue === "number"
													? "number"
													: "text"
											} // Set type based on initialValue
											className="text-black"
											placeholder={`Item ${index + 1}`}
											onChange={(e) => {
												const value =
													initialValue === "number"
														? Number(e.target.value)
														: e.target.value;
												field.onChange(value);
											}}
											value={field.value} // Make sure to bind the input value
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="button"
							onClick={() => remove(index)}
							className="bg-red-500 text-white"
						>
							Remove
						</Button>
					</div>
				))}
				<Button
					type="button"
					onClick={() =>
						append(initialValue === "number" ? 1 : "string")
					} // Initialize with a number or string based on the type
					className="bg-blue-500 text-white"
				>
					Add Item
				</Button>
			</div>
		);
	}

	function renderFields(values, path = "") {
		return Object.keys(values).map((key) => {
			const fullPath = path ? `${path}.${key}` : key;
			const isCoordinates = key === "coordinates";
			const isArray = Array.isArray(values[key]);
			const isObject =
				typeof values[key] === "object" && values[key] !== null;

			if (isArray) {
				return (
					<ArrayFieldRenderer
						key={fullPath}
						name={fullPath}
						control={form.control}
						initialValue={typeof values[key][0]}
					/>
				);
			}

			if (isCoordinates) {
				return (
					<FormField
						key={`${fullPath}.coordinates`}
						control={form.control}
						name={fullPath}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{key.toUpperCase()}</FormLabel>
								<FormControl>
									<GoogleMapWrite
										lat={field.value.lat}
										lng={field.value.lng}
										onChange={(newPosition) => field.onChange(newPosition)} // Pass onChange function
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				);
			}

			if (isObject) {
				return (
					<div key={fullPath}>
						<FormLabel>{key}</FormLabel>
						{renderFields(values[key], fullPath)}
					</div>
				);
			}

			const isNumberField = typeof values[key] === "number";
			const isDateField = values[key] === "date";
			const isBooleanField = typeof values[key] === "boolean";

			return (
				<FormField
					key={fullPath}
					control={form.control}
					name={fullPath}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{key.toUpperCase()}</FormLabel>
							<FormControl>
								{isBooleanField ? (
									<input
										{...field}
										type="checkbox"
										className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
										checked={field.value}
										onChange={(e) =>
											field.onChange(e.target.checked)
										}
									/>
								) : (
									<Input
										{...field}
										type={
											isNumberField
												? "number"
												: isDateField
													? "date"
													: "text"
										}
										className="text-black"
										onChange={(e) => {
											if (isDateField) {
												// Format the date to yyyy-MM-dd
												const formattedDate = format(
													new Date(e.target.value),
													"yyyy-MM-dd"
												);
												field.onChange(formattedDate);
											} else {
												field.onChange(
													isNumberField
														? Number(e.target.value)
														: e.target.value
												);
											}
										}}
									/>
								)}
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			);
		});
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					{renderFields(fields)}
					<Button type="submit" className="bg-dark text-white">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
export default GenericForm;
