const endpoints = {
    login:'/api/',
    logout:'/api/',

    //inventory
    addEquipment:'/api/inventory/add',
    getAllEquipment:'/api/inventory/get',
    getEquipmentById:'/api/inventory/get/byid/',
    updateEquipment:'/api/inventory/put/',
    deleteEquipment:'/api/inventory/delete/',

    //payments
    addPayment:'/api/payment/add',
    getAllPayments:'/api/payment/get',
    getPaymentById:'/api/payment/get/',
    updatePayment:'/api/payment/put/',
    deletePayment:'/api/payment/delete/',

    //contacts
    addContact:'/api/contacts/add',
    getContacts:'/api/contacts/get',

    //services - check up dis ones man
    addService:'/api/services/add',
    getAllServices:'/api/services/get',
    getServiceById:'/api/services/get/byid/',
    updateService:'/api/services/put/',
    updateServiceStatus:'/api/services/',
    updatePaymentStatus:'/api/services/',
    deleteService:'/api/services/delete/',

    //booking
    bookBand:'/api/booking/add',
    getAllBookings:'/api/booking/get',
    getBookingById:'/api/booking/get/byid/',
    updateBooking:'/api/booking/put/',
    deleteBooking:'/api/booking/delete/',

    //lending
    lendEquipment:'/api/lending/add',
    getAllLentEquipment:'/api/lending/get',
    getLentEquipmentById:'/api/lending/get/byid/',
    updateLentEquipment:'/api/lending/put/',
    deleteLentEquipment:'/api/lending/delete/',

    //dispatch
    addDispatch:'/api/dispatch/add',
    getAllDispatches:'/api/dispatch/get',
    getDispatchById:'/api/dispatch/get/byid/',
    updateDispatch:'/api/dispatch/put/',
    deleteDispatch:'/api/dispatch/delete/',

    //feedback
    addFeedback:'/api/feedback/add',
    getAllFeedback:'/api/feedback/get',
    updateFeedback:'/api/feedback/put/',
    deleteFeedback:'/api/feedback/delete/',

    //finance
    addFinance:'/api/finance/add',
    getAllFinance:'/api/finance/get',
    getFinanceById:'/api/finance/get/byid/',
    updateFinance:'/api/finance/put/',
    deleteFinance:'/api/finance/delete/',

    //supply
    addSupply:'/api/supply/add',
    getAllSupplies:'/api/supply/get',
    getSupplyById:'/api/supply/get/byid/',
    updateSupply:'/api/supply/put/',
    deleteSupply:'/api/supply/delete/',

    //penalty
    addPenalty:'/api/penalty/add',
    getAllPenalties:'/api/penalty/get',
    getPenaltyById:'/api/penalty/get/byid/',
    updatePenalty:'/api/penalty/put',
    deletePenalty:'/api/penalty/delete',

};
export default endpoints;