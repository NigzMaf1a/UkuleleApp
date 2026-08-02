export { Genre, ServiceType, ServiceStatus, PaymentStatus };

const enum Genre {
    Reggae = 'Reggae',
    Rhumba = 'Rhumba',
    Zilizopendwa = 'Zilizopendwa',
    Benga = 'Benga',
    Soul = 'Soul',
    RnB = 'RnB'
}

const enum ServiceType {
    Lending = 'Lending',
    Booking = 'Booking'
}

const enum ServiceStatus {
    Approved = 'Approved',
    Pending = 'Pending'
}

const enum PaymentStatus {
    Paid = 'Paid',
    NotPaid = 'Not Paid'
}