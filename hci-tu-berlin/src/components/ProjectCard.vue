<template>
  <div>
    <div class="text-2xl mb-2 tracking-wide text-justify">{{ title }}</div>
    <p class="text-gray-700 text-left">{{ text }}</p>
    <div
      v-if="media && media.length"
      class="py-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-1"
    >
      <div v-for="(item, index) in media" :key="index">
        <img
          v-if="item.type === 'image'"
          :src="item.src"
          :alt="item.alt"
          class="w-[200px] h-[400px] object-cover"
        />
        <div v-if="item.type === 'video'">
          <video
            :src="item.src"
            muted
            class="w-[200px] h-[400px] object-cover cursor-pointer"
            @click="togglePlay($event)"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      default: () => [],
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    togglePlay(event) {
      const video = event.target.closest("video");
      const mediaItem = this.media.find((item) => item.src === video.src);
      if (video.paused) {
        video.play();
        mediaItem.playing = true;
      } else {
        video.pause();
        mediaItem.playing = false;
      }
    },
  },
};
</script>
