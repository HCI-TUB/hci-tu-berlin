<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Research</h1>
    <div class="space-y-6">
      <div
        v-for="(projekt, index) in research"
        :key="index"
        class="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-red-100 transition-colors duration-300"
      >
        <router-link
          :to="{ name: 'ProjektDetailPage', params: { id: projekt.id } }"
          class="block no-underline"
        >
          <Projekt
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
import Projekt from "@/components/ProjectCard.vue";
import { research } from "@/data/researchData.json";

export default {
  name: "ProjektePage",
  components: {
    Projekt,
  },
  data() {
    return {
      research,
    };
  },
};
</script>
