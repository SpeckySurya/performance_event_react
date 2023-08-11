import axios from "axios";
import basicHeader, { multipartAuth, withAuth } from "../utils/Header";

export default class EventService {
  baseUrl = "http://34.218.92.121:8096";
  getEvent(eventId) {
    return axios.get(`${this.baseUrl}/app/event/${eventId}`);
  }
  getAllActiveEvents() {
    return axios.get(`${this.baseUrl}/app/getAllEvents`, {
      headers: basicHeader(),
    });
  }
  getAllEvents() {
    return axios.get(
      `${this.baseUrl}/admin/event-list`,
      withAuth(localStorage.getItem("token"))
    );
  }
  notifyUsers(eventId) {
    return axios.get(
      `${this.baseUrl}/admin/send-event-reminder/${eventId}`,
      withAuth(sessionStorage.getItem("token"))
    );
  }
  saveEvent(event) {
    const headers = multipartAuth();
    return axios.post(`${this.baseUrl}/admin/save-event`, event, headers);
  }
  deleteEvent(evendId) {
    const headers = withAuth();
    return axios.delete(
      `${this.baseUrl}/admin/deleteEvent/${evendId}`,
      headers
    );
  }
}
