import { createTourist, updateTourist } from "@/services/TouristApiHandler";

export const touristSubmit = (values, id) => {
    if (id) {
      return updateTourist(id, values);
    }
    return createTourist(values);
}