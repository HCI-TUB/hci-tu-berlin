const pool = require("../config/database");

class TeamModel {
  // Fetch all team members data using stored procedure
  static async getAllTeamMembers() {
    const [rows] = await pool.query("CALL spGetAllTeamMembers()");

    return {
      ...rows,
    };
  }
  static async getTeamMemberById(id) {
    const [results] = await pool.query("CALL spGetTeamMemberById(?)", [id]);

    const grouped = {};
    results[3].forEach((item) => {
      if (!grouped[item.title]) {
        grouped[item.title] = [];
      }
      grouped[item.title].push({
        sort_order: item.sort_order,
        content: item.content,
      });
    });

    const data = Object.entries(grouped).map(([title, contents]) => ({
      title,
      contents: contents
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((c) => c.content),
    }));

    results[3] = data;
    // Sort contents within each group by sort_order and map to content only
    return results;

    // return { ...results };
  }
}

module.exports = TeamModel;
