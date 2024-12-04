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
import { TextArea } from './input-fields/TextArea';
import { FileUpload } from './input-fields/FileUploadField';
import { forms } from "./forms";
import { SelectField } from "./input-fields/SelectField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCurrency } from "@/state management/userInfo";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { MultiSelectField } from "./input-fields/MultiSelectField";
import { DateTimeField } from "./input-fields/DateTimeField";

export function GenericForm({ type, data, id, fetcher }) {
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
		// formatDateFields(formFields, defaultValues);
	}

	// Create the form using react-hook-form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currency = useCurrency();
	const { toast } = useToast();
	const handleSubmit = (values) => {
		try {
			if (typeof onSubmit === "function") {
				if (onSubmit.length === 5) {
					onSubmit(values, id, navigate, dispatch, currency);
				} else {
					onSubmit(values, id, data, navigate, dispatch, currency);
				}
				if (typeof fetcher === "function") {
					fetcher();
				}
				//toast({ description: "Submitted" });
			}
		} catch (e) {
			toast({ description: `Error occured on submission: ${e.message}` });
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
						initialValue={field.arrayType}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
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
						description={field.description}
					/>
				);

			case "object":
				return (
					<div key={fullPath}>
						<h3 className="text-lg font-semibold mb-2">
							{field.label || field.name.toUpperCase()}
						</h3>
						<div className="">
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
						description={field.description}
					/>
				);

			case "checkbox":
				return (
					<CheckboxField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case "select":
				return (
					<SelectField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						options={field.options}
						defaultValue={defaultValues[fullPath]}
						description={field.description}
					/>
				);
			case "multiSelect":
				return (
					<MultiSelectField
						key={fullPath}
						name={fullPath}
						control={form.control}
						label={field.label || field.name.toUpperCase()}
						options={field.options}
						defaultValue={defaultValues[fullPath]}
						description={field.description}
					/>
				);

			case "date":
				return (
					<DateTimeField
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case "text":
			case "number":
				return (
					<TextField
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case 'textArea':
				return (
					<TextArea
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			case 'file':
				return (
					<FileUpload
						key={fullPath}
						name={fullPath}
						control={form.control}
						type={field.type}
						label={field.label || field.name.toUpperCase()}
						description={field.description}
					/>
				);
			default:
				return null;
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					{formFields.map((field) => renderField(field))}
					<Button type="submit" className="mt-2 w-max">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
export default GenericForm;
