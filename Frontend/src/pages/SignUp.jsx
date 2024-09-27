import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { date, z } from "zod"

function SignUp() {

    const [registerType, setRegisterType] = useState("Tourist");

    //this is the schema for the tourist form
    const touristFormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Invalid email.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        mobileNumber: z.string().min(8, {
            message: "Invalid mobile number.",
        }),
        nationality: z.string(),
        dateOfBirth: z.string().date({
            message: "Invalid date.",
        }),
        job: z.string(),
    });

    const touristDefaultValues = {
        username: "",
        email: "",
        password: "",
        mobileNumber: "",
        nationality: "",
        dateOfBirth: "",
        job: "",
    }

    //this is the schema for the other forms (tour guide, advertiser, seller)
    const otherFormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Invalid email.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    });

    const otherDefaultValues = {
        username: "",
        email: "",
        password: "",
    }

    const [currentForm, setCurrentForm] = useState(touristFormSchema);
    const [defaultValues, setDefaultValues] = useState(touristDefaultValues);

    const form = useForm({
        resolver: zodResolver(currentForm),
        defaultValues: defaultValues,
    })

    function handleRegisterTypeChange(value) {
        setRegisterType(value);
        if (value === "Tourist") {
            setCurrentForm(touristFormSchema);
            setDefaultValues(touristDefaultValues);
        } else {
            setCurrentForm(otherFormSchema);
            setDefaultValues(otherDefaultValues);
        }
    }

    const renderTourGuideFields = () => {
        return(
            <div className="flex flex-col gap-2">
                <FormField
                key="username"
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-light">Username</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            className="border-light/70"
                            />
                        </FormControl>
                        <FormMessage className="text-secondary/90" />
                    </FormItem>
                )}
                />
                <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-light">Email</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            className="border-light/70"
                            />
                        </FormControl>
                        <FormMessage className="text-secondary/90"  />
                    </FormItem>
                )}
                />
                <FormField
                key="password"
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-light">Password</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            className="border-light/70"
                            />
                        </FormControl>
                        <FormMessage className="text-secondary/90" />
                    </FormItem>
                )}
                />
            </div>
        );
    }

    const renderTouristFields = () => {
        return (
            <div className="flex flex-col gap-2">
                <FormField
                key="username"
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-light">Username</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            className="border-light/70"
                            />
                        </FormControl>
                        <FormMessage className="text-secondary/90" />
                    </FormItem>
                )}
                />
                <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-light">Email</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            className="border-light/70"
                            />
                        </FormControl>
                        <FormMessage className="text-secondary/90"  />
                    </FormItem>
                )}
                />
                <FormField
                key="password"
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-light">Password</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            className="border-light/70"
                            />
                        </FormControl>
                        <FormMessage className="text-secondary/90" />
                    </FormItem>
                )}
                />
                <div className="flex gap-4">
                    <FormField
                    key="Date Of Birth"
                    control={form.control}
                    name="Date Of Birth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-light">Date Of Birth</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                className="border-light/70"
                                />
                            </FormControl>
                            <FormMessage className="text-secondary/90"  />
                        </FormItem>
                    )}
                    />
                    <FormField
                    key="nationality"
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-light">Nationality</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                className="border-light/70"
                                />
                            </FormControl>
                            <FormMessage className="text-secondary/90"  />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="flex gap-4">
                <FormField
                    key="mobileNumber"
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-light">Mobile Number</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                className="border-light/70"
                                />
                            </FormControl>
                            <FormMessage className="text-secondary/90"  />
                        </FormItem>
                    )}
                    />
                    <FormField
                    key="Job"
                    control={form.control}
                    name="Job"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-light">Job</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                className="border-light/70"
                                />
                            </FormControl>
                            <FormMessage className="text-secondary/90" />
                        </FormItem>
                    )}
                    />
                </div>
            </div>    
        )
    }

    function onSubmit(values) {
        // Do something with the form values.
        console.log(values)
    }

    return (
        <div className="w-screen h-screen grid grid-cols-2">
            <div className="bg-primary-700">

            </div>
            <div className="bg-primary-900 flex flex-col shadow-2xl">
                <div className="w-100 text-right p-8 absolute right-0">
                    <h3>
                        Log In
                    </h3>
                </div>
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="font-extrabold text-3xl mb-4">
                        Create Your Account
                    </h1>
                    
                    <div className="w-2/5 flex flex-col gap-4">
                        <div className="flex items-center justify-center gap-4 my-2">
                            <h1 className="font-semibold text-lg text-nowrap">I am a...</h1>
                            <Select onValueChange={(value) => {handleRegisterTypeChange(value)}}>
                                <SelectTrigger className="font-semibold">
                                    <SelectValue className="text-center" defaultChecked="Tourist"/>
                                </SelectTrigger>
                                <SelectContent className="bg-light">
                                    <SelectItem value="Tourist">Tourist</SelectItem>
                                    <SelectItem value="TourGuide">Tour Guide</SelectItem>
                                    <SelectItem value="Advertiser">Advertiser</SelectItem>
                                    <SelectItem value="Seller">Seller</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col ">
                                {registerType == 'Tourist' ? renderTouristFields() : renderTourGuideFields()}
                            <p className="text-center text-light/70 text-sm text-pretty">
                            By creating an account you agree to our <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2 ">Terms of Service</a> & <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2">Privacy Policy</a>.
                            </p>
                            <Button type="submit" className="flex gap-1 items-center self-center bg-primary-700 w-max py-2 rounded-md group transition-all hover:ring-1 hover:ring-secondary px-10">
                                Continue
                            </Button>
                            </form>
                        </Form>
                        
                        {/* <div className="flex flex-col gap-1">
                            <h1 className="text-light">
                                Email
                            </h1>
                            <Input type="text" placeholder="First Name" className="border-light/70" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-light">
                                Password
                            </h1>
                            <Input type="text" placeholder="Last Name" className="border-light/70"/>
                        </div> */}
                        
                    </div>   
                </div>
            </div>
        </div>
    );
}
export default SignUp;