<template>
  <div class="w-full mt-6">
    <h2 class="text-xl mb-4 text-left">Kontakt</h2>
    <div class="bg-white shadow-md rounded-lg p-6 w-full text-left">
      <h3 class="text-xl mb-2 ">{{ name }}</h3>
      <a :href="'mailto:' + email" class="text-gray-700 hover:text-black">{{ email }}</a>
      <div class="text-gray-700 mt-4 text-left">
        <p><strong>Einrichtung:</strong> {{ einrichtung }}</p>
        <p><strong>Sekretariat:</strong> {{ sekretariat }}</p>
        <p><strong>Gebäude:</strong> {{ gebaeude }}</p>
        <p><strong>Raum:</strong> {{ raum }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KontaktCard',
  props: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    einrichtung: {
      type: String,
      required: true
    },
    sekretariat: {
      type: String,
      required: true
    },
    gebaeude: {
      type: String,
      required: true
    },
    raum: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>