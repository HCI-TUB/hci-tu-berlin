const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// SQLite-Datenbank einrichten
const db = new sqlite3.Database("./papers.db", (err) => {
  if (err) {
    console.error("Fehler beim Öffnen der Datenbank:", err.message);
  } else {
    console.log("Verbunden mit der SQLite-Datenbank.");
    db.run(`
      CREATE TABLE IF NOT EXISTS papers (
        paperId TEXT PRIMARY KEY,
        title TEXT,
        authors TEXT,
        publicationDate TEXT,
        venue TEXT,
        openAccessPdf TEXT
      )
    `);
  }
});

// CORS aktivieren
app.use(cors());

// Rate Limiting konfigurieren
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 Minute
  max: 10, // Max. 10 Anfragen pro IP
  message: "Zu viele Anfragen, bitte später erneut versuchen.",
});
app.use("/api/papers", limiter);

// Publikationen abrufen und speichern
app.get("/api/papers", async (req, res) => {
  const authorIds = ["2150282068", "2267931365", "9453928"]; // Beispiel-IDs
  let allPapers = [];

  try {
    // API-Aufruf für jede ID
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

    // Daten in SQLite speichern
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO papers (paperId, title, authors, publicationDate, venue, openAccessPdf)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    allPapers.forEach((paper) => {
      insertStmt.run(
        paper.paperId,
        paper.title,
        JSON.stringify(paper.authors),
        paper.publicationDate || null,
        paper.venue || null,
        paper.openAccessPdf?.url || null
      );
    });

    insertStmt.finalize();

    res.json(allPapers);
  } catch (error) {
    console.error("Fehler beim Abrufen der Publikationen:", error.message);

    // Fallback: Daten aus SQLite lesen
    db.all("SELECT * FROM papers", [], (err, rows) => {
      if (err) {
        console.error("Fehler beim Lesen aus der Datenbank:", err.message);
        res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
      } else {
        const papers = rows.map((row) => ({
          paperId: row.paperId,
          title: row.title,
          authors: JSON.parse(row.authors),
          publicationDate: row.publicationDate,
          venue: row.venue,
          openAccessPdf: { url: row.openAccessPdf },
        }));
        res.json(papers);
      }
    });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
