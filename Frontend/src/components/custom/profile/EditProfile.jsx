import DeleteForm from "../deleteForm";
import GenericForm from "../genericForm/genericForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserPassword } from "@/services/UserApiHandler";

function EditProfile({ userType, id, userData }) {
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  const changePasswordSchema = z.object({
    oldPassword: z
      .string()
      .min(8, "Old password must be at least 8 characters."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters."),
  });

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage(""); // Clear error message
    setSuccessMessage(""); // Clear success message

    const body = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      id: id,
      role: userType,
    };

    try {
      await updateUserPassword(
        body.id,
        body.role,
        body.oldPassword,
        body.newPassword
      );
      setSuccessMessage("Password changed successfully!");
    } catch (error) {
      console.log(error);
      const statusCode = error.status;

      switch (statusCode) {
        case 400:
          setErrorMessage(error.message);
          break;
        case 404:
          setErrorMessage("User not found. Please check the ID and try again.");
          break;
        case 500:
        default:
          setErrorMessage("Something went wrong.");
          break;
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-6 mb-3">
        <h1 className="text-xl font-bold shrink-0">General</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
      </div>
      <div className="w-2/3">
        <GenericForm
          type={userType}
          id={id}
          data={Object.fromEntries(
            Object.entries(userData).filter(
              ([key, value]) =>
                key !== "profileImageUri" && key !== "bannerImageUri"
            )
          )}
        />
      </div>
      <div className="flex items-center gap-6 mb-3 mt-8">
        <h1 className="text-xl font-bold shrink-0">Change Password</h1>
        <hr className="border-neutral-300 border w-full mt-1.5" />
      </div>
      <div className="w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormLabel>Old Password</FormLabel>
            <Input
              label="Old Password"
              type="password"
              {...form.register("oldPassword")}
              className="mb-4 mt-1"
            />
            {form.formState.errors.oldPassword && (
              <p className="text-red-500 text-sm mb-4">
                {form.formState.errors.oldPassword.message}
              </p>
            )}
            <FormLabel>New Password</FormLabel>
            <Input
              label="New Password"
              type="password"
              {...form.register("newPassword")}
              className="mb-4 mt-1"
            />
            {form.formState.errors.newPassword && (
              <p className="text-red-500 text-sm mb-4">
                {form.formState.errors.newPassword.message}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}
            <Button type="submit" className="mt-2 w-max">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      {userType !== "admin" && userType !== "tourismGovernor" && (
        <>
          <div className="flex items-center gap-6 mb-3 mt-8">
            <h1 className="text-xl font-bold shrink-0">Danger Area</h1>
            <hr className="border-neutral-300 border w-full mt-1.5" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h5 className="font-semibold text-sm">
                Request Account Deletion
              </h5>
              <p className="text-xs">
                Once an admin approves your request, all your data will be
                deleted from the system.
                <br />
                This action cannot be undone.
              </p>
            </div>
            <DeleteForm type={userType} data={userData} />
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfile;
