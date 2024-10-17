<script setup lang="ts">
import { ref } from "vue";

import { Character } from "../types";
import { useCharacters } from "../composables/useCharacter";
import { useRouter } from "vue-router";

const { addCharacter } = useCharacters();
const router = useRouter();

const races = ref(["Half-Elf", "Human", "Dwarf", "Tiefling", "Elf", "Half-Orc", "Halfling"]);
const characterClasses = ref(["Fighter", "Warlock", "Rogue", "Barbarian", "Paladin", "Ranger", "Cleric"]);

const newCharacter = ref<Character>({
  id: "",
  name: "",
  race: "",
  level: 1,
  createdAt: new Date().toISOString(),
  className: "",
});

const handleSubmit = () => {
  // Sjekker om navn og rase er satt før vi legger til karakteren som en slags validering.
  if (newCharacter.value.name && newCharacter.value.race) {
    const randomId = Math.floor(Math.random() * 1000000); // Genererer et tilfeldig id mellom 0 og 1000000
    newCharacter.value.id = randomId.toString();
    addCharacter({ ...newCharacter.value });

    newCharacter.value.name = "";
    newCharacter.value.race = "";
    newCharacter.value.level = 1;
    router.push("/characters/list");
  }
};
</script>

<template>
  <h1 class="text-4xl font-bold text-white my-4">Create Character</h1>

  <form @submit.prevent="handleSubmit" class="shadow-lg rounded-lg border-gray-200">
    <div class="mb-4">
      <label for="name" class="block text-white text-sm font-bold mb-2">Name:</label>
      <input
        v-model="newCharacter.name"
        type="text"
        id="name"
        placeholder="Enter character name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div class="mb-4">
      <label for="race" class="block text-white text-sm font-bold mb-2">Race:</label>
      <select
        v-model="newCharacter.race"
        id="race"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
        required
      >
        <option value="" disabled>Select a race</option>
        <option v-for="race in races" :key="race" :value="race">{{ race }}</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="race" class="block text-white text-sm font-bold mb-2">Class:</label>
      <select
        v-model="newCharacter.className"
        id="race"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
        required
      >
        <option value="" disabled>Select a class</option>
        <option v-for="characterClass in characterClasses" :key="characterClass" :value="characterClass">{{ characterClass }}</option>
      </select>
    </div>

    <button type="submit" class="bg-emerald-600 hover:bg-emerald-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Add Character
    </button>
  </form>
</template>
