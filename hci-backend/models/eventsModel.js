const pool = require("../config/database");

class EventsModel {
  static async getEventsData(id) {
    console.log("Fetching data for:", id);
    const [results] = await pool.query("CALL spGetEvents (?)", [id]);

    return results;
  }
}

module.exports = EventsModel;
