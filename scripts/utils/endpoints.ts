const endpoints = {
    login:'/api/',
    logout:'/api/',

    //inventory
    addEquipment:'/api/inventory/add',
    getAllEquipment:'/api/inventory/get',
    getEquipmentById:(id:number) => `/api/inventory/get/byid/${id}`,
    updateEquipment:(id:number) => `/api/inventory/put/${id}`,
    deleteEquipment:(id:number) => `/api/inventory/delete/${id}`,

    //payments
    addPayment:'/api/payment/add',
    getAllPayments:'/api/payment/get',
    getPaymentById:(id:number) => `/api/payment/get/${id}`,
    updatePayment:(id:number) => `/api/payment/put/${id}`,
    deletePayment:(id:number) => `/api/payment/delete/${id}`,

    //contacts
    addContact:'/api/contacts/add',
    getContacts:'/api/contacts/get',

    //services - check up dis ones man
    addService:'/api/services/add',
    getAllServices:'/api/services/get',
    getServiceById:(id:number) => `/api/services/get/byid/${id}`,
    updateService:(id:number) => `/api/services/put/${id}`,
    updateServiceStatus:'/api/services/',
    updatePaymentStatus:'/api/services/',
    deleteService:(id:number) => `/api/services/delete/${id}`,

    //booking
    bookBand:'/api/booking/add',
    getAllBookings:'/api/booking/get',
    getBookingById:(id:number) => `/api/booking/get/byid/${id}`,
    updateBooking:(id:number) => `/api/booking/put/${id}`,
    deleteBooking:(id:number) => `/api/booking/delete/${id}`,

    //lending
    lendEquipment:'/api/lending/add',
    getAllLendingRequests:'/api/lending/get',
    getLentEquipmentById:(id:number) => `/api/lending/get/byid/${id}`,
    updateLending:(id:number) => `/api/lending/put/${id}`,
    deleteLending:(id:number) => `/api/lending/delete/${id}`,

    //dispatch
    addDispatch:'/api/dispatch/add',
    getAllDispatches:'/api/dispatch/get',
    getDispatchById:(id:number) => `/api/dispatch/get/byid/${id}`,
    updateDispatch:(id:number) => `/api/dispatch/put/${id}`,
    deleteDispatch:(id:number) => `/api/dispatch/delete/${id}`,

    //feedback
    addFeedback:'/api/feedback/add',
    getAllFeedback:'/api/feedback/get',
    updateFeedback:(id:number) => `/api/feedback/put/${id}`,
    deleteFeedback:(id:number) => `/api/feedback/delete/${id}`,

    //finance
    addFinance:'/api/finance/add',
    getAllFinance:'/api/finance/get',
    getFinanceById:(id:number) => `/api/finance/get/byid/${id}`,
    updateFinance:(id:number) => `/api/finance/put/${id}`,
    deleteFinance:(id:number) => `/api/finance/delete/${id}`,

    //supply
    addSupply:'/api/supply/add',
    getAllSupplies:'/api/supply/get',
    getSupplyById:(id:number) => `/api/supply/get/byid/${id}`,
    updateSupply:(id:number) => `/api/supply/put/${id}`,
    deleteSupply:(id:number) => `/api/supply/delete/${id}`,

    //penalty
    addPenalty:'/api/penalty/add',
    getAllPenalties:'/api/penalty/get',
    getPenaltyById:(id:number) => `/api/penalty/get/byid/${id}`,
    updatePenalty:(id:number) => `/api/penalty/put/${id}`,
    deletePenalty:(id:number) => `/api/penalty/delete/${id}`,

    //orders
    addOrder:'/api/orders/add',
    getAllOrders:'/api/orders/get',
    getOrderById:(id:number) => `/api/orders/get/byid/${id}`,
    updateOrder:(id:number) => `/api/orders/put/${id}`,
    deleteOrder:(id:number) => `/api/orders/delete/${id}`,

    //allocated equipment
    addAllocatedEquipment:'/api/allocatedEquipment/add',
    getAllAllocatedEquipment:'/api/allocatedEquipment/get',
    getAllocatedEquipmentById:(id:number) => `/api/allocatedEquipment/${id}`,
    updateAllocatedEquipment: (id:number) => `/api/allocatedEquipment/${id}`,


    //inspection
    addInspection:'/api/inspection/add',
    getInspections:'/api/inspection/get',
    updateInspection:(id:number) => `/api/inspection/update/${id}`,
    deleteInspection:(id:number) => `/api/inspection/delete/${id}`,

    //about
    addAbout:'/api/about/add',
    getAbout:'/api/about/get',
    updateAbout:'/api/about/update',
    deleteAbout:'/api/about/delete',

    //registration
    addUser:'/api/user/add',
    getAllUsers:'/api/user/get',
    updateUser:(id:number) => `/api/user/update/${id}`,

    //penalty payment
    addPenaltyPayment: '/api/penaltyPayment/add',
    getPenaltyPayment: '/api/penaltyPayment/get',
    getPenaltyPaymentById:(id:number) => `/api/penaltyPayment/get/${id}`,
    updatePenaltyPayment:(id:number) => `/api/penaltyPayment/update/${id}`,

    //order payment
    addOrderPayment: '/api/orderPayment/add',
    getOrderPayment: '/api/orderPayment/get',
    getOrderPaymentById:(id:number) => `/api/orderPayment/get/${id}`,
    updateOrderPayment:(id:number) => `/api/orderPayment/update/${id}`,

    //order item
    addOrderItem: '/api/orderItem/add',
    getOrderItem: '/api/orderItem/get',
    getOrderItemById:(id:number) => `/api/orderItem/get/${id}`,
    updateOrderItem:(id:number) => `/api/orderItem/update/${id}`


};
export default endpoints;