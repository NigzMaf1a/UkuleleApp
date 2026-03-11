export { OrderStatus }

const enum OrderStatus{
    Processing = 'Processing',
    Hauled = 'Hauled',
    Delivered = 'Delivered',
    Paid = 'Paid',
    Cancelled = 'Cancelled'
}