import http from "@/api/http";

export default class EventsService {
  static async getEventsData() {
    const response = await http.get(`/events`);
    return response.data.eventsData[0];
  }
  static async getEventsDataById(id) {
    const response = await http.get(`/events/${id}`);
    return response.data.eventsData[0];
  }
}
