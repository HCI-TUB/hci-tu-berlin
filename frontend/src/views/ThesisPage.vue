<template>
  <div class="text-justify">
    <h1 class="text-3xl text-left mb-4 tracking-widest">
      Bachelor & Master Thesis
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 mb-4">
      <div class="flex flex-col">
        <div v-if="loading">Loading...</div>
        <div
          v-else-if="pageData"
          v-for="(item, index) in pageData"
          :key="index"
        >
          <ul class="space-y-1 mb-4">
            <li v-if="item?.title">
              <h4 class="text-2xl text-left tracking-widest">
                {{ item?.title }}
              </h4>
            </li>
            <!-- BULLET LIST -->
            <ul
              v-if="isBulletList(item.content)"
              class="list-disc pl-5 space-y-1 text-[15px]"
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
                  <span v-else>{{ part.value }}</span>
                </span>
              </li>
            </ul>
            <!-- NORMAL TEXT -->
            <div v-else class="space-y-1 text-[15px]">
              <p v-for="(line, idx) in splitLines(item.content)" :key="idx">
                <span v-for="(part, pIdx) in parseLine(line)" :key="pIdx">
                  <a
                    v-if="part.type === 'email'"
                    :href="`mailto:${part.value}`"
                    class="text-custom-red hover:text-custom-red-dark"
                  >
                    {{ part.value }}
                  </a>
                  <!-- URL -->
                  <a
                    v-else-if="part.type === 'url'"
                    :href="part.value"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-custom-red"
                  >
                    Gitlab Link
                  </a>
                  <span v-else>{{ part.value }}</span>
                </span>
              </p>
            </div>
          </ul>
        </div>
      </div>
      <img
        class="relative w-full sm:w-[70%] max-h-32rem mx-auto"
        src="/assets/hmd-photo.png"
        alt="HMD Photo"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePageData } from "@/composables/pageComposable";
import { splitLines, parseLine, isBulletList } from "@/utils/dataFormatter.js";

const { pageData, loading, refetch } = usePageData("thesis");

onMounted(() => {
  console.log("Fetching page data...");
  refetch();
});
</script>
