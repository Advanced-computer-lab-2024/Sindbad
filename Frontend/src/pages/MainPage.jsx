import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom/dist";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { logout, useUser } from "@/state management/userInfo";
import { getRolePermissions } from "@/utilities/roleConfig";
import LogoSVG from "@/SVGs/Logo";
import { useState } from "react";
import { useDispatch } from "react-redux";
function MainPage() { 
    const navigate = useNavigate();
    const { type } = useUser();
    const dispatch = useDispatch();
    const [currentRole, setCurrentRole] = useState("tourist");
    const renderedFields = getRolePermissions(currentRole); //Change this field to change the role of the user

    const renderFields = () => {
        return renderedFields.map((field) => {
            return (
                <NavigationMenuItem
                key={field}
                >
                    <NavigationMenuLink to={field} className={navigationMenuTriggerStyle()}
                    onClick={() => {
                        navigate(`/app/${field}`, { replace: true });
                    }}
                    >
                        {field==="timeline" ? field : field}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            );
        });
    }
    return (
        <div>
            <div className=" px-[10%] py-4 flex bg-primary-900 gap-4">
                <LogoSVG 
                onClick={() => {
                    navigate(`/`, { replace: true });
                }}/>
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-2">
                        {renderFields()}
                    </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                    <NavigationMenuItem>
                        <NavigationMenuLink to="profile" className={navigationMenuTriggerStyle()}
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
                </NavigationMenu>
            </div>
            <Outlet />
        </div>
    );
}
export default MainPage;