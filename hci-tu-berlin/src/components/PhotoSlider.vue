<template>
  <div v-if="photos.length" class="relative w-full mx-auto">
    <div class="relative group">
      <img
        :src="photos[currentIndex].src"
        :alt="photos[currentIndex].caption"
        class="w-full h-80 object-cover rounded shadow"
      />
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
import { ref } from "vue";

const props = defineProps({
  photos: {
    type: Array,
    required: true,
  },
});

const currentIndex = ref(0);

function prev() {
  currentIndex.value =
    (currentIndex.value - 1 + props.photos.length) % props.photos.length;
}
function next() {
  currentIndex.value = (currentIndex.value + 1) % props.photos.length;
}
</script>
