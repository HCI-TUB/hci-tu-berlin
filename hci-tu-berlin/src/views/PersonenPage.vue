<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest sm:justify-center sm:items-center">People</h1>
    <div class="flex justify-center items-center md:justify-start md:items-start">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <PersonCard
        v-for="person in persons"
        :key="person.id"
        :name="person.name"
        :photo="person.photo"
        :email="person.email"
        :description="person.description"
        :id="person.id"
      ></PersonCard>
    </div>
  </div>
</div>
</template>

<script>
import PersonCard from '@/components/PersonCard.vue';
import { persons } from '@/data/personData.json';

export default {
  name: 'PersonenPage',
  components: {
    PersonCard
  },
  data() {
    return {
      persons
    };
  }
};
</script>
