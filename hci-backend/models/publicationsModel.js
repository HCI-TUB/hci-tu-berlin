const pool = require("../config/database");

class PublicationsModel {
  // Fetch all publications page data using stored procedure
  static async getAllPublicationsData() {
    console.log("Fetching data for: Publications");
    const [rows] = await pool.query("CALL spGetAllPublications()");

    return {
      ...rows,
    };
  }
}

module.exports = PublicationsModel;
