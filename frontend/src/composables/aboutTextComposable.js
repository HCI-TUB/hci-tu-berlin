import { ref, computed, onMounted } from "vue";
import { currentLang } from "@/i18n/lang";

const texts = ref([]);
const loading = ref(false);
const error = ref(null);

async function loadTexts() {
  loading.value = true;
  try {
    const mod = await import("@/data/static_texts_about.json");
    texts.value = mod.default || mod;
  } catch (e) {
    error.value = e;
    texts.value = [];
  } finally {
    loading.value = false;
  }
}

const current = computed(() => {
  if (!texts.value || !texts.value.length) return {};
  const found = texts.value.find((t) => t.language === currentLang.value);
  return found || texts.value[0] || {};
});

export function useAboutTexts() {
  onMounted(() => {
    if (!texts.value.length) loadTexts();
  });

  return {
    texts,
    loading,
    error,
    current,
    loadTexts,
  };
}
