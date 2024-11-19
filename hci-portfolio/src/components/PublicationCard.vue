<template>
    <div class="py-6 w-full">
      <div class="text-gray-800 mb-4 text-left">
        <p>{{ author }} ({{ publicationDate }}). <strong>{{ title }}</strong>. <em>{{ publisher }}</em>.</p>
      </div>
      <div class="flex justify-start space-x-4">
        <a :href="paperLink" target="_blank" class="text-blue-500 hover:text-blue-700">
          <i class="fas fa-link"></i>
        </a>
        <a :href="pdfLink" target="_blank" class="text-red-500 hover:text-red-700">
          <i class="fas fa-file-pdf"></i> 
        </a>
        <a :href="bibtexLink" target="_blank" class="text-blue-500 hover:text-blue-700">
          <i class="fas fa-file-code"></i> 
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
  