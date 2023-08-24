import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class HomeConfigService {
  headers = new Header();
  baseUrl = serviceUrl();
  getHomeConfig() {
    return axios.get(`${this.baseUrl}/app/getHomepageConfiguration`);
  }
  getHomeConfigById() {
    const headers = this.headers.multipartAuth();
    return axios.get(`${this.baseUrl}/admin/homepage/getById/1`, headers);
  }
  saveHomeConfig(homeConfig) {
    const headers = this.headers.multipartAuth();
    return axios.post(
      `${this.baseUrl}/admin/homepage/save`,
      homeConfig,
      headers
    );
  }
  updateHomeConfig(homeConfig) {
    for (const obj of homeConfig) {
      console.log(obj[0], obj[1]);
    }
    const headers = this.headers.multipartAuth();
    return axios.put(
      `${this.baseUrl}/admin/homepage/update/1`,
      homeConfig,
      headers
    );
  }
}
