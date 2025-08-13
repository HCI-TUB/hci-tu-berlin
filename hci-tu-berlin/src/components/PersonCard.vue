<template>
  <div
    class="relative w-64 aspect-[3/4] sm:w-48 md:w-56 lg:w-64 cursor-pointer"
    @click="goToDetail"
  >
    <img v-if="photo" :src="photo" alt="" class="w-full h-full object-cover" />
    <div
      class="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
    >
      <h3 v-if="name" class="text-lg font-bold">{{ name }}</h3>
      <a
        v-if="email"
        :href="'mailto:' + email"
        class="text-sm email-link hover:text-custom-red"
        >{{ email }}</a
      >
      <p v-if="description" class="text-xs mt-2 truncate-description">
        {{ truncatedDescription }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonCard",
  props: {
    name: {
      type: String,
      required: false,
      default: "",
    },
    photo: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    truncatedDescription() {
      return this.description && this.description.length > 100
        ? this.description.substring(0, 100) + "... →"
        : this.description;
    },
  },
  methods: {
    goToDetail() {
      if (this.id) {
        this.$router.push({
          name: "PersonDetailPage",
          params: { id: this.id },
        });
      }
    },
  },
};
</script>

<style scoped>
.truncate-description {
  max-height: 4rem;
  overflow: hidden;
  position: relative;
}
.hover\:text-custom-red:hover {
  color: #c50e1f;
}
</style>
