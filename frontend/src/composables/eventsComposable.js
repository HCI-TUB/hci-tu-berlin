import { ref } from "vue";
import EventsService from "@/services/eventsService";

export function useEventsData(id) {
  const eventsData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getEventsData = async () => {
    try {
      if (!id) {
        console.log("Fetching events data for all projects");
        loading.value = true;
        error.value = null;
        eventsData.value = await EventsService.getEventsData(null);
        return;
      }
      loading.value = true;
      error.value = null;
      eventsData.value = await EventsService.getEventsDataById(id);
    } catch (err) {
      error.value = err.message || "Failed to fetch events data.";
      console.error("Error fetching events data:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    eventsData,
    loading,
    error,
    refetch: getEventsData,
  };
}
