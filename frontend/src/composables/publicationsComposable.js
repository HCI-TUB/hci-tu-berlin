import { ref } from "vue";
import PublicationsService from "@/services/publicationsService";

export function usePublications() {
  const publications = ref(null);
  const teamMembers = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchAllPublications = async () => {
    loading.value = true;
    error.value = null;

    const removeTitles = (name) => {
      return name
        .replace(
          /\b(prof\.?|dr\.?|professor|doctor|mr\.?|mrs\.?|ms\.?|phd\.?)\s*/gi,
          ""
        )
        .trim();
    };

    try {
      const publicationsData =
        await PublicationsService.getAllPublicationsData();
      publications.value = publicationsData[0];

      console.log(
        "Publications data fetched:",
        publicationsData[1].map((member) => member.name)
      );

      const membersName = publicationsData[1].map((member) =>
        removeTitles(member.name)
      );
      teamMembers.value = membersName;
      console.log("Fetched publications:", publicationsData[0]);
    } catch (err) {
      error.value = err.message || "Failed to fetch publications";
      console.error("Error fetching publications:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    publications,
    teamMembers,
    loading,
    error,
    refetch: fetchAllPublications,
  };
}
