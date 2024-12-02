/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LogoSVG from "@/SVGs/Logo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendForgotPasswordEmail } from "@/services/UserApiHandler";
import { useState } from "react";

const ForgotPassword = () => {
  // Schema for Email Form
  const emailFormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });

  // Default values for the new form
  const emailDefaultValues = {
    email: "",
  };

  // Use useForm hook with zodResolver and schema
  const form = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: emailDefaultValues,
  });

  const [isError, setIsError] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = async (data) => {
    // console.log("Data:", data);
    setIsEmailSent(false);
    setIsError(false);

    const response = await sendForgotPasswordEmail(data.email)
      .then((_) => {
        // console.log("Response:", response);
        console.log("Email sent successfully.");
        setIsEmailSent(true);

        // Redirect to login page
        setTimeout(() => {
          navigate(`/login`, { replace: true });
        }, 2000);
      })
      .catch((error) => {
        if (error.status === 400) {
          console.error("Payload must contain email");
        } else if (error.status === 404) {
          console.error("Email not found. Please try again.");
          setIsError(true);
        } else {
          console.error("Error:", error);
        }
      });
  };

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <div className="bg-primary-800 relative overflow-clip shadow-2xl">
        <div className="flex flex-col justify-center items-center h-full relative z-10">
          <h1 className="font-bold text-3xl text-light">Welcome to Sindbad</h1>
          <h4 className="text-light text-lg mb-4">Let the stars guide you.</h4>
          <p className="text-xs text-light">
            New user?{" "}
            <Button
              onClick={() => navigate(`/signup`, { replace: true })}
              variant="link"
              className="p-0 text-xs font-normal text-secondary/90 hover:text-secondary"
            >
              Sign up
            </Button>
            {" or "}
            <Button
              onClick={() => navigate(`/app/itineraries`, { replace: true })}
              variant="link"
              className="p-0 text-xs font-normal text-secondary/90 hover:text-secondary"
            >
              Continue as guest
            </Button>
          </p>
        </div>
        <LogoSVG className="w-11/12 h-11/12 absolute -bottom-40 -left-40 opacity-10" />
      </div>
      <div className="bg-primary-200 flex flex-col">
        <div className="flex flex-col flex-grow justify-center items-center">
          <h1 className="font-bold text-2xl mb-4">Reset your password</h1>
          <div className="w-2/5 flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  key="email"
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="form-label">Email</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {isError && (
                  <div>
                    <p
                      id="error-message"
                      className="text-red-500 text-sm justify-self-center w-auto"
                    >
                      Email not found. Please try again.
                    </p>
                  </div>
                )}
                {isEmailSent && (
                  <div>
                    <p
                      id="success-message"
                      className="text-green-500 text-sm justify-self-center w-auto"
                    >
                      Email sent successfully.
                    </p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-1/2 justify-center h-max mt-2"
                >
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
