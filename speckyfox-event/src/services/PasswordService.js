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
    const headers = this.headers.textType();
    return axios.post(
      `${this.baseUrl}/admin/reset-pwd-link-validate`,
      token,
      headers
    );
  }
  validateToken(token) {
    const headers = this.headers.textType();
    return axios.post(`${this.baseUrl}/admin/validate-token`, token, headers);
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
    return axios.get(`${this.baseUrl}/admin/get-roles`, headers);
  }
  updatePassword(data) {
    const headers = this.headers.withAuth();
    return axios.post(`${this.baseUrl}/admin/change-admin-pwd`, data, headers);
  }
}
