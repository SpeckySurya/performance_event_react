import axios from "axios";
export default class EventService {
  baseUrl = "http://34.218.92.121:8095";
  getEvent(eventId) {
    return axios.get(`${this.baseUrl}/events/${eventId}`);
  }
}
