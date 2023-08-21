import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class HomeConfigService {
  headers = new Header();
  baseUrl = serviceUrl();
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
