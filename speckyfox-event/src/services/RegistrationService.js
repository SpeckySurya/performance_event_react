import axios from "axios";
import Header from "../utils/Header";

export default class RegistrationService {
  baseUrl = "https://eventbackend.speckyfox.com";
  headers = new Header();

  saveUser(user) {
    return axios.post(`${this.baseUrl}/app/register`, user);
  }
}
