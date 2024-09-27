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
        number: 1234567890,
    }

    // Create a form schema object based on the temporary hard-coded values.
    let formSchemaObject = {};
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
    }
    // Define the form schema using zod.
    const formSchema = z.object(formSchemaObject);

    // Create the form using react-hook-form.
    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values) {
    // Do something with the form values.
    console.log(values)
    }
  return (
    <div className="bg-white text-dark p-8 rounded-md m-auto">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </div>
  )
}
export default GenericForm;