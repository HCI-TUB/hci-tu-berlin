import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default class PublicationsService {
  // Get all publications data
  static async getAllPublicationsData() {
    const response = await axios.get(`${API_BASE_URL}/publications`);
    return response.data.data;
  }
}
