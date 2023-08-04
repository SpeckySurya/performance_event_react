import axios from "axios";
import withAuth from "../utils/Header";

export default class LoginService {
  baseUrl = "http://34.218.92.121:8095";
  adminLogin(data) {
    return axios.post(`${this.baseUrl}/admin/login`, data, withAuth);
  }
}
