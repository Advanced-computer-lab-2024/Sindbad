import "./App.css";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { Navigate } from "react-router-dom";
import Timeline from "./pages/Timeline";
import Itinerary from "./pages/ItineraryView";
import Site from "./pages/SitesView";
import ProductView from "./pages/ProductView";
import AdminManagementView from "./pages/AdminManagementView"; 

import { useUser } from "@/state management/userInfo";
import ShoppingPage from "./pages/ShoppingPage";

function App() {
	const { id } = useUser();

	return (
		<main className="bg-dark text-light font-inter min-h-screen h-max">
			<Routes>
				<Route path="/app" element={<MainPage />}>
					<Route
						path="profile"
						element={<Navigate to={`/app/profile/${id}`} replace />}
					/>
					<Route path="profile/:userId" element={<Profile />} />
					<Route path="timeline" element={<Timeline />} />
					<Route path="store" element={<ShoppingPage />} />
					<Route path="product" element={<ProductView />} />
					<Route path="management" element={<AdminManagementView />} />
				</Route>
				<Route path="/login" element={<LogIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/Itinerary" element={<Itinerary />} />
                <Route path="/site" element= {<Site />} />
				<Route path="/" element={<Navigate to="/app" replace />} />
			</Routes>
		</main>
	);
}

export default App;
