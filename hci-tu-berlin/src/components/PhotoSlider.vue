<template>
  <div v-if="photos.length" class="relative w-full mx-auto">
    <div class="relative group">
      <div
        v-if="photos[currentIndex].type === 'video' && isPortraitVideo"
        class="flex items-center justify-center w-full h-60 sm:h-80 lg:h-[32rem] bg-black rounded shadow"
      >
        <video
          v-bind="mediaProps"
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
        class="w-full h-60 sm:h-80 lg:h-[32rem] object-cover rounded shadow"
      >
        <template v-if="photos[currentIndex].type === 'video'">
          <source :src="photos[currentIndex].src" type="video/mp4" />
          Your browser does not support the video tag.
        </template>
      </component>
      <!-- Left Arrow -->
      <button
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
        aria-label="Previous"
      >
        &#8592;
      </button>
      <!-- Right Arrow -->
      <button
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
    <div class="w-full text-center mt-4">
      <span class="text-lg text-neutral-800">{{
        photos[currentIndex].caption
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import photoSliderData from "@/data/photoslider.json";

const props = defineProps({
  titles: {
    type: Array,
    required: true,
  },
});

const photos = computed(() => {
  return photoSliderData
    .filter((group) => props.titles.includes(group.title))
    .flatMap((group) => group.items);
});

const currentIndex = ref(0);

const isPortraitVideo = computed(() => {
  const item = photos.value[currentIndex.value];
  return item.type === "video" && item.orientation === "portrait";
});

function prev() {
  currentIndex.value =
    (currentIndex.value - 1 + photos.value.length) % photos.value.length;
}
function next() {
  currentIndex.value = (currentIndex.value + 1) % photos.value.length;
}

const mediaProps = computed(() => {
  const item = photos.value[currentIndex.value];
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
