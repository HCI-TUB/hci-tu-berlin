const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const teamRoutes = require("./routes/teamRoutes");
const pageRoutes = require("./routes/pageRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const researchRoutes = require("./routes/researchRoutes");
const eventsRoutes = require("./routes/eventsRoutes");
const publicationsRoutes = require("./routes/publicationsRoutes");
const errorHandler = require("./middleware/errorHandler");
const { languageMiddleware } = require("./middleware/language.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(languageMiddleware);

app.use("/images", express.static(path.join(__dirname, "assets/images")));
app.use(
  "/photoSlider",
  express.static(path.join(__dirname, "assets/photoSlider")),
);
app.use(express.static("static"));
// Routes
app.use("/api/team", teamRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/publications", publicationsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
