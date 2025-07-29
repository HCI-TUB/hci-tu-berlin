<template>
  <div class="w-full px-0 lg:px-8 space-y-8">
    <div class="md:text-4xl sm:text-3xl text-left tracking-wide my-8">
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
      At our lab, we explore how augmented and virtual reality systems can
      support ongoing human learning through peripheral interaction in hybrid
      environments—spaces where physical, 2D, and 3D digital worlds blend.
      Grounded in human-computer interaction, our research investigates how
      people engage in multitasking, multimodal experiences across devices and
      dimensions. We design and prototype AR and VR systems that align with the
      way humans naturally perceive, move, and learn—supporting subtle,
      continuous learning that happens not just at the center of attention, but
      at its edges. A key focus of our work is enabling users to stay aware of
      what AI systems are doing—even when those systems take over tasks—so that
      users are always ready to understand, interpret, and step in when needed.
      We believe peripheral, embodied learning is essential to building human-AI
      partnerships that are transparent, trustworthy, and adaptable.
    </p>
    <div class="text-left w-full text-lg">
      <strong>Topics include:</strong>
      <ol class="list-decimal ml-6">
        <li>Peripheral Feedback for System Transparency in AR/VR Systems</li>
        <li>Human-in-the-Loop Learning in Hybrid Immersive Environments</li>
        <li>Seamless Transitions Between Physical and Virtual Realities</li>
        <li>
          Cross-Device Interaction for Continuous Learning in Hybrid Spaces
        </li>
        <li>Trust Calibration Through Peripheral Cues in VR</li>
        <li>Usable Security and Privacy: Secondary Interactions</li>
        <li>Democratising AR/VR Development</li>
        <li>Accessibility for AR/VR</li>
      </ol>
    </div>
    <p class="text-left text-lg">
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
    <div class="md:text-2xl sm:text-xl tracking-wide text-left my-8 font-bold">
      Featured Projects
    </div>

    <!-- Featured Project Section -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-red-50">
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ featuredProject.title }}</h3>
        <p class="md:text-justify text-left mb-4">
          {{ featuredProject.text }}
        </p>
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
        <p class="md:text-justify text-left mb-4">
          We regularly supervise bachelor's and master's theses on topics such
          as usable security, cross-reality interaction, and inclusive design.
          Find out more about the process and potential topics.
        </p>
        <router-link
          :to="{ name: 'ThesisPage' }"
          class="text-custom-red hover:underline"
          >Learn more about theses →</router-link
        >
      </div>
    </div>
    <!-- Photo Slider -->
    <div class="md:text-2xl sm:text-xl tracking-wide text-left my-8 font-bold">
      Impressions from our Lab
    </div>
    <PhotoSlider :photos="photos"></PhotoSlider>
  </div>
</template>

<script>
import { slugify } from "@/utils/slugify";
import { research } from "@/data/researchData.json";
import PhotoSlider from "@/components/PhotoSlider.vue";
import photos from "@/data/photoslider.json";
export default {
  name: "AboutPage",
  components: {
    PhotoSlider,
  },
  data() {
    return {
      featuredProject: research.find((project) => project.id === "1"),
      photos,
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
