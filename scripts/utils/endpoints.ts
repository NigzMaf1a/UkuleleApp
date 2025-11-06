const endpoints = {
    login:'/api/',
    logout:'/api/',
    fetchPendingUsers:'/api/admin/users/pending',
    fetchApprovedUsers:'/api/admin/users/approved',
    fetchInactiveUsers:'/api/admin/users/inactive',
    fetchAllUsers:'/api/admin/users/all',
    approveUser: '/api/admin/approve',      // PATCH /approve/:regID
    deactivateUser: '/api/admin/deactivate',// PATCH /deactivate/:regID
    reactivateUser: '/api/admin/activate',
    fetchFeedback:'/api/admin/feedback',
    fetchAbout:'/api/admin/about',
    fetchContacts:'/api/admin/contacts',
    fetchBookings:'/api/admin/bookings',
    fetchLending:'/api/admin/lending',
    fetchPenalties:'/api/admin/penalties',
    fetchInpections:'/api/admin/inspection',
    fetchInventory:'/api/admin/inventory',
    fetchFinances:'/api/admin/finances',
    fetchSupplies:'/api/admin/supplies',
    addFeedbackResponse:'/api/feedback/put',
    updateAbout:'/api/admin/about/update',
    updateContacts:'/api/contacts/add',
    updateUser:'/api/',
    addUser:'/api/customer/add',
    loggedUser:'/api/admin/logged'
};
export default endpoints;