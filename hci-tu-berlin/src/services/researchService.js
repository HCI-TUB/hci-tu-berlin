import http from "@/api/http";

export default class ResearchService {
  static async getResearchData() {
    const response = await http.get(`/research`);
    return response.data.researchData[0];
  }
  static async getResearchDataById(id) {
    const response = await http.get(`/research/${id}`);
    return response.data.researchData[0];
  }
}
