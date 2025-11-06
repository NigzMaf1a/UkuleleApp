import classApiFetch from "../utils/classApiFetch";
import link from "../utils/links";

export default class User {
  private readonly regID: number;
  private readonly token: string;
  public url: string;

  constructor(regID: number, token: string, backendUrl: string = link) {
    if (!token || !regID) {
      console.error("Invalid Session");
      throw new Error("Unauthorized access. Please login");
    }

    this.regID = regID;
    this.token = token;
    this.url = backendUrl;
  }

  getToken(): string {
    return this.token;
  }

  getRegID(): number {
    return this.regID;
  }  

  private apiFetch = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    return classApiFetch<T>(this.url, this.token, endpoint, options);
  };
}