import {useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom/dist";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
function MainPage() {
    
    const navigate = useNavigate();
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                            <NavigationMenuLink to="timeline" className={navigationMenuTriggerStyle()}
                            onClick={() => {
                                navigate("/app/timeline", { replace: true });
                            }}
                            >
                                Timeline
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink to="profile" className={navigationMenuTriggerStyle()}
                            onClick={() => {
                                navigate("/app/profile", { replace: true });
                            }}
                            >
                                Profile
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink to="store" className={navigationMenuTriggerStyle()}
                            onClick={() => {
                                navigate("/app/store", { replace: true });
                            }}
                            >
                                Store
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink to="store" className={navigationMenuTriggerStyle()}
                            onClick={() => {
                                navigate("/app/accountmanagement", { replace: true });
                            }}
                            >
                                Account Management
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Outlet />
        </div>
    );
}
export default MainPage;