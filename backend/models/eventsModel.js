const pool = require("../config/database");

class EventsModel {
  static async getEventsData(id, lang) {
    console.log("Fetching data for:", id, "in language:", lang);
    const [results] = await pool.query("CALL spGetEvents (?,?)", [id, lang]);

    return results;
  }
}

module.exports = EventsModel;
