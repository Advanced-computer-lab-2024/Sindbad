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
import { updateSeller } from "@/services/SellerApiHandler"
import { updateTourGuide } from "@/services/TourGuideApiHandler"
import { updateTourist } from "@/services/TouristApiHandler"
import { updateAdvertiser } from "@/services/AdvertiserApiHandler"
import { parseZodSchema } from "@/utilities/formMap"
import { useFieldArray } from "react-hook-form"
export function GenericForm( { type, data, id } ) {

    // formSchemaObject is an object that will be used to create the form schema. It will contain the keys of the temporaryHardCodedValues object,
    // and the values will be zod types based on the type of the value in the temporaryHardCodedValues object.
    // console.log(parsedFormMap);
    let formSchemaObject = formMap["site"];
    
    // Define the form schema using zod.
    const formSchema = z.object(formSchemaObject);

    // Parse the form schema to get the fields.
    const fields = parseZodSchema(formSchema);
    
    // Create the form using react-hook-form.
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: fields,
    })

    function onSubmit(values) {
      console.log(values);
      // Call the appropriate API function based on the type of the form.
      // if (type === "tourist") {
      //     updateTourist(id, values);
      // }
      // if (type === "tourGuide") {
      //     updateTourGuide(id, values);
      // }
      // if (type === "seller") {
      //     updateSeller(id, values);
      // }
      // if (type === "advertiser"){
      //     updateAdvertiser(values);
      // }
      // if (type === "itinerary") {
      //     // Call the appropriate API function to update the itinerary.
      // }
      // if (type === "product") {
      //     // Call the appropriate API function to update the product.
      // }
      // if (type === "activity") {
      //     // Call the appropriate API function to update the activity.
      // }
      // if (type === "site") {
      //   // Call the appropriate API function to update the site.
      // }
    }

    function ArrayFieldRenderer({ name, control, initialValue }) {
      const { fields: arrayFields, append, remove } = useFieldArray({
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
                        type={initialValue === "number" ? "number" : "text"} // Set type based on initialValue
                        className="text-white"
                        placeholder={`Item ${index + 1}`}
                        onChange={(e) => {
                          const value = initialValue === "number" ? Number(e.target.value) : e.target.value;
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
            onClick={() => append(initialValue === "number" ? 1 : "string")} // Initialize with a number or string based on the type
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
        const isArray = Array.isArray(values[key]);
        const isObject = typeof values[key] === "object" && values[key] !== null;
  
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
  
        if (isObject) {
          return (
            <div key={fullPath}>
              <FormLabel>{key}</FormLabel>
              {renderFields(values[key], fullPath)}
            </div>
          );
        }
  
        const isNumberField = typeof values[key] === "number";
        return (
          <FormField
            key={fullPath}
            control={form.control}
            name={fullPath}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{key.toUpperCase()}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={isNumberField ? "number" : "text"}
                    className="text-white"
                    onChange={(e) => field.onChange(isNumberField ? Number(e.target.value) : e.target.value)}
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
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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