<template>
  <div>
    <h1
      class="text-3xl text-left mb-8 tracking-widest sm:justify-center sm:items-center"
    >
      People
    </h1>
    <div
      class="flex justify-center items-center md:justify-start md:items-start"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <PersonCard
          v-for="member in teamMembers"
          :key="member.id"
          :name="member.name"
          :image="member.image"
          :email="member.email"
          :description="member.role"
          :id="member.id"
        ></PersonCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import PersonCard from "@/components/PersonCard.vue";
import { useTeam } from "@/composables/teamComposable";

const { teamMembers, refetch } = useTeam();

onMounted(() => {
  console.log("Fetching team members...");
  refetch();
});
</script>
