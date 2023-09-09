import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class RegistrationService {
  headers = new Header();
  baseUrl = serviceUrl();

  saveUser(user) {
    return axios.post(
      `${this.baseUrl}/app/register`,
      user,
      this.headers.basicHeader()
    );
  }

  newAdminRegistration(data) {
    return axios.post(
      `${this.baseUrl}/admin/register`,
      data,
      this.headers.withAuth()
    );
  }
}
