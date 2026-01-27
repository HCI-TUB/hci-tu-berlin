import http from "@/api/http";

export default class PublicationsService {
  // Get all publications data
  static async getAllPublicationsData() {
    const response = await http.get("/publications");
    return response.data.data;
  }
}
