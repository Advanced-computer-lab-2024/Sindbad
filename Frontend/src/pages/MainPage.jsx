import {useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom/dist";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { useUser } from "@/state management/userInfo";
import { getRolePermissions } from "@/utilities/roleConfig";
function MainPage() {
    
    const navigate = useNavigate();
    const { type } = useUser();
    const renderedFields = getRolePermissions("tourist"); //Change this field to change the role of the user

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
                        {field}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            );
        });
    }
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    {renderFields()}
                </NavigationMenuList>
            </NavigationMenu>
            <Outlet />
        </div>
    );
}
export default MainPage;