import axios from "axios";

export default class RegistrationService {
  baseUrl = "http://34.218.92.121:8096";

  saveUser(user) {
    return axios.post(`${this.baseUrl}/app/register`, user);
  }
}
