<template>
  <div class="w-full">
    <h1 class="text-3xl text-left my-8">
      Welcome to the Human-Computer Interaction Lab
    </h1>
    <img class="pt-2 pb-6" src="/people/hci-team.jpeg" alt="" />
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
      <router-link to="/contact" class="text-custom-red"
        >Contact us</router-link
      >
      if you would like to join us or exchange ideas!
    </p>
    <hr class="my-4" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <img
        class="w-full max-h-32rem"
        src="/assets/hmd-photo.png"
        alt="HMD Photo"
      />
      <div class="flex flex-col">
        <h2 class="text-2xl text-justify my-2">Bachelor and Master Theses</h2>
        <p class="text-justify text-lg">
          We regularly announce an info date for open bachelor theses on this
          page, which all interested parties can attend. As long as there is no
          date, we have no availability for bachelor theses. For master theses:
          Write an email to
          <a
            class="text-custom-red hover:text-custom-red-dark"
            href="mailto:admin@hci.tu-berlin.de"
            >admin@hci.tu-berlin.de</a
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style>
.text-custom-red {
  color: #c50e1f;
}
.hover\:text-custom-red:hover {
  color: #c50e1f;
}
</style>
