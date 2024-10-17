<script setup lang="ts">
import { onMounted } from "vue";
import { useCharacters } from "../composables/useCharacter";
import { useRoute } from "vue-router";
import characterImage from "../assets/tier.jpg";

const route = useRoute();
const { fetchCharacter, character, isLoadingCharacter } = useCharacters();

onMounted(async () => {
  const id: string = String(route.params.id);
  await fetchCharacter(id);
});
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <template v-if="isLoadingCharacter">
      <p>Loading...</p>
    </template>
    <template v-else-if="character">
      <section class="bg-slate-800 shadow-xl rounded-md flex flex-col items-center w-full max-w-4xl">
        <div class="flex justify-between w-full gap-4">
          <div class="flex-1 relative">
            <img :src="characterImage" alt="Character Image" class="w-full h-full object-cover shadow-md" />
          </div>

          <div class="flex-1 flex flex-col justify-center items-center">
            <p class="text-lg text-gray-300">Level: {{ character.level }}</p>
            <h4 class="text-9xl font-bold text-white pb-6">{{ character.name }}</h4>
            <div class="flex flex-col gap-4 items-center">
              <p class="text-lg text-gray-300">Race: {{ character.race }}</p>
              <p class="text-lg text-gray-300">Class: {{ character.className }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-else>
      <p>Character not found.</p>
    </template>
  </div>
</template>
