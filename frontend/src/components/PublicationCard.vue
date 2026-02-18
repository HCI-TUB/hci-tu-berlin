<template>
  <div class="py-2 w-full">
    <div class="text-gray-800 mb-4 text-left">
      <p>
        {{ author }} ({{ publicationDate }}). <strong>{{ title }}</strong
        >. <em>{{ publisher }}</em
        >.
      </p>
    </div>
    <div class="flex justify-start space-x-4">
      <!-- Link icon -->
      <span
        v-if="
          paperLink &&
          paperLink !== '#' &&
          paperLink !== null &&
          paperLink !== ''
        "
      >
        <a :href="paperLink" target="_blank">
          <i class="fas fa-link"></i>
        </a>
      </span>
      <span v-else class="relative group">
        <i class="fas fa-link text-gray-400"></i>
        <span
          class="absolute left-6 top-0 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap"
        >
          No link available
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicationCard",
  props: {
    author: { type: String, required: true },
    title: { type: String, required: true },
    doi: { type: String, required: false, default: null },
    publicationDate: { type: String, required: true },
    publisher: { type: String, required: true },
    paperLink: { type: String, required: false, default: "#" },
    pdfLink: { type: String, required: false, default: "#" },
  },
};
</script>
