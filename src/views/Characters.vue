<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacters } from "../composables/useCharacter";
import { Character, Characters } from "../types";

const { characterList, fetchCharacters, deleteCharacter, updateCharacter, character } = useCharacters();

// Lageer en ny ref for filtrerte karakterer slik at jeg kan filtrere uten å endre originalen
const filteredCharacters = ref<Characters>([]);
const selectedRace = ref("");
const races = ref(["Half-Elf", "Human", "Dwarf", "Tiefling", "Elf", "Half-Orc", "Halfling"]);

const isModalOpen = ref(false);
const characterToUpdate = ref<Character>({
  id: "",
  name: "",
  race: "",
  level: 1,
  createdAt: "",
  className: "",
});

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

  if (selectedRace.value === "All races") {
    // Hvis All races er valgt, vis alle karakterene
    filteredCharacters.value = characterList.value;
  } else {
    // Filtrerer basert på rase uten å endre orginalen "characterList"
    filteredCharacters.value = characterList.value.filter((character) => character.race.toLowerCase() === selectedRace.value.toLowerCase());
  }
};

const handleDelete = async (characterId: string) => {
  await deleteCharacter(characterId);
  await fetchCharacters();
  filteredCharacters.value = characterList.value; // oppdaterer listen med orginalen
};

const openUpdateModal = (character: Character) => {
  characterToUpdate.value = { ...character };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleUpdateCharacter = async () => {
  await updateCharacter(characterToUpdate.value.id, characterToUpdate.value);
  await fetchCharacters();
  filteredCharacters.value = characterList.value;
  closeModal();
};
</script>

<template>
  <section class="my-4 rounded flex flex-col gap-4">
    <h1 class="text-4xl font-bold text-white">Your character list</h1>
  </section>
  <section>
    <input @input="handleSearch" class="border border-slate-200 p-4 w-full" type="search" placeholder="Search name" />
  </section>

  <section class="my-4">
    <select @change="handleRaceChange" class="border border-slate-200 mb-4 cursor-pointer">
      <option value="All races">All Races</option>
      <option v-for="race in races" :key="race" :value="race">{{ race }}</option>
    </select>
  </section>

  <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
    <div
      v-for="character in filteredCharacters"
      :key="character.id"
      class="p-4 bg-[#4d5156] shadow-lg rounded-lg flex items-center justify-around cursor-pointer"
    >
      <p class="text-white"><strong>Name:</strong> {{ character.name }}</p>
      <p class="text-white"><strong>Race:</strong> {{ character.race }}</p>
      <p class="text-white"><strong>Level:</strong> {{ character.level }}</p>
      <div class="flex gap-4">
        <button class="bg-red-800 hover:bg-red-600 text-white px-4 py-1 rounded text-sm" @click="handleDelete(character.id)">delete</button>
        <RouterLink :to="'/character/' + character.id" class="bg-slate-800 hover:bg-slate-600 text-white px-4 py-1 rounded text-sm"
          >View character
        </RouterLink>
        <button class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-1 rounded text-sm" @click="openUpdateModal(character)">Edit</button>
      </div>
    </div>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md max-w-lg w-full">
        <h2 class="text-2xl font-bold mb-4">Update Character</h2>

        <form @submit.prevent="handleUpdateCharacter">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="characterToUpdate.name" id="name" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>

          <div class="mb-4">
            <label for="race" class="block text-sm font-medium text-gray-700">Race</label>
            <select v-model="characterToUpdate.race" id="race" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
              <option v-for="race in races" :key="race" :value="race">{{ race }}</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="level" class="block text-sm font-medium text-gray-700">Level</label>
            <input
              v-model.number="characterToUpdate.level"
              id="level"
              type="number"
              min="1"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="flex justify-end gap-4">
            <button type="button" @click="closeModal" class="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
      <EditModal
        v-if="isModalOpen"
        :characterToUpdate="characterToUpdate"
        :races="races"
        @closeModal="closeModal"
        @updateCharacter="handleUpdateCharacter"
      />
    </div>
  </div>
</template>
