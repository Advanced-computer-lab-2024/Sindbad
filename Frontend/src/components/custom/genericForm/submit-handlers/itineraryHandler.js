import { createItinerary, updateItinerary } from "@/services/ItineraryApiHandler";

export const itinerarySubmit = (values, id, data) => {
    if (data) {
      updateItinerary(data._id, values);
    } else {
      const itineraryWithId = {
        ...values,
        creatorId: id,
      };
      createItinerary(itineraryWithId);
    }
  }