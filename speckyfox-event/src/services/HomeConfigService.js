import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class HomeConfigService {
  headers = new Header();
  baseUrl = serviceUrl();
  getHomeConfig() {
    return axios.get(`${this.baseUrl}/app/getHomepageConfiguration`);
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
