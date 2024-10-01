// Desc: Map for each role to return pages they are allowed to access
const rolePermissions = {
    admin: ['Timeline', 'Store', 'Profile', 'AccountManagement'],
    guest: ['Timeline'],
    tourist: ['Profile', 'Timeline', 'Store'],
    tourGuide: ['Profile'],
    tourismGovernor: ['Profile'],
    seller: ['Profile', 'Store'],
    advertiser: ['Profile'],
};
// Desc: Function to get the pages that a role is allowed to access, based on the rolePermissions map
export function getRolePermissions(role) {
    return rolePermissions[role];
}
