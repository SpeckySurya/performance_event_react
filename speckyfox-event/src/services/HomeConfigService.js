import axios from "axios";
import Header from "../utils/Header";

export default class HomeConfigService {
  baseUrl = "http://34.218.92.121:8096";
  headers = new Header();
  getHomeConfig(homeConfigId) {
    return axios.get(`${this.baseUrl}/admin/homepage/getById/${homeConfigId}`);
  }
  saveHomeConfig(homeConfig) {
    const headers = this.headers.multipartAuth();
    return axios.post(
      `${this.baseUrl}/admin/homepage/save`,
      homeConfig,
      headers
    );
  }
}
