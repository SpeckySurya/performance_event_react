import axios from "axios";
import Header from "../utils/Header";

export default class LoginService {
  baseUrl = "http://34.218.92.121:8096";
  headers = new Header();
  adminLogin(data) {
    return axios.post(`${this.baseUrl}/admin/login`, data);
  }
}
