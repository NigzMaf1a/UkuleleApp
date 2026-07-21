import classApiFetch from "../utils/classApiFetch";
import link from "../utils/links";
import endpoints from "../utils/endpoints";

//interfaces
import Contact from "../interfaces/contact";
import About from "../interfaces/about";
import Users from "../interfaces/user";
import Dispatch from "../interfaces/dispatch";
import Lending from "../interfaces/lending";
import { ToastType } from "../utils/toaster";

//enums
import RegType from "../enums/regType";
import DispatchStatus from "../enums/dispatch";


//utils
import errorLogger from "../utils/errorLogger";
import toaster from "../utils/toaster";

export default class User {
  private readonly regID: number;
  private readonly token: string;
  public url: string;
  public endpoints: typeof endpoints;
  public toaster: (message: string, toast_type: ToastType) => void;

  constructor(regID: number, token: string, backendUrl: string = link) {
    if (!token || !regID) {
      console.error("Invalid Session");
      throw new Error("Unauthorized access. Please login");
    }

    this.regID = regID;
    this.token = token;
    this.url = backendUrl;
    this.endpoints = endpoints;
    this.toaster = toaster;
  }

  getToken(): string {
    return this.token;
  }

  getRegID(): number {
    return this.regID;
  }

  async getRegType() {
    return await this.getUser().then(u => u?.regtype);
  }



  public apiFetch = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    return classApiFetch<T>(this.url, this.token, endpoint, options);
  };

  public async getAbout(): Promise<About[]> {
    try {
      this.toaster('About fetched successfully', 'info')
      return await this.apiFetch<About[]>(this.endpoints.getAbout)
    } catch (err) {
      errorLogger(err);
      return [];
    }
  }

  public async getContact(): Promise<Contact> {
    try {
      this.toaster('Contact fetch successful', 'info');
      return await this.apiFetch<Contact>(this.endpoints.getContacts);
    } catch (err) {
      errorLogger(err);

      return {
        emailaddress: '',
        facebook: '',
        instagram: '',
        phoneno: '',
        pobox: '',
      };
    }
  }

  public async getUser(): Promise<Users | undefined> {
    try {
      const allUsers = await this.apiFetch<Users[]>(this.endpoints.getAllUsers);
      this.toaster('User fetch successful', 'info');
      console.log(allUsers)
      if (allUsers !== undefined && allUsers.length > 0) {
        return allUsers.find(u => u.regid === this.getRegID());
      }
    } catch (err) {
      errorLogger(err);
      return undefined;
    }
  }

  public async soundSystemDispatches(): Promise<Dispatch[] | undefined> {
    const user = await this.getUser();
    if (user) {
      switch (user.regtype) {
        case RegType.DJ || RegType.Mcee || RegType.Band:
          {
            try {
              this.toaster('Dispatch record fetch successful', 'info')
              return this.apiFetch<Dispatch[]>(this.endpoints.getAllDispatches);
            } catch (error) {
              errorLogger(error);
              return [];
            }
          }
        default:
          if (!RegType.DJ || !RegType.Mcee || !RegType.Band) {
            return [];
          }
      }
    }
  }

  public async packForDispatch(dispatch_id: number) {
    let status: Partial<Dispatch> = {
      dispatched: DispatchStatus.Packed
    }

    if (await this.getUser() !== undefined) {
      switch (await this.getUser().then(p => p?.regtype)) {
        case RegType.DJ || RegType.Mcee || RegType.Band:
          {
            try {
              await this.apiFetch(this.endpoints.updateDispatch(dispatch_id),
                {
                  method: "PUT",
                  body: JSON.stringify(status)
                }
              );
              this.toaster('Ready for dispatch', 'success');
            } catch (error) {
              errorLogger(error);
            }
          }
        default:
          if (!RegType.DJ || !RegType.Mcee || !RegType.Band) {
            errorLogger('Invalid registration type');
          }
      }
    }
  }

  public async soundSystemGetLending(): Promise<Lending[]> {
    try {
      this.toaster('Lendings fetched successfully', 'info');
      return await this.apiFetch<Lending[]>(this.endpoints.getAllLendingRequests);
    } catch (error) {
      errorLogger(error);
      return [];
    }
  }

  public async soundSystemApproveLending(id: number) {
    let status: Partial<Lending> = {
      performed: 'Yes'
    }

    try {
      await this.apiFetch(this.endpoints.updateLending(id),
        {
          method: 'PUT',
          body: JSON.stringify(status)
        }
      );
      this.toaster('Lending approved successfully', 'success');
    } catch (error) {
      errorLogger(error);
    }
  }
}