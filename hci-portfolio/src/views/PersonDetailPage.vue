<template>
  <div class="text-left w-full p-4">
    <h1 class="text-3xl mb-10">{{ person.name }}</h1>
    <div class="flex items-start mb-4">
      <div class="flex-1">
        <p><strong>Email:</strong> {{ person.email }}</p>
        <p><strong>Room:</strong> {{ person.room }}</p>
        <p><strong>Office Hours:</strong> {{ person.officeHours }}</p>
        <p> {{ person.description }}</p>
      </div>
      <div class="w-32 h-32 ml-4">
        <img :src="imageSrc" alt="Person Photo" class="w-full h-full object-cover rounded-full" />
      </div>
    </div>

    <div v-for="(section, index) in person.cv" :key="index">
      <CvSection :sectionTitle="section.title" :items="section.items" />
    </div>
  </div>
</template>

<script>
import CvSection from '@/components/CvSection.vue';
import { persons } from '@/data/personData.js';

export default {
  name: 'PersonDetailPage',
  components: {
    CvSection
  },
  data() {
    return {
      person: persons.find(p => p.id === this.$route.params.id)
    };
  },
  computed: {
    imageSrc() {
      return this.person.photo || require('@/assets/placeholder.png');
    }
  }
};
</script>

