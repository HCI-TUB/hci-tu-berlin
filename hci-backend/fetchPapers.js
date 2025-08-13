const CONFIG = require("./config.json");
const mysql = require("mysql2");
const axios = require("axios");
const cron = require("node-cron");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.static("static"));

const connection = mysql.createConnection({
  host: "localhost",
  user: CONFIG.user,
  password: CONFIG.password,
  database: "hci",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Create the papers table if it doesn't exist
const createTableSql = `
CREATE TABLE IF NOT EXISTS papers (
  id VARCHAR(255) PRIMARY KEY,
  title TEXT,
  externalIds TEXT,
  authors TEXT,
  publicationDate TEXT,
  venue TEXT,
  openAccessPdf TEXT,
  publicationVenue TEXT
)
`;
connection.query(createTableSql, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  }
});

async function fetchAndStorePapers() {
  const authorIds = ["2150282068", "2267931365", "9453928"];

  // Get all existing paper IDs from the database
  const existingPaperIds = await new Promise((resolve, reject) => {
    connection.query("SELECT id FROM papers", (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map((row) => row.id));
    });
  });

  let allInserted = true;

  for (const authorId of authorIds) {
    console.log(`Fetching papers for author ${authorId}...`);
    const baseUrl = `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers`;
    const response = await axios.get(baseUrl, {
      params: { fields: "paperId", limit: 100 },
    });
    const papers = response.data.data;
    console.log(`Fetched ${papers.length} papers for author ${authorId}.`);

    for (const paper of papers) {
      // Skip papers already in the database to avoid rate limiting during fetching
      if (existingPaperIds.includes(paper.paperId)) {
        console.log(`Skipping paper ${paper.paperId} (already in database)`);
        continue;
      }

      allInserted = false; // Found a paper that needs to be inserted

      const paperDetailsUrl = `https://api.semanticscholar.org/graph/v1/paper/${paper.paperId}`;
      const fields =
        "title,externalIds,authors,publicationDate,venue,publicationVenue,openAccessPdf";
      try {
        console.log(`Fetching details for paper ${paper.paperId}...`);
        const paperDetailsResp = await axios.get(paperDetailsUrl, {
          params: { fields },
        });
        await new Promise((resolve) => setTimeout(resolve, 120000)); // wait 2 minutes between paper requests
        const detailedPaper = paperDetailsResp.data;
        console.log(
          `Fetched details for paper ${paper.paperId}: "${detailedPaper.title}"`
        );

        const insertSql = `
        INSERT IGNORE INTO papers
        (id, title, externalIds, authors, publicationDate, venue, openAccessPdf, publicationVenue)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
        connection.query(
          insertSql,
          [
            detailedPaper.paperId,
            detailedPaper.title,
            JSON.stringify(detailedPaper.externalIds || {}),
            JSON.stringify(detailedPaper.authors),
            detailedPaper.publicationDate,
            detailedPaper.venue,
            detailedPaper.openAccessPdf?.url || null,
            JSON.stringify(detailedPaper.publicationVenue || {}),
          ],
          (err) => {
            if (err) {
              console.error("Error inserting paper:", err.message);
            } else {
              console.log(
                `Inserted paper ${detailedPaper.paperId} into database.`
              );
            }
          }
        );
      } catch (err) {
        if (err.response && err.response.status === 429) {
          console.log("Rate limited. Waiting 10 minutes before retrying...");
          await new Promise((resolve) => setTimeout(resolve, 600000)); // wait 10 minutes on rate limit
        } else {
          console.error("Error fetching paper details:", err.message);
        }
      }
    }
  }

  // If all papers are already inserted, stop fetching
  if (allInserted) {
    console.log("All papers are already inserted. No fetching needed.");
    return;
  }
}

function logPapersData() {
  const sql = `SELECT * FROM papers`;
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching papers:", err.message);
      return;
    }
    // console.log("Current data in papers table:", rows);
  });
}

// Schedule the task to run once a day
cron.schedule("0 0 * * *", () => {
  fetchAndStorePapers();
});

//Uncomment the following lines to run immediately
//fetchAndStorePapers().then(() => {
// logPapersData();
//});

// Endpoint to fetch papers from the database
app.get("/db/papers", (req, res) => {
  const sql = `SELECT * FROM papers`;
  connection.query(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Start the Express server
app.listen(port, () => {});
