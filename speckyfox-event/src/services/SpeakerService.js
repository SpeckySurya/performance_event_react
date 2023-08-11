import axios from "axios";
import Header from "../utils/Header";

export default class SpeakerService {
  baseUrl = "http://34.218.92.121:8096";
  headers = new Header();
  getAllSpeakers() {
    return axios.get(
      `${this.baseUrl}/admin/speaker/getAll`,
      this.headers.withAuth()
    );
  }
  saveSpeaker(data) {
    const headers = this.headers.multipartAuth();
    return axios.post(`${this.baseUrl}/admin/speaker/save`, data, headers);
  }
}
