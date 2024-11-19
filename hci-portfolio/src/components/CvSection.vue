<template>
  <div class="flex flex-col gap-8 py-6">
    <h2 class="text-2xl tracking-widest">{{ sectionTitle }}</h2>
    <div v-for="(item, index) in items" :key="index" class="pb-4">
      <div class="text-gray-600 text-sm">{{ item.year }}</div>
      <div class="text-xl pb-1">{{ item.title }}</div>
      <div class="text-gray-800 pb-2">{{ item.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvSection',
  props: {
    sectionTitle: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>