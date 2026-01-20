const EventsModel = require("../models/eventsModel");

const { replaceAssetUrlsInContent } = require("../utils/URLHelper");

class EventsController {
  static async getEventsData(req, res, next) {
    try {
      const eventsData = await EventsModel.getEventsData(req.params.id);
      eventsData[0].forEach((events) => {
        if (events.content) {
          events.content = replaceAssetUrlsInContent(req, events.content);
          if (!eventsData || eventsData[0].length === 0) {
            return res.status(404).json({
              success: false,
              error: { message: "Events not found" },
            });
          }
        } else {
          console.log("No content to process for this events.");
        }
      });

      res.json({
        success: true,
        eventsData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EventsController;
