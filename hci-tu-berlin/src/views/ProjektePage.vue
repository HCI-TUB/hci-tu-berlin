<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Research</h1>
    <div class="space-y-6">
      <div v-if="loading" class="text-center">Loading research projects...</div>
      <div
        v-else-if="researchData"
        v-for="(projekt, index) in researchData.slice().reverse()"
        :key="index"
        class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50 transition-colors duration-300"
      >
        <router-link
          :to="{
            name: 'ProjektDetailPage',
            params: { title: slugify(projekt.id) },
          }"
          class="block"
        >
          <ProjectCard
            :title="projekt.title"
            :subtitle="projekt.subtitle"
            :media="projekt.media"
            :description="projekt.description"
          />
        </router-link>
      </div>
      <PhotoGallery :titles="['Events']" />
      <PhotoGallery :titles="['Projects']" />
    </div>
  </div>
</template>

<script setup>
import PhotoGallery from "@/components/PhotoGallery.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { slugify } from "@/utils/slugify";
import { onMounted } from "vue";
import { useResearchData } from "@/composables/researchComposable";

const { researchData, loading, refetch } = useResearchData(null);

onMounted(() => {
  console.log("Fetching research data...");
  refetch();
});
</script>
