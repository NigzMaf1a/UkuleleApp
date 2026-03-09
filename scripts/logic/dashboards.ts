//interfaces
import Finance from '../interfaces/finance';
import Services from '../interfaces/services';
import User from '../interfaces/user';
import Lending from '../interfaces/lending';
import Booking from '../interfaces/booking';
import Feedback from '../interfaces/feedback';
import Dispatch from '../interfaces/dispatch';
import Supply from '../interfaces/supply';
import Order from '../interfaces/orders';
import Penalty from '../interfaces/penalty';
import Inspection from '../interfaces/inspection';
import Inventory from '../interfaces/inventory';

interface CustomerData{
    payments?:Finance[];
    feedback?:Feedback[];
    services?:Services[];
}

interface ServiceManagerData{
    services:Services[];
}