import { ref } from "vue";

const savedLang = localStorage.getItem("lang");

export const currentLang = ref(savedLang || "en");
