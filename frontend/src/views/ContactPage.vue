<template>
  <div class="text-left w-full p-4">
    <h1 class="text-3xl text-left mb-8 tracking-widest">Contact</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="pageData" v-for="(item, index) in pageData" :key="index">
      <div>
        <ul class="space-y-1 mb-4">
          <li>
            <h4 class="text-2xl text-left tracking-widest mb-2">
              {{ item.title }}
            </h4>
          </li>
          <li v-for="(line, index) in splitLines(item.content)" :key="index">
            <span v-for="(part, idx) in parseLine(line)" :key="idx">
              <!-- Email -->
              <a
                v-if="part.type === 'email'"
                :href="`mailto:${part.value}`"
                class="text-custom-red hover:text-custom-red-dark"
              >
                {{ part.value }}
              </a>

              <span v-else>
                {{ part.value }}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-6">
      <StreetMap :latitude="52.515031" :longitude="13.32682" />
    </div>
  </div>
  <div class="flex items-center">
    <img class="w-8 mr-2" src="/assets/hci-logo.jpg" alt="hci logo" />
    <p class="text-justify text-lg my-2">
      <a
        class="hover:text-custom-red"
        href="https://www.instagram.com/hci_tuberlin/"
        target="_blank"
        >Follow us on Instagram</a
      >
    </p>
  </div>
</template>

<script setup>
import StreetMap from "@/components/StreetMap.vue";
import { onMounted } from "vue";
import { usePageData } from "@/composables/pageComposable";
import { splitLines, parseLine } from "@/utils/dataFormatter.js";

const { pageData, loading, refetch } = usePageData("contact");

onMounted(() => {
  console.log("Fetching page data...");
  refetch();
});
</script>
