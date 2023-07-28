import axios from "axios";
export default class EventService {
  baseUrl = "http://34.218.92.121:8095";
  getEvent(eventId) {
    return axios.get(`${this.baseUrl}/app/event/1`);
  }
  getAllEvents() {
    return axios.get(`${this.baseUrl}/app/getAllEvents`);
  }
}
