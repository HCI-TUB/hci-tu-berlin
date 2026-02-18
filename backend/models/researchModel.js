const pool = require("../config/database");

class ResearchModel {
  static async getResearchData(id, lang) {
    console.log("Fetching data for:", id);
    const [results] = await pool.query("CALL spGetResearchProject (?, ?)", [
      id,
      lang,
    ]);

    return results;
  }
}

module.exports = ResearchModel;
