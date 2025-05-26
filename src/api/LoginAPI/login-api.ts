// import { LoginResponse } from "../types/ILoginForm";
import { Http } from "../../core/Http";
import LoginFormModel from './ILoginForm';

const authAPIInstance = new Http("api/v1/auth");

export default class LoginAPI {
  // public request(data: Record<string, string>): Promise<XMLHttpRequest> {
  //   return authAPIInstance.post('/login', data)
  //     // .then(({user_id}) => user_id); 
  // }
  public request(data: LoginFormModel): Promise<XMLHttpRequest> {
    return authAPIInstance.post('/login', data)
      // .then(({user_id}) => user_id); 
  }
}