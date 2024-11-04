import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";




function ComplaintView(){
    
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const complaintFormSchema = z.object({
        title: z.string().min(1, {
            message: "Title is required",
        }),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date",
        }),
        body: z.string().min(1, {
            message: "Body is required",
        }),
        
    });

    const complaintDefaultValues = {
        title: "",
        date: "",
        body: "",
    };

    const complaintForm = useForm({
        resolver: zodResolver(complaintFormSchema),
        defaultValues: complaintDefaultValues,
    });

    const handleComplaintFormSubmit = (data) => {
        submitForm({ ...formValues, ...data });
    };

    const submitForm = async (values) => {
        // setLoading(true);
        // const response = submit the form
        // setLoading(false);

        // if (response.error) {
        //     setError(response.display);
        // } else {
        //     // add toast!!!!!!!!!!!!!!!!, thank will be reviewed
        // }
    }

    const renderComplaintforms = () => (
        <>
            <FormField
                key="Title"
                control={complaintForm.control}
                name="Title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="Title">Issue experinced</FormLabel>
                        <FormControl>
                            <Input id="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="Date"
                control={complaintForm.control}
                name="Date"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="Date">Date issue encountered</FormLabel>
                        <FormControl>
                            <Input id="Date" {...field} type="date"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="Body"
                control={complaintForm.control}
                name="Body"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="Body">Description of issue experinced</FormLabel>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );

    return(
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex flex-col justify-center items-center p-12">
                    <h1 className="font-semibold text-3xl mb-8">
                        Thank you for reaching out, What's the issue?
                    </h1>
                    <div className="w-2/5 flex flex-col gap-4">
                        <Form {...complaintForm}>
                            <form onSubmit={complaintForm.handleSubmit(handleComplaintFormSubmit)} className="gap-2 flex flex-col">
                                {renderComplaintforms()}
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <Button type="submit" disabled={loading} className="bg-primary-700 justify-center w-full mt-4">
                                    Submit report
                                </Button>
                            </form>
                        </Form>
                    </div>
            </div>

            <hr className="border-neutral-300 border w-1/2 mt-1.5 self-center" />
            
            <div className="flex flex-col  justify-center items-center">
                <h1 className="font-semibold text-2xl mb-4 p-8 text-s">
                    Past reports
                </h1>
                
            </div>
        </div>
    )

}
export default ComplaintView;