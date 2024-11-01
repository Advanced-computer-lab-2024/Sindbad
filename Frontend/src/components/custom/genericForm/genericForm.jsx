import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import formMap from "@/components/custom/genericForm/form-schemas/formMap";
import { ArrayField } from './input-fields/ArrayField';
import { CheckboxField } from './input-fields/CheckboxField';
import { CoordinatesField } from './input-fields/CoordinatesField';
import { TextField } from './input-fields/TextField';
import { forms } from "./forms";

export function GenericForm({ type, data, id }) {
	
	// If you need more information about how this component works, check out forms.js in the same folder.
	const formObject = forms[type];

	const onSubmit = formObject.onSubmit;
	const fields = formObject.defaultValues;
	const formSchema = z.object(formObject.zodSchema);
	const formFields = formObject.renderedFields;

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
