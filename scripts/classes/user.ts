import classApiFetch from "../utils/classApiFetch";
import link from "../utils/links";
import endpoints from "../utils/endpoints";

//interfaces
import Contact from "../interfaces/contact";
import About from "../interfaces/about";
import Users from "../interfaces/user";


//utils
import errorLogger from "../utils/errorLogger";

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

  public async getAbout():Promise<About[]>{
    try{
      return await this.apiFetch<About[]>(this.endpoints.getAbout)
    } catch(err){
      errorLogger(err);
      return [];
    }
  }

  public async getContact():Promise<Contact[]>{
    try{
      return await this.apiFetch<Contact[]>(this.endpoints.getContacts);
    } catch(err){
      errorLogger(err);
      return [];
    }
  }

  public async getUser():Promise<Users>{
    try {
      const allUsers = await this.apiFetch<Users[]>(this.endpoints.getAllUsers);
      return allUsers.find(u => u.regID === this.getRegID())
    }catch(err){
      errorLogger(err);
    }
  }
}