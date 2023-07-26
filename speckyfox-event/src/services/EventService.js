import axios from "axios";

class EventService {
  getEvent() {
    axios.get().then((response) => response.data);
  }
}
