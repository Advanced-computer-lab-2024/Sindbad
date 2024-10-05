import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom/dist";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { logout } from "@/state management/userInfo";
import { getRolePermissions } from "@/utilities/roleConfig";
import LogoSVG from "@/SVGs/Logo";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@/state management/userInfo";

function MainPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { type } = useUser();
    const [currentRole, setCurrentRole] = useState(type); // change this state to change the role of the user
    const renderedFields = getRolePermissions(currentRole);
  
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

    const renderFields = () => {
        return renderedFields
            .filter((field) => field !== "profile")
            .map((field) => {
                return (
                    <NavigationMenuItem
                        key={field}
                    >
                        <NavigationMenuLink to={field}
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
    }

    return (
        <div>
            <div className="bg-primary-900/50 flex justify-center items-center sticky top-0 z-50 backdrop-blur-md">
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
                        {renderedFields.includes("profile") &&
                            <button
                                onClick={() => navigate(`/app/profile`, { replace: true })}
                            >
                                <CircleUserRound size={24} />
                            </button>
                        }
                        <NavigationMenu className="list-none">
                            <NavigationMenuList className={navigationMenuTriggerStyle()}>
                                <NavigationMenuItem>
                                    <NavigationMenuLink to="profile" className="nav-underline"
                                        onClick={() => {
                                            if (currentRole === "guest") {
                                                navigate(`/login`, { replace: true });
                                                return;
                                            }
                                            else {
                                                setCurrentRole("guest");
                                                dispatch(logout());
                                            }
                                        }}
                                    >
                                        {currentRole == "guest" ? "Log In" : "Log Out"}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
export default MainPage;
