import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom/dist";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import LogoSVG from "@/SVGs/Logo";
import { CircleUserRound, ShoppingCart, Heart } from "lucide-react";

import { getRolePermissions } from "@/utilities/roleConfig";

import { useDispatch } from "react-redux";
import { useUser, logout, setCurrency } from "@/state management/userInfo";
import axiosInstance from "@/services/axiosInstance";
import { HelpButton } from "@/components/custom/HelpButton";

function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useUser();
  const renderedFields = getRolePermissions(role);

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
          field !== "cart" && field != "wishlist" && field !== "profile"
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
      <div className="bg-primary-700/50 flex justify-center items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="px-24 py-2 max-w-[1200px] w-full justify-between flex gap-4">
          <div className="flex gap-6 items-center justify-center">
            <LogoSVG
              onClick={() => {
                navigate(`/`, { replace: true });
              }}
              className="h-10 w-10 cursor-pointer"
            />
            <NavigationMenu>
              <NavigationMenuList className={navigationMenuTriggerStyle()}>
                {renderFields()}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-4 items-center">
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
