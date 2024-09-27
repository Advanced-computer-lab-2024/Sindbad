import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";


function App() {
    return (
        <main className="bg-dark text-light font-inter">
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </main>
    );
}

export default App