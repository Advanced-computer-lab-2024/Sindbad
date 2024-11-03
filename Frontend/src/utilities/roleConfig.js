// Desc: Map for each role to return pages they are allowed to access
const rolePermissions = {
	admin: ["itineraries", "activities", "sites", "store", "management", "verification"],
	guest: ["itineraries", "activities", "sites",],
	tourist: ["profile", "itineraries", "activities", "sites", "store"],
	tourGuide: ["profile"],
	tourismGovernor: ["profile"],
	seller: ["profile", "store"],
	advertiser: ["profile"],
};
// Desc: Function to get the pages that a role is allowed to access, based on the rolePermissions map
export function getRolePermissions(role) {
	return rolePermissions[role];
}
