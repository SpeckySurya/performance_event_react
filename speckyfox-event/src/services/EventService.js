import axios from "axios";
import Header from "../utils/Header";

export default class EventService {
  baseUrl = "http://34.218.92.121:8096";
  headers = new Header();

  getEvent(eventId) {
    return axios.get(`${this.baseUrl}/app/event/${eventId}`);
  }
  getAllActiveEvents() {
    return axios.get(`${this.baseUrl}/app/getAllEvents`, {
      headers: this.headers.basicHeader(),
    });
  }
  getAllEvents() {
    return axios.get(
      `${this.baseUrl}/admin/event-list`,
      this.headers.withAuth()
    );
  }
  notifyUsers(eventId) {
    return axios.get(
      `${this.baseUrl}/admin/send-event-reminder/${eventId}`,
      this.headers.withAuth()
    );
  }
  saveEvent(event) {
    const headers = this.headers.multipartAuth();
    return axios.post(`${this.baseUrl}/admin/save-event`, event, headers);
  }
  deleteEvent(evendId) {
    const headers = this.headers.withAuth();
    return axios.delete(
      `${this.baseUrl}/admin/deleteEvent/${evendId}`,
      headers
    );
  }
}
