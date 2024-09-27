import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { Form, Navigate } from "react-router-dom/dist";
import Timeline from "./pages/Timeline";
import Itinerary from "./pages/ItineraryView";
import GenericForm from "./components/custom/genericForm";


function App() {

    //These routes will be used to display objects in pages using router outlets

    return (
        <main className="bg-dark text-light font-inter min-w-screen min-h-screen">
            <Routes>
                <Route path="/app" element={<MainPage/>}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="timeline" element={<Timeline/>} />
                </Route>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/Itinerary" element={<Itinerary />} />
                <Route path="/" element={<Navigate to="/app" replace />} />
            </Routes>
        </main>
    );
}

export default App