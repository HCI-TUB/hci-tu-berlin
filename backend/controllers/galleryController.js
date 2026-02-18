const GalleryModel = require("../models/galleryModel");

const { replaceAssetUrlsInContent } = require("../utils/URLHelper");

class GalleryController {
  static async getGalleryData(req, res, next) {
    try {
      const galleryData = await GalleryModel.getGalleryData(req.params.slug);

      galleryData[0].forEach((gallery) => {
        if (gallery.src) {
          gallery.src = replaceAssetUrlsInContent(req, gallery.src);
          if (!galleryData || galleryData[0].length === 0) {
            return res.status(404).json({
              success: false,
              error: { message: "Gallery not found" },
            });
          }
        } else {
          console.log("No content to process for this gallery.");
        }
      });

      res.json({
        success: true,
        galleryData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GalleryController;
