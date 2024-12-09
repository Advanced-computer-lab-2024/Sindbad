import { deleteSite } from "../../services/SiteApiHandler";
import { deleteActivity } from "../../services/ActivityApiHandler";
import { deleteItinerary } from "../../services/ItineraryApiHandler";
import { removeTourGuideWork } from "@/services/TourGuideApiHandler";
import { deleteTrip } from "@/services/TripApiHandler";

import { Button } from "../ui/button";
import { deleteUser } from "@/services/UserApiHandler";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

function DeleteForm({ type, data }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    if (type === "site") {
      try {
        const response = await deleteSite(data._id);
        if (!response.error) {
          toast({ description: "Site deleted successfully" });
          navigate(`/app/profile`);
        } else { 
          throw new Error("An unknown error has occurred");
        }
      } catch (error) {
        toast({ description: "An unknown error has occurred" });
      }
    }
    if (type === "activity") {
      try {
        const response = await deleteActivity(data._id);
        if (!response.error) {
          toast({ description: "Activity deleted successfully" });
          navigate(`/app/profile`);
        } else {
          throw new Error("An unknown error has occurred");
        }
      } catch (error) {
        toast({ description: "An unknown error has occurred" });
      }
    }
    if (type === "itinerary") {
      try {
        const response = await deleteItinerary(data._id);
        if (!response.error) {
          toast({ description: "Itinerary deleted successfully" });
          navigate(`/app/profile`);
        } else {
          throw new Error("An unknown error has occurred");
        }
      } catch (error) {
        toast({ description: "An unknown error has occurred" });
      }
    }
    if (type === "experience") {
      try {
        const response = await removeTourGuideWork(data.id, data.experience_id);
        if (!response.error) {
          toast({ description: "Experience deleted successfully" });
          navigate(`/app/profile`);
        } else {
          throw new Error("An unknown error has occurred");
        }
      } catch (error) {
        toast({ description: "An unknown error has occurred" });
      }
    }
    if (
      type === "tourGuide" ||
      type === "tourist" ||
      type === "seller" ||
      type === "advertiser"
    ) {
      try {
        const response = await deleteUser(data._id, type);
        if (!response.error) {
          toast({ description: "Deletion request has been sent" });
          navigate(`/app/profile`);
        } else {
          throw new Error("An unknown error has occurred");
        }
      } catch (error) {
        toast({ description: "An unknown error has occurred" });
      }
    }
    if (type === "transportation") {
      try {
        const response = await deleteTrip(data._id);
        if (!response.error) {
          toast({ description: "Transportation deleted successfully" });
          navigate(`/app/profile`);
        } else {
          throw new Error("An unknown error has occurred");
        }
      } catch (error) {
        toast({ description: "An unknown error has occurred" });
      }
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
