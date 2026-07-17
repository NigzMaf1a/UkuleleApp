import RegType from "../enums/regTypeTwo";

export interface UserPayload {
  RegID?: number;
  Name: string;
  PhoneNo: string;
  Email: string;
  Password?: string;
  Gender: string;
  RegType: RegType;
  dLocation: string;
  accStatus: string;
  Image?: ImageData;
}

export default interface LoginResponse {
  token: string;
  user?: UserPayload;
}