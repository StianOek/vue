<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacters } from "../composables/useCharacter";
import { Characters } from "../types";

const { characterList, fetchCharacters } = useCharacters();

// Lageer en ny ref for filtrerte karakterer slik at jeg kan filtrere uten å endre originalen
const filteredCharacters = ref<Characters>([]);
const selectedRace = ref("");
onMounted(async () => {
  await fetchCharacters();
  filteredCharacters.value = characterList.value; // Her setter jeg kopi listen "filteredCharacters" med orginal data fra "characterList"
});

const handleSearch = (event: Event) => {
  const search = (event.target as HTMLInputElement).value;

  // Her filtrerer jeg basert på søk i input uten å endre orginalen "characterList"
  filteredCharacters.value = characterList.value.filter((character) => character.name.toLowerCase().includes(search.toLowerCase()));
};

const handleRaceChange = (event: Event) => {
  selectedRace.value = (event.target as HTMLSelectElement).value;
  filteredCharacters.value = characterList.value.filter((character) => character.race.toLowerCase().includes(selectedRace.value.toLowerCase()));
};
</script>

<template>
  <h1 class="text-4xl font-bold text-slate-700 my-4">Characters</h1>
  <section>
    <input @input="handleSearch" class="border border-slate-200 p-4 w-full" type="search" placeholder="Search name" />
  </section>

  <section class="my-4">
    <select @click="handleRaceChange" class="border border-slate-200 py-2 mb-4 cursor-pointer">
      <option value="">All Races</option>
      <option v-for="race in characterList" :key="race.id" :value="race.race">{{ race.race }}</option>
    </select>
  </section>

  <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
    <div
      v-for="character in filteredCharacters"
      :key="character.id"
      class="p-4 bg-white shadow-lg rounded-lg border border-gray-200 flex items-center justify-around cursor-pointer hover:bg-slate-50"
    >
      <p class="text-gray-600"><strong>Name:</strong> {{ character.name }}</p>
      <p class="text-gray-600"><strong>Race:</strong> {{ character.race }}</p>
      <p class="text-gray-600"><strong>Level:</strong> {{ character.level }}</p>
    </div>
  </div>
</template>

<style scoped>
/* You can add custom styles here if needed */
</style>
