<template>
  <div class="text-left w-full p-4 space-y-6 bg-gray-100">
    <button @click="goBack" class="text-xl mr-4">←</button>

    <!-- Title, Subtitle, and Text Section -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-left mb-4 tracking-widest">
        {{ projekt.title }}
      </h1>
      <div class="text-xl text-left mb-4">
        <i>{{ projekt.subtitle }} </i>
      </div>
      <p class="text-justify">{{ projekt.text }}</p>
    </div>

    <!-- Media Section -->
    <div
      v-if="projekt.media && projekt.media.length"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(item, index) in projekt.media"
          :key="index"
          class="flex justify-center"
        >
          <img
            v-if="item.type === 'image'"
            :src="item.src"
            :alt="item.alt"
            class="w-[200px] h-[300px] object-cover"
          />
          <video
            v-if="item.type === 'video'"
            :src="item.src"
            muted
            class="w-[200px] h-[300px] object-cover cursor-pointer"
            @click="togglePlay($event)"
            controlslist="nodownload"
            disablePictureInPicture
          ></video>
        </div>
      </div>
    </div>

    <!-- Dates Section -->
    <div v-if="projekt.dates" class="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 class="text-2xl tracking-widest mb-4">Workshop Dates</h2>
      <ul class="list-none space-y-2">
        <li v-for="(date, index) in projekt.dates" :key="index" class="flex">
          <span class="pr-2">{{ date.time }}: </span>
          <span>{{ date.event }}</span>
        </li>
      </ul>
    </div>
    <!-- Program Section -->
    <div
      v-if="projekt.program && projekt.program.length"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-2xl tracking-widest mb-4">Program</h2>
      <p class="mb-4">{{ projekt.info }}</p>
      <table class="table-auto w-full text-left">
        <tbody>
          <tr
            v-for="(date, index) in projekt.program"
            :key="index"
            class="border-b"
          >
            <td class="pr-4">{{ date.time }}</td>
            <td>{{ date.event }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Submissions Section -->
    <div
      v-if="projekt.submissions && projekt.submissions.text"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-2xl tracking-widest mb-4">Submissions</h2>
      <!-- Display the text -->
      <p class="mb-4 leading-relaxed">{{ projekt.submissions.text }}</p>
      <!-- Display the bullets -->
      <ul class="list-disc px-4 list-outside text-lg">
        <li
          v-for="(bullet, index) in projekt.submissions.bullets"
          :key="index"
          v-html="bullet"
          class="py-2"
        ></li>
      </ul>
    </div>

    <!-- Workshop Focus Section -->
    <div
      v-if="projekt.workshopGoals"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-2xl tracking-widest mb-4">Workshop Goals</h2>
      <p class="mb-4 leading-relaxed">{{ projekt.workshopGoals.text }}</p>
      <ul class="pl-4 list-disc list-outside text-lg">
        <li
          v-for="(bullet, index) in projekt.workshopGoals.bullets"
          :key="index"
          class="py-2"
        >
          {{ bullet.title }}
        </li>
      </ul>
    </div>

    <!-- Topics of Interest -->
    <div
      v-if="projekt.topicsOfInterest"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-2xl tracking-widest mb-4">Topics of Interest</h2>
      <p class="mb-4 leading-relaxed">{{ projekt.topicsOfInterest.text }}</p>
      <ul class="pl-4 list-disc list-outside text-lg">
        <li
          v-for="(bullet, index) in projekt.topicsOfInterest.bullets"
          :key="index"
          class="py-2"
        >
          <b>{{ bullet.title }}: </b>{{ bullet.content }}
        </li>
      </ul>
    </div>

    <!-- Organizers Section -->
    <div
      v-if="projekt.organizers && projekt.organizers.length"
      class="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h2 class="text-2xl tracking-widest mb-4">Organizers</h2>
      <ul class="list-none space-y-4">
        <li
          v-for="(organizer, index) in projekt.organizers"
          :key="index"
          class="py-2"
        >
          <p class="text-justify">
            <b>{{ organizer.name }}</b> {{ organizer.description }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { research } from "@/data/researchData.json";
import { slugify } from "@/utils/slugify";

export default {
  name: "ProjektDetailPage",
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
h2 {
  color: #740712;
}
</style>
