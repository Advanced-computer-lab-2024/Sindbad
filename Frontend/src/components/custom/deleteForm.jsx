import { deleteSite } from "../../services/SiteApiHandler";
import { deleteActivity } from "../../services/ActivityApiHandler";
import { deleteItinerary } from "../../services/ItineraryApiHandler";
import { removeTourGuideWork } from "@/services/TourGuideApiHandler";

import { Button } from "../ui/button";

function DeleteForm( {type, data} ) {
    
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
        if (type === "tourGuide") {
            //deleteTourGuide(data.id);
        }
        if (type === "tourist") {
            //deleteTourist(data.id);
        }
        if (type === "seller") {
            //deleteSeller(data.id);
        }
        if (type === "advertiser") {
            //deleteAdvertiser(data.id);
        }
    }
  return (
    <div>
      <Button onClick={handleButtonClick} className="bg-destructive">
        <p className="text-xs text-white">
          Delete
        </p>
      </Button>
    </div>
  );
} 
export default DeleteForm;