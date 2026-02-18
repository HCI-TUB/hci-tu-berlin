import { ref } from "vue";
import GalleryService from "@/services/galleryService";

export function useGalleryData(slug) {
  const galleryData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getAllGalleryData = async () => {
    if (!slug) {
      error.value = "No ID provided";
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      const response = await GalleryService.getGalleryData(slug);

      const flatItems = response || [];

      const grouped = {};
      flatItems.forEach((item) => {
        if (!grouped[item.title]) {
          grouped[item.title] = {
            title: item.title,
            items: [],
          };
        }
        grouped[item.title].items.push({
          id: item.id,
          src: item.src,
          caption: item.caption,
          type: item.type,
          orientation: item.orientation,
        });
      });

      console.log("Grouped gallery data:", grouped);
      galleryData.value = Object.values(grouped);
    } catch (err) {
      error.value = err.message || "Failed to fetch Gallery data.";
      console.error("Error fetching Gallery data:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    galleryData,
    loading,
    error,
    refetch: getAllGalleryData,
  };
}
