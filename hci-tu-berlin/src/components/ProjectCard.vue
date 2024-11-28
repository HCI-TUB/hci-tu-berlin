<template>
  <div>
    <h2 class="text-2xl mb-2 tracking-wide text-justify">{{ title }}</h2> 
    
    <p class="text-gray-700 text-left">{{ text }}</p> 
    <div v-if="media" class="py-6 mb-4">
      <img v-if="isImage" :src="media" alt="Project Media" class="w-full h-auto max-w-full lg:max-w-[400px] md:max-w-[350px] sm:max-w-[200px]" />
      <video v-if="isVideo" :src="media" controls class="w-full h-auto max-w-full lg:max-w-[400px] md:max-w-[350px] sm:max-w-[200px]"></video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    title: {
      type: String,
      required: true
    },
    media: {
      type: String,
      default: null
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    isImage() {
      return this.media && (this.media.endsWith('.jpg') || this.media.endsWith('.jpeg') || this.media.endsWith('.png') || this.media.endsWith('.gif'));
    },
    isVideo() {
      return this.media && (this.media.endsWith('.mp4') || this.media.endsWith('.webm') || this.media.endsWith('.ogg'));
    }
  }
};
</script>

