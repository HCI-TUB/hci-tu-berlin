<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl text-left mb-8 tracking-widest">Publications</h1>

    <div v-if="loading" class="py-10">
      <p>Loading publications...</p>
    </div>

    <div v-else-if="error" class="text-red-600 py-10">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else>
      <div v-for="(papers, author) in groupedPapers" :key="author">
        <!-- Only show section if author has papers -->
        <template v-if="papers.length > 0">
          <h2 class="text-2xl font-bold text-left mt-8 mb-4">{{ author }}</h2>

          <div v-for="paper in papers" :key="paper.id" class="mb-6">
            <PublicationCard
              :author="formatAuthors(paper.authors)"
              :title="paper.title"
              :publicationDate="getYear(paper.publicationDate)"
              :publisher="paper.venue"
              :paperLink="getBestLink(paper)"
              :pdfLink="getBestLink(paper)"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { usePublications } from "@/composables/publicationsComposable.js";
import PublicationCard from "@/components/PublicationCard.vue";
import manualPublications from "@/data/manualPublications.json";
import { toRaw } from "vue";

const { publications, teamMembers, loading, error, refetch } =
  usePublications();

onMounted(() => {
  console.log("Fetching publications...");
  refetch();
});

// Merge manual + fetched publications
const allPublications = computed(() => {
  if (!publications.value || !Array.isArray(publications.value)) {
    return manualPublications;
  }
  return publications.value;
});

// Helper functions
const formatAuthors = (authorsJson) => {
  try {
    const authorsArray = JSON.parse(authorsJson);
    return authorsArray.map((author) => author.name).join(", ");
  } catch {
    return "";
  }
};

const getBestLink = (paper) => {
  try {
    const ids = paper.externalIds ? JSON.parse(paper.externalIds) : {};
    if (ids.DOI) {
      const cleanDOI = ids.DOI.replace(/\)+$/, "");
      return `https://doi.org/${cleanDOI}`;
    }
    if (ids.ArXiv) return `https://arxiv.org/abs/${ids.ArXiv}`;
    if (ids.DBLP) return `https://dblp.org/rec/${ids.DBLP}`;
  } catch (e) {
    console.error("Error parsing externalIds:", e);
  }

  // Try openAccessPdf
  if (paper.openAccessPdf) {
    try {
      const pdfObj =
        typeof paper.openAccessPdf === "string"
          ? JSON.parse(paper.openAccessPdf)
          : paper.openAccessPdf;
      if (pdfObj?.url) return pdfObj.url;
    } catch (error) {
      console.error("Error parsing openAccessPdf", error);
    }
  }

  return null;
};

const getYear = (date) => {
  if (!date) return "";
  const match = date.match(/\d{4}/);
  return match ? match[0] : date;
};

// Group papers by author
const groupedPapers = computed(() => {
  const authorsOfChair = [
    // fetch name from teamMember and place it here to make it dynamic later
    "Ceenu George",
    "Rishab Bhattacharyya",
    "David Fuhry",
  ];

  const cleanArray = toRaw(teamMembers.value);
  console.log("Authors of Chair:", authorsOfChair);
  const grouped = {};

  cleanArray?.forEach((author) => {
    grouped[author] = allPublications.value?.filter((paper) => {
      try {
        const authors = JSON.parse(paper.authors);
        return authors.some((a) => a.name.includes(author));
      } catch {
        return false;
      }
    });
  });

  return grouped;
});
</script>
