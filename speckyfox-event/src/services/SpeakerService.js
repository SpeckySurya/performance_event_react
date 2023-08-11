import axios from "axios";
import withAuth from "../utils/Header";

export default class SpeakerService {
  baseUrl = "http://34.218.92.121:8096";
  getAllSpeakers() {
    return axios.get(
      `${this.baseUrl}/admin/speaker/getAll`,
      withAuth(sessionStorage.getItem("token"))
    );
  }
}
