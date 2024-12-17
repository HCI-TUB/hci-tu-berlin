<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Publications</h1>
    <div v-for="paper in papers" :key="paper.id" class="my-4">
      <PublicationCard
        :author="formatAuthors(paper.authors) || 'Unknown'"
        :title="paper.title || 'Untitled'"
        :publicationDate="paper.publicationDate || 'Unknown'"
        :publisher="paper.venue || 'Unknown'"
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
    async fetchAndStorePapers() {
      try {
        const response = await axios.get("http://localhost:3000/db/papers");
        console.log("DB Response:", response.data); // Log the response data
        this.papers = response.data; // Publikationen speichern
      } catch (error) {
        console.error("Fehler beim Abrufen der Publikationen:", error.message);
      }
    },
    formatAuthors(authors) {
      const authorsArray = JSON.parse(authors);
      return authorsArray.map(author => author.name).join(", ");
    },
  },
  mounted() {
    this.fetchAndStorePapers(); // Daten abrufen, sobald das Component geladen wird
  },
};
</script>