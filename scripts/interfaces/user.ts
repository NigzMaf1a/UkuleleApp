//enums
import RegType from "../enums/regType";

export default interface Users {
    regID?: number;
    name: string;
    phoneNo: string;
    email:string;
    password?: string;
    gender: string;
    regType: RegType;
    dLocation: string;
    accStatus: string;
    image?:ImageData;
}