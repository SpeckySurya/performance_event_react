import axios from "axios";
import Header from "../utils/Header";

export default class RegistrationService {
  baseUrl = "http://34.218.92.121:8096";
  headers = new Header();

  saveUser(user) {
    return axios.post(`${this.baseUrl}/app/register`, user);
  }
}
