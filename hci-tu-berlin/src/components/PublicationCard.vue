<template>
    <div class="py-2 w-full">
      <div class="text-gray-800 mb-4 text-left">
        <p>{{ author }} ({{ publicationDate }}). <strong>{{ title }}</strong>. <em>{{ publisher }}</em>.</p>
      </div>
      <div class="flex justify-start space-x-4">
        <a :href="paperLink" target="_blank">
          <i class="fas fa-link"></i>
        </a>
        <a :href="pdfLink" target="_blank" :style="{ color: '#C50E1F' }">
          <i class="fas fa-file-pdf"></i> 
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PublicationCard',
    props: {
      author: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      publicationDate: {
        type: String,
        required: true
      },
      publisher: {
        type: String,
        required: true
      },
      paperLink: {
        type: String,
        required: false,
        default: '#'
      },
      pdfLink: {
        type: String,
        required: false,
        default: '#'
      },
      bibtexLink: {
        type: String,
        required: false,
        default: '#'
      }
    }
  };
  </script>
  