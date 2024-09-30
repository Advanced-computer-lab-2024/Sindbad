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
import SpinnerSVG from '@/SVGs/Spinner.jsx';
import { ArrowLeft } from "lucide-react";

function SignUp() {
    const [registerType, setRegisterType] = useState("Tourist");
    const [logInRedirect, setLogInRedirect] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegisterTypeChange = (value) => {
        setRegisterType(value);
    };

    const commonFormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters",
        }),
        email: z.string().regex(/^\S+@\S+\.\S+$/, {
            message: "Invalid email",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
    });

    const touristFormSchema = z.object({
        mobileNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
            message: "Invalid mobile number",
        }),
        nationality: z.string().min(1, {
            message: "Nationality is required"
        }),
        DOB: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date of birth",
        }),
        job: z.string().min(1, {
            message: "Job is required"
        }),
    });

    const commonDefaultValues = {
        username: "",
        email: "",
        password: "",
    };

    const touristDefaultValues = {
        DOB: "",
        nationality: "",
        job: "",
        mobileNumber: "",
    };

    const commonForm = useForm({
        resolver: zodResolver(commonFormSchema),
        defaultValues: commonDefaultValues,
    });

    const touristForm = useForm({
        resolver: zodResolver(touristFormSchema),
        defaultValues: touristDefaultValues,
    });

    const handleCommonFormSubmit = (data) => {
        setFormValues((prev) => ({ ...prev, ...data }));  // Store Step 1 data
        if (registerType === "Tourist") {
            setCurrentStep(2);
        } else {
            submitForm({ ...formValues, ...data });
        }
    };

    const handleTouristFormSubmit = (data) => {
        submitForm({ ...formValues, ...data });
    };

    const submitForm = async (values) => {
        setLoading(true);
        const response = await userSignUp(values, registerType);
        setLoading(false);

        if (response.error) {
            console.error('Sign-up error:', response.message);
            setCurrentStep(1);
            setError(response.message);
        } else {
            setLogInRedirect(true);
        }
    }

    const renderCommonFields = () => (
        <>
            <FormField
                key="username"
                control={commonForm.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl>
                            <Input id="username" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="email"
                control={commonForm.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                            <Input id="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="password"
                control={commonForm.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                            <Input id="password" {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );

    const renderTouristFields = () => (
        <div className="flex flex-col gap-2">
            <FormField
                key="DOB"
                control={touristForm.control}
                name="DOB"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="DOB">Date of Birth</FormLabel>
                        <FormControl>
                            <Input id="DOB" type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="nationality"
                control={touristForm.control}
                name="nationality"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="nationality">Nationality</FormLabel>
                        <FormControl>
                            <Input id="nationality" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="job"
                control={touristForm.control}
                name="job"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="job">Job</FormLabel>
                        <FormControl>
                            <Input id="job" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="mobileNumber"
                control={touristForm.control}
                name="mobileNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                        <FormControl>
                            <Input id="mobileNumber" {...field} />
                        </FormControl>
                        <FormMessage />
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
                    <h1 className="font-bold text-2xl mb-4">
                        {currentStep == 1 ? "Create an account" : "One more step!"}
                    </h1>
                    <div className="w-2/5 flex flex-col gap-4">
                        {currentStep === 1 && (
                            <div className="flex items-center justify-center gap-4 my-2">
                                <h1 className="font-semibold text-nowrap">I am a...</h1>
                                <Select onValueChange={handleRegisterTypeChange} value={registerType}>
                                    <SelectTrigger>
                                        <SelectValue className="text-center" />
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

                        {/* form step 1 */}
                        {currentStep === 1 &&
                            <Form {...commonForm}>
                                <form onSubmit={commonForm.handleSubmit(handleCommonFormSubmit)} className="gap-2 flex flex-col">
                                    {renderCommonFields()}
                                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                    <Button type="submit" disabled={loading} className="bg-primary-700 justify-center w-full mt-4">
                                        {loading ? <SpinnerSVG /> : registerType == "Tourist" ? "Continue" : "Sign Up"}
                                    </Button>
                                    <p className="text-center text-light/70 text-sm mt-5">
                                        By creating an account you agree to our{" "}
                                        <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2">
                                            Terms of Service
                                        </a>{" "}
                                        &{" "}
                                        <a href="#" className="text-secondary/90 hover:text-secondary hover:decoration-light/80 decoration-light/70 underline underline-offset-2">
                                            Privacy Policy
                                        </a>.
                                    </p>
                                </form>
                            </Form>
                        }

                        {/* form step 2 */}
                        {currentStep === 2 &&
                            <Form {...touristForm}>
                                <form onSubmit={touristForm.handleSubmit(handleTouristFormSubmit)} className="gap-2 flex flex-col">
                                    {renderTouristFields()}
                                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                    <Button type="submit" disabled={loading} className="bg-primary-700 justify-center w-full mt-4">
                                        {loading ? <SpinnerSVG /> : "Sign Up"}
                                    </Button>
                                    <Button onClick={() => setCurrentStep(1)} variant="link" className="text-center -mt-1 flex gap-2 self-center">
                                        <ArrowLeft size={12} />
                                        Back
                                    </Button>
                                </form>
                            </Form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;