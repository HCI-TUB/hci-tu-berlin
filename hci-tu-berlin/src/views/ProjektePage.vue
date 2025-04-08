<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Research</h1>
    <div class="space-y-6">
      <div
        v-for="(projekt, index) in research"
        :key="index"
        class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50 transition-colors duration-300"
      >
        <router-link
          :to="{
            name: 'ProjektDetailPage',
            params: { title: slugify(projekt.title) },
          }"
          class="block"
        >
          <ProjectCard
            :title="projekt.title"
            :subtitle="projekt.subtitle"
            :media="projekt.media"
            :text="projekt.text"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue";
import { research } from "@/data/researchData.json";
import { slugify } from "@/utils/slugify";

export default {
  name: "ProjektePage",
  components: {
    ProjectCard,
  },
  data() {
    return {
      research,
    };
  },
  methods: {
    slugify,
  },
};
</script>
