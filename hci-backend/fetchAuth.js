const axios = require("axios"); // Für Node.js

async function fetchAuthorIds(authorName) {
    const url = `https://api.semanticscholar.org/graph/v1/author/search?query=${encodeURIComponent(authorName)}`;
    try {
      const response = await axios.get(url);
      console.log("Gefundene Autoren:", response.data.data); // Überprüfe die Author IDs
      return response.data.data.slice(0, 2).map((author) => author.authorId);
    } catch (error) {
      console.error("Fehler beim Abrufen der Author IDs:", error.message);
      return [];
    }
  }

  fetchAuthorIds("Ceenu George");

  