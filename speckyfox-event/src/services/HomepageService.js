import axios from "axios";
import Header from "../utils/Header";

export default class HomepageService {
  baseUrl = "http://34.218.92.121:8096";
  headers = new Header();
  saveHomepageDetails(data) {
    return axios.post(
      `${this.baseUrl}//admin/homepage/save`,
      data,
      this.headers.multipartAuth()
    );
  }
}
