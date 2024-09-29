import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Navigate } from "react-router-dom";
import { userSignUp } from "@/services/ApiHandler";

function SignUp() {
    const [registerType, setRegisterType] = useState("Tourist");
    const [logInRedirect, setLogInRedirect] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formValues, setFormValues] = useState({});

    // Schema for the tourist form
    const commonFormSchema = z.object({
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

    const touristFormSchema = z.object({
        mobileNumber: z.string().min(8, {
            message: "Invalid mobile number.",
        }),
        nationality: z.string(),
        DOB: z.string().refine((val) => !isNaN(Date.parse(val)), {
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
        DOB: "",
        job: "",
    };

    const otherDefaultValues = {
        username: "",
        email: "",
        password: "",
    };

    const form = useForm({
        resolver: zodResolver(currentStep === 1 ? commonFormSchema : touristFormSchema),
        defaultValues: currentStep === 1 ? touristDefaultValues : formValues,
    });

    // Watch for changes in registerType to reset the form schema and values
    useEffect(() => {
        if (registerType !== "Tourist") {
            form.reset(otherDefaultValues);
        } else {
            form.reset(touristDefaultValues);
        }
    }, [registerType, form]);

    const handleRegisterTypeChange = (value) => {
        setRegisterType(value);
    };

    const onSubmit = async (values) => {
        if (currentStep === 1 && registerType === "Tourist") {
            // Move to next step and store first step values
            setFormValues(values);
            setCurrentStep(2);
        } else {
            let finalValues = { ...formValues, ...values };
            const response = await userSignUp(finalValues, registerType);
            if (response.error) {
                console.error('Sign-up error:', response.message);
            } else {
                setLogInRedirect(true);
            }
        }
    };

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
                        <FormMessage className="text-destructive text-xs" />
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
                        <FormMessage className="text-destructive text-xs" />
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
                        <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                )}
            />
        </>
    );

    const renderTouristFields = () => (
        <div className="flex flex-col gap-2">
            <FormField
                key="DOB"
                control={form.control}
                name="DOB"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
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
                        <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                )}
            />
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
                        <FormMessage className="text-destructive text-xs" />
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
                        <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                )}
            />
        </div>
    );    

    return (
        <div className="w-full min-h-screen grid grid-cols-2">
            <div className="bg-primary-700"></div>
            <div className="bg-primary-900 flex flex-col shadow-2xl">
                <div className="text-right p-8 absolute right-0">
                    <Button onClick={() => setLogInRedirect(true)} variant="link">
                        Log In
                    </Button>
                    {logInRedirect ? <Navigate to="/login" /> : null}
                </div>
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="font-extrabold text-3xl mb-4">Create Your Account</h1>
                    <div className="w-2/5 flex flex-col gap-4">
                        {currentStep === 1 && (
                            <div className="flex items-center justify-center gap-4 my-2">
                                <h1 className="font-semibold text-nowrap">I am a...</h1>
                                <Select onValueChange={handleRegisterTypeChange}>
                                    <SelectTrigger>
                                        <SelectValue className="text-center" placeholder="Tourist" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900">
                                        <SelectItem value="Tourist">Tourist</SelectItem>
                                        <SelectItem value="TourGuide">Tour Guide</SelectItem>
                                        <SelectItem value="Advertiser">Advertiser</SelectItem>
                                        <SelectItem value="Seller">Seller</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex flex-col">
                                {currentStep === 1 ? renderCommonFields() : renderTouristFields()}
                                {currentStep === 2 && (
                                    <p className="text-center text-light/70 text-sm">
                                        By creating an account you agree to our{" "}
                                        <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2">
                                            Terms of Service
                                        </a>{" "}
                                        &{" "}
                                        <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2">
                                            Privacy Policy
                                        </a>.
                                    </p>
                                )}
                                <Button type="submit" className="bg-primary-700 justify-center w-max mt-4">
                                    {currentStep === 1 ? "Continue" : "Submit"}
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