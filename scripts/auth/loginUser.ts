//interfaces
import LoginResponse from "../interfaces/login";

//utils
import apiFetch from "../utils/apiFetch";
import endpoints from "../utils/endpoints";


export default async function loginUser(creds: {email:string, password:string}): Promise<LoginResponse> {
  try {
    console.log('We are really here man');
    return await apiFetch<LoginResponse>(endpoints.login, {
      method: 'POST',
      body: JSON.stringify(creds),
    });
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}