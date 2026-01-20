<template>
  <div v-if="loading">Loading...</div>
  <div
    v-else-if="memberData && memberData.memberDetail"
    class="text-left w-full p-4"
  >
    <button @click="goBack" class="text-xl mr-4">←</button>
    <div>
      <h1 class="text-3xl text-left mb-8 tracking-widest">
        {{ memberData?.memberDetail[0].name }}
      </h1>
      <div class="flex flex-col items-start mb-4">
        <div class="relative w-56 aspect-[3/4] sm:w-42 md:w-48 cursor-pointer">
          <img
            :src="memberData.memberDetail[0].image"
            alt="Person Photo"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex-1 mt-4">
          <p v-if="memberData.memberDetail[0].email">
            <strong>Email: </strong>
            <a
              :href="'mailto:' + memberData.memberDetail[0].email"
              class="text- email-link hover:text-custom-red"
              >{{ memberData.memberDetail[0].email }}</a
            >
          </p>
          <p v-if="memberData.memberDetail[0].room">
            <strong>Room:</strong> {{ memberData.memberDetail[0].room }}
          </p>
          <p
            v-if="memberData.memberDetail[0].role"
            class="mt-4 mb-8 text-left md:text-justify"
          >
            {{ memberData.memberDetail[0].role }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-for="(section, index) in memberData?.content"
      :key="index"
      class="mb-8"
    >
      <h2 class="text-2xl tracking-widest my-4">{{ section.title }}</h2>

      <div
        v-for="(paragraph, index) in section.contents"
        :key="index"
        class="paragraph"
      >
        <p class="pb-4">{{ paragraph }}</p>
      </div>
    </div>
    <div v-if="memberData?.education?.length">
      <h2 class="text-2xl tracking-widest my-4">Education</h2>
      <div
        v-for="(section, index) in memberData?.education"
        :key="index"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 transition mb-6"
      >
        <ul>
          <li>
            <div class="flex">
              <span class="flex-1 md:justify-start">
                <h3 class="text-xl font-semibold">{{ section.institute }}</h3>
                <p class="mt-2">{{ section.degree }}</p>
              </span>
              <span class="text-sm md:justify-end pt-2">
                <p>
                  {{ formatDate(section.start_date) }} -
                  {{ formatDate(section.end_date) }}
                </p>
                <p>{{ section.place }}</p>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="memberData?.experience?.length">
      <h2 class="text-2xl tracking-widest my-4">Experiences</h2>
      <div
        v-for="(section, index) in memberData?.experience"
        :key="index"
        class=""
      >
        <ul>
          <li>
            <div class="flex">
              <span class="flex-1 md:justify-start">
                <h3 class="text-l font-semibold">{{ section.company }}</h3>
                <p class="mt-1 mb-4">{{ section.position }}</p>
              </span>
              <span class="text-sm md:justify-end pt-2">
                <p>
                  {{ formatDate(section.start_date) }} -
                  {{
                    section.end_date ? formatDate(section.end_date) : "Present"
                  }}
                </p>
                <p>{{ section.place }}</p>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTeamMember } from "@/composables/teamComposable";
import { formatDate } from "@/utils/dateFormatter";

const route = useRoute();
const router = useRouter();

// Get ID from route params
const memberId = computed(() => route.params.id);

const { memberData, loading, refetch } = useTeamMember(memberId.value);

onMounted(() => {
  console.log("Fetching team members...");
  refetch();
});

const goBack = () => {
  router.push({ name: "PersonenPage" });
};
</script>
