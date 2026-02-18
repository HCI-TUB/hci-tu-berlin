const PublicationsModel = require("../models/publicationsModel");

class PublicationsController {
  // Get all publications data
  static async getAllPublications(req, res, next) {
    try {
      const lang = req.lang;
      console.log("Requested language:", lang);
      const data = await PublicationsModel.getAllPublicationsData(lang);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicationsController;
