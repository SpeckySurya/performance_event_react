import axios from "axios";
import Header from "../utils/Header";

export default class LoginService {
  baseUrl = "https://eventbackend.speckyfox.com";
  headers = new Header();
  adminLogin(data) {
    return axios.post(`${this.baseUrl}/admin/login`, data);
  }
}
