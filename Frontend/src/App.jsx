import { Navigate, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ItinerariesPage from "./pages/Itineraries";
import Itinerary from "./pages/ItineraryView";
import ActivitiesPage from "./pages/Activities";
import Activity from "./pages/ActivityView";
import SitesPage from "./pages/Sites";
import Site from "./pages/SiteView";
import ShoppingPage from "./pages/Products";
import ProductView from "./pages/ProductView";
import ComplaintView from "./pages/TouristComplaints/ComplaintView";
import AdminManagementView from "./pages/AdminManagementView";
import AdminVerificationView from "./pages/AdminVerificationView";

import { useUser } from "@/state management/userInfo";

function App() {
	const { id } = useUser();

	return (
		<main className="bg-light text-dark font-inter min-h-screen h-max">
			<Routes>
				<Route path="/app" element={<MainPage />}>
					<Route
						path="profile"
						element={<Navigate to={`/app/profile/${id}`} replace />}
					/>
					<Route path="profile/:profileId" element={<Profile />} />
					<Route path="activities" element={<ActivitiesPage />} />
					<Route path="sites" element={<SitesPage />} />
					<Route path="itineraries" element={<ItinerariesPage />} />
					<Route path="store" element={<ShoppingPage />} />
					<Route path="product/:productId" element={<ProductView />} />
					<Route path="management" element={<AdminManagementView />} />
					<Route path="verification" element={<AdminVerificationView />} />
					<Route path="itinerary/:itineraryId" element={<Itinerary />} />
					<Route path="activity/:activityId" element={<Activity />} />
					<Route path="site/:siteId" element={<Site />} />
					<Route path="complaints/:creatorId" element={<ComplaintView />} />
				</Route>
				<Route path="/login" element={<LogIn />} />
				<Route path="/signup" element={<SignUp />} />

				<Route path="/" element={<Navigate to="/app" replace />} />
			</Routes>
		</main>
	);
}

export default App;
