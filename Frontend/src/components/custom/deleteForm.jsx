import { Button } from "../ui/button";
import { deleteSite } from "../../services/SiteApiHandler";
import { deleteActivity } from "../../services/ActivityApiHandler";
import { deleteItinerary } from "../../services/ItineraryApiHandler";

function DeleteForm( {type, data} ) {

  console.log(data)
    
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
    }
  return (
    <div>
      <Button onClick={handleButtonClick}>
        <p className="text-xs text-white">
          Delete
        </p>
        </Button>
    </div>
  );
} 
export default DeleteForm;