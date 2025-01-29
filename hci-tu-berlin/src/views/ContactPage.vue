<template>
  <div>
    <h1 class="text-3xl text-left mb-8 tracking-widest">Contact</h1>

    <div>
      <h2 class="text-2xl text-left tracking-widest my-4">
        Contact Information
      </h2>
      <ul class="list-none text-left">
        <li>Özlem Ocak</li>
        <li>ocak@tu-berlin.de</li>
        <li>EN 12, Room E-N 446</li>
      </ul>
    </div>

    <div>
      <h2 class="text-2xl text-left tracking-widest mt-6 mb-4">
        Mailing Address
      </h2>
      <ul class="list-none text-left">
        <li>Einsteinufer 17, 10587 Berlin</li>
      </ul>
    </div>
    <!-- Do something like this, except make the consent overlay prettier 
     (ideally  the same dimensions as the leaflet widget?) 
     and (optionally) remember user choice in a cookie (or localstorage if you prefer)-->
    <div class="mt-6" v-if="leafletConsent">
      <StreetMap :latitude="52.515031" :longitude="13.32682" />
    </div>
    <div v-else class="mt-6" style="height: 400px">
      <img src="/assets/map_placeholder.png" style="height: 100%" />
      <button
        @click="leafletConsent = true"
        class="text-xl mr-4"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
        "
      >
        Klicken um Daten von OpenStreetMap zu laden
      </button>
    </div>
  </div>
</template>

<script>
import StreetMap from "@/components/StreetMap.vue";

export default {
  data() {
    return {
      leafletConsent: false,
    };
  },
  components: { StreetMap },
};
</script>
