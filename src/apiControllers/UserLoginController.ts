import LoginFormModel from "api/LoginAPI/ILoginForm";
import LoginAPI from '../api/LoginAPI/login-api';
import Store from "../core/Store";
import router from "../core/Router";

const loginApi = new LoginAPI();
//validator
//const userLoginValidator = validateLoginFields(validateRules);

class UserLoginController {
  public async login(data: LoginFormModel): Promise<void> {
        try {           
            const res = await loginApi.request(data);
            Store.set('user.id', 'response.user_id');
            router.go('/chats');
            // const userID = loginApi.request(prepareDataToRequest(data));
        } catch (error) {
            console.error('Login failed')
    }
  }
} 

export default new UserLoginController();
