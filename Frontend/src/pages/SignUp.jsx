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
import { useForm } from "react-hook-form"
import { z } from "zod"


function SignUp() {
    const [registerType, setRegisterType] = useState("Tourist");

    // Schema for the tourist form
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
        dateOfBirth: z.string().refine(val => !isNaN(Date.parse(val)), {
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
    };

    // Schema for other forms (Tour Guide, Advertiser, Seller)
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
    };

    const [currentSchema, setCurrentSchema] = useState(touristFormSchema);

    const form = useForm({
        resolver: zodResolver(currentSchema),
        defaultValues: touristDefaultValues,
    });

    // Watch for changes in registerType to update the form schema and reset form
    useEffect(() => {
        if (registerType === "Tourist") {
            setCurrentSchema(touristFormSchema);
            form.reset(touristDefaultValues); // Properly reset form with default values
        } else {
            setCurrentSchema(otherFormSchema);
            form.reset(otherDefaultValues); // Properly reset form with default values
        }
    }, [registerType, form]);

    function handleRegisterTypeChange(value) {
        setRegisterType(value);
    }

    function onSubmit(values) {
        // Handle form submission
        console.log(values);
    }

    const renderTouristFields = () => (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                <FormField
                    key="dateOfBirth"
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-secondary/90"/>
                        </FormItem>
                    )}
                />
                <FormField
                    key="nationality"
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nationality</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-secondary/90"/>
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex gap-4">
                <FormField
                    key="job"
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-secondary/90"/>
                        </FormItem>
                    )}
                />
                <FormField
                    key="mobileNumber"
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-secondary/90"/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );

    const renderCommonFields = () => (
        <>
            <FormField
                key="username"
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-secondary/90"/>
                    </FormItem>
                )}
            />
            <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-secondary/90"/>
                    </FormItem>
                )}
            />
            <FormField
                key="password"
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage className="text-secondary/90"/>
                    </FormItem>
                )}
            />
        </>
    );

    return (
        <div className="w-screen h-screen grid grid-cols-2">
            <div className="bg-primary-700"></div>
            <div className="bg-primary-900 flex flex-col shadow-2xl">
                <div className="w-full text-right p-8 absolute right-0">
                    <h3>Log In</h3>
                </div>
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="font-extrabold text-3xl mb-4">Create Your Account</h1>
                    <div className="w-2/5 flex flex-col gap-4">
                        <div className="flex items-center justify-center gap-4 my-2">
                            <h1 className="font-semibold text-lg text-nowrap">I am a...</h1>
                            <Select onValueChange={handleRegisterTypeChange}>
                                <SelectTrigger className="font-semibold">
                                    <SelectValue className="text-center" placeholder="Tourist"/>
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
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                                {renderCommonFields()}
                                {registerType === 'Tourist' && renderTouristFields()}
                                <p className="text-center text-light/70 text-sm text-pretty">
                                    By creating an account you agree to our <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2">Terms of Service</a> & <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2">Privacy Policy</a>.
                                </p>
                                <Button type="submit" className="flex gap-1 items-center self-center bg-primary-700 w-max py-2 rounded-md group transition-all hover:ring-1 hover:ring-secondary px-10">
                                    Continue
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
