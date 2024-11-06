import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrayField } from "./input-fields/ArrayField";
import { ObjectArrayField } from "./input-fields/ObjectArrayField";
import { CheckboxField } from "./input-fields/CheckboxField";
import { CoordinatesField } from "./input-fields/CoordinatesField";
import { TextField } from "./input-fields/TextField";
import { forms } from "./forms";

export function GenericForm({ type, data, id }) {
	// If you need more information about how this component works, check out forms.js in the same folder.
	const formObject = forms[type];

	const onSubmit = formObject.onSubmit;
	const formSchema = z.object(formObject.zodSchema);
	const formFields = formObject.renderedFields;

	// Clone defaultValues to avoid mutation issues
	const defaultValues = structuredClone(formObject.defaultValues);

	// Helper function to format date fields
	// HACK: Zenacious
	const formatDateFields = (fields, values) => {
		fields.forEach((field) => {
			if (field.type === "date" && values[field.name]) {
				values[field.name] = new Date(values[field.name])
					.toISOString()
					.split("T")[0];
			} else if (field.type === "object" && values[field.name]) {
				formatDateFields(field.fields, values[field.name]);
			} else if (
				field.type === "objectArray" &&
				Array.isArray(values[field.name])
			) {
				values[field.name].forEach((item) =>
					formatDateFields(field.fields, item)
				);
			}
		});
	};

	// If data is passed, overwrite default values with data values
	if (data) {
		for (const key in defaultValues) {
			if (data[key]) {
				defaultValues[key] = data[key];
			}
		}
		formatDateFields(formFields, defaultValues);
	}

	// Create the form using react-hook-form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	const handleSubmit = (values) => {
		if (typeof onSubmit === "function") {
			if (onSubmit.length === 2) {
				onSubmit(values, id);
			} else {
				onSubmit(values, id, data);
			}
		}
	};

	function renderField(field, path = "") {
		const fullPath = path ? `${path}.${field.name}` : field.name;

		switch (field.type) {
			case "array":
				return (
					<ArrayField
						key={fullPath}
						name={fullPath}
						control={form.control}
						initialValue={field.type}
						label={field.label || field.name.toUpperCase()}
					/>
				);

			case "coordinates":
				return (
					<CoordinatesField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						latitude={field.latitude}
						longitude={field.longitude}
					/>
				);

			case "object":
				return (
					<div key={fullPath}>
						<h3 className="text-lg font-semibold mb-2">
							{field.label || field.name.toUpperCase()}
						</h3>
						<div className="ml-4">
							{field.fields.map((nestedField) =>
								renderField(nestedField, fullPath)
							)}
						</div>
					</div>
				);

			case "objectArray":
				return (
					<ObjectArrayField
						key={fullPath}
						name={fullPath}
						control={form.control}
						initialValue={field.fields.reduce(
							(acc, curr) => ({
								...acc,
								[curr.name]: curr.type === "number" ? 0 : "",
							}),
							{}
						)}
						label={field.label || field.name.toUpperCase()}
						fieldsSchema={field.fields}
					/>
				);

			case "checkbox":
				return (
					<CheckboxField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
					/>
				);

			case "text":
			case "number":
			case "date":
				return (
					<TextField
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
					/>
				);

			default:
				return null;
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
					{formFields.map((field) => renderField(field))}
					<Button type="submit" className="bg-dark text-white">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
export default GenericForm;
