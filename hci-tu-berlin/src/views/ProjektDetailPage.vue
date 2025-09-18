<template>
  <div class="text-left w-full p-4 space-y-10 bg-gray-100">
    <button @click="goBack" class="text-xl mr-4">←</button>
    <div class="bg-gray-50 p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-left mb-4 tracking-widest">
        {{ projekt.title }}
      </h1>
      <div class="text-xl text-left mb-4">
        <i>{{ projekt.subtitle }}</i>
      </div>
      <p class="text-justify">{{ projekt.description }}</p>
    </div>

    <!-- PhotoGallery below title/description -->
    <PhotoGallery
      v-if="
        projekt.photos &&
        projekt.photos[0] &&
        projekt.photos[0].photoSliderTitle
      "
      :titles="[projekt.photos[0].photoSliderTitle]"
    />
    <div
      v-if="projekt.media && projekt.media.length"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    ></div>
    <div
      v-if="projekt.dates && projekt.dates.length"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-2xl tracking-widest text-custom-red mb-4">Dates</h2>
      <ul class="list-none space-y-2">
        <li v-for="(date, index) in projekt.dates" :key="index" class="flex">
          <span class="pr-2">{{ date.label }}: </span>
          <span>{{ date.value }}</span>
        </li>
      </ul>
    </div>
    <div
      v-for="(section, idx) in projekt.sections"
      :key="idx"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-2xl tracking-widest text-custom-red mb-4">
        {{ section.title }}
      </h2>
      <p v-if="section.text" class="mb-4 leading-relaxed">{{ section.text }}</p>
      <!-- Program Table -->
      <table
        v-if="section.type === 'program'"
        class="table-auto w-full text-left mb-4"
      >
        <tbody>
          <tr v-for="(item, i) in section.items" :key="i" class="border-b">
            <td class="pr-4">{{ item.time }}</td>
            <td>{{ item.event }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Bullets -->
      <ul
        v-if="section.type === 'bullets'"
        class="pl-4 list-disc list-outside text-lg"
      >
        <li v-for="(bullet, i) in section.bullets" :key="i" class="py-2">
          <template v-if="typeof bullet === 'string'">
            <span v-html="bullet"></span>
          </template>
          <template v-else>
            <b>{{ bullet.title }}</b> <span v-html="bullet.content"></span>
          </template>
        </li>
      </ul>
      <!-- People -->
      <ul v-if="section.type === 'people'" class="list-none space-y-4">
        <li v-for="(person, i) in section.items" :key="i" class="py-2">
          <p class="text-justify">
            <b>{{ person.name }}</b> ({{ person.affiliation }})
            {{ person.description }}
          </p>
        </li>
      </ul>
      <!-- Presentation -->
      <div v-if="section.type === 'presentation'" class="space-y-10">
        <div v-for="(presentation, i) in section.items" :key="i" class="mb-10">
          <div class="text-xl font-bold">
            {{ presentation.title }}
          </div>
          <div class="text-m mb-4 text-gray-700 italic">
            {{ presentation.authors }}
          </div>
          <div v-if="Array.isArray(presentation.description)">
            <ul
              class="pl-4 list-disc list-outside text-base space-y-2 text-gray-800"
            >
              <li v-for="(desc, j) in presentation.description" :key="j">
                {{ desc.content }}
              </li>
            </ul>
          </div>
          <div v-else>
            <span v-html="presentation.description"></span>
          </div>
          <div v-if="presentation.link" class="mt-2">
            <a
              :href="presentation.link"
              target="_blank"
              rel="noopener"
              class="text-custom-red"
            >
              Link to publication
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { research } from "@/data/researchData.json";
import { slugify } from "@/utils/slugify";
import PhotoGallery from "@/components/PhotoGallery.vue";

export default {
  name: "ProjektDetailPage",
  components: {
    PhotoGallery,
  },
  data() {
    return {
      projekt: research.find(
        (p) => slugify(p.title) === this.$route.params.title
      ),
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "ProjektePage" });
    },
    togglePlay(event) {
      const video = event.target;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
  },
};
</script>
<style>
.text-custom-red {
  color: #740712;
}
</style>
