<template>
    <div class="relative w-64 h-64 cursor-pointer" @click="goToDetail">
      <img :src="imageSrc" alt="Person Photo" class="w-full h-full object-cover" />
      <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 class="text-lg font-bold">{{ name }}</h3>
        <p class="text-sm">{{ email }}</p>
        <p class="text-xs mt-2 truncate-description">{{ description}}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PersonCard',
    props: {
      name: {
        type: String,
        required: true
      },
      photo: {
        type: String,
        default: null
      },
      email: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      imageSrc() {
        return this.photo || require('@/assets/placeholder.png');
      },
    truncatedDescription() {
      return this.description.length > 100 ? this.description.substring(0, 100) + '... →' : this.description;
    }
    },
    methods: {
      goToDetail() {
        this.$router.push({ name: 'PersonDetail', params: { id: this.id } });
      }
    }
  };
  </script>
  
  <style scoped>
  .truncate-description {
  max-height: 4rem;
  overflow: hidden;
  position: relative;
}
  </style>