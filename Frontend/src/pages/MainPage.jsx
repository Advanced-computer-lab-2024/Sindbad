import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import { Outlet } from "react-router-dom/dist";
function MainPage() {
    
    return (
        <div>
            <h1>Main Page</h1>
            <Outlet />
        </div>
    );
}
export default MainPage;