const PageModel = require("../models/pageModel");

const { replaceAssetUrlsInContent } = require("../utils/URLHelper");

class PageController {
  static async getPageData(req, res, next) {
    try {
      const lang = req.lang;
      console.log("Requested language:", lang);
      const pageData = await PageModel.getPageData(req.params.slug, lang);

      pageData[0].forEach((page) => {
        if (page.content) {
          page.content = replaceAssetUrlsInContent(req, page.content);
          if (!pageData || pageData[0].length === 0) {
            return res.status(404).json({
              success: false,
              error: { message: "Page not found" },
            });
          }
        } else {
          console.log("No content to process for this page.");
        }
      });

      res.json({
        success: true,
        pageData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PageController;
