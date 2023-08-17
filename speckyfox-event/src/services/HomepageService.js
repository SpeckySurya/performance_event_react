import axios from "axios";
import Header from "../utils/Header";

export default class HomepageService {
  baseUrl = "https://eventbackend.speckyfox.com";
  headers = new Header();
  saveHomepageDetails(data) {
    return axios.post(
      `${this.baseUrl}//admin/homepage/save`,
      data,
      this.headers.multipartAuth()
    );
  }
}
