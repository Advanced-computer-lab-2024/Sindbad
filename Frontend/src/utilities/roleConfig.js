// Desc: Map for each role to return pages they are allowed to access
const rolePermissions = {
    admin: ['Timeline', 'Shopping', 'Profile', 'AccountManagement'],
    guest: ['Timeline'],
    tourist: ['Profile', 'Timeline', 'Shopping'],
    tour_guide: ['Profile'],
    tourism_governor: ['Profile'],
    seller: ['Profile', 'Shopping'],
    advertiser: ['Profile'],
};
// Desc: Function to get the pages that a role is allowed to access, based on the rolePermissions map
function getRolePermissions(role) {
    return rolePermissions[role];
}
