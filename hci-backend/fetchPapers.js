const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000;

// CORS aktivieren
app.use(cors());

// Rate Limiting konfigurieren (10 Anfragen pro Minute pro IP)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 Minute
  max: 10, // Maximal 10 Anfragen pro IP
  message: "Zu viele Anfragen, bitte versuchen Sie es später erneut.",
});

// Limiter auf die API anwenden
app.use("/api/papers", limiter);

// API-Endpunkt für Publikationen
app.get("/api/papers", async (req, res) => {
  const authorIds = ["2150282068", "2267931365", "9453928"]; // IDs von Ceenu George
  let allPapers = [];

  try {
    for (const authorId of authorIds) {
      const url = `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers`;
      const fields = "title,authors,publicationDate,venue,openAccessPdf";
      const response = await axios.get(url, { params: { fields, limit: 100 } });
      allPapers.push(...response.data.data);
    }

    // Duplikate entfernen
    allPapers = allPapers.filter(
      (paper, index, self) =>
        index === self.findIndex((p) => p.paperId === paper.paperId)
    );

    // Zusätzliche Anfragen für detaillierte Informationen
    for (const paper of allPapers) {
      if (!paper.publicationDate || !paper.venue) {
        const detailUrl = `https://api.semanticscholar.org/graph/v1/paper/${paper.paperId}`;
        const detailFields = "title,authors,publicationDate,venue,openAccessPdf";
        const detailResponse = await axios.get(detailUrl, { params: { fields: detailFields } });
        const detailedPaper = detailResponse.data;

        // Fehlende Felder aktualisieren
        if (!paper.publicationDate && detailedPaper.publicationDate) {
          paper.publicationDate = detailedPaper.publicationDate;
        }
        if (!paper.venue && detailedPaper.venue) {
          paper.venue = detailedPaper.venue;
        }
      }
    }

    res.json(allPapers); // Publikationen als JSON zurückgeben
  } catch (error) {
    console.error("Fehler beim Abrufen der Publikationen:", error.message);
    res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});