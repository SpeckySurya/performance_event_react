import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";

export default class EventService {
  headers = new Header();
  baseUrl = serviceUrl();

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
  uploadPastEventData(data) {
    const headers = this.headers.multipartAuth();
    return axios.post(`${this.baseUrl}/admin/upload-past-event`, data, headers);
  }
  updateEvent(eventId, event) {
    const headers = this.headers.multipartAuth();
    return axios.put(
      `${this.baseUrl}/admin/update-event/${eventId}`,
      event,
      headers
    );
  }
  deleteEvent(evendId) {
    const headers = this.headers.withAuth();
    return axios.delete(
      `${this.baseUrl}/admin/deleteEvent/${evendId}`,
      headers
    );
  }
}
