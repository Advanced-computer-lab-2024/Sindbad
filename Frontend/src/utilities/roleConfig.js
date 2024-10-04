// Desc: Map for each role to return pages they are allowed to access
const rolePermissions = {
    admin: ['profile', 'timeline', 'store', 'account-management'],
    guest: ['timeline'],
    tourist: ['profile', 'timeline', 'store'],
    tourGuide: ['profile'],
    tourismGovernor: ['profile'],
    seller: ['profile', 'store'],
    advertiser: ['profile'],
};
// Desc: Function to get the pages that a role is allowed to access, based on the rolePermissions map
export function getRolePermissions(role) {
    return rolePermissions[role];
}
