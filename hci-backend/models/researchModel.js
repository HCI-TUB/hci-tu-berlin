const pool = require("../config/database");

class ResearchModel {
  static async getResearchData(id) {
    console.log("Fetching data for:", id);
    const [results] = await pool.query("CALL spGetResearchProject (?)", [id]);

    return results;
  }
}

module.exports = ResearchModel;
