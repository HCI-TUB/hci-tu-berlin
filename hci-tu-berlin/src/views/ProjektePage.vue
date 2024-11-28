<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest ">Research</h1>
    <Projekt
      v-for="(projekt, index) in research"
      :key="index"
      :title="projekt.title"
      :media="projekt.media"
      :text="projekt.text"
    />
  </div>
</template>

<script>
import Projekt from '@/components/ProjectCard.vue';
import { research } from '@/data/researchData.json';

export default {
  name: 'ProjektePage',
  components: {
    Projekt
  },
  data() {
    return {
      research
    };
  }
};
</script>