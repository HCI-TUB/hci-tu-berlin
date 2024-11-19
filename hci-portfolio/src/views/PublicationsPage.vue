<template>
    <div>
        <h1 class="text-3xl text-left mb-8 tracking-widest">Publications</h1>
        <div v-for="publication in publications" :key="publication.title">
      <PublicationCard
        :author="publication.author"
        :title="publication.title"
        :publicationDate="publication.publicationDate"
        :publisher="publication.publisher"
        :paperLink="publication.paperLink"
        :pdfLink="publication.pdfLink"
        :bibtexLink="publication.bibtexLink"
      />
    </div>
    </div>
</template>

<script>
import PublicationCard from '@/components/PublicationCard.vue';
import { publications } from '@/data/publicationsData.js';

export default {
    name: 'PublicationsPage',
    components: {
        PublicationCard
    },
  data() {
    return {
      publications
    };
  }
}
</script>