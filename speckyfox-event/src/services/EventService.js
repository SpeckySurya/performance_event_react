import axios from "axios";
import basicHeader from "../utils/Header";

export default class EventService {
  baseUrl = "http://34.218.92.121:8095";
  getEvent(eventId) {
    return axios.get(`${this.baseUrl}/app/event/1`);
  }
  getAllEvents() {
    return axios.get(`${this.baseUrl}/app/getAllEvents`, headers);
  }
  notifyUsers(eventId) {
    return axios.get(`${this.baseUrl}/admin/send-event-reminder/${eventId}`, {
      headers,
    });
  }
  saveEvent(event) {
    return axios.post(`${this.baseUrl}/admin/save-event`, event, {
      headers,
    });
  }
}
