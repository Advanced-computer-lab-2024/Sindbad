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
    setIsError(""); // Reset any existing error message
    setIsSuccess(false); // Reset the success message

    // console.log("Values:", { id: id, newPassword: values.newPassword });

    try {
      const response = await resetPassword(id, values.newPassword);
      console.log("Password reset successfully:", response);
      setIsSuccess(true);

      // Ensure the navigate function works correctly
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        const errorMessage =
          err.response.data.message || err.response.statusText;

        switch (statusCode) {
          case 400:
            setIsError(
              "Invalid password. Please ensure the password is provided correctly."
            );
            console.error("Bad Request:", errorMessage);
            break;

          case 404:
            setIsError("User not found. Please check the ID and try again.");
            console.error("User Not Found:", errorMessage);
            break;

          case 500:
            setIsError(
              "An error occurred while resetting the password. Please try again later."
            );
            console.error("Server Error:", errorMessage);
            break;

          default:
            setIsError(`Error: ${errorMessage}`);
            console.error("Error:", errorMessage);
        }
      } else if (err.request) {
        setIsError(
          "No response received from the server. Please check your internet connection."
        );
        console.error("No response received:", err.request);
      } else {
        setIsError(`Request error: ${err.message}`);
        console.error("Error setting up the request:", err.message);
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
