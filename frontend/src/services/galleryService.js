import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default class GalleryService {
  static async getGalleryData(slug) {
    const response = await axios.get(`${API_BASE_URL}/gallery/${slug}`);
    return response.data.galleryData[0];
  }
}
