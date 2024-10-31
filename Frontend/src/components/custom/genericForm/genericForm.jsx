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

import { ArrayField } from './input-fields/ArrayField';
import { CheckboxField } from './input-fields/CheckboxField';
import { CoordinatesField } from './input-fields/CoordinatesField';
import { TextField } from './input-fields/TextField';

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

	function renderField(key, value, path = '') {
		const fullPath = path ? `${path}.${key}` : key;
		
		if (Array.isArray(value)) {
		  return (
			<ArrayField
			  key={fullPath}
			  name={fullPath}
			  control={form.control}
			  initialValue={typeof value[0]}
			  label={key.toUpperCase()}
			/>
		  );
		}
	
		if (key === 'coordinates') {
		  return (
			<CoordinatesField
			  key={fullPath}
			  name={fullPath}
			  control={form.control}
			  label={key.toUpperCase()}
			/>
		  );
		}
	
		if (typeof value === 'object' && value !== null) {
		  return (
			<div key={fullPath}>
			  <h3 className="text-lg font-semibold mb-2">{key.toUpperCase()}</h3>
			  <div className="ml-4">
				{Object.entries(value).map(([nestedKey, nestedValue]) =>
				  renderField(nestedKey, nestedValue, fullPath)
				)}
			  </div>
			</div>
		  );
		}
	
		if (typeof value === 'boolean') {
		  return (
			<CheckboxField
			  key={fullPath}
			  name={fullPath}
			  control={form.control}
			  label={key.toUpperCase()}
			/>
		  );
		}
	
		return (
		  <TextField
			key={fullPath}
			name={fullPath}
			control={form.control}
			type={
			  typeof value === 'number'
				? 'number'
				: value === 'date'
				? 'date'
				: 'text'
			}
			label={key.toUpperCase()}
		  />
		);
	  }

	  return (
		<div>
		  <Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			  {Object.entries(fields).map(([key, value]) => renderField(key, value))}
			  <Button type="submit" className="bg-dark text-white">
				Submit
			  </Button>
			</form>
		  </Form>
		</div>
	  );
}
export default GenericForm;
