<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Events</h1>
    <div class="space-y-6">
      <div v-if="loading" class="text-center">Loading Events...</div>
      <div
        v-else-if="eventsData"
        v-for="(event, index) in eventsData.slice().reverse()"
        :key="index"
        class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50 transition-colors duration-300"
      >
        <router-link
          :to="{
            name: 'EventDetailPage',
            params: { title: slugify(event.id) },
          }"
          class="block"
        >
          <ProjectCard
            :title="event.title"
            :subtitle="event.subtitle"
            :media="event.media"
            :description="event.description"
          />
        </router-link>
      </div>
      <!-- <PhotoGallery :titles="['Events']" />
      <PhotoGallery :titles="['Projects']" /> -->
    </div>
  </div>
</template>

<script setup>
// import PhotoGallery from "@/components/PhotoGallery.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { slugify } from "@/utils/slugify";
import { onMounted } from "vue";
import { useEventsData } from "@/composables/eventsComposable";

const { eventsData, loading, refetch } = useEventsData(null);

onMounted(() => {
  console.log("Fetching events data...");
  refetch();
});
</script>
