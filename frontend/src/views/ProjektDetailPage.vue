<template>
  <div class="text-left w-full p-4 space-y-10 bg-gray-100">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"
      ></div>
      <p class="mt-4">Loading project...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20 text-red-600">
      <p>Error: {{ error }}</p>
      <button
        @click="goBack"
        class="mt-4 px-6 py-2 bg-gray-600 text-white rounded"
      >
        Back to Projects
      </button>
    </div>

    <!-- Not Found -->
    <div v-else-if="!projekt" class="text-center py-20">
      <p class="text-xl">Project not found</p>
      <button
        @click="goBack"
        class="mt-4 px-6 py-2 bg-gray-600 text-white rounded"
      >
        Back to Projects
      </button>
    </div>

    <!-- Project Content -->
    <template v-else>
      <button @click="goBack" class="text-xl mr-4">←</button>

      <div class="bg-gray-50 p-8 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-left mb-4 tracking-widest">
          {{ projekt.title }}
        </h1>
        <div v-if="projekt.subtitle" class="text-xl text-left mb-4">
          <i>{{ projekt.subtitle }}</i>
        </div>
        <p v-if="projekt.description" class="text-justify">
          {{ projekt.description }}
        </p>
      </div>

      <!-- Related Projects -->
      <div
        v-if="projekt.related_projects && projekt.related_projects.length"
        class="mb-4"
      >
        <ul>
          <li v-for="related in projekt.related_projects" :key="related.title">
            {{ related.title }}
            <router-link
              :to="{
                name: 'ProjektDetailPage',
                params: { title: related.projectId },
              }"
              class="text-custom-red underline"
            >
              {{ related.linkTitle }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- PhotoGallery -->
      <PhotoGallery
        v-if="projekt.photos && projekt.photos[0]?.photoSliderTitle"
        :titles="[projekt.photos[0].photoSliderTitle]"
      />

      <!-- Media Section -->
      <div
        v-if="projekt.media && projekt.media.length"
        class="bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <!-- Add media content here -->
      </div>

      <!-- Dates Section -->
      <div
        v-if="projekt.dates && projekt.dates.length"
        class="bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <h2 class="text-2xl tracking-widest text-custom-red mb-4">Dates</h2>
        <ul class="list-none space-y-2">
          <li v-for="(date, index) in projekt.dates" :key="index" class="flex">
            <span class="pr-2">{{ date.label }}: </span>
            <span>{{ date.value }}</span>
          </li>
        </ul>
      </div>

      <!-- Dynamic Sections -->
      <div
        v-for="(section, idx) in projekt.sections"
        :key="idx"
        class="bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <h2 class="text-2xl tracking-widest text-custom-red mb-4">
          {{ section.title }}
        </h2>
        <p v-if="section.text" class="mb-4 leading-relaxed">
          {{ section.text }}
        </p>

        <!-- Program Table -->
        <table
          v-if="section.type === 'program'"
          class="table-auto w-full text-left mb-4"
        >
          <tbody>
            <tr v-for="(item, i) in section.items" :key="i" class="border-b">
              <td class="pr-4">{{ item.time }}</td>
              <td>{{ item.event }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Bullets -->
        <ul
          v-if="section.type === 'bullets'"
          class="pl-4 list-disc list-outside text-lg"
        >
          <li v-for="(bullet, i) in section.bullets" :key="i" class="py-2">
            <template v-if="typeof bullet === 'string'">
              <span v-html="bullet"></span>
            </template>
            <template v-else>
              <b>{{ bullet.title }}</b> <span v-html="bullet.content"></span>
            </template>
          </li>
        </ul>

        <!-- People -->
        <ul v-if="section.type === 'people'" class="list-none space-y-4">
          <li v-for="(person, i) in section.items" :key="i" class="py-2">
            <p class="text-justify">
              <b>{{ person.name }}</b> ({{ person.affiliation }})
              {{ person.description }}
            </p>
          </li>
        </ul>

        <!-- Presentation -->
        <div v-if="section.type === 'presentation'" class="space-y-10">
          <div
            v-for="(presentation, i) in section.items"
            :key="i"
            class="mb-10"
          >
            <div class="text-xl font-bold">
              {{ presentation.title }}
            </div>
            <div class="text-m mb-4 text-gray-700 italic">
              {{ presentation.authors }}
            </div>
            <div v-if="Array.isArray(presentation.description)">
              <ul
                class="pl-4 list-disc list-outside text-base space-y-2 text-gray-800"
              >
                <li v-for="(desc, j) in presentation.description" :key="j">
                  {{ desc.content }}
                </li>
              </ul>
            </div>
            <div v-else>
              <span v-html="presentation.description"></span>
            </div>
            <div v-if="presentation.link" class="mt-2">
              <a
                :href="presentation.link"
                target="_blank"
                rel="noopener"
                class="text-custom-red"
              >
                Link to publication
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResearchData } from "@/composables/researchComposable";
import PhotoGallery from "@/components/PhotoGallery.vue";

const route = useRoute();
const router = useRouter();

// Get ID from route params
const researchId = computed(() => route.params.title);
const { researchData, loading, error, refetch } = useResearchData(
  researchId.value
);

onMounted(() => {
  console.log("Fetching research data...");
  refetch();
});

// Merge static and fetched data
const allResearch = computed(() => {
  // Handle different response structures
  const fetchedProjects = Array.isArray(researchData.value)
    ? researchData.value
    : researchData.value || [];

  return [...fetchedProjects];
});

// Parse JSON fields helper
const parseProjectData = (project) => {
  if (!project) return project;
  return {
    ...project,
    related_projects: JSON.parse(project.related_projects || "[]") || [],
    dates: JSON.parse(project.dates || "[]") || [],
    sections: JSON.parse(project.sections || "[]") || [],
    media: JSON.parse(project.media || "[]") || [],
    photos: JSON.parse(project.photos || "[]") || [],
  };
};

// Find current project
const projekt = computed(() => {
  return parseProjectData(allResearch.value[0]);
});

// Watch for route changes
watch(
  () => route.params.title,
  (newTitle) => {
    console.log("Route changed to:", newTitle);
  },
  { immediate: true }
);

// Methods
const goBack = () => {
  router.push({ name: "ProjektePage" });
};

// const togglePlay = (event) => {
//   const video = event.target;
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// };
</script>

<style scoped>
.text-custom-red {
  color: #740712;
}
</style>
