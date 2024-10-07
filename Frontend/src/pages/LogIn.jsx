import { useEffect } from "react";
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
import { useDispatch } from 'react-redux';
import { login } from '@/state management/userInfo';
import { useNavigate } from "react-router-dom";
import { useUser } from "@/state management/userInfo";

function LogIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {type, id} = useUser();

    useEffect(() => {
        const getUserData = async () => {
            if (userData) {
                dispatch(login({ type: type, id: id }));
            }
        };

        getUserData();
    }, [dispatch]);

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
            dispatch(login({ type: "tourist", id: "66f97308f74fa1c054a9b15c" }));
            navigate(`/app/timeline`, { replace: true });
        }
        else if (values.username === "tourGuide" && values.password === "tourGuide") {
            dispatch(login({ type: "tourGuide", id: "66f8630f55f21e927d7455cc" }));
            navigate(`/app/profile`, { replace: true });
        }
        else if (values.username === "seller" && values.password === "seller") {
            dispatch(login({ type: "seller", id: "66f99b77497c76922f03104e" }));
            navigate(`/app/store`, { replace: true });
        }
        else if (values.username === "advertiser" && values.password === "advertiser") {
            dispatch(login({ type: "advertiser", id: "66f823447b0fe45d3c6d3768" }));
            navigate(`/app/profile`, { replace: true });
        }
        else if (values.username === "tourismGovernor" && values.password === "tourismGovernor") {
            dispatch(login({ type: "tourismGovernor", id: "66fff189a0a316baace5a99b" }));
            navigate(`/app/profile`, { replace: true });
        }
        else if (values.username === "admin" && values.password === "admin") {
            dispatch(login({ type: "admin", id: "66ffd995f2226d9aa3157374" }));
            navigate(`/app/management`, { replace: true });
        }
        else if (values.username === "guest" && values.password === "guest") {
            dispatch(login({ type: "guest", id: null }));
            navigate(`/app/timeline`, { replace: true });
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
                    <Button onClick={() => navigate(`/app/timeline`, { replace: true })} variant="link">
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
