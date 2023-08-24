import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class SpeakerService {
  headers = new Header();
  baseUrl = serviceUrl();
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
  deleteSpeaker(speakerId) {
    return axios.delete(
      `${this.baseUrl}/admin/speaker/${speakerId}`,
      this.headers.withAuth()
    );
  }
  saveSpeaker(data) {
    const headers = this.headers.multipartAuth();
    return axios.post(`${this.baseUrl}/admin/speaker/save`, data, headers);
  }
}
