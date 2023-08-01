import axios from "axios";
import basicHeader, { multipartAuth } from "../utils/Header";

export default class EventService {
  baseUrl = "http://34.218.92.121:8095";
  getEvent(eventId) {
    return axios.get(`${this.baseUrl}/app/event/1`);
  }
  getAllEvents() {
    return axios.get(`${this.baseUrl}/app/getAllEvents`, {
      headers: basicHeader(),
    });
  }
  notifyUsers(eventId) {
    return axios.get(`${this.baseUrl}/admin/send-event-reminder/${eventId}`, {
      headers: basicHeader(),
    });
  }
  saveEvent(event) {
    const headers = multipartAuth();
    console.log(event);
    console.log(headers);
    return axios.post(`${this.baseUrl}/admin/save-event`, event, headers);
  }
}
