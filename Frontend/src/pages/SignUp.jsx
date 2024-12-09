import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { userSignUp } from "@/services/UserApiHandler";

import SpinnerSVG from "@/SVGs/Spinner.jsx";
import LogoSVG from "@/SVGs/Logo";
import { ArrowLeft } from "lucide-react";
import { updateTourGuideFiles } from "@/services/TourGuideApiHandler";
import { updateSellerFiles } from "@/services/SellerApiHandler";
import { updateAdvertiserFiles } from "@/services/AdvertiserApiHandler";
import { getAllTags } from "@/services/AdminApiHandler";
import { MultiSelectField } from "@/components/custom/genericForm/input-fields/MultiSelectField";
import ReactSelect from "@/components/ui/react-select";
import { nationalities } from "@/utilities/getNationalities";

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
    const formattedTags = reqtags.data.map((tag) => ({
      value: tag._id,
      label: tag.name,
    }));
    setTags(formattedTags);
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
      message: "Nationality is required",
    }),
    DOB: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date of birth",
    }),
    job: z.string().min(1, {
      message: "Job is required",
    }),
    preferences: z.array(z.string()).min(1, {
      message: "At least one preference is required",
    }),
  });

  const tourGuideFormSchema = z.object({
    certificateImage: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "File is required."),
    idCardImage: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "File is required."),
    portfolioUrl: z.string().url({
      message: "Invalid URL",
    }),
  });

  const sellerFormSchema = z.object({
    idCardImage: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "File is required."),
    taxationRegistryCardImage: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "File is required."),
  });

  const advertiserFormSchema = z.object({
    idCardImage: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "File is required."),
    taxationRegistryCardImage: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "File is required."),
    name: z.string().min(1, {
      message: "Company name is required",
    }),
    description: z.string().max(500, {
      message: "Description must be less than 500 characters",
    }),
    location: z.string().min(1, {
      message: "Location is required",
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
    preferences: [],
  };

  const tourGuideDefaultValues = {
    certificateImage: "",
    idCardImage: "",
    portfolioUrl: "",
  };

  const sellerDefaultValues = {
    idCardImage: "",
    taxationRegistryCardImage: "",
  };

  const advertiserDefaultValues = {
    idCardImage: "",
    taxationRegistryCardImage: "",
    name: "",
    description: "",
    location: "",
  };

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
  });

  const sellerForm = useForm({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: sellerDefaultValues,
  });

  const advertiserForm = useForm({
    resolver: zodResolver(advertiserFormSchema),
    defaultValues: advertiserDefaultValues,
  });

  const idCardImageRef = tourGuideForm.register("idCardImage");
  const certificateImageRef = tourGuideForm.register("certificateImage");

  const taxationRegistryCardImageRef = sellerForm.register(
    "taxationRegistryCardImage"
  );
  const idCardImageRefSeller = sellerForm.register("idCardImage");

  const taxationRegistryCardImageRefAdv = advertiserForm.register(
    "taxationRegistryCardImage"
  );
  const idCardImageRefAdv = advertiserForm.register("idCardImage");

  const handleCommonFormSubmit = (data) => {
    if (!accepted) {
      setError("Please accept the terms of service and privacy policy");
      return;
    }
    setError("");
    setFormValues((prev) => ({ ...prev, ...data })); // Store Step 1 data
    setCurrentStep(2);
  };

  const handleSecondFormSubmit = (data) => {
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
    const signUpValues = {};

    for (const key in values) {
      if (
        key !== "idCardImage" &&
        key !== "certificateImage" &&
        key !== "taxationRegistryCardImage"
      ) {
        signUpValues[key] = values[key];
      }
    }

    const response = await userSignUp(signUpValues, registerType);
    if (registerType === "TourGuide") {
      if (response.error) {
        setCurrentStep(1);
        setError(response.display);
      } else {
        const tourguideAddedDocs = await updateTourGuideFiles(
          response.user._id,
          values
        );
      }
    }
    if (registerType === "Seller") {
      if (response.error) {
        setCurrentStep(1);
        setError(response.display);
      } else {
        const sellerAddedDocs = await updateSellerFiles(
          response.user._id,
          values
        );
      }
    }
    if (registerType === "Advertiser") {
      if (response.error) {
        setCurrentStep(1);
        setError(response.display);
      } else {
        const advertiserAddedDocs = await updateAdvertiserFiles(
          response.user._id,
          values
        );
      }
    }
    if (response.error) {
      setCurrentStep(1);
      setError(response.display);
    } else {
      setLoading(false);
      setLogInRedirect(true);
    }
  };

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
              <ReactSelect
                multi={false}
                options={nationalities}
                onChange={(e) => field.onChange(e.value)}
              />
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
          // <MultiSelectField
          //     name="preferences"
          //     control={touristForm.control}
          //     label="Preferences"
          //     options={Array.from(tags)}
          // />
          <FormItem>
            <FormLabel htmlFor="preferences">Preferences</FormLabel>
            <FormControl>
              <ReactSelect
                multi={true}
                options={Array.from(tags)}
                onChange={(e) => {
                  field.onChange(e.map((tag) => tag.value));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
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
              <Input
                id="certificateImage"
                type="file"
                name="certificateImage"
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
              <Input
                id="idCardImage"
                type="file"
                name="idCardImage"
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
  );

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
              <Input
                id="idCardImage"
                type="file"
                name="idCardImage"
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
            <FormLabel htmlFor="taxationRegistryCardImage">
              Taxation Registry Card Image
            </FormLabel>
            <FormControl>
              <Input
                id="taxationRegistryCardImage"
                type="file"
                name="taxationRegistryCardImage"
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
  );

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
              <Input
                id="idCardImage"
                type="file"
                name="idCardImage"
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
            <FormLabel htmlFor="taxationRegistryCardImage">
              Taxation Registry Card Image
            </FormLabel>
            <FormControl>
              <Input
                id="taxationRegistryCardImage"
                type="file"
                name="taxationRegistryCardImage"
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
  );

  return (
    <div className="w-full min-h-screen grid grid-cols-2">
      <div className="bg-primary-800 relative overflow-clip shadow-2xl">
        <div className="flex flex-col justify-center items-center h-full relative z-10">
          <h1 className="font-bold text-3xl text-light">Welcome to Sindbad</h1>
          <h4 className="text-light text-lg mb-4">Let the stars guide you.</h4>
          <p className="text-xs text-light">
            Got an account?{" "}
            <Button
              onClick={() => setLogInRedirect(true)}
              variant="link"
              className="p-0 text-xs font-normal text-secondary/90 hover:text-secondary"
            >
              Log in
            </Button>
            {logInRedirect ? <Navigate to="/login" /> : null}
          </p>
        </div>
        <LogoSVG className="w-11/12 h-11/12 absolute -bottom-40 -left-40 opacity-10" />
      </div>
      <div className="bg-primary-200 flex flex-col">
        <div className="flex flex-col flex-grow justify-center items-center">
          <h1 className="font-bold text-2xl mb-6">
            {currentStep == 1 ? "Create an account" : "One more step!"}
          </h1>
          <div className="w-2/5 flex flex-col gap-4">
            {currentStep === 1 && (
              <div className="flex items-center justify-center gap-4">
                <h1 className="font-medium text-nowrap text-sm">I am a...</h1>
                {/* <Select onValueChange={handleRegisterTypeChange} value={registerType}>
                                    <SelectTrigger>
                                        <SelectValue className="text-center" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900">
                                        <SelectItem value="Tourist">Tourist</SelectItem>
                                        <SelectItem value="TourGuide">Tour Guide</SelectItem>
                                        <SelectItem value="Advertiser">Advertiser</SelectItem>
                                        <SelectItem value="Seller">Seller</SelectItem>
                                    </SelectContent>
                                </Select> */}
                <div className="w-full">
                  <ReactSelect
                    multi={false}
                    options={[
                      { value: "Tourist", label: "Tourist" },
                      { value: "TourGuide", label: "Tour Guide" },
                      { value: "Advertiser", label: "Advertiser" },
                      { value: "Seller", label: "Seller" },
                    ]}
                    onChange={(e) => handleRegisterTypeChange(e.value)}
                    defaultValue={{ value: "Tourist", label: "Tourist" }}
                  />
                </div>
              </div>
            )}

            {/* form step 1 */}
            {currentStep === 1 && (
              <Form {...commonForm}>
                <form
                  onSubmit={commonForm.handleSubmit(handleCommonFormSubmit)}
                  className="gap-2 flex flex-col"
                >
                  {renderCommonFields()}
                  {error && (
                    <p className="text-red-500 text-xs">
                      {error === "Username already exists"
                        ? error
                        : "An unknown error has occurred"}
                    </p>
                  )}
                  <p className="text-center text-neutral-700 text-sm mt-2">
                    <Input
                      type="checkbox"
                      id="accept"
                      name="accept"
                      onChange={() => setAccepted(!accepted)}
                      checked={accepted}
                      className="w-max h-max shadow-none inline mr-2 accent-primary-700 cursor-pointer"
                    />
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
                      <DialogContent
                        className="overflow-y-scroll max-h-[50%]"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                      >
                        <DialogTitle>Terms of Service</DialogTitle>
                        <DialogHeader>
                          <p>
                            <strong>Effective Date: December 8, 2024</strong>
                            <br />
                            <br />
                            Welcome to Sindbad! These Terms of Service ("Terms")
                            govern your use of our website and mobile
                            application (collectively, the "Service"). By
                            accessing or using our Service, you agree to comply
                            with and be bound by these Terms. If you do not
                            agree with these Terms, please do not use our
                            Service.
                            <br />
                            <br />
                            <strong>1. User Eligibility</strong>
                            <br />
                            To use our Service, you must be at least 18 years
                            old and legally capable of entering into binding
                            contracts. By using our Service, you confirm that
                            you meet these eligibility requirements.
                            <br />
                            <br />
                            <strong>2. Account Creation</strong>
                            <br />
                            To access certain features of our Service, you may
                            be required to create an account. You agree to
                            provide accurate, current, and complete information
                            during the account creation process, and to maintain
                            the accuracy of such information.
                            <br />
                            <br />
                            You are responsible for maintaining the
                            confidentiality of your account credentials and for
                            all activities under your account. If you suspect
                            any unauthorized access to your account, you must
                            immediately notify us.
                            <br />
                            <br />
                            <strong>3. Services Provided</strong>
                            <br />
                            Sindbad provides travel-related services, including,
                            but not limited to, booking flights, accommodations,
                            tours, activities, and other travel experiences. We
                            act as an intermediary between you and service
                            providers (e.g., hotels, airlines, tour operators)
                            to facilitate these bookings.
                            <br />
                            <br />
                            <strong>4. Reservations and Payments</strong>
                            <br />
                            By making a reservation through our Service, you
                            agree to the terms and conditions of the service
                            provider you are booking with. Payments for services
                            are processed through secure payment gateways, and
                            you agree to provide accurate payment information.
                            <br />
                            <br />
                            <strong>5. Cancellations and Refunds</strong>
                            <br />
                            Cancellations, changes, and refunds are subject to
                            the terms and policies of the service provider. We
                            encourage you to review these terms before making a
                            reservation. Sindbad is not responsible for any
                            cancellations or refunds unless otherwise specified
                            in the service provider's terms.
                            <br />
                            <br />
                            <strong>6. User Responsibilities</strong>
                            <br />
                            You agree to use the Service in a lawful manner and
                            to respect the rights of others. Specifically, you
                            agree not to:
                            <br />
                            <ul>
                              <li>
                                Violate any applicable laws or regulations.
                              </li>
                              <li>
                                Use our Service to harm, harass, or defraud
                                other users or third parties.
                              </li>
                              <li>
                                Impersonate any person or entity, or falsely
                                claim affiliation with any person or entity.
                              </li>
                              <li>
                                Engage in unauthorized access to our website,
                                application, or accounts.
                              </li>
                            </ul>
                            <br />
                            <strong>7. Intellectual Property</strong>
                            <br />
                            All content, features, and functionality of the
                            Service, including but not limited to text,
                            graphics, logos, images, videos, and software, are
                            owned by Sindbad or its licensors and are protected
                            by copyright, trademark, and other intellectual
                            property laws.
                            <br />
                            <br />
                            <strong>8. Privacy and Data Protection</strong>
                            <br />
                            Your privacy is important to us. Please review our
                            Privacy Policy to understand how we collect, use,
                            and protect your personal information. By using our
                            Service, you consent to the collection and use of
                            your data as described in the Privacy Policy.
                            <br />
                            <br />
                            <strong>9. Limitation of Liability</strong>
                            <br />
                            To the fullest extent permitted by law, Sindbad and
                            its affiliates, officers, employees, or agents will
                            not be liable for any direct, indirect, incidental,
                            special, consequential, or punitive damages arising
                            from your use of the Service, including but not
                            limited to, the booking of travel services, delays,
                            cancellations, or the actions of service providers.
                            <br />
                            <br />
                            <strong>10. Indemnification</strong>
                            <br />
                            You agree to indemnify and hold harmless Sindbad and
                            its affiliates, officers, employees, and agents from
                            any claims, losses, damages, liabilities, or
                            expenses (including legal fees) arising from your
                            use of the Service or violation of these Terms.
                            <br />
                            <br />
                            <strong>11. Modifications to the Terms</strong>
                            <br />
                            We reserve the right to modify or update these Terms
                            at any time. Any changes will be effective when
                            posted on this page with an updated "Effective
                            Date." By continuing to use the Service after the
                            posting of changes, you accept the modified Terms.
                            <br />
                            <br />
                            <strong>12. Governing Law</strong>
                            <br />
                            These Terms are governed by and construed in
                            accordance with the laws of the United States. Any
                            disputes arising under or in connection with these
                            Terms will be subject to the exclusive jurisdiction
                            of the courts located in New York, NY.
                            <br />
                            <br />
                            <strong>13. Contact Us</strong>
                            <br />
                            If you have any questions about these Terms, please
                            contact us at:
                            <br />
                            Email: support@sindbadtravel.com
                            <br />
                            Phone: +1 (800) 123-4567
                            <br />
                            Address: 123 Travel Ave, New York, NY, 10001, USA
                          </p>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>{" "}
                    &{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <a
                          href="#"
                          className="text-primary-700/90 hover:text-primary-700 hover:decoration-primary-700 decoration-primary-700/70 underline underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                      </DialogTrigger>
                      <DialogContent
                        className="overflow-y-scroll max-h-[50%]"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                      >
                        <DialogTitle>Privacy Policy</DialogTitle>
                        <DialogHeader>
                          <p>
                            <strong>Effective Date: December 8, 2024</strong>
                            <br />
                            <br />
                            At Sindbad, we value your privacy and are committed
                            to protecting your personal information. This
                            Privacy Policy explains how we collect, use, and
                            share your personal data when you use our website
                            and mobile application (collectively, the
                            "Service"). By using our Service, you consent to the
                            practices described in this Privacy Policy.
                            <br />
                            <br />
                            <strong>1. Information We Collect</strong>
                            <br />
                            We collect personal information that you provide
                            directly to us when using our Service. This may
                            include:
                            <br />
                            <ul>
                              <li>
                                Your name, email address, and contact details
                                when creating an account.
                              </li>
                              <li>
                                Payment information, such as credit card
                                details, when making bookings.
                              </li>
                              <li>
                                Travel preferences and itinerary information.
                              </li>
                              <li>
                                Device and usage information, such as your IP
                                address, browser type, and usage patterns.
                              </li>
                            </ul>
                            <br />
                            <strong>2. How We Use Your Information</strong>
                            <br />
                            We use the information we collect for various
                            purposes, including to:
                            <br />
                            <ul>
                              <li>
                                Provide and improve our services, including
                                processing bookings and reservations.
                              </li>
                              <li>
                                Communicate with you, including sending updates,
                                offers, and customer support.
                              </li>
                              <li>
                                Personalize your experience by tailoring
                                recommendations based on your preferences.
                              </li>
                              <li>
                                Analyze usage patterns to improve our website
                                and application.
                              </li>
                              <li>
                                Comply with legal obligations and resolve
                                disputes.
                              </li>
                            </ul>
                            <br />
                            <strong>3. Sharing Your Information</strong>
                            <br />
                            We may share your personal information with third
                            parties in the following circumstances:
                            <br />
                            <ul>
                              <li>
                                With service providers, such as hotels,
                                airlines, and tour operators, to facilitate
                                bookings.
                              </li>
                              <li>
                                With trusted partners who assist in marketing
                                and customer service.
                              </li>
                              <li>
                                In response to legal requests or to protect our
                                rights, property, or safety.
                              </li>
                            </ul>
                            <br />
                            <strong>4. Data Security</strong>
                            <br />
                            We take reasonable steps to protect your personal
                            information from unauthorized access, disclosure,
                            alteration, or destruction. However, no method of
                            transmission over the Internet or electronic storage
                            is 100% secure, so we cannot guarantee complete
                            security.
                            <br />
                            <br />
                            <strong>5. Your Rights</strong>
                            <br />
                            You have the right to:
                            <br />
                            <ul>
                              <li>
                                Access, update, or delete your personal
                                information at any time.
                              </li>
                              <li>
                                Withdraw your consent to our collection and use
                                of your personal data.
                              </li>
                              <li>
                                Opt-out of marketing communications by following
                                the instructions in our emails.
                              </li>
                            </ul>
                            <br />
                            If you would like to exercise any of these rights,
                            please contact us using the information provided
                            below.
                            <br />
                            <br />
                            <strong>
                              6. Cookies and Tracking Technologies
                            </strong>
                            <br />
                            We use cookies and similar technologies to enhance
                            your experience on our website and mobile
                            application. These technologies help us track your
                            preferences, analyze trends, and gather demographic
                            information. You can manage your cookie preferences
                            through your browser settings.
                            <br />
                            <br />
                            <strong>7. Third-Party Links</strong>
                            <br />
                            Our Service may contain links to third-party
                            websites or services. We are not responsible for the
                            privacy practices or content of these external
                            sites. We encourage you to read the privacy policies
                            of any third-party websites you visit.
                            <br />
                            <br />
                            <strong>
                              8. Modifications to This Privacy Policy
                            </strong>
                            <br />
                            We may update this Privacy Policy from time to time.
                            Any changes will be posted on this page with an
                            updated "Effective Date." By continuing to use the
                            Service after these changes, you consent to the
                            updated Privacy Policy.
                            <br />
                            <br />
                            <strong>9. Contact Us</strong>
                            <br />
                            If you have any questions or concerns about this
                            Privacy Policy or our practices, please contact us
                            at:
                            <br />
                            Email: privacy@sindbadtravel.com
                            <br />
                            Phone: +1 (800) 234-5678
                            <br />
                            Address: 123 Travel Ave, New York, NY, 10001, USA
                          </p>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    .
                  </p>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 justify-center h-max mt-2"
                  >
                    {loading && error === false ? <SpinnerSVG /> : "Continue"}
                  </Button>
                </form>
              </Form>
            )}

            {/* form step 2 */}
            {currentStep === 2 && registerType === "Tourist" && (
              <Form {...touristForm}>
                <form
                  onSubmit={touristForm.handleSubmit(handleSecondFormSubmit)}
                  className="gap-2 flex flex-col"
                >
                  {renderTouristFields()}
                  {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 justify-center h-max mt-2"
                  >
                    {loading ? <SpinnerSVG /> : "Sign Up"}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="link"
                    className="text-center -mt-1 flex gap-2 self-center text-xs"
                  >
                    <ArrowLeft size={8} />
                    Back
                  </Button>
                </form>
              </Form>
            )}

            {currentStep === 2 && registerType === "TourGuide" && (
              <Form {...tourGuideForm} enctype="multipart/form-data">
                <form
                  onSubmit={tourGuideForm.handleSubmit(handleSecondFormSubmit)}
                  className="gap-2 flex flex-col"
                >
                  {renderTourGuideFields()}
                  {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 justify-center h-max mt-2"
                  >
                    {loading ? <SpinnerSVG /> : "Sign Up"}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="link"
                    className="text-center -mt-1 flex gap-2 self-center text-xs"
                  >
                    <ArrowLeft size={8} />
                    Back
                  </Button>
                </form>
              </Form>
            )}

            {currentStep === 2 && registerType === "Seller" && (
              <Form {...sellerForm} enctype="multipart/form-data">
                <form
                  onSubmit={sellerForm.handleSubmit(handleSecondFormSubmit)}
                  className="gap-2 flex flex-col"
                >
                  {renderSellerFields()}
                  {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 justify-center h-max mt-2"
                  >
                    {loading ? <SpinnerSVG /> : "Sign Up"}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="link"
                    className="text-center -mt-1 flex gap-2 self-center text-xs"
                  >
                    <ArrowLeft size={8} />
                    Back
                  </Button>
                </form>
              </Form>
            )}

            {currentStep === 2 && registerType === "Advertiser" && (
              <Form {...advertiserForm} enctype="multipart/form-data">
                <form
                  onSubmit={advertiserForm.handleSubmit(handleSecondFormSubmit)}
                  className="gap-2 flex flex-col"
                >
                  {renderAdvertiserFields()}
                  {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 justify-center h-max mt-2"
                  >
                    {loading ? <SpinnerSVG /> : "Sign Up"}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="link"
                    className="text-center -mt-1 flex gap-2 self-center text-xs"
                  >
                    <ArrowLeft size={8} />
                    Back
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
