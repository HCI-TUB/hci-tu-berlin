import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default class PageService {
  static async getPageData(slug) {
    const response = await axios.get(`${API_BASE_URL}/page/${slug}`);
    return response.data.pageData[0];
  }
}
