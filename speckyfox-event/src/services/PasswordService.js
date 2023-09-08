import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class PasswordService {
  headers = new Header();
  baseUrl = serviceUrl();
  sendResetPwdEmail(data) {
    const headers = this.headers.basicHeader();
    return axios.post(
      `${this.baseUrl}/admin/send-reset-pwd-email`,
      data,
      headers
    );
  }
  validateResetPwdLink(token) {
    const headers = this.headers.basicHeader();
    return axios.post(
      `${this.baseUrl}/admin/reset-pwd-link-validate`,
      token,
      headers
    );
  }
  resetPassword(data, token) {
    const headers = this.headers.basicHeader();
    return axios.post(
      `${this.baseUrl}/admin/reset-password/${token}`,
      data,
      headers
    );
  }
  getAdminRoles() {
    const headers = this.headers.withAuth();
    return axios.get(
      `${this.baseUrl}/admin/get-roles`,
      headers
    );
  }

}
