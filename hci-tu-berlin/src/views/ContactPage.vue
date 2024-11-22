<template>
    <div>
        <h1 class="text-3xl text-left mb-8 tracking-widest">Contact</h1>

        <div>
    <h2 class="text-2xl text-left tracking-widest my-4">Contact Information</h2>
    <ul class="list-none text-left">
        <li>Özlem Ocak</li>
        <li>ocak@tu-berlin.de</li>
        <li>EN 12, Room E-N 446</li>
    </ul>
</div>

<div>
    <h2 class="text-2xl text-left tracking-widest mt-6 mb-4">Mailing Address</h2>
    <ul class="list-none text-left">
        <li>Einsteinufer 17, 10587 Berlin</li>
    </ul>
</div>
        <div class="mt-6">
            <StreetMap :latitude="52.51489" :longitude="13.32617" />
        </div>
</div>
</template>

<script>
import StreetMap from "@/components/StreetMap.vue";

export default {
  components: { StreetMap },
};
</script>