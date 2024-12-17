const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");
const cron = require("node-cron");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors"); // Import cors middleware
app.use(cors()); // Allow all origins by default (TODO: Probably want to drop this before deploying to prod)

// Create or open the database
let db = new sqlite3.Database("./papers.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the papers database.");
});

// Create the papers table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS papers (
  id TEXT PRIMARY KEY,
  title TEXT,
  authors TEXT,
  publicationDate TEXT,
  venue TEXT,
  openAccessPdf TEXT
)`);

// Function to fetch and store papers
async function fetchAndStorePapers() {
  const authorIds = ["2150282068", "2267931365", "9453928"];
  for (const authorId of authorIds) {
    const url = `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers`;
    const fields = "title,authors,publicationDate,venue,openAccessPdf";
    const response = await axios.get(url, { params: { fields, limit: 100 } });
    const papers = response.data.data;

    for (const paper of papers) {
      db.run(
        `INSERT OR IGNORE INTO papers (id, title, authors, publicationDate, venue, openAccessPdf) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          paper.paperId,
          paper.title,
          JSON.stringify(paper.authors),
          paper.publicationDate,
          paper.venue,
          paper.openAccessPdf?.url,
        ],
        (err) => {
          if (err) {
            console.error(err.message);
          }
        }
      );
    }
  }
}
function logPapersData() {
  const sql = `SELECT * FROM papers`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Current data in papers table:", rows);
  });
}

// Schedule the task to run once a day
cron.schedule("0 0 * * *", () => {
  fetchAndStorePapers();
});

fetchAndStorePapers().then(() => {
  logPapersData(); // Log the data after the initial fetch and store
});

// Endpoint to fetch papers from the database
app.get("/db/papers", (req, res) => {
  const sql = `SELECT * FROM papers`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Start the Express server
app.listen(port, () => {});
