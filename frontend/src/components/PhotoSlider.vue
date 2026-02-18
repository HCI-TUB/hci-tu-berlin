<template>
  <div v-if="loading" class="text-center py-10">
    <p>Loading photos...</p>
  </div>

  <div v-else-if="photos.length" class="relative w-full mx-auto">
    <div class="relative group">
      <div
        v-if="photos[currentIndex].type === 'video' && isPortraitVideo"
        class="flex items-center justify-center w-full h-60 sm:h-80 lg:h-[32rem] bg-black rounded shadow"
      >
        <video
          v-bind="mediaProps"
          :key="photos[currentIndex].id"
          class="h-full max-h-full max-w-[40vw] mx-auto rounded"
        >
          <source :src="photos[currentIndex].src" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <component
        v-else
        :is="photos[currentIndex].type === 'video' ? 'video' : 'img'"
        v-bind="mediaProps"
        :key="photos[currentIndex].id"
        class="w-full h-60 sm:h-80 lg:h-[32rem] object-cover rounded shadow"
      >
        <template v-if="photos[currentIndex].type === 'video'">
          <source :src="photos[currentIndex].src" type="video/mp4" />
          Your browser does not support the video tag.
        </template>
      </component>

      <button
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
        aria-label="Previous"
      >
        &#8592;
      </button>

      <button
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>

    <div class="w-full text-center mt-4">
      <span class="text-lg text-neutral-800">
        {{ photos[currentIndex].caption }}
      </span>
    </div>

    <div class="text-center text-sm text-gray-600 mt-2">
      {{ currentIndex + 1 }} / {{ photos.length }}
    </div>
  </div>

  <div v-else class="text-center py-10 text-gray-500">No photos available</div>
</template>

<script setup>
import { ref, computed, onMounted, toRaw } from "vue";
import { useGalleryData } from "@/composables/galleryComposable";

const props = defineProps({
  titles: {
    type: Array,
    required: true,
  },
});

const { galleryData, loading, refetch } = useGalleryData(props.titles[0]);

onMounted(() => {
  console.log("Fetching photo gallery data...");
  refetch();
});

const photos = computed(() => {
  if (!galleryData.value || galleryData.value.length === 0) return [];

  const flatItems = Array.isArray(galleryData.value)
    ? toRaw(galleryData.value)
    : toRaw(galleryData.value);

  const filtered = flatItems.filter((item) =>
    props.titles[0].includes(item.title)
  );

  return filtered[0]?.items || [];
});

const currentIndex = ref(0);

const isPortraitVideo = computed(() => {
  const item = photos.value[currentIndex.value];
  return item?.type === "video" && item?.orientation === "portrait";
});

function prev() {
  if (photos.value.length === 0) return;
  currentIndex.value =
    (currentIndex.value - 1 + photos.value.length) % photos.value.length;
}

function next() {
  if (photos.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % photos.value.length;
}

const mediaProps = computed(() => {
  const item = photos.value[currentIndex.value];
  if (!item) return {};

  if (item.type === "video") {
    return {
      src: item.src,
      controls: true,
      autoplay: false,
      loop: false,
      muted: true,
      playsinline: true,
      alt: item.caption,
    };
  } else {
    return {
      src: item.src,
      alt: item.caption,
    };
  }
});
</script>
