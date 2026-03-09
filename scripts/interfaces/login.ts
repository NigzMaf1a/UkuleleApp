import Users from "./user";

export default interface LoginResponse {
  token: string;
  user?: Users;
}