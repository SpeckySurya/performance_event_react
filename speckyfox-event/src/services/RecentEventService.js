import axios from "axios";
import Header from "../utils/Header";
import serviceUrl from "../utils/Constant";
export default class RecentEventService {
    headers = new Header();
    baseUrl = serviceUrl();
    getRecentEvent() {
        return axios.get(
            `${this.baseUrl}/app/get-upcoming-event`,
            this.headers.basicHeader()
        );
    }
}