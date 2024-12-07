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
import ComplaintManagement from "./components/custom/admin/complaint-management/ComplaintManagement";
import TagCategoryManagement from "./components/custom/admin/TagCategoryManagement";
import UserVerification from "./components/custom/admin/UserVerification";
import UserManagement from "./components/custom/admin/user-management/UserManagement";
import Booking from "./pages/Booking";
import FlightBooking from "./pages/FlightBooking";
import HotelBooking from "./pages/HotelBooking";
import HotelView from "./pages/HotelView";
import HotelConfirmation from "./pages/HotelConfirmation";
import FlightView from "./pages/FlightView";
import FlightConfirmation from "./pages/FlightConfirmation";
import DeletionRequests from "./components/custom/admin/deletion-requests/deletionRequest";
import EditFormPage from "./pages/EditFormPage";
import CreateFormPage from "./pages/CreateFormPage";
import PromoCodes from "./components/custom/admin/promocode-management/promoCode";
import { Cart } from "./pages/Cart";
import Trips from "./pages/Trips";
import TripView from "./pages/TripView";
import RevenueReport from "./pages/RevenueReport";
import { Checkout } from "./pages/Checkout";
import { useUser } from "@/state management/userInfo";
import { CheckoutSuccess } from "./pages/CheckoutSuccess";
import { CheckoutOutlet } from "./pages/CheckoutOutlet";
import { Wishlist } from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { id } = useUser();

  return (
    <main className="bg-light text-dark font-inter min-h-screen h-max">
      <Routes>
        <Route path="/app" element={<MainPage />}>
        <Route index element={<Navigate to="/app/itineraries" replace />} />
          <Route
            path="profile"
            element={<Navigate to={`/app/profile/${id}`} replace />}
          />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="sites" element={<SitesPage />} />
          <Route path="itineraries" element={<ItinerariesPage />} />
          <Route path="store" element={<ShoppingPage />} />
          <Route path="transportation" element={<Trips />} />
          <Route path="product/:productId" element={<ProductView />} />
          <Route path="revenue" element={<RevenueReport />} />
          <Route path="management" element={<AdminManagementView />}>
            <Route path="" element={<Navigate to="users" replace />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="verification" element={<UserVerification />} />
            <Route path="complaints" element={<ComplaintManagement />} />
            <Route path="tagcategories" element={<TagCategoryManagement />} />
            <Route path="deletion-requests" element={<DeletionRequests />} />
            <Route path="promocodes" element={<PromoCodes />} />
          </Route>
          <Route path="booking" element={<Booking />}>
            <Route path="" element={<Navigate to="hotel" replace />} />
            <Route path="flight" element={<FlightBooking />} />
            <Route path="hotel" element={<HotelBooking />} />
          </Route>
          <Route path="hotel/:hotelId" element={<HotelView />} />
          <Route path="flight/:flightId" element={<FlightView />} />
          <Route path="hotel/confirmation" element={<HotelConfirmation />} />
          <Route path="flight/confirmation" element={<FlightConfirmation />} />
          <Route path="itinerary/:itineraryId" element={<Itinerary />} />
          <Route path="activity/:activityId" element={<Activity />} />
          <Route path="site/:siteId" element={<Site />} />
          <Route path="transportation/:tripId" element={<TripView />} />
          <Route path="complaints/:creatorId" element={<ComplaintView />} />
          <Route
            path=":cardType/:cardId/edit"
            element={<EditFormPage />}
            loader={({ params }) => {
              const validCardTypes = [
                "itinerary",
                "activity",
                "site",
                "product",
                "transportation",
              ];
              if (!validCardTypes.includes(params.cardType)) {
                throw new Error("Invalid card type"); // Replace with error handling or redirection
              }
              return params;
            }}
          />
          <Route
            path="create/:cardType"
            element={<CreateFormPage />}
            loader={({ params }) => {
              const validCardTypes = [
                "itinerary",
                "activity",
                "site",
                "product",
                "transportation",
              ];
              if (!validCardTypes.includes(params.cardType)) {
                throw new Error("Invalid card type"); // Replace with error handling or redirection
              }
              return params;
            }}
          />
        </Route>
        <Route path="/checkout" element={<CheckoutOutlet />}>
          <Route path="" element={<Checkout />} />
          <Route path="success" element={<CheckoutSuccess />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/" element={<Navigate to="/app/itineraries" replace />} />
      </Routes>
    </main>
  );
}

export default App;
