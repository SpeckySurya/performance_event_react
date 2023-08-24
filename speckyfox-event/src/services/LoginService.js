import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class LoginService {
  headers = new Header();
  baseUrl = serviceUrl();
  adminLogin(data) {
    return axios.post(`${this.baseUrl}/admin/login`, data);
  }
}
