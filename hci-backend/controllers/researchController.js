const ResearchModel = require("../models/researchModel");

const { replaceAssetUrlsInContent } = require("../utils/URLHelper");

class ResearchController {
  static async getResearchData(req, res, next) {
    try {
      const lang = req.lang;
      console.log("Requested language:", lang);
      const researchData = await ResearchModel.getResearchData(
        req.params.id,
        lang,
      );

      researchData[0].forEach((research) => {
        if (research.content) {
          research.content = replaceAssetUrlsInContent(req, research.content);
          if (!researchData || researchData[0].length === 0) {
            return res.status(404).json({
              success: false,
              error: { message: "Research not found" },
            });
          }
        } else {
          console.log("No content to process for this research.");
        }
      });

      res.json({
        success: true,
        researchData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ResearchController;
