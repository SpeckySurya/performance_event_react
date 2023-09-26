import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";
export default class ContentService {
  headers = new Header();
  baseUrl = serviceUrl();
  downloadPpt(data) {
    const headers = this.headers.basicHeader();
    return axios.post(
      `${this.baseUrl}/app/ppt-download-request`,
      data,
      headers
    );
  }
  getEventDataInfo(eventId) {
    const headers = this.headers.basicHeader();
    return axios.get(`${this.baseUrl}/app/event-data/${eventId}`, headers);
  }
}
