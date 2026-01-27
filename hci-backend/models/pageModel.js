const pool = require("../config/database");

class PageModel {
  static async getPageData(id, lang) {
    console.log("Fetching data for:", id);
    const [results] = await pool.query("CALL spGetPageData(?, ?)", [id, lang]);

    return results;
  }
}

module.exports = PageModel;
