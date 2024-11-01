import { updateTourist } from "@/services/TouristApiHandler";

export const touristSubmit = (values, id) => {
  return updateTourist(id, values);
}