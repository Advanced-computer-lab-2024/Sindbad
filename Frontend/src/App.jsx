import "./App.css";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { Navigate } from "react-router-dom/dist";
import Timeline from "./pages/Timeline";


function App() {

    //These routes will be used to display objects in pages using router outlets

    return (
        <main className="bg-dark text-light font-inter min-h-screen h-max">
            <Routes>
                <Route path="/app" element={<MainPage/>}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="timeline" element={<Timeline/>} />
                    <Route path="store" element={<Timeline/>} />
                    <Route path="account-management" element={<Timeline/>} />
                </Route>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Navigate to="/app" replace />} />
            </Routes>
        </main>
    );
}

export default App