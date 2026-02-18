import { ref } from "vue";
import ResearchService from "@/services/researchService";

export function useResearchData(id) {
  const researchData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getResearchData = async () => {
    try {
      if (!id) {
        console.log("Fetching research data for all projects");
        loading.value = true;
        error.value = null;
        researchData.value = await ResearchService.getResearchData(null);
        return;
      }
      loading.value = true;
      error.value = null;
      researchData.value = await ResearchService.getResearchDataById(id);
    } catch (err) {
      error.value = err.message || "Failed to fetch research data.";
      console.error("Error fetching research data:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    researchData,
    loading,
    error,
    refetch: getResearchData,
  };
}
