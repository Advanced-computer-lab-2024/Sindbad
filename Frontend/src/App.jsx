import "./App.css";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { Navigate } from "react-router-dom";
import Timeline from "./pages/Timeline";
import { useUser } from '@/state management/userInfo';

function App() {
    const { id } = useUser();

    return (
        <main className="bg-dark text-light font-inter min-h-screen h-max">
            <Routes>
                <Route path="/app" element={<MainPage />}>
                    <Route path="profile" element={<Navigate to={`/app/profile/${id}`} replace />} />
                    <Route path="profile/:userId" element={<Profile />} />
                    <Route path="timeline" element={<Timeline />} />
                </Route>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Navigate to="/app" replace />} />
            </Routes>
        </main>
    );
}

export default App;
