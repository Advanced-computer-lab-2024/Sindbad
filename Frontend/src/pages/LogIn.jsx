/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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

import { useDispatch } from "react-redux";
import { useUser, login } from "@/state management/userInfo";

import { getTouristById } from "@/services/TouristApiHandler";
import { getTourGuide } from "@/services/TourGuideApiHandler";
import { getSeller } from "@/services/SellerApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";
import LogoSVG from "@/SVGs/Logo";
import { userLogin } from "@/services/AuthApiHandler";

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
  const [isLoginError, setIsLoginError] = useState(false);

  // Schema for Login Form
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    // password: z.string().min(8, {
    //     message: "Password must be at least 8 characters.",
    // }),
    password: z.string(),
  });

  const touristDefaultValues = {
    username: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: touristDefaultValues,
  });

  const getTouristPreferredCurrency = async (touristId) => {
    const tourist = await getTouristById(touristId);
    return tourist.preferredCurrency;
  };

  const getTourGuidePreferredCurrency = async (tourGuideId) => {
    const tourGuide = await getTourGuide(tourGuideId);
    return tourGuide.preferredCurrency;
  };

  const getSellerPreferredCurrency = async (sellerId) => {
    const seller = await getSeller(sellerId);
    return seller.preferredCurrency;
  };

  const getAdvertiserPreferredCurrency = async (advertiserId) => {
    const advertiser = await getAdvertiser(advertiserId);
    return advertiser.preferredCurrency;
  };

  async function onSubmit(values) {
    try {
      const response = await userLogin(values);
      dispatch(
        login({
          role: response.role,
          id: response.id,
          accessToken: response.accessToken,
        })
      );
      console.log("Log in successful:", response);
      navigate("/app/itineraries");
    } catch (err) {
      // Axios errors have a 'response' property for HTTP errors

      setIsLoginError(true);
      if (err.response) {
        console.error(
          "Login failed:",
          err.response.data.message || err.response.statusText
        );
        // alert(`Error: ${err.response.data.message || "Invalid credentials"}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up the request:", err.message);
      }
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
            <FormLabel>
              <p className="form-label">Username</p>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="text-destructive text-xs" />
          </FormItem>
        )}
      />
      <FormField
        key="password"
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <p className="form-label">Password</p>
            </FormLabel>
            <FormControl>
              <Input {...field} type="password" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  );

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <div className="bg-primary-800 relative overflow-clip shadow-2xl">
        <div className="flex flex-col justify-center items-center h-full relative z-10">
          <h1 className="font-bold text-3xl text-light">Welcome to Sindbad</h1>
          <h4 className="text-light text-lg mb-4">Let the stars guide you.</h4>
          <p className="text-xs text-light">
            New user?{" "}
            <Button
              onClick={() => setSignUpRedirect(true)}
              variant="link"
              className="p-0 text-xs font-normal text-secondary/90 hover:text-secondary"
            >
              Sign up
            </Button>
            {signUpRedirect ? <Navigate to="/signup" /> : null} or{" "}
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
          <h1 className="font-bold text-2xl mb-4">Log In</h1>
          <div className="w-2/5 flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {renderCommonFields()}
                <Button
                  onClick={() =>
                    navigate(`/forgot-password`, { replace: true })
                  }
                  variant="link"
                  className="p-0 mt-[-1rem] text-xs font-bold justify-start text-gray-700 " // hover:text-secondary/80
                >
                  Forgot your password?
                </Button>

                {isLoginError && (
                  <div>
                    <p
                      id="error-message"
                      className="text-red-500  text-sm justify-self-center w-auto"
                    >
                      Incorrect Username / Password
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
}

export default LogIn;
