<template>
  <div class="text-left w-full p-4 space-y-10 bg-gray-100">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"
      ></div>
      <p class="mt-4">Loading Events...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20 text-red-600">
      <p>Error: {{ error }}</p>
      <button
        @click="goBack"
        class="mt-4 px-6 py-2 bg-gray-600 text-white rounded"
      >
        Back to Events
      </button>
    </div>

    <!-- Not Found -->
    <div v-else-if="!Event" class="text-center py-20">
      <p class="text-xl">Event not found</p>
      <button
        @click="goBack"
        class="mt-4 px-6 py-2 bg-gray-600 text-white rounded"
      >
        Back to Events
      </button>
    </div>

    <!-- Event Content -->
    <template v-else>
      <button @click="goBack" class="text-xl mr-4">←</button>

      <div class="bg-gray-50 p-8 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-left mb-4 tracking-widest">
          {{ Event.title }}
        </h1>
        <div v-if="Event.subtitle" class="text-xl text-left mb-4">
          <i>{{ Event.subtitle }}</i>
        </div>
        <p v-if="Event.description" class="text-justify">
          {{ Event.description }}
        </p>
      </div>

      <!-- PhotoGallery -->
      <PhotoGallery
        v-if="Event.photos && Event.photos[0]?.photoSliderTitle"
        :titles="[Event.photos[0].photoSliderTitle]"
      />

      <!-- Media Section -->
      <div
        v-if="Event.media && Event.media.length"
        class="bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <!-- Add media content here -->
      </div>

      <!-- Dates Section -->
      <div
        v-if="Event.dates && Event.dates.length"
        class="bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <h2 class="text-2xl tracking-widest text-custom-red mb-4">Dates</h2>
        <ul class="list-none space-y-2">
          <li v-for="(date, index) in Event.dates" :key="index" class="flex">
            <span class="pr-2">{{ date.label }}: </span>
            <span>{{ date.value }}</span>
          </li>
        </ul>
      </div>

      <!-- Dynamic Sections -->
      <div
        v-for="(section, idx) in Event.sections"
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
import { useEventsData } from "@/composables/eventsComposable";
import PhotoGallery from "@/components/PhotoGallery.vue";

const route = useRoute();
const router = useRouter();

// Get ID from route params
const eventId = computed(() => route.params.title);
const { eventsData, loading, error, refetch } = useEventsData(eventId.value);

onMounted(() => {
  console.log("Fetching event data...");
  refetch();
});

// Merge static and fetched data
const allEvents = computed(() => {
  // Handle different response structures
  const fetchedEvent = Array.isArray(eventsData.value)
    ? eventsData.value
    : eventsData.value || [];

  return [...fetchedEvent];
});

// Parse JSON fields helper
const parseEventData = (event) => {
  if (!event) return event;
  return {
    ...event,
    related_events: JSON.parse(event.related_events || "[]") || [],
    dates: JSON.parse(event.dates || "[]") || [],
    sections: JSON.parse(event.sections || "[]") || [],
    media: JSON.parse(event.media || "[]") || [],
    photos: JSON.parse(event.photos || "[]") || [],
  };
};

// Find current event
const Event = computed(() => {
  return parseEventData(allEvents.value[0]);
});

// Watch for route changes
watch(
  () => route.params.title,
  (newTitle) => {
    console.log("Route changed to:", newTitle);
  },
  { immediate: true },
);

// Methods
const goBack = () => {
  router.push({ name: "EventsPage" });
};
</script>

<style scoped>
.text-custom-red {
  color: #740712;
}
</style>
