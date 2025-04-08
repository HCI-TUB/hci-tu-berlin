<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 space-y-8">
    <div class="md:text-4xl sm:text-3xl tracking-wide text-center my-8">
      Welcome to the Human-Computer Interaction Lab
    </div>
    <!-- Slideshow or Image Section -->
    <img
      class="pt-2 pb-6 relative w-full sm:w-[85%] mx-auto"
      src="/people/hci-team.jpeg"
      alt="HCI Team"
    />
    <!-- Description Section -->
    <p class="text-justify w-full text-lg">
      In the Human-Computer Interaction (HCI) Lab, led by Prof Dr Ceenu George,
      we explore the dynamic world of immersive virtual reality (VR) systems
      with the aim of improving user interaction with these technologies. Our
      research focusses on: Social acceptability: investigating the impact of
      head-mounted displays (HMDs) on bystanders and developing socially
      acceptable methods of interaction. Usable security and privacy: Developing
      secure and user-friendly authentication mechanisms for VR environments.
      Mixed reality: Enabling seamless transitions between virtual and physical
      spaces to improve user perception and safety. Our goal is to make VR
      technologies more accessible, secure and user-friendly for everyday
      applications.
      <br /><br />
      <router-link to="/contact" class="hover:text-custom-red"
        >Contact us</router-link
      >
      if you would like to join us or exchange ideas!
    </p>
    <hr class="mt-4" />
    <!-- Instagram Section -->
    <div
      class="flex flex-col items-center sm:flex-row sm:items-start mt-4 space-y-4 sm:space-y-0 sm:space-x-4"
    >
      <img class="w-16 sm:w-8" src="/assets/hci-logo.jpg" alt="HCI Logo" />
      <p class="text-justify text-lg">
        <a
          class="hover:text-custom-red"
          href="https://www.instagram.com/hci_tuberlin/"
          target="_blank"
          >Follow us on Instagram</a
        >
      </p>
    </div>
    <hr class="my-4" />
    <!-- Theses Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        class="relative w-full sm:w-[70%] max-h-32rem mx-auto"
        src="/assets/hmd-photo.png"
        alt="HMD Photo"
      />
      <div class="flex flex-col space-y-4">
        <h2 class="text-2xl text-justify my-2">Bachelor and Master Theses</h2>
        <p class="text-justify text-lg">
          We regularly announce an info date for open bachelor theses on this
          page, which all interested parties can attend. As long as there is no
          date, we have no availability for bachelor theses. For master theses:
          Write an email to
          <a class="hover:text-custom-red" href="mailto:admin@hci.tu-berlin.de"
            >admin@hci.tu-berlin.de</a
          >.
        </p>
      </div>
    </div>
    <!-- Featured Project Section -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50">
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ featuredProject.title }}</h3>
        <p class="text-justify mb-4">{{ featuredProject.text }}</p>
        <router-link
          :to="{
            name: 'ProjektDetailPage',
            params: { title: slugify(featuredProject.title) },
          }"
          class="text-custom-red hover:underline"
          >Learn more about this project →</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { slugify } from "@/utils/slugify";
import { research } from "@/data/researchData.json";
export default {
  name: "AboutPage",
  data() {
    return {
      featuredProject: research.find((project) => project.id === "1"), // Replace "1" with the ID of the desired project
    };
  },
  methods: {
    slugify,
  },
};
</script>

<style>
.hover\:text-custom-red:hover {
  color: #c50e1f;
}
</style>
