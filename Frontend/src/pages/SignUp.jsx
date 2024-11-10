import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { userSignUp } from "@/services/UserApiHandler";

import SpinnerSVG from '@/SVGs/Spinner.jsx';
import { ArrowLeft } from "lucide-react";
import { updateTourGuideFiles } from "@/services/TourGuideApiHandler";
import { updateSellerFiles } from "@/services/SellerApiHandler";
import { updateAdvertiserFiles } from "@/services/AdvertiserApiHandler";
import { getAllTags } from "@/services/AdminApiHandler";
import { MultiSelectField } from "@/components/custom/genericForm/input-fields/MultiSelectField";

function SignUp() {
    const [registerType, setRegisterType] = useState("Tourist");
    const [logInRedirect, setLogInRedirect] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const handleRegisterTypeChange = (value) => {
        setRegisterType(value);
    };

    const fetchTags = async () => {
        const reqtags = await getAllTags();
        setTags(reqtags.data);
        console.log(reqtags);
    };
    useEffect(() => {
        fetchTags();
    }, []);

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
        preferences: z.array(z.string()).min(1, {
            message: "At least one preference is required"
        }),
    });

    const tourGuideFormSchema = z.object({
        certificateImage: z
              .instanceof(FileList)
              .refine((file) => file?.length == 1, 'File is required.')
            ,
        idCardImage: z
            .instanceof(FileList)
            .refine((file) => file?.length == 1, 'File is required.')
        ,
    })

    const sellerFormSchema = z.object({
        idCardImage: z
        .instanceof(FileList)
        .refine((file) => file?.length == 1, 'File is required.')
    ,
        taxationRegistryCardImage: z
        .instanceof(FileList)
        .refine((file) => file?.length == 1, 'File is required.')
    ,
    })

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
        preferences: [],
    };

    const tourGuideDefaultValues = {
        certificateImage: "",
        idCardImage: "",
    }

    const sellerDefaultValues = {
        idCardImage: "",
        taxationRegistryCardImage: "",
    }


    const commonForm = useForm({
        resolver: zodResolver(commonFormSchema),
        defaultValues: commonDefaultValues,
    });

    const touristForm = useForm({
        resolver: zodResolver(touristFormSchema),
        defaultValues: touristDefaultValues,
    });

    const tourGuideForm = useForm({
        resolver: zodResolver(tourGuideFormSchema),
        defaultValues: tourGuideDefaultValues,
    })

    const sellerForm = useForm({
        resolver: zodResolver(sellerFormSchema),
        defaultValues: sellerDefaultValues,
    })

    const idCardImageRef = tourGuideForm.register('idCardImage');
    const certificateImageRef = tourGuideForm.register('certificateImage');

    const taxationRegistryCardImageRef = sellerForm.register('taxationRegistryCardImage');
    const idCardImageRefSeller = sellerForm.register('idCardImage');
    
    const handleCommonFormSubmit = (data) => {
        if (!accepted) {
            setError("Please accept the terms of service and privacy policy");
            return;
        }
        setFormValues((prev) => ({ ...prev, ...data }));  // Store Step 1 data
        setCurrentStep(2);
    };

    const handleTouristFormSubmit = (data) => {
        submitForm({ ...formValues, ...data });
    };

    const submitForm = async (values) => {
        setLoading(true);
        const response = await userSignUp(values, registerType);
        if (registerType === "TourGuide") {
            if (response.error) {
                setCurrentStep(1);
                setError(response.display);
            } else {
                const tourguideAddedDocs = await updateTourGuideFiles(response.user._id, values);
            }
        }
        if (registerType === "Seller") { 
            if (response.error) {
                setCurrentStep(1);
                setError(response.display);
            } else {
                const sellerAddedDocs = await updateSellerFiles(response.user._id, values);
            }
        }
        if (registerType === "Advertiser") {
            if (response.error) {
                setCurrentStep(1);
                setError(response.display);
            }
            else {
                const advertiserAddedDocs = await updateAdvertiserFiles(response.user._id, values);
            }
        }
        if (response.error) {
            setCurrentStep(1);
            setError(response.display);
        } else {
            setLoading(false);
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
                            <Input className="signup-date" id="DOB" type="date" {...field} />
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
            <FormField 
                key="preferences" 
                control={touristForm.control} 
                name="preferences" 
                render={({ field }) => (
                    <MultiSelectField 
                        name="preferences" 
                        control={touristForm.control} 
                        label="Preferences" 
                        options={Array.from(tags)}
                    />
                )}
            />
        </div>
    );

    const renderTourGuideFields = () => (
        <div className="flex flex-col gap-2">
            <FormField
                key="certificateImage"
                control={tourGuideForm.control}
                name="certificateImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="certificateImage">Certificate Image</FormLabel>
                        <FormControl>
                            <Input id="certificateImage" type="file" name="certificateImage" 
                            {...certificateImageRef} 
                            onChange={(event) => {
                                field.onChange(event.target?.files?.[0] ?? undefined);
                              }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="idCardImage"
                control={tourGuideForm.control}
                name="idCardImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="idCardImage">ID Card Image</FormLabel>
                        <FormControl>
                            <Input id="idCardImage" type="file" name="idCardImage"
                            {...idCardImageRef} 
                            onChange={(event) => {
                                field.onChange(event.target?.files?.[0] ?? undefined);
                              }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )

    const renderSellerFields = () => (
        <div className="flex flex-col gap-2">
            <FormField
                key="idCardImage"
                control={sellerForm.control}
                name="idCardImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="idCardImage">ID Card Image</FormLabel>
                        <FormControl>
                            <Input id="idCardImage" type="file" name="idCardImage"
                            {...idCardImageRefSeller}
                            onChange={(event) => {
                                field.onChange(event.target?.files?.[0] ?? undefined);
                              }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="taxationRegistryCardImage"
                control={sellerForm.control}
                name="taxationRegistryCardImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="taxationRegistryCardImage">Taxation Registry Card Image</FormLabel>
                        <FormControl>
                            <Input id="taxationRegistryCardImage" type="file" name="taxationRegistryCardImage"
                            {...taxationRegistryCardImageRef} 
                            onChange={(event) => {
                                field.onChange(event.target?.files?.[0] ?? undefined);
                              }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
    return (
        <div className="w-full min-h-screen grid grid-cols-2">
            <div className="bg-primary-700">
                <div className="flex flex-col justify-center items-center h-full">
                    <Button onClick={() => navigate(`/app/itineraries`, { replace: true })} variant="link">
                        Back to browsing
                    </Button>
                </div>
            </div>
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
                                        {loading && error === false ? <SpinnerSVG /> : registerType == "Tourist" ? "Continue" : "Sign Up"}
                                    </Button>

                                    <Input type="checkbox" id="accept" name="accept" onChange={() => setAccepted(!accepted)} />
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
                        {currentStep === 2 && registerType === "Tourist" &&
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

                        {currentStep === 2 && registerType === "TourGuide" &&
                            <Form {...tourGuideForm} enctype="multipart/form-data">
                                <form onSubmit={tourGuideForm.handleSubmit(handleTouristFormSubmit)} className="gap-2 flex flex-col">
                                    {renderTourGuideFields()}
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

                        {currentStep === 2 && (registerType === "Seller" || registerType === "Advertiser") &&
                            <Form {...sellerForm} enctype="multipart/form-data">
                                <form onSubmit={sellerForm.handleSubmit(handleTouristFormSubmit)} className="gap-2 flex flex-col">
                                    {renderSellerFields()}
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