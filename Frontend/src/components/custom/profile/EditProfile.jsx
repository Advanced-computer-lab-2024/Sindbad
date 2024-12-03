import DeleteForm from "../deleteForm";
import GenericForm from "../genericForm/genericForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserPassword } from "@/services/UserApiHandler";

function EditProfile({ userType, id, userData }) {
  console.log(`userType: ${userType}, id: ${id}, userData: ${userData}`);

  const changePasswordSchema = z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
  });

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log("Form data: ", data);

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

      alert("Password changed successfully!");
    } catch (error) {
      // Handle error responses
      if (error.response) {
        const statusCode = error.response.status;

        switch (statusCode) {
          case 400:
            alert(
              `Bad Request: ${
                error.response.data.message || "Please check your input."
              }`
            );
            break;
          case 404:
            alert("User not found. Please check the ID and try again.");
            break;
          case 500:
            alert(
              "Server error. Please try again later or contact support if the issue persists."
            );
            break;
          default:
            alert(
              `Unexpected error: ${
                error.response.data.message || "Something went wrong."
              }`
            );
            break;
        }
      } else if (error.request) {
        alert(
          "No response received from the server. Please check your internet connection and try again."
        );
      } else {
        alert(`Request failed: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <GenericForm type={userType} id={id} data={userData} />
      <h1 className="text-2xl font-semibold my-4">Change Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormLabel>Old Password</FormLabel>
          <Input
            label="Old Password"
            type="password"
            {...form.register("oldPassword")}
          />
          <FormLabel>New Password</FormLabel>
          <Input
            label="New Password"
            type="password"
            {...form.register("newPassword")}
          />
          <Button type="submit" className="bg-dark text-white">
            Submit
          </Button>
        </form>
      </Form>
      <h1 className="text-2xl font-semibold my-4">Danger Area</h1>
      <DeleteForm type={userType} data={userData} />
    </div>
  );
}
export default EditProfile;
