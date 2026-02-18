import { ref } from "vue";
import TeamService from "@/services/teamService";

export function useTeam() {
  const teamMembers = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchAllTeamMembers = async () => {
    loading.value = true;
    error.value = null;

    try {
      teamMembers.value = await TeamService.getTeamMembers();
    } catch (err) {
      error.value = err.message || "Failed to fetch team members";
      console.error("Error fetching team members:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    teamMembers,
    loading,
    error,
    refetch: fetchAllTeamMembers,
  };
}

export function useTeamMember(id) {
  const memberData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchMember = async () => {
    if (!id) {
      error.value = "No ID provided";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      memberData.value = await TeamService.getTeamMemberById(id);
    } catch (err) {
      error.value = err.message || "Failed to fetch team member";
      console.error("Error fetching team member:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    memberData,
    loading,
    error,
    refetch: fetchMember,
  };
}
