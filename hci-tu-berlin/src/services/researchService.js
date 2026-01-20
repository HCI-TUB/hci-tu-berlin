import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default class ResearchService {
  static async getResearchData() {
    const response = await axios.get(`${API_BASE_URL}/research`);
    return response.data.researchData[0];
  }
  static async getResearchDataById(id) {
    const response = await axios.get(`${API_BASE_URL}/research/${id}`);
    return response.data.researchData[0];
  }
}
