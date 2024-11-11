import { createTrip, updateTrip } from "@/services/TripApiHandler";

export const tripSubmit = async (values, id, data, navigate, dispatch) => {
  if (data) {
    updateTrip(data._id, values);
  } else {
    const tripWithId = {
      ...values,
      creatorId: id,
    };
    createTrip(tripWithId);
  }

  if (navigate) {
    navigate("/app/trips");
  }
};
