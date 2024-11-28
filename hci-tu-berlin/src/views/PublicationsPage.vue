<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Publications</h1>
    <div v-for="paper in papers" :key="paper.paperId" class="my-4">
      <PublicationCard
        :author="formatAuthors(paper.authors)"
        :title="paper.title"
        :publicationDate="paper.publicationDate || 'Unknown'"
        :publisher="paper.venue || null"
        :paperLink="`https://www.semanticscholar.org/paper/${paper.paperId}`"
        :pdfLink="paper.openAccessPdf?.url || null"
        :bibtexLink="`https://www.semanticscholar.org/api/1/paper/${paper.paperId}/bibtex`"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PublicationCard from "@/components/PublicationCard.vue";

export default {
  components: { PublicationCard },
  data() {
    return {
      papers: [], // Speichert die Publikationen
    };
  },
  methods: {
    async fetchPapers() {
      try {
        const response = await axios.get("http://localhost:3000/api/papers"); // Backend-API aufrufen
        this.papers = response.data; // Publikationen speichern
        localStorage.setItem("papers", JSON.stringify(this.papers)); // Daten in localStorage speichern
        localStorage.setItem("papersTimestamp", Date.now()); // Zeitstempel speichern
      } catch (error) {
        console.error("Fehler beim Abrufen der Publikationen:", error.message);
      }
    },
    formatAuthors(authors) {
      return authors.map((author) => author.name).join(", "); // Autoren formatieren
    },
    loadPapers() {
      const papers = localStorage.getItem("papers");
      const timestamp = localStorage.getItem("papersTimestamp");
      const oneDay = 24 * 60 * 60 * 1000; // Ein Tag in Millisekunden

      if (papers && timestamp && Date.now() - timestamp < oneDay) {
        this.papers = JSON.parse(papers); // Daten aus localStorage laden
      } else {
        this.fetchPapers(); // Neue Daten abrufen
      }
    },
  },
  mounted() {
    this.loadPapers(); // Daten laden, sobald das Component geladen wird
  },
};
</script>