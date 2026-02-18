import http from "@/api/http";

export default class PageService {
  static async getPageData(slug) {
    const response = await http.get(`/page/${slug}`);
    return response.data.pageData[0];
  }
}
