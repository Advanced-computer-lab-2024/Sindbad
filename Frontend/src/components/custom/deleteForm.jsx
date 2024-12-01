import { deleteSite } from "../../services/SiteApiHandler";
import { deleteActivity } from "../../services/ActivityApiHandler";
import { deleteItinerary } from "../../services/ItineraryApiHandler";
import { removeTourGuideWork } from "@/services/TourGuideApiHandler";
import { deleteTrip } from "@/services/TripApiHandler";

import { Button } from "../ui/button";
import { deleteUser } from "@/services/UserApiHandler";

function DeleteForm({ type, data }) {
  const handleButtonClick = () => {
    if (type === "site") {
      deleteSite(data._id);
    }
    if (type === "activity") {
      deleteActivity(data._id);
    }
    if (type === "itinerary") {
      deleteItinerary(data._id);
    }
    if (type === "experience") {
      removeTourGuideWork(data.id, data.experience_id);
    }
    if (
      type === "tourGuide" ||
      type === "tourist" ||
      type === "seller" ||
      type === "advertiser"
    ) {
      deleteUser(data._id, type);
    }
    if (type === "trip") {
      deleteTrip(data._id);
    }
  };
  return (
    <div>
      <Button onClick={handleButtonClick} className="bg-destructive w-max">
        <p className="text-xs text-white">Delete</p>
      </Button>
    </div>
  );
}
export default DeleteForm;
