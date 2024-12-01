// Desc: Map for each role to return pages they are allowed to access
const rolePermissions = {
  admin: [
    "profile",
    "itineraries",
    "activities",
    "sites",
    "store",
    "management",
    "trips",
    "revenue",
  ],
  guest: ["itineraries", "activities", "sites"],
  tourist: [
    "profile",
    "itineraries",
    "activities",
    "sites",
    "store",
    "booking",
    "trips",
    "cart",
    "wishlist",
  ],
  tourGuide: ["itineraries", "activities", "sites", "profile", "revenue"],
  tourismGovernor: ["itineraries", "activities", "sites", "profile", "revenue"],
  seller: ["itineraries", "activities", "sites", "profile", "store", "revenue"],
  advertiser: ["itineraries", "activities", "sites", "profile", "trips", "revenue"],
};
// Desc: Function to get the pages that a role is allowed to access, based on the rolePermissions map
export function getRolePermissions(role) {
  return rolePermissions[role];
}
