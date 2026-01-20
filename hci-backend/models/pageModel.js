const pool = require("../config/database");

class PageModel {
  static async getPageData(id) {
    console.log("Fetching data for:", id);
    const [results] = await pool.query("CALL spGetPageData(?)", [id]);

    return results;
  }
}

module.exports = PageModel;
