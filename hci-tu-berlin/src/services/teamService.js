import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default class TeamService {
  static async getTeamMembers() {
    const response = await axios.get(`${API_BASE_URL}/team`);
    return response.data.data;
  }

  static async getTeamMemberById(id) {
    const response = await axios.get(`${API_BASE_URL}/team/${id}`);
    return response.data;
  }
}
