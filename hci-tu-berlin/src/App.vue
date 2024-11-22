<template>

       
<div class="font-sans flex flex-col px-8 items-center md:items-start md:flex-row md:gap-12 tracking-wide text-neutral-800">

    
<div class="flex flex-col my-8 md:my-16 gap-8 md:w-56 md:ml-12">
  <div class="flex gap-2 flex-col text-left mb-6">
    <img class="w-8 md:w-20" src="./assets/TU-Berlin-Logo.png" alt="tu-logo">
          <router-link to="/" class="tracking-widest text-2xl">Human Computer Interaction</router-link>
          <div>at TU Berlin</div>
          
        </div>
  <ul class="flex gap-4 md:flex-col items-start sm:gap-4 text-left text-xl">
    <router-link to="/" class="hover:text-custom-red">About</router-link>
       <li> <router-link to="/teaching" class="hover:text-custom-red">Teaching</router-link></li>
       <li>  <router-link to="/projects" class="hover:text-custom-red">Research</router-link></li>
       <li> <router-link to="/people" class="hover:text-custom-red">People</router-link></li>
       <li> <router-link to="/publications" class="hover:text-custom-red">Publications</router-link></li>
       <li><router-link to="/contact" class="hover:text-custom-red">Contact</router-link></li>
        </ul>
</div>


<!-- Main Content, der sich abhängig von der Route ändert -->
<main class="w-full">
  <div class="flex flex-col gap-8 w-full sm:w-[40rem] md:w-[50rem] md:my-12 mb-12">
  <router-view />
</div>
</main>

</div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .hover\:text-custom-red:hover {
  color: #C50E1F;
}
  
  </style>