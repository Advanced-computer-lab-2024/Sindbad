import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import formMap from "@/utilities/formMap"

export function GenericForm( { type, userData } ) {

    // formSchemaObject is an object that will be used to create the form schema. It will contain the keys of the temporaryHardCodedValues object,
    // and the values will be zod types based on the type of the value in the temporaryHardCodedValues object.
    let formSchemaObject = formMap[type];
    let defaultValues = {};

    for (const key in formSchemaObject) {
        if (userData[key]) {
            defaultValues[key] = userData[key];
            continue;
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
        return Object.keys(defaultValues).map((key) => {
          const isNumberField = typeof defaultValues[key] === "number";
          return (
            <FormField
              key={key}
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
                        // If the field is a number, convert the value to a number.
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
    <div className="">
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