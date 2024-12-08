import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom/dist";

import { getTouristById } from "@/services/TouristApiHandler";
import { getTourGuide, } from "@/services/TourGuideApiHandler";
import { getAdmin } from "@/services/AdminApiHandler";
import { getSeller } from "@/services/SellerApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import LogoSVG from "@/SVGs/Logo";
import { CircleUserRound, ShoppingCart, Heart, Bell } from "lucide-react";

import { getRolePermissions } from "@/utilities/roleConfig";

import { useDispatch } from "react-redux";
import { useUser, logout, setCurrency } from "@/state management/userInfo";
import axiosInstance from "@/services/axiosInstance";
import { HelpButton } from "@/components/custom/HelpButton";

function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, role } = useUser();
  const renderedFields = getRolePermissions(role);
  const [notifications, setNotifications] = useState(null);
  const [error, setError] = useState(false);

  const getUserNotifications = async (id, role) => {
    try {
      console.log("Fetching notifications for:", { id, role }); // Debug log
      let notifications = null;

      switch (role) {
        case "tourist":
          const { Notifications: touristNotifications } = await getTouristById(id);
          notifications = touristNotifications;
          break;

        case "tourGuide":
          const { Notifications: guideNotifications } = await getTourGuide(id);
          console.log(guideNotifications);
          notifications = guideNotifications;
          break;

        case "seller":
          const { Notifications: sellerNotifications } = await getSeller(id);
          notifications = sellerNotifications;
          break;

        case "advertiser":
          const { Notifications: advertiserNotifications } = await getAdvertiser(id);
          notifications = advertiserNotifications;
          break;

        case "admin":
          const { Notifications: adminNotifications } = await getAdmin(id);
          notifications = adminNotifications;
          break;

        default:
          throw new Error("Invalid role or access denied");
      }

      return notifications; // Only return notifications
    } catch (error) {
      console.error(error.message || "Error fetching notifications");
      return { error: true, message: error.message || "Error fetching notifications" };
    }
  };

  useEffect(() => {
    if (!id || !role) {
      console.log("User ID or role not available yet:", { id, role });
      return; // Wait until `id` and `role` are defined
    }

    const fetchNotifications = async () => {
      console.log("Starting fetchNotifications with:", { id, role }); // Debug log
      const result = await getUserNotifications(id, role);
      if (result.error) {
        setError(true);
      } else {
        setError(false);
        setNotifications(result); // Set notifications state
      }
    };

    fetchNotifications();
  }, [id, role]); // Add `id` and `role` as dependencies

  function camelCaseToEnglish(str) {
    let result = str
      .replace(/([A-Z])/g, " $1") // Insert a space before each uppercase letter
      .replace(/-/g, " ") // Replace hyphens with spaces
      .toLowerCase() // Convert the entire string to lowercase
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join the words back together
    return result; // Return the final string
  }

  const callLogout = async () => {
    await axiosInstance.post("/auth/logout");
    dispatch(logout());
    dispatch(setCurrency("USD"));
    navigate(`/app/itineraries`, { replace: true });

    console.log("Logged out");
  };

  const renderFields = () => {
    return renderedFields
      .filter(
        (field) =>
          field !== "cart" && field != "wishlist" && field !== "profile" && field !== "notifications"
      )
      .map((field) => {
        return (
          <NavigationMenuItem key={field}>
            <NavigationMenuLink
              to={field}
              onClick={() => {
                navigate(`/app/${field}`, { replace: true });
              }}
              className="nav-underline"
            >
              {camelCaseToEnglish(field)}
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      });
  };

  return (
    <div>
      <div className="bg-white shadow-sm flex justify-center items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="px-24 py-2 max-w-[1200px] w-full justify-between flex gap-4">
          {/* <div className="flex gap-6 items-center justify-center"> */}
          <div className="w-[173px]">
            <div className="flex items-center gap-1 cursor-pointer w-max"
              onClick={() => {
                navigate(`/`, { replace: true });
              }}
            >
              <LogoSVG
                className="h-10 w-10"
              />
              <p className="text-primary-900 font-bold">
                Sindbad
              </p>
            </div>
          </div>
          <NavigationMenu>
            <NavigationMenuList className={navigationMenuTriggerStyle()}>
              {renderFields()}
            </NavigationMenuList>
          </NavigationMenu>
          {/* </div> */}
          <div className="flex gap-4 items-center w-[173px] justify-end">
            {console.log("Notifications: ", notifications)} {/* Log notifications */}
            {renderedFields.includes("notifications") && (
              <Sheet>
                <SheetTrigger>
                  <Bell size={24} />
                </SheetTrigger>
                <SheetContent className="bg-primary-50 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-primary-700 text-xl py-2">
                      Notification Dashboard <hr />
                    </SheetTitle>
                    <SheetDescription>
                      <div className="flex flex-col-reverse">
                        {console.log("Notifications Array: ", notifications)} {/* Check the notifications array */}
                        {notifications && notifications.length > 0 ? (
                          notifications.map((notif, index) => (
                            <div
                              key={index}
                              className=" border b-1 rounded-lg p-4 mb-3 bg-primary-200"
                            >
                              <h3 className="font-bold m-0 text-primary-800">{notif.title}</h3>
                              <p className="mx-2 text-primary-700">{notif.Body}</p>
                            </div>
                          ))
                        ) : (
                          <p>No notifications available</p>
                        )}
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            )}

            {renderedFields.includes("wishlist") && (
              <button
                onClick={() => navigate(`/app/wishlist`, { replace: true })}
              >
                <Heart size={24} />
              </button>
            )}
            {renderedFields.includes("cart") && (
              <button onClick={() => navigate(`/app/cart`, { replace: true })}>
                <ShoppingCart size={24} />
              </button>
            )}
            {renderedFields.includes("profile") && (
              <button
                onClick={() => navigate(`/app/profile`, { replace: true })}
              >
                <CircleUserRound size={24} />
              </button>
            )}
            <NavigationMenu className="list-none">
              <NavigationMenuList className={navigationMenuTriggerStyle()}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    to="profile"
                    className="nav-underline"
                    onClick={async () => {
                      if (role === "guest") {
                        navigate(`/login`, { replace: true });
                        return;
                      } else {
                        await callLogout();
                      }
                    }}
                  >
                    {role == "guest" ? "Log In" : "Log Out"}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
      <Outlet />

      {(role === "guest" || role === "tourist") && (
        <div className="fixed bottom-6 right-6">
          <HelpButton />
        </div>
      )}
    </div>
  );
}
export default MainPage;
