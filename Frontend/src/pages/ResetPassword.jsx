import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import LogoSVG from "@/SVGs/Logo";
import { useParams } from "react-router-dom";
import { resetPassword } from "@/services/UserApiHandler";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  // Schema for Reset Password
  const formSchema = z.object({
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters.",
    }),
  });

  const defaultValues = {
    newPassword: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(values) {
    setIsError(""); // Clear any previous error messages
    setIsSuccess(false); // Reset success state

    try {
      // Call the resetPassword function
      const response = await resetPassword(id, values.newPassword);
      console.log("Password reset successful:", response);

      setIsSuccess(true); // Indicate success to the user

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (error) {
      // Handle various error scenarios
      if (error.status) {
        const { status, data } = error;
        const errorMessage =
          data?.message || error.statusText || "An error occurred.";

        switch (status) {
          case 204:
            setIsError("Password reset failed. Please try again.");
            console.error("Password Reset Failed:", errorMessage);
            break;

          case 400:
            setIsError(
              "Invalid password. Please ensure the password meets the required criteria."
            );
            console.error("Bad Request:", errorMessage);
            break;

          case 404:
            setIsError("User not found. Please check the provided ID.");
            console.error("User Not Found:", errorMessage);
            break;

          case 500:
            setIsError("Server error. Please try again later.");
            console.error("Server Error:", errorMessage);
            break;

          default:
            setIsError(`Unexpected error: ${errorMessage}`);
            console.error("Unexpected Error:", errorMessage);
            break;
        }
      } else if (error.request) {
        // Handle no response from server
        setIsError(
          "No response received. Please check your network connection."
        );
        console.error("No Response Received:", error.request);
      } else {
        // Handle general errors
        setIsError(`Error: ${error.message}`);
        console.error("Error Setting Up Request:", error.message);
      }
    }
  }

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <div className="bg-primary-800 relative overflow-clip shadow-2xl">
        <LogoSVG className="w-11/12 h-11/12 absolute -bottom-40 -left-40 opacity-10" />
      </div>
      <div className="bg-primary-200 flex flex-col">
        <div className="flex flex-col flex-grow justify-center items-center">
          <h1 className="font-bold text-2xl mb-4">Enter new password</h1>
          <div className="w-2/5 flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  key="newPassword"
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="form-label">New Password</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {isError.length > 0 && (
                  <div>
                    <p
                      id="error-message"
                      className="text-red-500  text-sm justify-self-center w-auto"
                    >
                      {isError}
                    </p>
                  </div>
                )}
                {isSuccess && (
                  <div>
                    <p
                      id="error-message"
                      className="text-green-500  text-sm justify-self-center w-auto"
                    >
                      Password reset successfully. Please log in with your new
                      password.
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

export default ResetPassword;
