<template>
  <div>
    <div v-for="group in groups" :key="group.title" class="mb-8">
      <h2 class="text-xl font-bold mb-4 text-left">{{ group.title }}</h2>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="(item, idx) in group.items"
          :key="idx"
          class="w-full sm:w-[30%] md:w-[22%] lg:w-[22%] aspect-[4/3] bg-black rounded shadow flex items-center justify-center overflow-hidden cursor-pointer"
          @click="openViewer(group.title, idx)"
        >
          <img
            v-if="item.type === 'image'"
            :src="item.src"
            :alt="item.caption"
            class="object-cover w-full h-full rounded pointer-events-none"
            draggable="false"
          />
          <video
            v-else-if="item.type === 'video'"
            :src="item.src"
            class="object-cover w-full h-full rounded pointer-events-none"
            muted
            playsinline
            :controls="false"
            preload="metadata"
            draggable="false"
          ></video>
        </div>
      </div>
    </div>

    <!-- Viewer Modal -->
    <div
      v-if="viewer.open"
      class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      @click.self="closeViewer"
    >
      <div class="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        <button
          @click="closeViewer"
          class="absolute top-2 right-2 text-white text-3xl"
          aria-label="Close"
        >
          &times;
        </button>
        <div class="w-full flex items-center justify-center">
          <button
            @click.stop="prev"
            class="text-white text-3xl px-4"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <div
            class="flex items-center justify-center w-full h-[60vh] bg-black rounded"
          >
            <img
              v-if="currentItem.type === 'image'"
              :src="currentItem.src"
              :alt="currentItem.caption"
              class="object-contain max-h-full max-w-full rounded"
            />
            <video
              v-else-if="currentItem.type === 'video'"
              :src="currentItem.src"
              class="object-contain max-h-full max-w-full rounded"
              autoplay
              loop
              muted
              playsinline
              controls="false"
            ></video>
          </div>
          <button
            @click.stop="next"
            class="text-white text-3xl px-4"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        <div class="w-full text-center mt-4 text-white text-lg">
          {{ currentItem.caption }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, toRaw } from "vue";
import { useGalleryData } from "@/composables/galleryComposable";

onMounted(() => {
  console.log("Fetching photo gallery data...");
  refetch();
});
const props = defineProps({
  titles: {
    type: Array,
    required: true,
  },
});
const { galleryData, refetch } = useGalleryData(props.titles[0]);

const groups = computed(
  () => {
    const plainArray = toRaw(galleryData.value);
    return parseGalleryData(plainArray, props.titles);
  }
  // galleryData.filter((group) => props.titles.includes(group.title))
);

const parseGalleryData = (plainArray, titles) => {
  if (plainArray?.length > 0 && titles[0].length > 0) {
    const data = plainArray.filter((group) => titles.includes(group.title));
    return data;
  } else {
    return [];
  }
};

const viewer = ref({
  open: false,
  groupIndex: 0,
  itemIndex: 0,
});

function openViewer(title, idx) {
  const groupIndex = groups.value.findIndex((g) => g.title === title);
  viewer.value = {
    open: true,
    groupIndex,
    itemIndex: idx,
  };
}

function closeViewer() {
  viewer.value.open = false;
}

function prev() {
  const group = groups.value[viewer.value.groupIndex];
  viewer.value.itemIndex =
    (viewer.value.itemIndex - 1 + group.items.length) % group.items.length;
}

function next() {
  const group = groups.value[viewer.value.groupIndex];
  viewer.value.itemIndex = (viewer.value.itemIndex + 1) % group.items.length;
}

const currentItem = computed(() => {
  const group = groups.value[viewer.value.groupIndex];
  return group.items[viewer.value.itemIndex]; // ← Returns the actual ITEM
});
</script>
