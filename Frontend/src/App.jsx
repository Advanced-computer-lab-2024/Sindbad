import "./App.css";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { Navigate } from "react-router-dom";
import Itinerary from "./pages/ItineraryView";
import Activity from "./pages/ActivityView";
import Site from "./pages/SiteView";
import ProductView from "./pages/ProductView";
import AdminManagementView from "./pages/AdminManagementView";

import { useUser } from "@/state management/userInfo";
import ShoppingPage from "./pages/ShoppingPage";
import ActivitiesPage from "./pages/Activities";
import SitesPage from "./pages/Sites";
import ItinerariesPage from "./pages/Itineraries";

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
					<Route path="activities" element={<ActivitiesPage />} />
					<Route path="sites" element={<SitesPage />} />
					<Route path="itineraries" element={<ItinerariesPage />} />
					<Route path="store" element={<ShoppingPage />} />
					<Route path="product/:productId" element={<ProductView />} />
					<Route path="management" element={<AdminManagementView />} />
					<Route path="itinerary/:itineraryId" element={<Itinerary />} />
					<Route path="activity/:activityId" element={<Activity />} />
					<Route path="site/:siteId" element={<Site />} />
				</Route>
				<Route path="/login" element={<LogIn />} />
				<Route path="/signup" element={<SignUp />} />

				<Route path="/" element={<Navigate to="/app" replace />} />
			</Routes>
		</main>
	);
}

export default App;
