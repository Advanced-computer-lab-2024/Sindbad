import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { userSignUp } from "@/services/UserApiHandler";

import SpinnerSVG from '@/SVGs/Spinner.jsx';
import LogoSVG from "@/SVGs/Logo";
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
        portfolioUrl: z.string().url({
            message: "Invalid URL"
        }),
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

    const advertiserFormSchema = z.object({
        idCardImage: z
            .instanceof(FileList)
            .refine((file) => file?.length == 1, 'File is required.')
        ,
        taxationRegistryCardImage: z
            .instanceof(FileList)
            .refine((file) => file?.length == 1, 'File is required.')
        ,
        name: z.string().min(1, {
            message: "Company name is required"
        }),
        description: z.string().max(500, {
            message: "Description must be less than 500 characters"
        }),
        location: z.string().min(1, {
            message: "Location is required"
        }),
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
        portfolioUrl: "",
    }

    const sellerDefaultValues = {
        idCardImage: "",
        taxationRegistryCardImage: "",
    }

    const advertiserDefaultValues = {
        idCardImage: "",
        taxationRegistryCardImage: "",
        name: "",
        description: "",
        location: "",
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

    const advertiserForm = useForm({
        resolver: zodResolver(advertiserFormSchema),
        defaultValues: advertiserDefaultValues,
    })

    const idCardImageRef = tourGuideForm.register('idCardImage');
    const certificateImageRef = tourGuideForm.register('certificateImage');

    const taxationRegistryCardImageRef = sellerForm.register('taxationRegistryCardImage');
    const idCardImageRefSeller = sellerForm.register('idCardImage');

    const taxationRegistryCardImageRefAdv = advertiserForm.register('taxationRegistryCardImage');
    const idCardImageRefAdv = advertiserForm.register('idCardImage');

    const handleCommonFormSubmit = (data) => {
        if (!accepted) {
            setError("Please accept the terms of service and privacy policy");
            return;
        }
        setError("");
        setFormValues((prev) => ({ ...prev, ...data }));  // Store Step 1 data
        setCurrentStep(2);
    };

    const handleTouristFormSubmit = (data) => {
        let finalData = {};
        if (registerType === "Advertiser") {
            finalData.companyProfile = {};
            finalData.companyProfile.name = data.name;
            finalData.companyProfile.description = data.description;
            finalData.companyProfile.location = data.location;
            finalData.idCardImage = data.idCardImage;
            finalData.taxationRegistryCardImage = data.taxationRegistryCardImage;
        } else {
            finalData = data;
        }
        submitForm({ ...formValues, ...finalData });
    };

    const submitForm = async (values) => {

        setLoading(true);
        const signUpValues = {}

        for (const key in values) {
            if (key !== "idCardImage" && key !== "certificateImage" && key !== "taxationRegistryCardImage") {
                signUpValues[key] = values[key];
            }
        }

        const response = await userSignUp(signUpValues, registerType);
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
            <FormField
                key="portfolioUrl"
                control={tourGuideForm.control}
                name="portfolioUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="portfolioUrl">Linkedin Profile</FormLabel>
                        <FormControl>
                            <Input id="portfolioUrl" {...field} />
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

    const renderAdvertiserFields = () => (
        <div className="flex flex-col gap-2">
            <FormField
                key="idCardImage"
                control={advertiserForm.control}
                name="idCardImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="idCardImage">ID Card Image</FormLabel>
                        <FormControl>
                            <Input id="idCardImage" type="file" name="idCardImage"
                                {...idCardImageRefAdv}
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
                control={advertiserForm.control}
                name="taxationRegistryCardImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="taxationRegistryCardImage">Taxation Registry Card Image</FormLabel>
                        <FormControl>
                            <Input id="taxationRegistryCardImage" type="file" name="taxationRegistryCardImage"
                                {...taxationRegistryCardImageRefAdv}
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
                key="name"
                control={advertiserForm.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="name">Company Name</FormLabel>
                        <FormControl>
                            <Input id="name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="description"
                control={advertiserForm.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="description">Company Description</FormLabel>
                        <FormControl>
                            <Input id="description" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                key="location"
                control={advertiserForm.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="location">Company Location</FormLabel>
                        <FormControl>
                            <Input id="location" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )

    return (
        <div className="w-full min-h-screen grid grid-cols-2">
            <div className="bg-primary-800 relative overflow-clip shadow-2xl">
                <div className="flex flex-col justify-center items-center h-full relative z-10">
                    <h1 className="font-bold text-3xl text-light">Welcome to Sindbad</h1>
                    <h4 className="text-light text-lg mb-4">Let the stars guide you.</h4>
                    <p className="text-xs text-light">
                        Got an account?{" "}
                        <Button onClick={() => setLogInRedirect(true)} variant="link" className="p-0 text-xs font-normal text-secondary/90 hover:text-secondary">
                            Log in
                        </Button>
                        {logInRedirect ? <Navigate to="/login" /> : null}
                        {" "}or{" "}
                        <Button onClick={() => navigate(`/app/itineraries`, { replace: true })} variant="link" className="p-0 text-xs font-normal text-secondary/90 hover:text-secondary">
                            continue as guest
                        </Button>
                    </p>
                </div>
                <LogoSVG className="w-11/12 h-11/12 absolute -bottom-40 -left-40 opacity-10" />
            </div>
            <div className="bg-primary-200 flex flex-col">
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
                                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                    <p className="text-center text-neutral-700 text-sm mt-2">
                                        <Input type="checkbox" id="accept" name="accept" onChange={() => setAccepted(!accepted)} checked={accepted} className="w-max h-max shadow-none inline mr-2 accent-primary-700 cursor-pointer" />
                                        By creating an account you agree to our{" "}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <a
                                                    href="#"
                                                    className="text-primary-700/90 hover:text-primary-700 hover:decoration-primary-700 decoration-primary-700/70 underline underline-offset-2"
                                                >
                                                    Terms of Service
                                                </a>
                                            </DialogTrigger>
                                            <DialogContent className="overflow-y-scroll max-h-[50%]" onOpenAutoFocus={(e) => e.preventDefault()}>
                                                <DialogTitle>Terms of Service</DialogTitle>
                                                <DialogHeader>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra vestibulum consequat. Mauris ex dui, consectetur eget mollis ut, placerat nec lectus. Cras eget placerat ligula, vitae venenatis turpis. Fusce bibendum eget mauris quis laoreet. Praesent scelerisque maximus tortor in hendrerit. Donec ut lacus mollis, placerat leo facilisis, tincidunt dui. Integer egestas tincidunt ex, sed vestibulum nibh placerat in. Suspendisse vestibulum sagittis sollicitudin. Fusce porta diam quis massa gravida accumsan.
                                                        <br /><br />
                                                        Vivamus fermentum iaculis consectetur. Cras condimentum fringilla tristique. Cras vel molestie massa, sit amet lacinia magna. Praesent at dui a ligula dapibus sagittis ut ut elit. Vestibulum bibendum dolor sed mauris euismod finibus. Vestibulum at neque id augue pretium posuere. Integer commodo luctus lorem, quis fringilla arcu lobortis vitae. Suspendisse sed leo condimentum sem luctus venenatis nec sit amet nibh. Sed feugiat et nulla sed fringilla. Etiam a odio et ipsum euismod congue ut a elit. Vivamus nec arcu aliquet, sodales odio vel, placerat diam.
                                                        <br /><br />
                                                        Donec egestas tortor erat, sed tristique nisl ornare non. Phasellus interdum mi vel pulvinar euismod. Cras suscipit libero nec ex elementum ullamcorper eget quis quam. Suspendisse eget porttitor leo. Nullam sem mauris, sollicitudin eget erat vel, hendrerit commodo quam. Aenean quis leo semper, consectetur tellus id, hendrerit velit. Ut bibendum ex diam, a commodo augue lacinia at. Aliquam eu leo a tortor suscipit ultrices vitae a sapien. Mauris facilisis ornare volutpat. Duis mattis tempus augue, et pulvinar leo luctus nec. Aenean pellentesque quis tortor ac luctus. Vestibulum eget feugiat lorem. Curabitur quis metus eget leo faucibus laoreet at a nulla. Integer feugiat sapien ut magna sodales, non tristique mauris luctus. Nulla nec finibus ipsum, vel finibus ex.
                                                        <br /><br />
                                                        Nulla euismod leo vitae nibh congue suscipit. Nam sem arcu, eleifend id sapien vel, condimentum consequat ex. Proin vehicula eleifend augue ac mollis. Maecenas elit nulla, mollis id ornare et, sodales sit amet nulla. Sed imperdiet ultrices vehicula. Vestibulum ornare interdum auctor. Phasellus ornare viverra ante, porttitor elementum lacus venenatis ut. Integer ipsum est, viverra ut convallis eget, consectetur sed nibh.
                                                        <br /><br />
                                                        Praesent dignissim lacus et ligula auctor efficitur. Pellentesque rhoncus tortor ut enim elementum auctor. Vestibulum at eros vitae sem facilisis volutpat et gravida dui. Curabitur metus quam, accumsan et aliquam quis, volutpat sed lacus. In tempus nisl nec aliquet aliquam. Aenean suscipit, nibh blandit egestas accumsan, dolor velit interdum ante, in sodales justo ipsum quis lectus. Quisque rhoncus, tortor id porta scelerisque, sapien odio auctor elit, sit amet ultricies lorem nisi ut neque. In hac habitasse platea dictumst.
                                                    </p>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                        {" "}&{" "}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <a
                                                    href="#"
                                                    className="text-primary-700/90 hover:text-primary-700 hover:decoration-primary-700 decoration-primary-700/70 underline underline-offset-2"
                                                >
                                                    Privacy Policy
                                                </a>
                                            </DialogTrigger>
                                            <DialogContent className="overflow-y-scroll max-h-[50%]" onOpenAutoFocus={(e) => e.preventDefault()}>
                                                <DialogTitle>Privacy Policy</DialogTitle>
                                                <DialogHeader>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus fringilla erat, non luctus augue ornare at. Donec ut dui nibh. Sed eget felis venenatis, scelerisque erat vel, egestas nisi. Nulla euismod, elit a suscipit iaculis, arcu risus convallis lorem, quis viverra diam leo eu orci. Vivamus eu lorem congue, congue enim at, luctus lorem. Curabitur egestas sem eget eros porta sollicitudin. Donec in nisi sed mauris fermentum consequat non at turpis.
                                                        <br /><br />
                                                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus fringilla, dolor et condimentum facilisis, magna diam consectetur turpis, vitae euismod mi purus tempus turpis. Fusce ipsum diam, tristique id nisi rhoncus, accumsan euismod felis. Vivamus a nibh ante. Duis tristique ante a lorem gravida eleifend. Phasellus ipsum lorem, tempor sed arcu ac, molestie congue ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed lectus at tellus mattis malesuada id quis tortor. Suspendisse lacinia, libero sit amet bibendum suscipit, est neque elementum purus, eu pharetra justo sapien quis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                                        <br /><br />
                                                        Phasellus sit amet suscipit dolor, et efficitur leo. Nam sit amet odio ipsum. Aliquam erat volutpat. Fusce volutpat ex a orci bibendum malesuada. Ut ullamcorper ligula eu lacus pharetra, id dapibus ex malesuada. Proin tincidunt quam vel scelerisque vulputate. Aenean sollicitudin ut felis vel consequat. Aenean malesuada ultrices eros non porta. Nulla quis auctor ante. Donec vel felis sodales, luctus mi at, aliquam eros. Vestibulum gravida felis quis nulla bibendum, at hendrerit est dictum. Pellentesque viverra faucibus leo, et condimentum urna rhoncus ac.
                                                        <br /><br />
                                                        Sed nunc ante, congue eu ipsum nec, pellentesque tempor nisl. Suspendisse rutrum ante nec iaculis accumsan. Proin sit amet erat at orci accumsan finibus. Mauris non varius lectus. Fusce nec tortor odio. Aliquam accumsan egestas turpis in tempor. In consectetur vitae lorem sit amet volutpat. Nulla eros risus, aliquet non porta ut, semper ac mauris. In vitae dolor magna. Nulla vitae dapibus nulla. Fusce turpis enim, eleifend id varius at, lobortis vitae neque. Nam mattis sollicitudin ex id euismod. Nunc commodo euismod felis, eu eleifend nisl luctus ut. Cras efficitur a risus id dictum. Nunc quis aliquam risus. Nullam in turpis finibus, dictum ex eu, placerat augue.
                                                        <br /><br />
                                                        Aenean sollicitudin ante lacus, vitae sagittis urna malesuada at. In sed velit sodales enim lobortis facilisis sed ac sem. Nam tempus blandit sem, in blandit arcu tincidunt et. Aliquam ac tellus interdum, ornare elit ultrices, ultrices diam. Nullam vitae blandit nunc. Donec auctor vehicula purus, at tincidunt nisl porttitor ut. Praesent in massa felis. Mauris malesuada ipsum eget orci volutpat malesuada. Duis facilisis eros sit amet augue malesuada aliquam. Donec dictum lectus non ipsum ullamcorper, in sollicitudin dolor pretium. Nullam sed finibus massa, ut condimentum ipsum.
                                                    </p>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>.
                                    </p>
                                    <Button type="submit" disabled={loading} className="w-1/2 justify-center h-max mt-2">
                                        {loading && error === false ? <SpinnerSVG /> : "Continue"}
                                    </Button>
                                </form>
                            </Form>
                        }

                        {/* form step 2 */}
                        {currentStep === 2 && registerType === "Tourist" &&
                            <Form {...touristForm}>
                                <form onSubmit={touristForm.handleSubmit(handleTouristFormSubmit)} className="gap-2 flex flex-col">
                                    {renderTouristFields()}
                                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                    <Button type="submit" disabled={loading} className="w-1/2 justify-center h-max mt-2">
                                        {loading ? <SpinnerSVG /> : "Sign Up"}
                                    </Button>
                                    <Button onClick={() => setCurrentStep(1)} variant="link" className="text-center -mt-1 flex gap-2 self-center text-xs">
                                        <ArrowLeft size={10} />
                                        Back
                                    </Button>
                                </form>
                            </Form>
                        }

                        {currentStep === 2 && registerType === "TourGuide" &&
                            <Form {...tourGuideForm} enctype="multipart/form-data">
                                <form onSubmit={tourGuideForm.handleSubmit(handleTouristFormSubmit)} className="gap-2 flex flex-col">
                                    {renderTourGuideFields()}
                                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
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

                        {currentStep === 2 && registerType === "Seller" &&
                            <Form {...sellerForm} enctype="multipart/form-data">
                                <form onSubmit={sellerForm.handleSubmit(handleTouristFormSubmit)} className="gap-2 flex flex-col">
                                    {renderSellerFields()}
                                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
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

                        {currentStep === 2 && registerType === "Advertiser" &&
                            <Form {...advertiserForm} enctype="multipart/form-data">
                                <form onSubmit={advertiserForm.handleSubmit(handleTouristFormSubmit)} className="gap-2 flex flex-col">
                                    {renderAdvertiserFields()}
                                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
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