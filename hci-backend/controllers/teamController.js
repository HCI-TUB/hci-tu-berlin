const TeamModel = require("../models/teamModel");
const { buildAssetUrl } = require("../utils/URLHelper");

class TeamController {
  static async getAllTeamMembers(req, res, next) {
    try {
      const members = await TeamModel.getAllTeamMembers();

      const membersWithUrls = members[0].map((member) => ({
        ...member,
        image: buildAssetUrl(req, member.image),
      }));

      res.json({
        success: true,
        data: membersWithUrls,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTeamMemberById(req, res, next) {
    try {
      const memberData = await TeamModel.getTeamMemberById(req.params.id);

      if (!memberData || memberData[0].length === 0) {
        return res.status(404).json({
          success: false,
          error: { message: "Team member not found" },
        });
      }

      let memberDetail = memberData[0];
      memberDetail[0].image = buildAssetUrl(req, memberDetail[0].image);
      let education = memberData[1];
      let experience = memberData[2];
      let content = memberData[3];
      res.json({
        success: true,
        memberDetail,
        education,
        content,
        experience,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeamController;
