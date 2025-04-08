<template>
  <div
    class="font-sans flex flex-col px-4 md:px-8 items-center md:items-start md:flex-row md:gap-12 tracking-wide text-neutral-800"
  >
    <div
      class="flex flex-col my-8 md:my-16 gap-4 md:gap-8 md:w-56 md:ml-12 items-center md:items-start"
    >
      <div class="flex gap-2 flex-col text-center md:text-left mb-6">
        <img
          class="w-16 md:w-20 mx-auto md:mx-0"
          src="./assets/TU-Berlin-Logo.png"
          alt="tu-logo"
        />
        <router-link to="/" class="tracking-widest text-xl md:text-2xl"
          >Human Computer Interaction</router-link
        >
        <div>at TU Berlin</div>
      </div>
      <ul
        class="flex flex-col gap-4 items-center md:items-start text-center md:text-left text-xl md:text-2xl"
      >
        <li>
          <router-link to="/" class="hover:text-custom-red">About</router-link>
        </li>
        <li>
          <router-link to="/projects" class="hover:text-custom-red"
            >Research</router-link
          >
        </li>
        <li>
          <router-link to="/people" class="hover:text-custom-red"
            >People</router-link
          >
        </li>
        <li>
          <router-link to="/publications" class="hover:text-custom-red"
            >Publications</router-link
          >
        </li>
        <li>
          <router-link to="/contact" class="hover:text-custom-red"
            >Contact</router-link
          >
        </li>
      </ul>
    </div>

    <main class="w-full px-4 md:px-0">
      <div
        class="flex flex-col gap-8 w-full sm:w-[50rem] md:w-[55rem] lg:w-[60rem] md:my-12 mb-12"
      >
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
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
  color: #c50e1f;
}
</style>
