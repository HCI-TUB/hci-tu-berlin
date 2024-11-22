<template>
    <div class="w-full">
      <h1 class="text-2xl text-left my-8">Welcome to the Human-Computer Interaction Lab</h1>
      <p class="text-justify w-full text-lg">
 
        In the Human-Computer Interaction (HCI) Lab, led by Prof Dr Ceenu George, we explore the dynamic world of immersive virtual reality (VR) systems with the aim of improving user interaction with these technologies. Our research focusses on:
Social acceptability: investigating the impact of head-mounted displays (HMDs) on bystanders and developing socially acceptable methods of interaction.
Usable security and privacy: Developing secure and user-friendly authentication mechanisms for VR environments.
Mixed reality: Enabling seamless transitions between virtual and physical spaces to improve user perception and safety.
Our goal is to make VR technologies more accessible, secure and user-friendly for everyday applications.
Contact us if you would like to join us or exchange ideas!</p>
<div class="py-6">
<hr>
</div>
<KontaktCard
      name="Prof. Dr. Ceenu George"
      email="ceenu.george@tu-berlin.de"
      einrichtung="Mensch-Computer-Interaktion"
      sekretariat="EN-20"
      gebaeude="E-N"
      raum="E-N 358"
    />
  </div>
</template>
<script>
import KontaktCard from '@/components/KontaktCard.vue';

export default {
  name: 'AboutPage',
  components: {
    KontaktCard
  }
};
</script>
