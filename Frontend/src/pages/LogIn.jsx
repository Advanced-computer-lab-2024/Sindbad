import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Navigate } from "react-router-dom";


function LogIn() {

    const [signUpRedirect, setSignUpRedirect] = useState(false);

    // Schema for Login Form
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    });

    const touristDefaultValues = {
        username: "",
        password: "",
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: touristDefaultValues,
    });

    function onSubmit(values) {
        // Handle form submission
        console.log(values);
    }

    const renderCommonFields = () => (
        <>
            <FormField
                key="username"
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-secondary/90"/>
                    </FormItem>
                )}
            />
            <FormField
                key="password"
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage className="text-secondary/90"/>
                    </FormItem>
                )}
            />
        </>
    );

    return (
        <div className="w-screen h-screen grid grid-cols-2">
            <div className="bg-primary-700"></div>
            <div className="bg-primary-900 flex flex-col shadow-2xl">
                <div className="text-right p-8 absolute right-0">
                    <Button onClick={() => setSignUpRedirect(true)} className="">
                        Sign Up
                    </Button>
                    { signUpRedirect ? <Navigate to="/signup" /> : null }
                </div>
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="font-extrabold text-3xl mb-4">Log In</h1>
                    <div className="w-2/5 flex flex-col gap-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                                {renderCommonFields()}
                                <Button type="submit" className="flex gap-1 items-center self-center bg-primary-700 w-max py-2 rounded-md group transition-all hover:ring-1 hover:ring-secondary px-10">
                                    Continue
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
