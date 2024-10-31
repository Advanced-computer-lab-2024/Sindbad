import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useDispatch } from 'react-redux';
import { useUser, login } from "@/state management/userInfo";

function LogIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { role, id } = useUser();

    // useEffect(() => {
    //     const getUserData = async () => {
    //         if (userData) {
    //             dispatch(login({ role: role, id: id }));
    //         }
    //     };

    //     getUserData();
    // }, [dispatch]);

    const [signUpRedirect, setSignUpRedirect] = useState(false);

    // Schema for Login Form
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        // password: z.string().min(8, {
        //     message: "Password must be at least 8 characters.",
        // }),
        password: z.string()
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
        if (values.username === "tourist" && values.password === "tourist") {
            dispatch(login({ role: "tourist", id: "66f97308f74fa1c054a9b15c" }));
            navigate(`/app/itineraries`, { replace: true });
        }
        else if (values.username === "tourGuide" && values.password === "tourGuide") {
            dispatch(login({ role: "tourGuide", id: "66f8630f55f21e927d7455cc" }));
            navigate(`/app/profile`, { replace: true });
        }
        else if (values.username === "seller" && values.password === "seller") {
            dispatch(login({ role: "seller", id: "66f99b77497c76922f03104e" }));
            navigate(`/app/store`, { replace: true });
        }
        else if (values.username === "advertiser" && values.password === "advertiser") {
            dispatch(login({ role: "advertiser", id: "66f9741bf74fa1c054a9b166" }));
            navigate(`/app/profile`, { replace: true });
        }
        else if (values.username === "tourismGovernor" && values.password === "tourismGovernor") {
            dispatch(login({ role: "tourismGovernor", id: "66fff189a0a316baace5a99b" }));
            navigate(`/app/profile`, { replace: true });
        }
        else if (values.username === "admin" && values.password === "admin") {
            dispatch(login({ role: "admin", id: "66ffd995f2226d9aa3157374" }));
            navigate(`/app/management`, { replace: true });
        }
        else if (values.username === "guest" && values.password === "guest") {
            dispatch(login({ role: "guest", id: null }));
            navigate(`/app/itineraries`, { replace: true });
        }
        else {
            console.log("Invalid username or password");
        }
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
                        <FormMessage className="text-secondary/90" />
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
                        <FormMessage className="text-secondary/90" />
                    </FormItem>
                )}
            />
        </>
    );

    return (
        <div className="w-screen h-screen grid grid-cols-2">
            <div className="bg-primary-700">
                <div className="flex flex-col justify-center items-center h-full">
                    <Button onClick={() => navigate(`/app/itineraries`, { replace: true })} variant="link">
                        Back to browsing
                    </Button>
                </div>
            </div>
            <div className="bg-primary-900 flex flex-col shadow-2xl">
                <div className="text-right p-8 absolute right-0">
                    <Button onClick={() => setSignUpRedirect(true)} className="">
                        Sign Up
                    </Button>
                    {signUpRedirect ? <Navigate to="/signup" /> : null}
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
