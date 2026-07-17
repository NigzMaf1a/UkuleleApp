//enums
import RegType from "../enums/regType";

export default interface Users {
    regid?: number;
    name: string;
    phoneno: string;
    email: string;
    password?: string;
    gender: string;
    regtype: RegType;
    dlocation: string;
    accstatus: string;
    image?: ImageData;
}