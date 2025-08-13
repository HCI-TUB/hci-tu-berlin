<template>
  <div class="text-left w-full p-4">
    <button @click="goBack" class="text-xl mr-4">←</button>
    <h1 class="text-3xl text-left mb-8 tracking-widest">{{ person.name }}</h1>
    <div class="flex flex-col items-start mb-4">
      <div class="relative w-56 aspect-[3/4] sm:w-42 md:w-48 cursor-pointer">
        <img
          :src="imageSrc"
          alt="Person Photo"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex-1 mt-4">
        <p v-if="person.email">
          <strong>Email:</strong>
          <a
            :href="'mailto:' + person.email"
            class="text- email-link hover:text-custom-red"
            >{{ person.email }}</a
          >
        </p>
        <p v-if="person.room"><strong>Room:</strong> {{ person.room }}</p>
        <p
          v-if="person.description"
          class="mt-4 mb-8 text-left md:text-justify"
        >
          {{ person.description }}
        </p>
      </div>
    </div>
    <div v-for="(section, index) in person.cv" :key="index" class="mb-8">
      <h2 class="text-2xl tracking-widest my-4">{{ section.title }}</h2>
      <!-- Render as list if any item has 'year', else as paragraphs -->
      <ul
        v-if="
          section.items &&
          section.items.length &&
          section.items.some((item) => item.year !== undefined)
        "
        class="list-disc list-inside text-lg"
      >
        <li
          class="my-2"
          v-for="(item, itemIndex) in section.items"
          :key="itemIndex"
        >
          <span v-if="item.year && item.year !== ''"
            ><i>{{ item.year }}</i
            >, </span
          >{{ item.title
          }}<span v-if="item.description">, {{ item.description }}</span>
        </li>
      </ul>
      <div v-else-if="section.items && section.items.length">
        <div v-for="(item, itemIndex) in section.items" :key="itemIndex">
          <p
            v-for="key in Object.keys(item).filter(
              (k) => k.startsWith('text') && item[k]
            )"
            :key="key"
            class="mb-2"
          >
            {{ item[key] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { persons } from "@/data/personData.json";

export default {
  name: "PersonDetailPage",
  data() {
    return {
      person: persons.find(
        (p) => String(p.id) === String(this.$route.params.id)
      ),
    };
  },
  computed: {
    imageSrc() {
      return this.person.photo || require("@/assets/placeholder.png");
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: "PersonenPage" });
    },
  },
  mounted() {
    const fullName = this.person.name.toLowerCase().replace(/\s+/g, "-");
    const aliasPath = `/people/${fullName}`;
    if (this.$route.path !== aliasPath) {
      this.$router.replace({ path: aliasPath, query: { id: this.person.id } });
    }
  },
};
</script>
