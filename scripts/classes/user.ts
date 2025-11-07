import classApiFetch from "../utils/classApiFetch";
import link from "../utils/links";
import endpoints from "../utils/endpoints";

export default class User {
  private readonly regID: number;
  private readonly token: string;
  public url: string;
  public endpoints: typeof endpoints;

  constructor(regID: number, token: string, backendUrl: string = link) {
    if (!token || !regID) {
      console.error("Invalid Session");
      throw new Error("Unauthorized access. Please login");
    }

    this.regID = regID;
    this.token = token;
    this.url = backendUrl;
    this.endpoints = endpoints;
  }

  getToken(): string {
    return this.token;
  }

  getRegID(): number {
    return this.regID;
  }  

  public apiFetch = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    return classApiFetch<T>(this.url, this.token, endpoint, options);
  };
}