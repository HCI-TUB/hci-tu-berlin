const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static('static'))

// Semantic Scholar API Base URL
const BASE_URL = "https://api.semanticscholar.org/graph/v1";

// Route: Publikationen suchen
app.get("/api/publications", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query-Parameter ist erforderlich" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/paper/search`, {
      params: { query },
      headers: {
        "x-api-key": process.env.SEMANTIC_SCHOLAR_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
