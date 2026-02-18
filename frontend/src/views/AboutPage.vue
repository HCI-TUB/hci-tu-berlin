<template>
  <div class="w-full px-0 lg:px-8 space-y-8">
    <div class="md:text-4xl sm:text-3xl text-left tracking-wide my-8">
      {{
        currentAbout.welcomeHeading ||
        "Welcome to the Human-Computer Interaction Lab"
      }}
    </div>

    <!-- Page Content -->
    <div v-if="loading">
      {{ currentAbout.loadingPage || "Loading page content..." }}
    </div>
    <div v-else-if="pageData && pageData.length">
      <div v-for="(item, index) in pageData" :key="index">
        <div class="text-justify w-full text-lg">
          <ul class="space-y-1 mb-4">
            <li v-if="item?.title">
              <h4 class="text-2xl tracking-widest mb-2">
                {{ item.title }}
              </h4>
            </li>

            <!-- BULLET LIST -->
            <ul
              v-if="isBulletList(item.content)"
              class="list-disc pl-5 space-y-1"
            >
              <li v-for="(line, idx) in splitLines(item.content)" :key="idx">
                <span v-for="(part, pIdx) in parseLine(line)" :key="pIdx">
                  <a
                    v-if="part.type === 'email'"
                    :href="`mailto:${part.value}`"
                    class="text-custom-red hover:text-custom-red-dark"
                  >
                    {{ part.value }}
                  </a>
                  <a
                    v-else-if="part.type === 'url'"
                    :href="part.value"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-custom-red"
                  >
                    Link
                  </a>
                  <img
                    v-else-if="part.type === 'image'"
                    :src="part.value"
                    :alt="part.alt || 'Image'"
                    class="max-w-full h-auto my-4 rounded"
                  />
                  <span v-else>{{ part.value }}</span>
                </span>
              </li>
            </ul>

            <!-- NORMAL TEXT -->
            <div v-else class="space-y-1">
              <p v-for="(line, idx) in splitLines(item.content)" :key="idx">
                <span v-for="(part, pIdx) in parseLine(line)" :key="pIdx">
                  <a
                    v-if="part.type === 'email'"
                    :href="`mailto:${part.value}`"
                    class="text-custom-red hover:text-custom-red-dark"
                  >
                    {{ part.value }}
                  </a>
                  <a
                    v-else-if="part.type === 'url'"
                    :href="part.value"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-custom-red"
                  >
                    Link
                  </a>
                  <img
                    v-else-if="part.type === 'image'"
                    :src="part.value"
                    :alt="part.alt || 'Image'"
                    class="max-w-full h-auto my-4 rounded"
                  />
                  <span v-else>{{ part.value }}</span>
                </span>
              </p>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <hr class="mt-4" />

    <!-- Instagram Section -->
    <div
      class="flex flex-col items-center sm:flex-row sm:items-start mt-4 space-y-4 sm:space-y-0 sm:space-x-4"
    >
      <img
        class="w-16 sm:w-8"
        src="/assets/hci-logo.jpg"
        :alt="currentAbout.hciLogoAlt || 'HCI Logo'"
      />
      <p class="text-justify text-lg">
        <a
          class="hover:text-custom-red"
          href="https://www.instagram.com/hci_tuberlin/"
          target="_blank"
        >
          {{ currentAbout.followInstagram || "Follow us on Instagram" }}
        </a>
      </p>
    </div>

    <hr class="my-4" />

    <div class="md:text-2xl sm:text-xl tracking-wide text-left my-8 font-bold">
      {{ currentAbout.featuredProjectsHeading || "Featured Projects" }}
    </div>

    <!-- Featured Project Section -->
    <div v-if="researchLoading" class="text-center py-10">
      <p>{{ currentAbout.loadingProjects || "Loading projects..." }}</p>
    </div>
    <div
      v-else-if="featuredProject"
      class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50"
    >
      <h3 class="text-xl font-semibold mb-2">{{ featuredProject.title }}</h3>
      <p class="md:text-justify text-left mb-4">
        {{ featuredProject.text }}
      </p>
      <router-link
        :to="{
          name: 'ProjektDetailPage',
          params: { title: featuredProject.id },
        }"
        class="text-custom-red hover:underline"
      >
        Learn more about this project →
      </router-link>
    </div>
    <div v-else class="bg-gray-50 p-6 rounded-lg shadow-md">
      <p class="text-gray-600">
        {{ currentAbout.featuredProjectNo || "No featured project available" }}
      </p>
    </div>

    <!-- Thesis Featured Project Preview -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50">
      <h3 class="text-xl font-semibold mb-2">
        {{ currentAbout.thesesHeading || "Bachelor & Master Theses" }}
      </h3>
      <p class="md:text-justify text-left mb-4">
        {{
          currentAbout.thesesText ||
          "We regularly supervise bachelor's and master's theses on topics such as usable security, cross-reality interaction, and inclusive design. Find out more about the process and potential topics."
        }}
      </p>
      <router-link
        :to="{ name: 'ThesisPage' }"
        class="text-custom-red hover:underline"
      >
        {{ currentAbout.learnMoreTheses || "Learn more about theses →" }}
      </router-link>
    </div>

    <!-- Photo Slider -->
    <div class="md:text-2xl sm:text-xl tracking-wide text-left my-8 font-bold">
      {{ currentAbout.impressionsHeading || "Impressions from our Lab" }}
    </div>
    <PhotoSlider :titles="currentAbout.photoSliderTitles || ['Events']" />
  </div>
</template>

<script setup>
import { onMounted, computed, toRaw } from "vue";
import { usePageData } from "@/composables/pageComposable";
import { useResearchData } from "@/composables/researchComposable";
import { splitLines, parseLine, isBulletList } from "@/utils/dataFormatter.js";
import PhotoSlider from "@/components/PhotoSlider.vue";
import { useAboutTexts } from "@/composables/aboutTextComposable";

const { pageData, loading, refetch } = usePageData("about");
const {
  researchData,
  loading: researchLoading,
  refetch: refetchResearch,
} = useResearchData(null);

const { current: currentAbout, loadTexts: loadAboutTexts } = useAboutTexts();

onMounted(async () => {
  console.log("Fetching page data...");
  await Promise.all([refetch(), refetchResearch(), loadAboutTexts()]);
});

const featuredProject = computed(() => {
  if (!researchData.value) {
    console.log("No research data");
    return null;
  }

  let projects = toRaw(researchData.value[0]) || [];
  return projects;
});
</script>

<style>
.hover\:text-custom-red:hover {
  color: #c50e1f;
}
</style>
