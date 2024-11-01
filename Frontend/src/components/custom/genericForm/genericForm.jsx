import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrayField } from './input-fields/ArrayField';
import { CheckboxField } from './input-fields/CheckboxField';
import { CoordinatesField } from './input-fields/CoordinatesField';
import { TextField } from './input-fields/TextField';
import { forms } from "./forms";

export function GenericForm({ type, data, id }) {
	
	// If you need more information about how this component works, check out forms.js in the same folder.
	const formObject = forms[type];

	const onSubmit = formObject.onSubmit;
	const defaultValues = formObject.defaultValues;
	const formSchema = z.object(formObject.zodSchema);
	const formFields = formObject.renderedFields;

	if (data) {
		for (const key in defaultValues) {
			if (data[key]) {
				defaultValues[key] = data[key];
			}
		}
	}

	console.log(defaultValues);

	// Create the form using react-hook-form.
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});


	function renderField(field, path = '') {
		const fullPath = path ? `${path}.${field.name}` : field.name;
	  
		switch (field.type) {
		  case 'array':
			return (
			  <ArrayField
				key={fullPath}
				name={fullPath}
				control={form.control}
				initialValue={field.type}
				label={field.label || field.name.toUpperCase()}
			  />
			);
	  
		  case 'coordinates':
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
	  
		  case 'object':
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
	  
		  case 'checkbox':
			return (
			  <CheckboxField
				key={fullPath}
				name={fullPath}
				control={form.control}
				label={field.label || field.name.toUpperCase()}
			  />
			);
	  
		  case 'text':
		  case 'number':
		  case 'date':
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
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
