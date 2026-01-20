import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default class EventsService {
  static async getEventsData() {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data.eventsData[0];
  }
  static async getEventsDataById(id) {
    const response = await axios.get(`${API_BASE_URL}/events/${id}`);
    return response.data.eventsData[0];
  }
}
