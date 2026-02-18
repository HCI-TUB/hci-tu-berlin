const pool = require("../config/database");

class PublicationsModel {
  // Fetch all publications page data using stored procedure
  static async getAllPublicationsData(lang) {
    console.log("Fetching data for: Publications");
    const [rows] = await pool.query("CALL spGetAllPublications(?)", [lang]);

    return {
      ...rows,
    };
  }
}

module.exports = PublicationsModel;
