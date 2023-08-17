import axios from "axios";
import Header from "../utils/Header";

export default class SpeakerService {
  baseUrl = "https://eventbackend.speckyfox.com";
  headers = new Header();
  getSpeakerByEventId(eventId) {
    return axios.get(
      `${this.baseUrl}/app/getSpeakerDetailsByEvent/${eventId}`,
      this.headers.basicHeader()
    );
  }
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
