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
    console.log(userType, id, userData);

    const changePasswordSchema = z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
    })

    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const onSubmit = (data) => {
        if (userData.passwordHash == data.oldPassword) {
            const body = {
                passwordHash: data.newPassword,
                id: id,
                role: userType,
            };
            updateUserPassword(body.id, body.role, body.passwordHash);
        }
    }

    return (
        <div>
            <div className="flex items-center gap-6 mb-3">
                <h1 className="text-xl font-bold">General</h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            <GenericForm type={userType} id={id} data={userData} />
            <h1 className="text-2xl font-semibold my-4">Change Password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="form-label">
                        <FormLabel>Old Password</FormLabel>
                    </div>
                    <Input
                        label="Old Password"
                        type="password"
                        {...form.register("oldPassword")}
                        className="mb-4"
                    />
                    <div className="form-label">
                        <FormLabel>New Password</FormLabel>
                    </div>
                    <Input
                        label="New Password"
                        type="password"
                        {...form.register("newPassword")}
                        className="mb-4"
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
