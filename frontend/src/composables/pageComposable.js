import { ref } from "vue";
import PageService from "@/services/pageService";

export function usePageData(slug) {
  const pageData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getAllPageData = async () => {
    if (!slug) {
      error.value = "No ID provided";
      return;
    }
    console.log("Fetching page data for slug:", slug);
    loading.value = true;
    error.value = null;
    try {
      pageData.value = await PageService.getPageData(slug);
    } catch (err) {
      error.value = err.message || "Failed to fetch pagePage data.";
      console.error("Error fetching pagePage data:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    pageData,
    loading,
    error,
    refetch: getAllPageData,
  };
}
