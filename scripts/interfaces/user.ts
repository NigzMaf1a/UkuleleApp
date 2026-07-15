//enums
import RegType from "../enums/regType";

export default interface Users {
    RegID?: number;
    Name: string;
    PhoneNo: string;
    Email: string;
    Password?: string;
    Gender: string;
    RegType: RegType;
    dLocation: string;
    AccStatus: string;
    Image?: ImageData;
}