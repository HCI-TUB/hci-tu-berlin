<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 space-y-8">
    <div class="md:text-4xl sm:text-3xl tracking-wide text-left my-8">
      Welcome to the Human-Computer Interaction Lab
    </div>
    <!-- Slideshow or Image Section -->
    <img
      class="pt-2 pb-6 relative w-full mx-auto"
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
     <!-- Thesis Featured Project Preview -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50">
      <div>
        <h3 class="text-xl font-semibold mb-2">Bachelor & Master Theses</h3>
        <p class="text-justify mb-4">
          We regularly supervise bachelor's and master's theses on topics such as usable security, cross-reality interaction, and inclusive design. Find out more about the process and potential topics.
        </p>
        <router-link
          :to="{ name: 'ThesisPage' }"
          class="text-custom-red hover:underline"
          >Learn more about theses →</router-link
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
      featuredProject: research.find((project) => project.id === "1"),
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
