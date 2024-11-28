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
  guest: ["itineraries", "activities", "sites", "trips"],
  tourist: [
    "profile",
    "itineraries",
    "activities",
    "sites",
    "store",
    "booking",
    "trips",
    "cart",
  ],
  tourGuide: ["profile", "revenue"],
  tourismGovernor: ["profile", "revenue"],
  seller: ["profile", "store", "revenue"],
  advertiser: ["profile", "trips", "revenue"],
};
// Desc: Function to get the pages that a role is allowed to access, based on the rolePermissions map
export function getRolePermissions(role) {
  return rolePermissions[role];
}
