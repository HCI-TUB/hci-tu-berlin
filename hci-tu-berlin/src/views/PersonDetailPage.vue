<template>
  <div class="text-left w-full p-4">
    <button @click="goBack" class="text-xl mr-4">
        ←
      </button>
    <h1 class="text-3xl text-left mb-8 tracking-widest">{{ person.name }}</h1>
    <div class="flex flex-col items-start mb-4">
      <div class="w-48 h-48 mb-4 lg:mb-0 lg:mr-4">
        <img :src="imageSrc" alt="Person Photo" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 mt-4">
        <p><strong>Email:</strong> {{ person.email }}</p>
        <p><strong>Room:</strong> {{ person.room }}</p>
        <p><strong>Office Hours:</strong> {{ person.officeHours }}</p>
        <p class="mt-4 mb-8"> {{ person.description }}</p>
      </div>
  
    </div>
    <div v-for="(section, index) in person.cv" :key="index" class="mb-4">
      <h2 class="text-2xl tracking-widest my-4">{{ section.title }}</h2>
      <ul class="list-disc list-inside text-lg">
        <li class="my-2" v-for="(item, itemIndex) in section.items" :key="itemIndex">
          {{ item.year }}, {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { persons } from '@/data/personData.json';

export default {
  name: 'PersonDetailPage',
  data() {
    return {
      person: persons.find(p => p.id === this.$route.params.id)
    };
  },
  computed: {
    imageSrc() {
      return this.person.photo || require('@/assets/placeholder.png');
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'PersonenPage' });
    }
  }
};
</script>

