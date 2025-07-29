<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Contact</h1>

    <div>
      <ul class="list-none text-left">
        <li>
          <h4 class="text-2xl text-left tracking-widest mb-2">Secretary</h4>
        </li>
        <li>Özlem Ocak</li>
        <li>
          <a
            class="text-custom-red hover:text-custom-red-dark"
            href="mailto:ocak@tu-berlin.de"
            >ocak@tu-berlin.de</a
          >
        </li>
      </ul>
    </div>

    <div class="mt-6">
      <ul class="list-none text-left">
        <li>
          <h4 class="text-2xl text-left tracking-widest mb-2">Applications</h4>
        </li>
        <li>
          Please send inquiries and applications to
          <a
            class="text-custom-red hover:text-custom-red-dark"
            href="mailto:admin@hci.tu-berlin.de"
            >admin@hci.tu-berlin.de</a
          >.
        </li>
        <li class="mt-2">
          For a virtual consultation hour with Prof. George, sign up
          <a
            class="text-custom-red hover:text-custom-red-dark"
            href="https://isis.tu-berlin.de/mod/organizer/view.php?id=2008365"
            target="_blank"
            rel="noopener noreferrer"
            >here</a
          >.
        </li>
      </ul>
    </div>

    <div class="mt-6">
      <h4 class="text-2xl text-left tracking-widest mb-2">Mailing Address</h4>
      <ul class="list-none text-left">
        <li>Einsteinufer 17, 10587 Berlin</li>
      </ul>
    </div>
    <div class="mt-6">
      <StreetMap :latitude="52.515031" :longitude="13.32682" />
    </div>
  </div>

  <div class="flex items-center">
    <img class="w-8 mr-2" src="/assets/hci-logo.jpg" alt="hci logo" />
    <p class="text-justify text-lg my-2">
      <a
        class="hover:text-custom-red"
        href="https://www.instagram.com/hci_tuberlin/"
        target="_blank"
        >Follow us on Instagram</a
      >
    </p>
  </div>
</template>

<script>
import StreetMap from "@/components/StreetMap.vue";

export default {
  components: { StreetMap },
};
</script>
