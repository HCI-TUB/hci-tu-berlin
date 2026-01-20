const PublicationsModel = require("../models/publicationsModel");

class PublicationsController {
  // Get all publications data
  static async getAllPublications(req, res, next) {
    try {
      const data = await PublicationsModel.getAllPublicationsData();
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
