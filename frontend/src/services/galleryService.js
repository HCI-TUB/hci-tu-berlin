import http from "@/api/http";

export default class GalleryService {
  static async getGalleryData(slug) {
    const response = await http.get(`/gallery/${slug}`);
    return response.data.galleryData[0];
  }
}
