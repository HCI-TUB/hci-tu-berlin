<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Publications</h1>
    <div v-for="(papers, author) in groupedPapers" :key="author">
      <h2 class="text-xl text-left font-bold mt-8 mb-4">{{ author }}</h2>
      <div v-for="paper in papers" :key="paper.id" class="my-4">
        <PublicationCard
          :author="formatAuthors(paper.authors) || ''"
          :title="paper.title || ''"
          :doi="paper.externalIds?.doi || ''"
          :publicationDate="getYear(paper.publicationDate)"
          :publisher="paper.venue || ''"
          :paperLink="getBestLink(paper)"
          :pdfLink="paper.openAccessPdf?.url || null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PublicationCard from "@/components/PublicationCard.vue";
import manualPublications from "@/data/manualPublications.json";

export default {
  components: { PublicationCard },
  data() {
    return {
      papers: [],
    };
  },
  methods: {
    async fetchAndStorePapers() {
      try {
        const response = await axios.get("/db/papers");
        console.log("DB Response:", response.data);
        // Merge manual publications with fetched papers
        this.papers = [...manualPublications, ...response.data];
      } catch (error) {
        console.error("Fehler beim Abrufen der Publikationen:", error.message);
        // If DB fetch fails, show only manual publications
        this.papers = [...manualPublications];
      }
    },
    formatAuthors(authors) {
      const authorsArray = JSON.parse(authors);
      return authorsArray.map((author) => author.name).join(", ");
    },
    getBestLink(paper) {
      const ids = paper.externalIds ? JSON.parse(paper.externalIds) : {};
      if (ids.DOI) {
        // Remove trailing parenthesis if present
        const cleanDOI = ids.DOI.replace(/\)+$/, "");
        return `https://doi.org/${cleanDOI}`;
      }
      if (ids.ArXiv) return `https://arxiv.org/abs/${ids.ArXiv}`;
      if (ids.DBLP) return `https://dblp.org/rec/${ids.DBLP}`;
      if (ids.PDF) return ids.PDF; // <-- add this line
      if (paper.openAccessPdf && paper.openAccessPdf !== "null") {
        try {
          const pdfObj =
            typeof paper.openAccessPdf === "string"
              ? JSON.parse(paper.openAccessPdf)
              : paper.openAccessPdf;
          if (pdfObj.url) return pdfObj.url;
        } catch {}
      }
      return null;
    },
    getYear(date) {
      if (!date) return "";
      // Try to extract the year from the date string
      const match = date.match(/\d{4}/);
      return match ? match[0] : date;
    },
  },
  computed: {
    groupedPapers() {
      const authorsOfChair = [
        "Ceenu George",
        "Rishab Bhattacharyya",
        "David Fuhry",
      ];
      const grouped = {};
      authorsOfChair.forEach((author) => {
        grouped[author] = this.papers.filter((paper) => {
          try {
            return JSON.parse(paper.authors).some((a) =>
              a.name.includes(author)
            );
          } catch {
            return false;
          }
        });
      });
      return grouped;
    },
  },
  mounted() {
    this.fetchAndStorePapers();
  },
};
</script>
