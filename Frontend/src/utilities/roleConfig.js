// Desc: Map for each role to return pages they are allowed to access
const rolePermissions = {
  admin: [
    "profile",
    "itineraries",
    "activities",
    "sites",
    "store",
    "management",
    "transportation",
    "revenue",
    "notifications",
  ],
  guest: ["itineraries", "activities", "sites"],
  tourist: [
    "profile",
    "itineraries",
    "activities",
    "sites",
    "store",
    "booking",
    "transportation",
    "cart",
    "wishlist",
    "notifications",
  ],
  tourGuide: ["itineraries", "activities", "sites", "profile", "revenue","notifications"],
  tourismGovernor: ["itineraries", "activities", "sites", "profile", "revenue"],
  seller: ["itineraries", "activities", "sites", "profile", "store", "revenue","notifications"],
  advertiser: ["itineraries", "activities", "sites", "profile", "transportation", "revenue","notifications"],
};
// Desc: Function to get the pages that a role is allowed to access, based on the rolePermissions map
export function getRolePermissions(role) {
  return rolePermissions[role];
}
