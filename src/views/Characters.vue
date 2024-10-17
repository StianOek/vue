<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacters } from "../composables/useCharacter";
import { Character, Characters } from "../types";
import EditModal from "../components/EditModal.vue";

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

    <EditModal
      v-if="isModalOpen"
      :characterToUpdate="characterToUpdate"
      :races="races"
      @closeModal="closeModal"
      @updateCharacter="handleUpdateCharacter"
    />
  </div>
</template>
