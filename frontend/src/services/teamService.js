import http from "@/api/http";

export default class TeamService {
  static async getTeamMembers() {
    const response = await http.get(`/team`);
    return response.data.data;
  }

  static async getTeamMemberById(id) {
    const response = await http.get(`/team/${id}`);
    return response.data;
  }
}
