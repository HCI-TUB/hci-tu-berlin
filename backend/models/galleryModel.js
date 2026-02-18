const pool = require("../config/database");

class GalleryModel {
  static async getGalleryData(id) {
    console.log("Fetching data for:", id);
    const [results] = await pool.query("CALL spGetGalleryData (?)", [id]);

    return results;
  }
}

module.exports = GalleryModel;
