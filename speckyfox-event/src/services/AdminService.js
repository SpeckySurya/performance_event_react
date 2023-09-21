import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";
export default class AdminService {
  headers = new Header();
  baseUrl = serviceUrl();
  getAdmins() {
    const headers = this.headers.withAuth();
    return axios.get(`${this.baseUrl}/admin/get-admins`, headers);
  }
  deleteAdmin(adminId) {
    const headers = this.headers.withAuth();
    return axios.delete(
      `${this.baseUrl}/admin/delete-admin/${adminId}`,
      headers
    );
  }
  updateRole(adminId, data) {
    const headers = this.headers.withAuth();
    return axios.patch(
      `${this.baseUrl}/admin/update-role/${adminId}`,
      data,
      headers
    );
  }
}
