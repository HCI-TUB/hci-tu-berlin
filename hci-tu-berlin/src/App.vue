<template>
  <div
    class="font-sans flex flex-col px-4 md:px-8 items-center md:items-start md:flex-row md:gap-8 tracking-wide text-neutral-800"
  >
    <aside
      class="flex flex-col my-8 md:my-16 gap-4 md:gap-8 md:w-56 md:ml-12 items-center md:items-start flex-shrink-0"
    >
      <div class="flex gap-2 flex-col text-center md:text-left mb-6">
        <img
          class="w-16 md:w-20 mx-auto md:mx-0"
          src="./assets/TU-Berlin-Logo.png"
          alt="tu-logo"
        />
        <router-link to="/" class="tracking-widest text-xl md:text-2xl">
          Human Computer Interaction
        </router-link>
        <div>at TU Berlin</div>
      </div>
      <nav
        class="flex flex-col gap-4 items-center md:items-start text-center md:text-left text-xl md:text-2xl"
      >
        <router-link to="/" class="hover:text-custom-red">About</router-link>
        <router-link to="/projects" class="hover:text-custom-red"
          >Research</router-link
        >
        <router-link to="/people" class="hover:text-custom-red"
          >People</router-link
        >
        <router-link to="/events" class="hover:text-custom-red"
          >Events</router-link
        >
        <router-link to="/theses" class="hover:text-custom-red"
          >Theses</router-link
        >
        <router-link to="/publications" class="hover:text-custom-red"
          >Publications</router-link
        >
        <router-link to="/contact" class="hover:text-custom-red"
          >Contact</router-link
        >
      </nav>
    </aside>

    <main class="flex-1 w-full px-4 mr-20 ml-20 md:px-0">
      <div class="flex flex-col gap-8 md:my-12 mb-12">
        <router-view />
      </div>
    </main>

    <!-- Right Sidebar - Events & News -->
    <aside class="hidden lg:block w-80 my-16 flex-shrink-0 space-y-6">
      <!-- Upcoming Events Card -->
      <!-- 
      <div
        class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600 hover:shadow-xl transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">Upcoming Events</h3>
        </div>

        <div v-if="eventsLoading" class="text-center py-4">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"
          ></div>
        </div>

        <div v-else-if="upcomingEvents.length" class="space-y-4">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
            class="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 hover:bg-red-50 p-2 rounded transition-colors cursor-pointer"
            @click="goToEvent(event)"
          >
            <div class="flex items-start gap-2">
              <span class="text-red-600 text-lg mt-1">•</span>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800 mb-1 line-clamp-2">
                  {{ event.title }}
                </h4>
                <p
                  v-if="event.subtitle"
                  class="text-xs text-gray-500 mb-2 italic line-clamp-2"
                >
                  {{ event.subtitle }}
                </p>
                <p class="text-sm text-gray-600 line-clamp-2">
                  {{ event.description }}
                </p>
                <div
                  v-if="getEventDate(event)"
                  class="flex items-center gap-1 mt-2 text-xs text-gray-500"
                >
                  <span>📍</span>
                  <span>{{ getEventDate(event) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-4 text-gray-500">
          No upcoming events
        </div>

        <router-link
          to="/events"
          class="text-custom-red hover:underline text-sm font-semibold mt-4 inline-block flex items-center gap-1"
        >
          <span>View all events</span>
          <span>→</span>
        </router-link>
      </div> -->
      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
        <h3 class="text-xl font-bold mb-4 text-gray-800">Upcoming Events</h3>
        <div v-if="eventsLoading" class="text-center py-4">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"
          ></div>
        </div>

        <div v-else-if="upcomingEvents.length" class="space-y-4">
          <div class="space-y-4">
            <div class="border-b pb-3">
              <div
                v-for="event in upcomingEvents"
                :key="event.id"
                class="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 hover:bg-red-50 p-2 rounded transition-colors cursor-pointer"
                @click="goToEvent(event)"
              >
                <p class="text-sm text-gray-500 mb-1">
                  {{ getEventDate(event) }}
                </p>
                <h4 class="font-semibold text-gray-800 mb-1">
                  {{ event.title }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ event.subtitle }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <router-link
          to="/events"
          class="text-custom-red hover:underline text-sm font-semibold mt-4 inline-block"
        >
          View all events →
        </router-link>
      </div>

      <!-- <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
        <h3 class="text-xl font-bold mb-4 text-gray-800">Latest News</h3>
        <div class="space-y-4">
          <div class="border-b pb-3">
            <p class="text-sm text-gray-500 mb-1">2 days ago</p>
            <h4 class="font-semibold text-gray-800 mb-1">
              New Paper Published
            </h4>
            <p class="text-sm text-gray-600">
              Our research on VR interfaces accepted at CHI 2025
            </p>
          </div>
          <div class="border-b pb-3">
            <p class="text-sm text-gray-500 mb-1">1 week ago</p>
            <h4 class="font-semibold text-gray-800 mb-1">Team Member Joins</h4>
            <p class="text-sm text-gray-600">Welcome to our new PhD student!</p>
          </div>
          <div class="pb-3">
            <p class="text-sm text-gray-500 mb-1">2 weeks ago</p>
            <h4 class="font-semibold text-gray-800 mb-1">Grant Awarded</h4>
            <p class="text-sm text-gray-600">
              Received funding for AR research project
            </p>
          </div>
        </div>
      </div> -->

      <div
        class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-6"
      >
        <h3 class="text-xl font-bold mb-4 text-gray-800">Quick Links</h3>
        <ul class="space-y-2">
          <li>
            <router-link
              to="/theses"
              class="text-gray-700 hover:text-custom-red text-sm flex items-center gap-2"
            >
              <span>→</span> Apply for Thesis
            </router-link>
          </li>
          <li>
            <router-link
              to="/join"
              class="text-gray-700 hover:text-custom-red text-sm flex items-center gap-2"
            >
              <span>→</span> Join Our Lab
            </router-link>
          </li>
          <li>
            <router-link
              to="/collaboration"
              class="text-gray-700 hover:text-custom-red text-sm flex items-center gap-2"
            >
              <span>→</span> Collaboration Inquiries
            </router-link>
          </li>
          <li>
            <a
              href="https://www.instagram.com/hci_tuberlin/"
              target="_blank"
              class="text-gray-700 hover:text-custom-red text-sm flex items-center gap-2"
            >
              <span>→</span> Follow on Instagram
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useEventsData } from "@/composables/eventsComposable";

const router = useRouter();

const {
  eventsData,
  loading: eventsLoading,
  refetch: refetchEvents,
} = useEventsData();

onMounted(() => {
  refetchEvents();
});

const upcomingEvents = computed(() => {
  if (!eventsData.value) return [];

  const events = Array.isArray(eventsData.value[0])
    ? eventsData.value[0]
    : eventsData.value;

  return events.filter((event) => event.is_active === 1).slice(0, 3);
});

const getEventDate = (event) => {
  if (!event.dates) return null;

  try {
    const dates = JSON.parse(event.dates);
    const mainDate =
      dates.find((d) => d.label.includes("Workshop")) || dates[0];
    return mainDate ? mainDate.value : null;
  } catch {
    return null;
  }
};

const goToEvent = (event) => {
  // Assuming you have event detail route
  router.push({ name: "EventDetailPage", params: { title: event.id } });
  // Or if using slug:
  // router.push({ name: 'EventDetailPage', params: { slug: slugify(event.title) } });
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.hover\:text-custom-red:hover {
  color: #c50e1f;
}

.text-custom-red {
  color: #c50e1f;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: #f1f1f1;
}

aside::-webkit-scrollbar-thumb {
  background: #c50e1f;
  border-radius: 3px;
}
</style>
