import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function GenericForm() {

    // Define temporary hard-coded values for the form schema. In the future, these hard coded values should be moved to a more appropriate location, 
    // or be inferred from the API (getting an object with a get request and using the keys of that object to create the form schema).
    const temporaryHardCodedValues = {
        username: "JohnDoe",
        password: "password",
        email: "test@gmail.com",
        firstName: "John",
        lastName: "Doe",
        bio: "This is a bio",
        age: 20,
    }

    // Create a form schema object based on the temporary hard-coded values.
    // formSchemaObject is an object that will be used to create the form schema. It will contain the keys of the temporaryHardCodedValues object,
    // and the values will be zod types based on the type of the value in the temporaryHardCodedValues object.
    let formSchemaObject = {};
    let defaultValues = {};
    for (const key in temporaryHardCodedValues) {
        const value = temporaryHardCodedValues[key]
        if (key == "email") {
            formSchemaObject[key] = z.string().email({
                message: "Invalid email.",
            });
        }
        if (key == "password") {
            formSchemaObject[key] = z.string().min(8, {
                message: "Password must be at least 8 characters.",
            });
        }
        else {
            if (typeof value === "string") {
                formSchemaObject[key] = z.string().min(2, {
                    message: `${key} must be at least 2 characters.`,
                });
            }
            else if (typeof value === "number") {
                formSchemaObject[key] = z.number().min(0, {
                    message: `${key} must be a positive number.`,
                }).nonnegative();
            }
            else if (typeof value === "boolean") {
                formSchemaObject[key] = z.boolean();
            }
        }
        defaultValues[key] = "";
    }

    // Define the form schema using zod.
    const formSchema = z.object(formSchemaObject);

    // Create the form using react-hook-form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    function onSubmit(values) {
    // Do something with the form values.
    console.log(values)
    }

    function renderFields() {
        return Object.keys(temporaryHardCodedValues).map((key,value) => {
            const isNumberField = typeof temporaryHardCodedValues[key] === "number";
            return (
                <FormField
                    control={form.control}
                    name={key}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{key}</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                type={isNumberField ? "number" : "text"}
                                onChange={(e) => {
                                    // If the field is a number, convert the value to a number. This is to avoid issues with form validation as the inputs usually otput strings and not numbers.
                                    field.onChange(isNumberField ? Number(e.target.value) : e.target.value);
                                }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
        });
    }

  return (
    <div className="bg-white text-dark p-8 rounded-md m-auto">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {renderFields()}
                <Button type="submit" className="bg-dark text-white">Submit</Button>
            </form>
        </Form>
    </div>
  )
}
export default GenericForm;